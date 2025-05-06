import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Dialog1 from "../Dialog1";
import Post from "../components/Post/Post";
import { GetPosts } from "../PostContext";
import CommentList from "../components/CommentList/CommentList";

function YearPosts() {
  const { usn } = useParams();
  const { getYearPosts } = GetPosts();
  const { userData, selectedPost, setSelectedPost } = GetPosts();

  let { yearPosts } = GetPosts();

  if (!usn === 0) {
    console.log("usn not found");
  } else console.log("usn", usn);

  useEffect(() => {
    async function fetch() {
      await getYearPosts(usn);
    }
    fetch();
  }, [usn]);

  return (
    <div className="w-full">
      <div className="h-[3rem] bg-yellow-400 flex text-white text-8 font-poppins font-[600] justify-between items-center">
        <p className="pl-4">Hello {userData && (userData?.username || "User")}</p>
        <div className="h-full sm:w-[33%] w-[15rem] border-r border-white bg-red-600 text-xl sm:rounded-none rounded-md font-poppins hover:scale-105 transition-transform duration-300 text-white flex justify-center items-center">
          <Link to={`/user/${usn}`}>Back</Link>
        </div>
      </div>
      {userData ? (
        <div className="flex flex-col sm:flex-row h-full sm:gap-4 gap-2 sm:mt-4 m-0">
          <div className="sm:w-[15%] w-full p-2 flex sm:justify-center justify-start rounded-lg border border-[#cecece]">
            <div className="sm:mt-4 mt-0">
              <Dialog1 usn={usn} />
            </div>
          </div>
          <div className="w-full sm:w-[70%] border">
            <div>
              <div className="flex flex-col justify-center gap-2 items-center">
                {yearPosts && yearPosts.length > 0 ? (
                  yearPosts
                    .slice()
                    .reverse()
                    .map((e) => (
                      <Post
                        key={e.id}
                        description={e.description}
                        type={e.type}
                        postid={e.id}
                        photo={e.photo}
                        usn={e.usn}
                        date={new Date(e?.date)}
                      />
                    ))
                ) : (
                  <div>
                    No common posts across university this time. Check for
                    department or year-specific.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="sm:w-[20%] w-full border border-[#cecece] h-44 rounded-md">
            <p className="h-6 border text-xl font-poppins text-start pl-2 font-bold">
              User Information
            </p>
            <p className="h-6 bg-slate-200 text-start pl-2 font-semibold">
              Username
            </p>
            <p className="h-6 text-start pl-2">{userData.username}</p>
            <p className="h-6 bg-slate-200 text-start pl-2 font-semibold">
              USN
            </p>
            <p className="h-6 text-start pl-2">{userData.usn}</p>
            <p className="h-6 bg-slate-200 text-start pl-2 font-semibold">
              Email
            </p>
            <p className="h-6 text-start pl-2">{userData.email}</p>
          </div>
        </div>
      ) : (
        <div>
          <h1>No data found</h1>
        </div>
      )}

      {/* Floating CommentList */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "20rem",
          maxHeight: "25rem",
          overflowY: "auto",
          backgroundColor: "white",
          border: "1px solid #cecece",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          padding: "10px",
          display: selectedPost === "" ? "none" : "block",
        }}
      >
        <div className="flex justify-end items-center">
          {selectedPost && (
            <button
              className="flex justify-end items-end bg-red-600 p-2 rounded-xl text-white"
              onClick={() => {
                setSelectedPost("");
              }}
            >
              cancel
            </button>
          )}
        </div>
        <p className="font-bold">Comments</p>
        <CommentList usn={usn} />
      </div>
    </div>
  );
}

export default YearPosts;
