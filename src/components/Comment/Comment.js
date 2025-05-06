import React, { useEffect, useState } from 'react';
import img from './comment-lines-2-svgrepo-com.png';
import { GetPosts } from '../../PostContext';
import axios from 'axios';

function Comment(params) {
  const { setSelectedPost } = GetPosts();
  const [commentCount, setCommentCount] = useState();

  function handleBtn() {
    setSelectedPost(params.postid);
  }

  async function fetchComments() {
    try {
      const url = `http://localhost:5000/getCommentCounts/${params.postid}`;
      const response = await axios.get(url);
      return response.data?.count;
    } catch (error) {
      console.error('Error fetching comment counts:', error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchAllComments(){
      const count = await fetchComments();
      if (count !== null) {
        setCommentCount(count);
      }
    }

    fetchAllComments()
    

    const intervalId = setInterval(async () => {
      const count = await fetchComments();
      if (count !== null) {
        setCommentCount(count);
      }
    }, 5000); // Fetch every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="flex justify-center items-center">
      <button onClick={handleBtn}>
        <img src={img} className="h-10" alt="comment"></img>
      </button>
      <div>{commentCount}</div>
    </div>
  );
}

export default Comment;
