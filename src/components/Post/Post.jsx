import React, { useEffect } from "react";
import { useState } from "react";
import Likebtn from "../LikeBtn/Likebtn";
import Comment from "../Comment/Comment";

function Post(params) {
  const [desc, setDesc] = useState("");
  const [seemore, setSeeMore] = useState(false);

  useEffect(() => {
    let description = "";
    if (seemore) {
      setDesc(params.description);
    } else {
      description = params.description.slice(0, 20);
      setDesc(description);
    }
  }, [seemore, params.description]);

  // useEffect(() => {
  //   console.log("posts: ", params.postid);
  // }, [params.postid]);

  let month = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "june",
    "july",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  return (
    <div className="max-h-[30rem] w-full grid grid-rows-[1fr_5fr_1fr_2fr] grid-cols-1 border  border-[#cecece] rounded-md  mr-1 ml-1">
      <div className="flex flex-row justify-between border-b  border-[#cecece]">
        <div className="p-2 row-span-1 font-poppins text-[600]">
          {params?.usn && params.usn}
        </div>

        <div className="flex flex-row pr-3 w-fit justify-center items-center gap-3 font-poppins">
          <div className="flex flex-row w-fit gap-[2px]">
            <div>{params.date && (params.date.getDate() || "")}</div>
            <div>{params.date && (month[params.date.getMonth()] || "")}</div>
            <div>{params.date && (params.date.getFullYear() || "")}</div>
          </div>
          <div className="flex flex-row  w-fit">
            <div>{params.date && (params.date.getHours() || "") + ":"}</div>
            <div>{params.date && (params.date.getMinutes() || "")}</div>
          </div>
        </div>

      </div>

      <div className="flex justify-center border-b  border-[#cecece] items-center overflow-hidden h-full">
        <img
          src={params.photo}
          alt="post-img"
          className="max-w-[100%] max-h-[90%]  object-contain"
        />
      </div>

      <div className="grid border-b  border-[#cecece] grid-cols-[1fr_1fr] p-2">
        <div className="">
          <Likebtn postid={params.postid} usn={params?.usn} />
        </div>
        <div className="">
          <Comment postid={params.postid} />
        </div>
      </div>

      <p id="description" className="p-2">
      {
         params.description.length > 20 ?
         (desc ? (
          <>
            <span>{desc}</span>
            <span
              style={{ color: "green" }}
              onClick={() => setSeeMore(!seemore)}
            >
              {seemore ? " See less..." : " ...See more"}
            </span>
          </>
        ) : (
          params.description
        )) : (params.description) 
      }       
      </p>
    </div>
  );
}

export default Post;
