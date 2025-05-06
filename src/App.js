import React from "react";
import { DataProvider } from "./PostContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import User from "./User/User";
import Errelement from "./Errelement/Errelement";
import AppPage from "./AppPage";
import DeptPosts from "./User/deptPosts";
import YearPosts from "./User/YearPosts";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppPage />,
      errorElement:<Errelement/>
    }, // Main layout
    {
      path: "/register", // No leading "/" needed for child routes
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/user/:usn",
      element: <User />,
    },
    {
      path:'user/dept/:usn',
      element:<DeptPosts/>
    },
    {
      path:'user/year/:usn',
      element:<YearPosts/>
    },
    {
      path:'*',
      element:<Errelement/>
    },
  ],
  { future: { v7_startTransition: true } }
);

function App() {
  return (
    <DataProvider>
  <RouterProvider router={router} />
    </DataProvider>

  )
}

export default App;
