import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignupForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = (data) => {
    console.log(data);
    axios.post(`http://localhost:3000/signup`, data)
      .then(response => {
        
        navigate('/login');
      })
      .catch((error) => {
        console.error(error, 'Sign up failed');
        toast('Sign up failed');
      });
  };

  return (
   
    <>
    <div className="flex flex-col items-center justify-center h-[100vh]">
    <div>
      <h1 className="text-3xl font-bold text-center">SignUp</h1>
    </div>

    <form className='mt-8 flex flex-col gap-2 px-20 w-[700px]' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input
        className="mb-2 border border-indigo-800 p-2"
        type="text"
        id="name"
        {...register('name', { required: true, maxLength: 15 })}
      />
      {errors.name && <ErrorMessage type={errors.name.type} field={'name'} />}

      <label htmlFor="email">Email</label>
      <input
        className="mb-2 border border-indigo-800 p-2"
        type="email"
        id="email"
        {...register('email', { required: true })}
      />
      {errors.email && <ErrorMessage field={'email'} type={errors.email.type} />}

      <label htmlFor="password">Password</label>
      <input
        className="mb-2 border border-indigo-800 p-2"
        type="password"
        id="password"
        {...register('password', {
          required: true,
          pattern: /^.{6,}$/, // Minimum 6 characters
        })}
      />
      {errors.password && <ErrorMessage field={'password'} type={errors.password.type} />}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        className="mb-2 border border-indigo-800 p-2"
        type="password"
        id="confirmPassword"
        {...register('confirmPassword', {
          required: true,
          validate: value => value === password || "Passwords do not match"
        })}
      />
      {errors.confirmPassword && <ErrorMessage field={'confirmPassword'} type={errors.confirmPassword.type} message={errors.confirmPassword.message} />}

      <input className='mt-6 p-2 bg-indigo-800 text-white rounded-sm hover:bg-indigo-700' type="submit" />
    </form>
    </div>
    </>
  );
}
