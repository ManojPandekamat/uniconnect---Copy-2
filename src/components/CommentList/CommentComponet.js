import React from 'react'

function CommentComponet(params) {

let month=['jan','feb','mar','apr','may','june','july','aug','sep','oct','nov','dec'];


  return (
    <li className={`border border-[#d5d5d5]  grid bg-gray-200 grid-rows-[1rem_1.5rem] grid-cols-2 h-10 w-[15rem] rounded-3xl ${params.index %2  === 0? "self-start":"self-end"}`}>
        <div className='row-start-1 pl-[1rem] pt-[0.3rem] col-start-1 row-end-2 col-end-2 font-bold text-[0.5rem] '>{params.usn}</div>
        <div className='row-start-2 pl-[1rem] col-start-1 row-end-3 col-end-2  text-[0.75rem]'>{params.comment}</div>
        <div className='flex flex-row row-start-[1] pt-[0.3rem] pr-[1rem] gap-[3px] row-end-[2] col-start-2 col-end-2 justify-end items-end font-bold text-[0.5rem] '>
        <div>

          <div className='flex flex-row gap-[1px]'>
          <div>{params.date &&(params.date.getHours()|| "" ) +":"}</div>
            <div>{params.date &&(params.date.getMinutes() || "")}</div>
          </div>
        </div>
        <div  className='flex flex-row gap-[1px]'>
            <div>{params.date &&(params.date.getDate() || "")}</div>
            <div>{params.date &&(month[params.date.getMonth()] || "")}</div>
            <div>{params.date &&(params.date.getFullYear() || "")}</div>
        </div>
        </div>
    </li>
  )
}

export default CommentComponet