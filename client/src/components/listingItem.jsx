import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({listing}) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
        <Link to={`/listing/${listing._id}`}>
          <div>
            <img src={listing.imageUrls[0] || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'}
            alt="lstingimage"
            className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
            
            /></div>
            {listing.offer && <p className="relative top-[0%] bg-green-700 z-10 w-12 m-1 h-6 p-1 rounded-lg text-center flex items-center text-white font-bold" >offer</p>}
            <div className="p-3 flex flex-col gap-2 w-full">
                <p className="truncate text-lg font-semibold text-green-800 ">
                    {listing.name}
                </p>
            </div>
            <div>
                <MdLocationOn className='h-4 w-4 text-green-700'/>
                <p className="text-sm text-gray-600 truncate w-full p-2">{listing.address}</p>
            </div>
            
            <p className='text-rose-500 mt-2 font-semibold p-2'>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
     
          <div className='text-rose-500 flex gap-4 p-1'>
            <div className='font-bold text-xs p-1'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs p-1'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </Link>
    </div>
  )
}
