import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export default function Contact({ listing }) {
    const [landLord ,setLandLord] = useState(null);
    const [message ,setMessage] = useState('');
    const handleChange = (e)=>{
        setMessage(e.target.value);
    }
    useEffect(() => {
    const fetchLandLord =async()=>{
        
        try {
            const res =await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setLandLord(data);
            
        } catch (error) {
            console.log(error);
        }

    }
    fetchLandLord()
    }, [listing.userRef])


  return (
    <>
        {
            landLord && 
            <div className="flex flex-col gap-4">
                <p>contact : <span className="font-semibold text-rose-500">{landLord.username}</span> <span className="font-bold">for the estate :</span> <span className="font-semibold text-green-700">{listing.name.toLowerCase() }</span></p>
                <textarea name="message" id="message" value={message} onChange={handleChange} rows='2' placeholder="enter your message here..." className="w-full border rounded-lg p-3">

                </textarea>
                <Link to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`} className="w-full rounded-full p-3 text-white bg-rose-500 text-center uppercase hover:shadow-md hover:shadow-rose-900 ease-linear">
                send
                </Link>
            </div>

        }
    </>
  )
}

