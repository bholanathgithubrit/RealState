import {FaSearch} from 'react-icons/fa'
import {Link,useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import{useState,useEffect} from "react"
function Header() {
    const {currentUser}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const [searchTerm,setsearchTerm]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(window.location.search)
        urlParams.set('searchTerm',searchTerm)
        const searchQuery=urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search)
        const searchTermFormUrl=urlParams.get('searchTerm')
        if(searchTermFormUrl){
            setsearchTerm(searchTermFormUrl)
        }
    },[location.search])
   // console.log(currentUser)
  return (
    // Thjis is for Header Section
    <header className="bg-slate-200 shadow-md">
        {/* This is for Header element */}
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            {/* This is for Logog Element */}
            <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-700">State</span>
        </h1>
        </Link>
        {/* This is for Search boX */}
        <form onSubmit={handleSubmit} className="bg-slate-100  p-3  rounded-lg flex items-center  sm:w-64 w-fit hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200  placeholder:pl-5 animate-pulse gap-4" >
            <input type="text" placeholder="Search Your Home Here ..." className="bg-transparent focus:outline-none "
            onChange={(e)=>setsearchTerm(e.target.value)}
            value={searchTerm}
            />
            <FaSearch className="text-slate-600"/>
        </form>
        {/*     This is for Home about signup signin */}
        <ul className="flex gap-4" >
            <Link to="/"><li className="hidden sm:inline text-slate-700 hover:underline" >Home</li></Link>
            <Link to="/About"><li className="hidden sm:inline text-slate-700 hover:underline">About</li></Link>
            <Link to="/contact"><li className="hidden sm:inline text-slate-700 hover:underline">Contact</li></Link>
            <Link to="/profile">{currentUser?(
                    <img src={currentUser.avatar} alt="profile" className="h-7 rounded-full w-7 object-cover"/>
            ): <li className="hidden sm:inline text-slate-700 hover:underline">Sign in</li>}</Link>
            
        </ul>
        </div>
    </header>
  )
}

export default Header
