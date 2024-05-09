import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { FaBath, FaBed, FaChair,FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa";
import Contact from "../components/contact";

import { useSelector } from "react-redux";

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [error ,setError] = useState(false);
    const [loading ,setLoading] =useState(false);
    const {currentUser} = useSelector((state)=>state.user);
    const [contact,setContact] =useState(false);
    const [copied, setCopied] =useState(false);
    const params = useParams();
    useEffect(() => {
       const fetchData = async()=>{
        setLoading(true);
            const listing = await fetch(`/api/listing/getListing/${params.id}`);
            const data = await listing.json();
            if(data.success === false){
                setError(true);
                setLoading(false);
                return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
            
       }
       fetchData();
    }, [params.id])
  return (
    <main>
        {loading && <p className="text-center text-2xl text-rose-500 my-6 font-semibold">Loading ...</p>}
        {error && <Link to={'/'}> <p className="text-center text-2xl text-rose-600 my-6 font-semibold">something went wrong try again</p> </Link>}

        {listing && !loading && !error && (
            <div>
                 <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px] my-2'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
                    <div className="fixed top-[13%] right-[3%] w-12 h-12 z-10 rounded-full flex justify-center items-center bg-slate-100 cursor-copy">
                        <FaShare 
                        className="text-rose-600 w-18 h-18 hover:text-slate-900"
                        onClick={()=>{
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 2000);
                        }}
                        />
                    </div>
                    {copied && <p className="fixed top-[13%] right-[5%] z-10 rounded-md bg-slate-200 p-2">link copied!</p>}
                    <div className="flex flex-col mx-auto my-7 gap-4  mx-w-4xl p-3">
                        <p className="text-2xl font-semibold">
                        {listing.name} - ${' '}
                        {listing.offer ?
                            listing.discountPrice.toLocaleString('en-us')
                        :   listing.regularPrice.toLocaleString('en-us')
                        }
                        {listing.type === 'rent' && ' /month'}
                        </p>
                        <p className="flex item-center gap-4 my-4 p-3 text-rose-500">
                        <FaMapMarkerAlt className="text-green-700 animate-bounce"/>
                        {listing.address}
                        </p>
                        <div className="flex gap-4 ">
                            <p className="bg-rose-500 rounded-lg border w-full max-w-[200px] text-white text-center hover:shadow-lg">
                                {listing.type ==='rent' ? 'for rent' : 'for sale'}
                            </p>
                            {listing.offer && 
                            <p className="bg-green-700 rounded-lg w-full max-w-[200px] text-white text-center hover:shadow-lg">
                            ${+listing.regularPrice - +listing.discountPrice} 
                        </p>
                            }
                        </div>
                            <p className="text-slate-900">
                                <span className="text-black font-semibold"> - description</span> <br/>
                                {listing.description}
                            </p>

                            <ul className="flex flex-wrap text-green-700 font-semibold item-center gap-4 sm:gap-6">
                                <li className="flex items-center whitespace-nowrap gap-1">
                                    <FaBed className="text-lg"/>
                                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds`:`${listing.bedrooms} bed`}
                                </li>
                                <li className="flex items-center whitespace-nowrap gap-1">
                                    <FaBath className="text-lg"/>
                                    {listing.bathrooms > 1 ? `${listing.bathrooms} baths`:`${listing.bathrooms} bath`}
                                </li>
                                <li className="flex items-center whitespace-nowrap gap-1">
                                    <FaParking className="text-lg"/>
                                    {listing.parking  ? 'spot parking':'no parking'}
                                </li>
                                <li className="flex items-center whitespace-nowrap gap-1">
                                    <FaChair className="text-lg"/>
                                    {listing.furnished  ? 'furnished':'not furnished'}
                                </li>
                            </ul>
                            { currentUser && listing.userRef !== currentUser._id && !contact &&
                                <button className="bg-slate-900 w-[460px] p-3 rounded-full  text-white uppercase hover:opacity-40" onClick={()=>setContact(true)}>
                                text the landlord
                            </button>}
                            {contact && <Contact listing={listing} />}
                    </div>
            
            </div>
        )}
    </main>
  )
}
 