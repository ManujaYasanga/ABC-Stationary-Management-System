import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./utility/Context/Auth.Context";

//pages
import Home from './pages/Home';
import AddStocks from './pages/AddStocks';
import ViewStocks from './pages/ViewStocks';
import ReleaseStocks from './pages/ReleaseStocks';
import AddItems from './pages/AddItems';
import EditItems from './pages/EditItems';
import RemoveItems from './pages/RemoveItems';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';


export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLogin />
    },
    {
      path: "/register",
      element: <UserRegister />
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/add-stocks",
      element: <AddStocks />,
    },
    {
      path: "/view-stocks",
      element: <ViewStocks />,
    },
    {
      path: "/release-stocks",
      element: <ReleaseStocks />,
    },
    {
      path: "/add-items",
      element: <AddItems />,
    },
    {
      path: "/edit-items",
      element: <EditItems />,
    },
    {
      path: "/remove-items",
      element: <RemoveItems />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}


