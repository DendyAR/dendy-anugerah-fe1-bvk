import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_uri } from "../api/api";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Card() {
  const [isActive, setIsActive] = useState(-1);
  const [cats, setCats] = useState([]);

  const totalCount = 100;
  const PAGE_LIMIT = 10;

  const getProductList = () => {
    let pageNo = Math.ceil(cats.length / PAGE_LIMIT) + 1;
    const queryParam = "?page=" + pageNo + "&limit=" + PAGE_LIMIT;
    const finalUrl = api_uri + queryParam;
    axios
      .get(finalUrl)
      .then((res) => {
        const apiRes = res?.data;
        const mergeData = [...cats, ...apiRes]
        setCats(mergeData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductList();
  },);

  const fetchData = () => {
    if(cats.length < totalCount) {
        getProductList()
    }
  }

  const toggleAccordion = (index) => {
    if (isActive === index) {
      return setIsActive(null);
    }
    setIsActive(index);
  };

  return (
    <React.Fragment>
      <InfiniteScroll
        dataLength={cats.length}
        next={fetchData}
        hasMore={true}
        className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mx-5 py-5"
        loader={<h4>Loading...</h4>}>
        {/* Map Data */}
        {cats && cats.length > 0 && cats.map((item, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden transition duration-150 ease-linear cursor-pointer          hover:-translate-y-2 px-5 shadow-lg">
        <img className="w-full object-cover rounded-t-xl" src={item?.image?.url} alt="Cats"/>
        <div key={item.id} className="grid grid-cols-1 w-full px-5 gap-2 p-2 text-gray-200 mt-5 border-t-2 border-slate-200"
            onClick={() => toggleAccordion(index)}>
            <div className="font-[Khumb Sans] lg:text-2xl font-normal">Name: {item.name}</div>
                <div className="text-base cursor-pointer animate-out slide-out-to-bottom-50">
                    {isActive === index ? ( <FontAwesomeIcon icon={faAngleDown}/>) : (<FontAwesomeIcon icon={faAngleUp}/> )}
                </div>
          <div className="col-span-2">
            <div className={ isActive === index ? "text-gray-200 text-justify font-[Khumb Sans] py-3" : "hidden"}>
              {item.description}
                <Link to={"/card-detail/" + item.id} state={{ data: item }}>
                <span className="text-blue-500 text-sm font-[Manrope] font-normal hover:font-extrabold border-b-2 border-blue-400 duration-500">Baca Selengkapnya </span>
                </Link>
                 </div>
            </div>
        </div>
        </div>
        ))}
     {/* Map Data */}
      </InfiniteScroll>
    </React.Fragment>
  );
}
