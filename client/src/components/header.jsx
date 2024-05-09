import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {
    const [searchTerm,setSearchTerm] = useState('');
    const {currentUser} = useSelector(state =>state.user);
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm',searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }
    
    

    useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
    }, [location.search]) 

    
    return (
        <header className="bg-rose-500 items-center text-white py-4 shadow-lg shadow-slate-500 ">
            <div className="container mx-auto flex items-center justify-between">
            { /* Left side: Logo and menu */ }
            <ul className='flex gap-4'>
          <Link to='/'>
            <li className='px-1 sm:inline text-white'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='px-1 sm:inline text-white '>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-200 '> Sign in</li>
            )}
          </Link>
        </ul>
            { /* Center: Logo */ }
            <div className=" items-center animate-pulse duration-1000 hidden sm:block">
               <h2 className=" w-200 items-center text-lg">BR<span className='text-slate-200'>Estate</span></h2>
            </div>
            
            { /* Right side: Search input */ }
            <form onSubmit={handleSubmit} className="flex items-center  ">
                <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Search" className="bg-transparent text-white animate-pulse focus:outline-none  rounded-full px-3 py-2 shadow-2xl w-24 sm:w-64" />
                <FaSearch className="text-slate-900 font-extrabold size-6 cursor-pointer  " />
            </form>
        </div>
        </header>
    );
}

export default Header;
