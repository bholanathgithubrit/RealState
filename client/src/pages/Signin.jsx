import {Link} from "react-router-dom"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux"
import {signInStart,signInFailure,signInSuccess} from "../redux/user/userSlice.js"
import QAuth from "../components/QAuth.jsx"
function Signin() {
  const [formData,setformData]=useState({})
  const {loading,error}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handlechange=(e)=>{
    setformData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
    dispatch(signInStart())
    const res=await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    const data=await res.json()
    if(data.success===false){
      dispatch(signInFailure(data.message))
      return
    }
    dispatch(signInSuccess(data)) 
    navigate('/')
  }
  catch(error){
    dispatch(signInFailure(error.message))
  } 
  }
  return ( 
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-simibold my-7">Sign in</h1>
      {error && <p className="text-red-500 mt-5 p-2 mb-5 text-center">{error}</p>}
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="enter your email" className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse" id='email' onChange={handlechange}/>
        <input type="password" placeholder="enter your password" className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse" id='password' onChange={handlechange}/>
        <button disabled={loading} className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse">{ loading? 'Loading...':'Sign In'}</button>
        <QAuth/>
      </form>
      <div className="p-5 flex gap-2 justify-center">
        <p className="text-slate-500">Do not have an account?</p>   
        <Link to="/sign-up" className="text-blue-500 hover:underline hover:text-gray-600">Sign Up</Link>
      </div>
      
    </div>
  ) 
}

export default Signin 

