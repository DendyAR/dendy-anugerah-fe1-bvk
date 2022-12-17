import React from "react";
import { Link, useLocation } from "react-router-dom";

const CardDetail = () => {
  const location = useLocation();
  const dataLocation = location.state?.data;

  console.log(dataLocation);

  return (
   <React.Fragment>
    <div className="w-full h-screen p-10 bg-[#355C7D]">
      <div className="space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0">
        <a href="https://stackdiary.com/" className="group">
          <div className="aspect-w-3 aspect-h-2">
            <img
              className="object-cover shadow-lg rounded-lg group-hover:opacity-75"
              src={dataLocation?.image?.url}
              alt=""
            />
          </div>
        </a>
        <div className="sm:col-span-2">
          <div className="mt-2">
            <a
              href={dataLocation.wikipedia_url}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <h4 className="text-lg leading-6 font-semibold font-sans text-slate-300 group-hover:text-skin-primary">
                <span className="text-lg font-bold">Name: </span>
                {dataLocation.name}
              </h4>
            </a>
            <p className="mt-1 text-base font-normal text-slate-300 leading-5">
              <span className="text-lg font-bold">Description: </span>
              {dataLocation.description}
            </p>
            <p className="mt-1 text-base font-normal text-slate-300 leading-5">
              <span className="text-lg font-bold">Temprament: </span>{" "}
              {dataLocation.temperament}
            </p>
            <p className="mt-1 text-base font-normal text-slate-300 leading-5">
              <span className="text-lg font-bold">Origin: </span>{" "}
              {dataLocation.origin}
            </p>
            <ul className="text-slate-300 text-base">
              <label>Weight</label>
              <li>Imperial : {dataLocation.weight?.imperial}</li>
              <li>Metric : {dataLocation.weight?.metric}</li>
            </ul>
            <ul className="text-slate-300 text-base">
              <li>Natural : {dataLocation.natural}</li>
              <li>Rare : {dataLocation.rare}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-5 text-slate-300 text-base font-semibold cursor-pointer">
        <a href={dataLocation.wikipedia_url} target="_blank" rel="noreferrer">{dataLocation.wikipedia_url}</a>
      </div>
    <div className="w-auto flex justify-center items-center text-center text-2xl font-bold text-slate-200 py-10 hover:text-3xl hover:transition-all hover:ease-in-out hover:duration-500 duration-500">
      <Link to="/">Back TO Home</Link>
    </div>
    </div>

    </React.Fragment>
  );
};

export default CardDetail;
