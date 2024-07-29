import {Link} from "react-router-dom"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import QAuth from "../components/QAuth.jsx"
function Signup() {
  const [formData,setformData]=useState({})
  const [loading,setLoading]=useState(null)
  const [error,setErr]=useState(false)
  const navigate=useNavigate()
  const handlechange=(e)=>{
    setformData({
      ...formData,
      [e.target.id]:e.target.value
    })
    console.log(formData) 
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
    setLoading(true)
    const res=await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    const data=await res.json()
    if(data.success===false){
      setLoading(false)
      setErr(data.message)
      return
    }
    setLoading(false) 
    setErr(null) 
    navigate('/sign-in')
  }
  catch(error){
    setLoading(false)
    setErr(error.message)
  }  
  }
  return ( 
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-simibold my-7">Signup</h1>
      {error && <p className="text-red-500 mt-5 p-2 mb-5 text-center">{error}</p>}
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="enter your username" className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200  placeholder:pl-5 animate-pulse" id='username' onChange={handlechange}/>
        <input type="email" placeholder="enter your email" className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse" id='email' onChange={handlechange}/>
        <input type="password" placeholder="enter your password" className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse" id='password' onChange={handlechange}/>
        <button disabled={loading} className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse">{ loading? 'Loading...':'Sign Up'}</button>
        <QAuth/>
      </form>
      <div className="p-5 flex gap-2 justify-center">
        <p className="text-slate-500">Have an account?</p>   
        <Link to="/sign-in" className="text-blue-500 hover:underline hover:text-gray-600">Signin</Link>
      </div>
      
    </div>
  ) 
}

export default Signup

