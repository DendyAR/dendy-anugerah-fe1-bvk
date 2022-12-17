import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_uri } from "../api/api";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";

export default function Card() {
  const [isActive, setIsActive] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cats, setCats] = useState([]);

  const PAGE_LIMIT = 10;

  const getCatsList = () => {
    let pageNo = Math.ceil(cats.length / PAGE_LIMIT) + 1;
    const queryParam = "?page=" + pageNo + "&limit=" + PAGE_LIMIT;
    const finalUrl = api_uri + queryParam;
    axios
      .get(finalUrl)
      .then((res) => {
        const apiRes = res?.data;
        const mergeData = [...cats, ...apiRes];
        setCats(mergeData);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getCatsList();
    }, 1500);
    return () => clearTimeout(timer);
  });

  const fetchData = () => {
    setCats([...cats]);
    if (getCatsList.length === 0 || getCatsList.length < 100) {
      setHasMore(false);
    }
  };

  const toggleAccordion = (index) => {
    if (isActive === index) {
      return setIsActive(null);
    }
    setIsActive(index);
  };

  console.log(cats, 'hj');

  return (
    <React.Fragment>
      {!loading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={cats.length}
          next={fetchData}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Item 10 next page</b>
            </p>
          }
          className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4"
        >
          {/* Map Data */}
          {cats &&
            cats.length > 0 &&
            cats.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 justify-center"
              >
                <div className="w-72 py-10">
                  <div className="bg-white shadow-xl rounded-lg py-3">
                    <div className="photo-wrapper p-2">
                      <img
                        className="w-full object-cover h-32 rounded-md mx-auto"
                        src={item?.image?.url}
                        alt="John Doe"
                      />
                    </div>
                    <div className="p-2" onClick={() => toggleAccordion(index)}>
                      <div className="flex flex-row justify-between items-center text-center px-3">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                          {item.name}
                        </h3>
                        <div className="text-base cursor-pointer">
                          {isActive === index ? (
                            <FontAwesomeIcon icon={faAngleDown} />
                          ) : (
                            <FontAwesomeIcon icon={faAngleUp} />
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          isActive === index
                            ? "text-gray-200 text-justify font-[Khumb Sans] py-3"
                            : "hidden"
                        }
                      >
                        <div className="text-center text-gray-900 text-xs font-semibold">
                          <p>{item.origin}</p>
                        </div>
                        <table className="text-xs my-3 text-gray-900">
                          <tbody>
                            <tr>
                              <td className="px-2 py-2 font-semibold">
                              Social Needs
                              </td>
                              <td className="px-2 py-2">
                                {item.social_needs}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 font-semibold">
                              Stranger Friendly
                              </td>
                              <td className="px-2 py-2">{item.stranger_friendly}</td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 font-semibold">
                              Shedding Level
                              </td>
                              <td className="px-2 py-2">{item.shedding_level}</td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 font-semibold">
                              Short Legs
                              </td>
                              <td className="px-2 py-2">{item.short_legs}</td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 font-semibold">
                              Suppressed Tail
                              </td>
                              <td className="px-2 py-2">{item.suppressed_tail}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center my-3">
                          <Link
                            className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                            to={"/card-detail/" + item.id}
                            state={{ data: item }}
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* Map Data */}
        </InfiniteScroll>
      )}
    </React.Fragment>
  );
}
