import axios from "axios";
import React, { useState,useEffect } from "react";
import { GetPosts } from "../../PostContext";
import like from './heart-svgrepo-com.png'
import like2 from './heart-svgrepo-com (1).png'

function Likebtn(params) {
  const [Liked, setLiked] = useState(false);
  const { userData } = GetPosts();
  const [likecounts,setLikeCounts]=useState(0)

  async function togglelike() {
    let newLiked = !Liked;
    setLiked(!Liked);
    console.log(newLiked);

    if(newLiked)
    setLikeCounts(likecounts+1);
  else{
    setLikeCounts(likecounts-1);
  }

    let res = await axios.post("http://localhost:5000/like", {
      usn: userData.usn,
      post_id: params.postid,
      add: newLiked,
    });
    console.log(res);
  }
  
  async function fetchlikes() {
    let response;
    let url=`http://localhost:5000/getLikeCounts/${params.postid}`
    response=await axios.get(url);
    return response
  }


  useEffect(() => {
    async function fetchAndSetLikes() {
      try {
        const response = await fetchlikes();
        console.log("like counts:", response.data.count); // Accessing the count property
        setLikeCounts(response.data.count)
      } catch (error) {
        console.error("Error fetching like counts:", error);
      }
    }
  
    fetchAndSetLikes(); // Call the async function
  }, [likecounts]);
  

  useEffect(()=>{
    let response;
    async function checkStatus() {
      response=await axios.get('http://localhost:5000/likestatus',{params:{
        usn:userData.usn,
        postid:params.postid
      }})

      
    if(response.data.liked == true)
      {
        setLiked(true)
      }
      else{
        setLiked(false)
      }
      
    }

    checkStatus()


    console.log("likestatus:",response)

  },[])

  return (
    <div className="h-[2.5rem] flex justify-center items-center">
      <button
        onClick={togglelike}
        className={`transform transition-transform duration-300 ease-in-out text-4xl ${
          Liked ? "animate-ping-like  text-red-500" : "scale-100 text-gray-500"
        }`}
      >
        <span className="text-[2rem]">{Liked ? <img src={like} className="w-8" /> : <img src={like2} className="w-8" />}</span>
      </button>
      <div>{likecounts && (likecounts)}</div>
    </div>
  );
}

export default Likebtn;
