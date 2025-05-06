const express = require("express");
const mongoose = require("mongoose");
const User = require("./User");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");
const multer = require("multer");
const Post = require("./Post");
const Comment = require("./Comments");
const Like = require("./Like");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./upload"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Uniconnect");
    console.log("Connected");
  } catch (e) {
    console.log("not connected");
  }
};
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("req hit");
  res.send("hello");
});

app.post("/addusr", async (req, res) => {
  try {
    // Read the userId from the file asynchronously and ensure it's treated as a string
    let userId = await fs.readFile(path.join(__dirname, "userid.txt"), "utf-8");
    let userid = parseInt(userId); // Convert it to an integer
    console.log("Current userId:", userid);

    const body = req.body;

    // Create a new user
      let response=await User.findOne({usn:body.usn.toLowerCase()})

      console.log(response);

      if(response)
      {
        res.status(409).json({ msg: "User already exists. Please try logging in." });

      }
      else{
        const user = await User.create({
          username: body.username,
          email: body.email.toLowerCase(),
          password: body.password, // Assuming password should be passed as `password`
          usn: body.usn.toLowerCase(),
        });
    
        console.log("User created:", user);
    
        res.status(201).json({ msg: "record received" });
      }


  } catch (err) {
    console.error("Error processing request:", err);
    res
      .status(500)
      .json({ msg: "Error processing request", error: err.message });
  }
});

app.get("/user/:id", async (req, res) => {
  const params = req.params;
  const body = req.query;
  // const { usn, password } = req.user;
  try {
    let A = body.password; // Log the ID from the route
    console.log(A);
    let B = params.id;
    console.log(B); // Log the ID from the route
  } catch (e) {
    console.log(e);
  }
  try {
    let userInfo = await User.find({
      usn: params.id.toLowerCase(),
      password: body.password,
    });

    if (!userInfo || userInfo.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("User found:", userInfo[0]); // Log the user information
    res.status(200).json(userInfo); // Return the user info as a response
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ msg: "Error fetching user", error: err.message });
  }
  res.status(201);
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const { description, type, usn } = req.body;

    console.log(description, type, usn);
    console.log("Uploaded file info:", file);

    try {
      let post = await Post.create({
        description: description,
        type: type,
        photo_url: file.path,
        usn: usn.toLowerCase(),
        date: new Date(),
      });
      console.log("Post Created...", post);
    } catch (e) {
      console.error(e);
    }

    res.status(200).json({ message: "File uploaded successfully", file });
  } catch (err) {
    console.error("Error during file upload:", err);
    res.status(500).json({ message: "File upload failed" });
  }
});

app.get("/posts/common", async (req, res) => {
  let posts = [];
  try {
    let response = await Post.find({ type: "common" });

    if (!response || response.length === 0) {
      console.log(`No common posts found`);
      res
        .status(500)
        .json({ msg: "No posts Found Why not create some post by you" });
    } else {
      console.log(response[0]);
      for (let p of response) {
        let photo = await fs.readFile(p.photo_url, { encoding: "base64" });
        let post = {
          photo: `data:image/jpeg;base64,${photo}`,
          description: p.description,
          type: p.type,
          date: p.date,
          id: p._id,
          usn: p.usn,
        };

        posts.push(post);
      }

      res.status(201).json(posts);
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "No posts Found Why not create some post by you" });
  }
});

app.get("/posts/dept", async (req, res) => {
  let { usn } = req.query;
  //  usn=toString(usn)
  let dept = usn.substring(6, 9);
  console.log(usn, dept);

  let posts = [];
  try {
    let response = await Post.find({
      type: "department",
      usn: { $regex: dept },
    });

    if (!response || response.length === 0) {
      console.log(`No common posts found`);
      res
        .status(500)
        .json({ msg: "No posts Found Why not create some post by you" });
    } else {
      console.log(response[0]);
      for (let p of response) {
        let photo = await fs.readFile(p.photo_url, { encoding: "base64" });
        let post = {
          photo: `data:image/jpeg;base64,${photo}`,
          description: p.description,
          type: p.type,
          date: p.date,
          id: p._id,
          usn: p.usn,
        };

        posts.push(post);
      }

      res.status(201).json(posts);
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "No posts Found Why not create some post by you" });
  }
});

