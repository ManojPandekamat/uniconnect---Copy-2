import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const PostContext = createContext();

export const DataProvider = ({ children }) => {
  const [commonPosts, setCommonPosts] = useState([]);
  const [yearPosts, setYearPosts] = useState([]);
  const [deptPosts, setDeptPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState("");
  const [commented,setCommented]=useState(false)
  
  

  async function getCommonPosts() {
    try {
      let data = await axios.get("http://localhost:5000/posts/common");
      let posts = data.data;
      if (!posts || posts.length !== 0) {
        setCommonPosts(posts);
        console.log(posts[0]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function updateUserData(usn, username, email) {
    let userdata = {
      usn: usn,
      username: username,
      email: email,
    };

    setUserData(userdata);
  }

  useEffect(() => {
    getCommonPosts();
    console.log(commonPosts[0]);
    setSelectedPost("");
  }, []);

  async function getDeptPosts(usn, type) {
    try {
      let data = await axios.get(`http://localhost:5000/posts/dept?usn=${usn}`);
      if (!data.data || data.data.length !== 0) {
        console.log(data.data[0]);

        setDeptPosts(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function getYearPosts(usn, type) {
    let data = await axios.get(`http://localhost:5000/posts/year?usn=${usn}`);

    if (!data.data || data.data.length !== 0) {
      setYearPosts(data.data);
    }
    return yearPosts;
  }

  async function getComments() {
    try {
      console.log("In post context: ",selectedPost);
      
      let data = await axios.get("http://localhost:5000/comment", {
        params: {
          post_id: selectedPost,
        },
      });

      if (!data.data || data.data.length >0) {
        console.log(data.data[0]);

        setComments(data.data);
        console.log(data.data);
        
      }
      else{
        console.log("comments not found");
        
      }

      if (selectedPost === "") {
        setComments([]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <PostContext.Provider
      value={{
        getCommonPosts,
        getDeptPosts,
        getYearPosts,
        commonPosts,
        yearPosts,
        deptPosts,
        updateUserData,
        userData,
        getComments,
        selectedPost,
        setSelectedPost,
        comments,
        setComments,
        commented,
        setCommented
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const GetPosts = () => useContext(PostContext);
