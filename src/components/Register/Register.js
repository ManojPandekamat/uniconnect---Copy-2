import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import uniconnect from "../../uniconnect.jpg";

function Login() {
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [usrname, setUsrname] = useState("");
  const dialogRef = useRef(null);
  const dialogReferr = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  function handleusn(e) {
    setUsn(e.target.value);
    console.log(usn);
  }
  function handlemail(e) {
    setEmail(e.target.value);
    console.log(email);
  }

  function handlepass(e) {
    setPassword(e.target.value);
    console.log(password);
  }
  function handlecpass(e) {
    setcPassword(e.target.value);
    console.log(cpassword);
  }
  function handleusrname(e) {
    setUsrname(e.target.value);
    console.log(usrname);
  }

  function validate() {
    let vaildmail = false;
    let resUsn = false;
    let respass = false;

    let div = document.getElementById("err-div");

    // if()
    if (usrname === "") {
      div.innerHTML = "Username cannot be empty";
      return;
    }

    let regexp = RegExp(
      "^01fe[0-9]{2}[a-z]{3}[0-9]{3}$|^01FE[0-9]{2}[A-Z]{3}[0-9]{3}$"
    );
    let res = regexp.test(usn);
    if (res === true) {
      resUsn = true;
    } else {
      div.innerHTML = "Invalid USN";
      return false;
    }

    let str = email.split("@");

    if (str[1] === "kletech.ac.in") {
      vaildmail = true;
    } else {
      div.innerHTML = "Not valid mail.please use college mail";
      return false;
    }
    if (str[0] !== usn) {
      div.innerHTML = "USN doesnot match with email";
      return false;
    }

    if (password.length < 6 || password.length > 12) {
      div.innerHTML = "password must be 6-12 charecters";
      return false;
    }
    if (password !== cpassword) {
      div.innerHTML = "set and confirm password do not match";
      return false;
    }
    respass = true;

    console.log(resUsn, respass, vaildmail);

    return resUsn && respass && vaildmail;
  }

  async function handlebtn(e) {
    e.preventDefault();

    let validationResult = validate();
    console.log(validationResult);

    if (validationResult === true) {
      let user = {
        username: usrname,
        usn: usn,
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/addusr",
          user,
          {
            validateStatus: (status) => {
              // Allow 409 to be treated as a valid status
              return (status >= 200 && status < 300) || status === 409;
            },
          }
        );
        console.log(user);
        console.log(response.data.msg);
        console.log("Response Status:", response.status); // Log the response status

        if (response.status === 201) {
          dialogRef.current.showModal();
        } else {
          let errele = document.getElementById("errelement");
          if (response.status === 409) {
            errele.innerText = "User already registered, try to login...";
            dialogReferr.current.showModal();
          } else if (response.status === 501) {
            errele.innerText =
              "There was an error while creating the account, try again!";
            dialogReferr.current.showModal();
          }
        }
      } catch (e) {
        console.error("Error during registration:", e);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className="flex sm:mt-8 m-0 sm:flex-row flex-col  justify-center font-poppins items-center sm:gap-[3rem] ">
      <div className="flex sm:flex-row flex-col justify-center items-center border-2 rounded-lg shadow-[0px_0px_8px_#4f4b4b] border-[#0606068e] sm:w-fit w-full">
        <div className=" font-poppins bg-red-600 h=[4rem] text-[2rem] sm:h-[38rem] w-full sm:w-[30rem] text-white flex flex-col sm:text-[4rem] justify-center items-center sm:rounded-tr-[12rem] sm:rounded-br-[3rem]">
          <p className=" font-extrabold  animate-slidedown">UniConnect</p>
        </div>

        <div className=" w-full sm:w-[35rem] sm:h-[38rem]    flex flex-col justify-center items-center ">
          <form className="flex flex-col gap-1 pb-8 sm:mt-4 text-red w-[20rem]">
            <img src={uniconnect} alt="logo" className="w-20 self-end" />
            <div className="font-bold text-2xl">Register</div>
            <div
              id="err-div"
              className="h-fit bg-red-200 text-red-600 font-bold"
            ></div>
            <div>Set username</div>
            <input
              type="text"
              className="border-b-2 border-b-black h-10 focus:border-yellow-500 focus:outline-none"
              style={{ outline: "none" }}
              placeholder="Set username"
              value={usrname}
              onChange={handleusrname}
            ></input>
            <div>Enter USN</div>
            <input
              type="text"
              className="border-b-2 border-b-black h-10 focus:border-yellow-500 focus:outline-none"
              style={{ outline: "none" }}
              placeholder="Enter USN"
              value={usn}
              onChange={handleusn}
            ></input>

            <div>Enter email</div>
            <input
              type="email"
              className="border-b-2 border-b-black h-10 focus:border-yellow-500 focus:outline-none"
              style={{ outline: "none" }}
              placeholder="Enter email"
              value={email}
              onChange={handlemail}
            ></input>
            <div>Set password</div>
            <input
              type="password"
              className="border-b-2 border-b-black h-10 focus:border-yellow-500 focus:outline-none"
              style={{ outline: "none" }}
              placeholder="Set Password"
              value={password}
              onChange={handlepass}
            ></input>
            <div>Confirm Password</div>
            <input
              type={showPassword ? "text" : "password"}
              className="border-b-2 border-b-black h-10 focus:border-yellow-500 focus:outline-none"
              style={{ outline: "none" }}
              placeholder="Confirm password"
              value={cpassword}
              onChange={handlecpass}
            ></input>
            <div>
              Alreay have account?
              <Link to="/login" className="text-xs">
                login
              </Link>
            </div>

            <button
              type="submit"
              onClick={handlebtn}
              className="bg-red-600 h-12 text-xl rounded-md text-white w-full hover:text-black ease-in-out  hover:bg-yellow-300 border"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="rounded-xl border-2 border-[#00000050]"
      >
        <div className="bg-green-200  h-[10rem] w-fit sm:w-[35rem] flex flex-col justify-center gap-6 items-center">
          <strong className="text-green-500 font-bold text-lg sm:text-xl flex pl-2 pr-2 sm:p-0 justify-center items-center">
            registered successfully
          </strong>
          <Link
            to={"/login"}
            className="text-center h-[2.5rem] w-20 rounded-sm bg-black flex justify-center items-center self-end mr-4 text-white"
          > 
            Login
          </Link>
        </div>
      </dialog>


      <dialog
        ref={dialogReferr}
        className="rounded-xl border-2 border-[#00000057]"
      >
        <div className="bg-red-200  h-[15rem] w-fit sm:w-[35rem] flex flex-col justify-center gap-6 items-center">
          <strong
            className="text-red-500 font-bold text-lg sm:text-xl flex pl-2 pr-2 sm:p-0 justify-center items-center"
            id="errelement"
          ></strong>
          <button
            className=" h-[2.5rem] w-20 rounded-sm bg-black self-end mr-4 text-white"
            onClick={() => {
              dialogReferr.current.close();
            }}
          >
            close
          </button>
        </div>
      </dialog>

    </div>
  );
}

export default Login;
