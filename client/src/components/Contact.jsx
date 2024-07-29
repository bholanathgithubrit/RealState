/* eslint-disable react/prop-types */
import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
function Contact({listing}) {
    const [landloard,setLandLoard]=useState(null)
    const [message,setMessage]=useState(null)
    //console.log(message)
    useEffect(()=>{
        const fetchLandLord=async ()=>{
            try{
                const res=await fetch(`/api/user/${listing.userRef}`)
            const data=await res.json()
            setLandLoard(data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchLandLord()
    },[listing.userRef])
  return(
    <>
    {landloard && (
        <div className="flex flex-col gap-2">
           <p>Contact <span className="font-semibold">{landloard.username}</span> 
             For <span className="font-semibold">{listing.name.toLowerCase()}</span> 
           </p>
           <textarea placeholder="Enter your message here" name="message" id="message" rows="2" value={message} onChange={(e)=>setMessage(e.target.value)} className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse"></textarea>
           <Link to={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`} className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse w-fit">
           Send Message
           </Link>
        </div>
    )}
    </>
  )
}

export default Contact
