import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { GetPosts } from "./PostContext";
import svg from "./plus-square-svgrepo-com.png";

function Dialog1(params) {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const fd = new FormData();
  const { getCommonPosts } = GetPosts();
  const { getDeptPosts } = GetPosts();
  const { getYearPosts } = GetPosts();

  const handleClickOpen = () => {
    setPost({ type: "common" });
    setSelectedImage(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(post);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setPost((prev) => ({ ...prev, image: file }));
    }
  };

  const handleDescription = (event) => {
    setPost((prev) => ({ ...prev, description: event.target.value }));
  };

  const handleType = (event) => {
    setPost((prev) => ({ ...prev, type: event.target.value }));
  };

  const handleSubmit = async () => {
    // Handle the image submission logic here
    // console.log("Image submitted!");

    fd.append("image", post.image);
    fd.append("description", post.description);
    fd.append("type", post.type);
    fd.append("usn", params.usn); //------------------------------------

    try {
      let res = await axios.post(`http://localhost:5000/upload/`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("dialog",res.data.message);

      document.getElementById('responseId').innerText=res.data.message
    } catch (e) {
      console.error(e);
    }

    setOpen(false);
    getCommonPosts(params.usn, "common");
    getDeptPosts(params.usn);
    getYearPosts(params.usn);
  };

  return (
    <div >
      <Button
        onClick={handleClickOpen}
        style={{
          backgroundColor: "rgb(220 38 38 / var(--tw-bg-opacity, 1))",
          color: "black",
        }}
        className="flex flex-row  justify-center items-center   "
        id="createPost"
      >
        <img src={svg} className="w-8 " alt={svg} />{" "}
        <p className="font-poppins sm:w-fit text-white">Create post</p>
      </Button>

      <div id="responseId">
        HERE IT IS
</div>

      <Dialog id="postDialog" open={open} onClose={handleClose}>
        <DialogTitle
          
        >Upload an Image</DialogTitle>
        <DialogContent className="flex flex-col  gap-1 h-[35rem] w-[35rem]">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxHeight: "80%", maxWidth: "60%" }}
            />
          )}
          <input
            type="file"
            id="fileIP"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "block", margin: "20px 0" ,height:"2rem" }}
            className="focus:border border-yellow-300"
          />

          <TextField
            fullWidth
            margin="normal"
            placeholder="Enter description"
            id="textIP"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "yellow", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "yellow", // Border color on focus
                },
              },
            }}
            onChange={handleDescription}
          />

          <select id="selectIP" onChange={handleType} className="h-12 focus:border border-yellow-300" value={post.type || "common"}>
            <option value="common">Common</option>
            <option value="year_specific">Year Specific</option>
            <option value="department">Department</option>
          </select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: "black", border: "1px solid black" ,fontFamily:"Poppins"}}

            id="submitBtn"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{ backgroundColor: "red", color: "white" ,fontFamily:"Poppins",    "&:hover": {
              backgroundColor: "rgb(250 204 21 / var(--tw-bg-opacity, 1))",
              color:"black"
            },}}
            

          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dialog1;
