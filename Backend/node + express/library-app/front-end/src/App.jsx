

import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import HeaderComponent from './components/HeaderComponent'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { changeLoginStatus } from './features/login/loginSlice'
import { useDispatch } from 'react-redux';
function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function verifyLogin(){
    axios.get(`http://localhost:3000/verify`,{
      withCredentials:true
    })
    .then((response)=>{
      console.log(response);
      dispatch(changeLoginStatus({
        loggedIn:true,
        user : response.data
      }))
      
    }).catch(error=>{
      console.log(error.message)
      toast("logout success")
      dispatch(changeLoginStatus({
        loggedIn : false,
        user : null
      }))
     
    })
  }

  useEffect(()=>{
     verifyLogin()

  },[])
 
  return (
    <>
    <ToastContainer/>
    <div className='flex flex-col justify-between h-[100vh]'>
    <HeaderComponent/>
      <main className='p-12'>
        <Outlet />
      </main>
     <Footer/>
    </div>
    </>
  )
}

export default App
