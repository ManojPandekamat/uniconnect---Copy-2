import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import uniconnect from '../../uniconnect.jpg'

function Login() {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleusn(e) {
    setUsn(e.target.value);
  }

  function handlepass(e) {
    setPassword(e.target.value);
  }

  function validate() {
    let div = document.getElementById("err-div");
    let regexp = RegExp(
      "^01fe[0-9]{2}[a-z]{3}[0-9]{3}$|^01FE[0-9]{2}[A-Z]{3}[0-9]{3}$"
    );
    let res = regexp.test(usn);
    if (res === true) {
      return true;
    } else {
      div.innerHTML = "Invalid USN";
      return false;
    }
  }

  async function handlebtn(e) {
    e.preventDefault(); // Prevent default form submission

    let div = document.getElementById("err-div");
    let validInfo = false;

    if (usn === "") {
      div.innerHTML = "USN cannot be empty";
      return;
    }

    let isValid = validate();
    if (isValid) {
      if (password === "") {
        div.innerHTML = "Password cannot be empty";
        return;
      }

      let user = {
        usn: usn,
        password: password,
      };

      try {
        // Send the usn directly in the URL path
        const response = await axios.get(`http://localhost:5000/user/${usn}`, {
          params: { password: user.password },
        });

        console.log("Response status:", response.status);

        if (response.status === 200) {
          // Check if the status code is 200
          validInfo = true;
        }

        if (validInfo) {
          // Navigate to the user page if valid
          navigate(`/user/${usn}`);
        } else {
          // Redirect to error page if invalid credentials
          div.innerHTML = "Invalid credentials";
          return;
          
        }
      } catch (err) {
        div.innerHTML = "Invalid credentials";
        console.error("Error occurred during login:", err);
      }
    }
  }

  return (
    <div className=" flex sm:mt-8 sm:flex-row flex-col  justify-center font-poppins items-center sm:gap-[3rem]">

      <div className="flex sm:flex-row flex-col justify-center items-center border-2 rounded-lg shadow-[0px_0px_8px_#4f4b4b] border-[#0606068e] w-fit">
        <div className=" font-poppins bg-red-600 h-[4rem] sm:h-[35rem] w-[30rem]   text-white flex flex-col text-[2rem] sm:text-[4rem] justify-center items-center sm:rounded-tr-[12rem] sm:rounded-br-[3rem]">
        <p className=" font-extrabold  animate-slidedown">UniConnect</p>
        </div>

        <div className=" w-[30rem] h-[35rem] flex flex-col bg-white justify-center items-center sm:pr-8">
          <form
            className="flex flex-col gap-4 text-F w-[20rem]"
            onSubmit={handlebtn}
          >
        <img src={uniconnect} className="w-20  self-end" alt="uniconnect"></img>

            <div className="font-bold text-xl">Login</div>
            <div
              id="err-div"
              className="h-fit bg-red-200 text-red-600 font-bold"
            ></div>

            <div>Enter USN</div>
            <input
              type="text"
              className="border-b-2 border-b-black h-10 focus:border-yellow-500 focus:outline-none"
              style={{ outline: "none" }}
              placeholder="Enter USN"
              value={usn}
              onChange={handleusn}
            ></input>

            <div>Enter password</div>
            <input
              type="password"
              className="border-b-2 border-b-black h-10 focus:border-yellow-500 focus:outline-none"
              style={{ outline: "none" }}
              placeholder="Enter Password"
              value={password}
              onChange={handlepass}
            ></input>

            <div>
              New user?
              <Link to="/register" className="text-xs">
                Register
              </Link>
            </div>

            <button
              type="submit"
              className="bg-red-600 h-12 text-xl rounded-md text-white w-full hover:text-black ease-in-out  hover:bg-yellow-300 border"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
