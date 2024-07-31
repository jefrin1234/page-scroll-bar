import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { changeLoginStatus } from "../features/login/loginSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/login', data, {
        withCredentials: true,
      });
  
      dispatch(changeLoginStatus({
        loggedIn: true,
        user: response.data,
      }));
  
      toast.success('Login success');
      navigate('/');
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Invalid user information';
      
    }
  }
  

  return (
<>
   <div className="flex flex-col items-center justify-center h-[100vh]">
   <div className="text-center mt-5">
    <h1 className="text-3xl font-bold ">LogIn</h1>
  </div>
    <form className='mt-8 flex flex-col gap-2 px-20 w-[700px]' onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input className="mb-2 border border-indigo-800 p-2" {...register("email", { required: true })} />
      {errors.email && <span>Email is required</span>}

      <label>Password</label>
      <input type="password" className="mb-2 border border-indigo-800 p-2" {...register("password", { required: true })} />
      {errors.password && <span>Password is required</span>}

      <input className='mt-6 p-2 bg-indigo-800 text-white rounded-sm hover:bg-indigo-700' type="submit" />
    </form>
    <Link to={'/signin'} className="mt-5">
        <button className=" text-xl text-black rounded-sm hover:bg-indigo-700 underline">
          Signin
        </button>
      </Link>
   </div>
    </>
  )
}
