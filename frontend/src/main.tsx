import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import WelcomePage from './pages/Welcome.tsx';
import Home from './pages/Home.tsx';
import Signin from './pages/Signin.tsx';
import Signup from './pages/Signup.tsx';
import Doctor from './pages/Doctors.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/doctors/:valueParam",
    element: <Doctor />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
