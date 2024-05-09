import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from '../components/OAuth';


const SignUp = () => {

        const [formData , setFormData] = useState({});
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();
        const handleChange = (e)=>{
            setFormData({
                ...formData,
                [e.target.id] : e.target.value,
            });
        }

        const handleSubmit = async (e)=>{
            e.preventDefault();
            try {
                
                setLoading(true);
                const res =await fetch('/api/auth/signup',{
                    method:"POST",
                    headers:{
                        'content-Type':'application/json'
    
                    },
                    body:JSON.stringify(formData),
    
                });
                const data =await res.json();
                if(data.success === false){
                    setLoading(false);
                    setError(data.message);
                    return;
                }
                setLoading(false);
                setError(null);
                navigate('/sign-in')
                
                console.log(data);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        }
        
    return (
        <div>
            <h1 className="text-2xl font-extrabold text-center my-8 text-slate-800 animate-bounce">SIGN UP </h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <dev className="mx-auto mt-2 flex flex-col mb-2">
                <lebal className="text-lg font-serif  ">User name:</lebal>
              <input type="text"  onSubmit={handleSubmit} placeholder="enter your name" id="username" className=" mx-auto rounded-full focus:outline-none border-b-2 shadow-lg shadow-slate-900 p-3  h-10 w-44 sm:w-64 " onChange={handleChange} required/>
            </dev>  
                <dev className="mx-auto mt-2 flex flex-col mb-2">
                <lebal className="text-lg font-serif  ">Email:</lebal>
              <input type="email" onSubmit={handleSubmit} placeholder="enter your name" id="email" className=" mx-auto rounded-full focus:outline-none border-b-2 shadow-lg shadow-slate-900 p-3  h-10 w-44 sm:w-64  "onChange={handleChange} required/>
            </dev>  
                <dev className="mx-auto mt-2 flex flex-col">
                <lebal className="text-lg font-serif  ">password:</lebal>
              <input type="password"  placeholder="enter your name" id="password" className=" mx-auto rounded-full focus:outline-none border-b-2 shadow-lg shadow-slate-900 p-3  h-10 w-44 sm:w-64  "onChange={handleChange} required/>
            </dev>  
            <button disabled={loading} className="uppercase bg-slate-900 mt-4 items-center text-white mx-auto rounded-full outline-none p-3   w-44 sm:w-64 hover:bg-blue-950 duration-200 disabled:bg-slate-400 ">{loading === false ? 'sign up' :'loading ...'}</button>
            <OAuth />
            </form>
            <dev className="flex sm:flex-col gap-2 mt-3">
                <p className="text-sm text-slate-900 font-bold mx-auto">have an account?
                    <Link className="mx-auto" to={'/sign-in'}><span className="text-sm font-semibold text-red-600"
                > sign in</span></Link></p>

               
            </dev> {error && <p className='text-red-600 text-lg font-extrabold sm:mx-80 animate-bounce duration-75 mt-10 mx-10 '>{error}</p>}
       </div>
    );
}

export default SignUp;
