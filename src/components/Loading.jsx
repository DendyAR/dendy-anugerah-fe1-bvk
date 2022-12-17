import React from 'react'
import ReactLoading from "react-loading"

export default function Loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center text-center text-slate-100 -mt-72'>
        <ReactLoading type="bubbles" color="#fff" height={100} width={100} />
    </div>
  )
}
