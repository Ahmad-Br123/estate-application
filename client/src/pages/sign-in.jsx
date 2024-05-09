import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess ,signInFailure } from '../redux/User/userSlice';
import OAuth from '../components/OAuth';


const SignIn = () => {

        const [formData , setFormData] = useState({});
        const {loading , error} = useSelector((state)=>state.user);
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const handleChange = (e)=>{
            setFormData({
                ...formData,
                [e.target.id] : e.target.value,
            });
        }

        const handleSubmit = async (e)=>{
            e.preventDefault();
            try {
                
                // setLoading(true);
                dispatch(signInStart());
                const res =await fetch('/api/auth/signin',{
                    method:"POST",
                    headers:{
                        'content-Type':'application/json'
    
                    },
                    body:JSON.stringify(formData),
    
                });
                const data = await res.json();
                if(data.success === false){
                    dispatch(signInFailure(data.message));
                    return;
                }
                dispatch(signInSuccess(data));
                
                navigate('/')
                
                console.log(data);
            } catch (error) {
                dispatch(signInFailure(error.message));
            }
        }
        
    return (
        <div>
            <h1 className="text-2xl font-extrabold text-center my-8 text-slate-800 animate-bounce">SIGN IN </h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                
                <dev className="mx-auto mt-2 flex flex-col mb-2">
                <lebal className="text-lg font-serif  ">Email:</lebal>
              <input type="email" onSubmit={handleSubmit} placeholder="enter your name" id="email" className=" mx-auto rounded-full focus:outline-none border-b-2 shadow-lg shadow-slate-900 p-3  h-10 w-52 sm:w-72  "onChange={handleChange} required/>
            </dev>  
                <dev className="mx-auto mt-2 flex flex-col">
                <lebal className="text-lg font-serif  ">password:</lebal>
              <input type="password"  placeholder="enter your name" id="password" className=" mx-auto rounded-full focus:outline-none border-b-2 shadow-lg shadow-slate-900 p-3  h-10 w-52 sm:w-72  "onChange={handleChange} required/>
            </dev>  
            <button disabled={loading} className="uppercase bg-slate-900 mt-4 items-center text-white mx-auto rounded-full outline-none p-3   w-52 sm:w-72 hover:bg-blue-950 duration-200 disabled:bg-slate-400 ">{loading === false ? 'sign in' :'loading ...'}</button>
            <OAuth /> 
            </form>
            <dev className="flex sm:flex-col gap-2 mt-3">
                <p className="text-sm text-slate-900 font-bold mx-auto">do not have an account?
                    <Link className="mx-auto" to={'/sign-up'}><span className="text-sm font-semibold text-red-600"
                > sign up</span></Link></p>

               
            </dev>
              <p className='text-red-600 text-lg font-extrabold sm:mx-80 animate-bounce duration-75 mt-10 mx-10 '>{error ? 'not found' : ''}</p> 
       </div>
    );
}

export default SignIn;
