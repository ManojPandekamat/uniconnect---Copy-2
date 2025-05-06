import React, { useState } from "react";
import { useEffect } from "react";
import CommentComponet from "./CommentComponet";
import { GetPosts } from "../../PostContext";
import axios from "axios";

function CommentList(params) {
  const { getComments } = GetPosts();
  const { selectedPost } = GetPosts();
  const {commented,setCommented}=GetPosts()
  const { comments, setComments } = GetPosts();
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function temp() {
      await getComments();
    }
    temp();

    setComment("");
    setComments([]);

    let commentInput = document.getElementById("comment");
    if (commentInput) {
      commentInput.value = "";
    }
  }, [selectedPost]);

  useEffect(() => {
    async function temp() {
      await getComments();
    }
    temp();

    setComment("");
    setComments([]);

    let commentInput = document.getElementById("comment");
    if (commentInput) {
      commentInput.value = "";
    }
  }, [commented]);

  function handlechange(e) {
    setComment(e.target.value);
    console.log(comment);
  }

  async function handlebtn(e) {
    e.preventDefault()
    if (comment === "") {
      alert("Cannot write empty comment");
    } else {
      console.log(selectedPost, comment, params.usn);

      try
      {let res = await axios.post("http://localhost:5000/comment", {
        post_id: selectedPost,
        usn: params.usn,
        comment: comment,
      });
      console.log(res);
      setCommented(!commented)
    }
      catch(e){
        console.error(e);      
      }
      

    }
    return;
  }

  return (
    <div className={` max-h-[40rem]  ${selectedPost === "" ? "none": "block"}`}>
      {selectedPost!=="" ? (
          <form className="flex flex-row justify-center items-center">
            <input className="h-12 w-full rounded-[3rem] border border-black p-2 m-2"
              id="comment"
              placeholder="Write comment..."
              onChange={handlechange}
              type="text"
              autoComplete="off"
            ></input>
          <button className="flex justify-end items-end bg-red-600 p-2 rounded-xl  text-white hover:bg-yellow-300 hover:text-b" onClick={handlebtn}>
            Create
          </button>
          </form>
      ):(<div>Click on the comment section of a post</div>)}

      {comments && comments.length > 0 ? (
        <div>
          <ul className="flex flex-col gap-2 justify-center">
            {comments.slice().reverse().map((ele, index) => (
              <CommentComponet
                usn={ele.usn}
                comment={ele.comment}
                date={new Date(ele?.time)}
                index={index}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div>be the first one to write comment.</div>
        </div>
      )}
    </div>
  );
}

export default CommentList;