app.get("/posts/year", async (req, res) => {
  let { usn } = req.query;
  //  usn=toString(usn)
  let dept = usn.substring(4, 6);
  console.log(usn, dept);

  let posts = [];
  try {
    let response = await Post.find({
      type: "year_specific",
      usn: { $regex: dept },
    });

    if (!response || response.length === 0) {
      console.log(`No common posts found`);
      res
        .status(500)
        .json({ msg: "No posts Found Why not create some post by you" });
    } else {
      console.log(response[0]);
      for (let p of response) {
        let photo = await fs.readFile(p.photo_url, { encoding: "base64" });
        let post = {
          photo: `data:image/jpeg;base64,${photo}`,
          description: p.description,
          type: p.type,
          date: p.date,
          id: p._id,
          usn: p.usn,
        };

        posts.push(post);
      }

      res.status(201).json(posts);
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "No posts Found Why not create some post by you" });
  }
});

app.get("/data/:usn", async (req, res) => {
  let usn = req.params.usn;

  try {
    // Find the user using both usn and password
    let userInfo = await User.find({ usn: usn.toLowerCase() });
    console.log(userInfo);

    if (!userInfo || userInfo.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    let user = userInfo[0];
    let { _id, password, userId, __v, ...rest } = user.toObject();
    console.log("User found:", rest); // Log the user information
    res.status(200).json({ user: rest }); // Return the user info as a response
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ msg: "Error fetching user", error: err.message });
  }
  res.status(201);
});

app.post("/comment", async (req, res) => {
  let body = req.body;

  let body2 = {
    usn: body.usn,
    comment: body.comment,
    post_id: body.post_id,
    time: new Date(),
  };
  try {
    let comment = await Comment.create(body2);
    console.log(comment);
    res.send("Comment recieved");
  } catch (e) {
    console.error(e);
    res.send("Comment Not recieved");
  }
});

app.get("/comment", async (req, res) => {
  let body = req.query;

  console.log("post_id: ", body.post_id);

  try {
    let comment = await Comment.find({ post_id: body.post_id });
    console.log(comment);

    let comments = [];
    if (comment) {
      for (const element of comment) {
        let { _id, __v, ...rest } = element.toObject();

        comments.push(rest);
      }

      console.log(comments);
    }

    res.status(200).json(comments);
  } catch (e) {
    console.error(e);
    res.status(401).send("Comment Not recieved");
  }
});

app.post("/like", async (req, res) => {
  let { add, post_id, usn } = req.body;

  try {
    if (add) {
      let response = await Like.create({
        post_id: post_id,
        usn: usn,
        time: new Date(),
      });
      console.log("Like registered:", response);
      res.status(201).send("Like registered");
    } else {
      let response = await Like.deleteOne({ post_id: post_id, usn: usn });
      console.log("Like deregistered:", response);
      res.status(200).send("Like deregistered");
    }
  } catch (e) {
    console.error("Error in like handling:", e);
    res.status(500).send("Error processing like request");
  }
});


app.get("/getLikeCounts/:postid", async(req, res) => {
  let postid = req.params.postid;
  try {
    let counts = await  Like.find({ post_id: postid });



    res.status(200).json({ count: counts.length });
  } catch (e) {
    console.error(e);
  }
});

app.get("/getCommentCounts/:postid", async(req, res) => {
  let postid = req.params.postid;
  try {
    let counts = await  Comment.find({ post_id: postid });



    res.status(200).json({ count: counts.length });
  } catch (e) {
    console.error(e);
  }
});



app.get("/likestatus", async (req, res) => {
  let { postid, usn } = req.query;

  try {
    let response = await Like.findOne({ post_id: postid, usn: usn });
    res.status(200).json({ liked: !!response }); // Return `true` if a record exists, otherwise `false`
  } catch (e) {
    console.error("Error fetching like status:", e);
    res.status(500).json({ msg: "Error fetching like status" });
  }
});


app.listen(5000, (err) => {
  console.log("app is listening on port 5000");
});
