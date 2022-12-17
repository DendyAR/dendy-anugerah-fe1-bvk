import React, { } from "react";
import { useLocation } from "react-router-dom";

const CardDetail = () => {
  const location = useLocation();
  const dataLocation = location.state?.data;

  return (
    <div className="w-full h-screen bg-[#355C7D] flex flex-col justify-center items-center">
       <img
          className="object-contain w-4/12 py-5"
          src={dataLocation?.image?.url}
          alt=""
        />
      <a href="..." className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{dataLocation?.name}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{dataLocation?.description}</p>
        </div>
      </a>
    </div>
  );
};

export default CardDetail;
