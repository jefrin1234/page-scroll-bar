import {
  createBrowserRouter,
} from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { AuthAdmin } from "./protectedRoutes/AuthAdmin";
import Notifications from "../components/Notifications";
import NotificationDetails from "../components/NotificationDetails";
import Customers from "../components/Customers";

export const router = createBrowserRouter([
  {
    path: "/",
   element: (
      <AuthAdmin>
        <AdminLayout />
      </AuthAdmin>
    ),
    children:[
      {
        path:'',
        element:<Home/>,
        children:[
          {
            path:'notifications',
            element:<Notifications/>
          },
          {
            path:'/notifications/notification-details/:id',
            element:<NotificationDetails/>
          },
          {
            path:'customers',
            element:<Customers/>
          }
        ]
      },
      
      
    ]
  },
  { 
      path:'/login',
      element:<Login/>
       
  }
]);