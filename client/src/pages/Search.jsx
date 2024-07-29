import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import ListingItem from "../components/ListingItem.jsx"
function Search() {
    const navigate=useNavigate()
    const [sideBarData,setSideBarData]=useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:'false',
        offer:'false',
        sort:'created_at',
        order:'desc'
    })
    const [loading,setLoading]=useState(false)
    const [listings,setListings]=useState([])
    const [showmore,setShowmore]=useState(false)
    console.log(listings)
    useEffect(()=>{ 
        const urlParams=new URLSearchParams(location.search)
        const searchTermFromUrl=urlParams.get('searchTerm')
        const typeFromURL=urlParams.get('type')
        const parkingFromURL=urlParams.get('parking')
        const furnishedFromURL=urlParams.get('furnished')
        const offerFromURL=urlParams.get('offer')
        const sortFromURL=urlParams.get('sort')
        const orderFromURL=urlParams.get('order')
        if(searchTermFromUrl || typeFromURL || parkingFromURL||furnishedFromURL || offerFromURL ||sortFromURL|| orderFromURL){
            setSideBarData({
                searchTerm:searchTermFromUrl ||'',
                type:typeFromURL||'all',
                parking:parkingFromURL==='true'?true:false,
                furnished:furnishedFromURL==='true'?true:false,
                offer:offerFromURL==='true'?true:false,
                sort:sortFromURL||'created_at',
                order:orderFromURL||'desc'
            })
            const fetchListings=async()=>{
                setLoading(true)
                setShowmore(false)
                const searchQuery=urlParams.toString()
                const res=await fetch(`/api/listing/get?${searchQuery}`)
                const data=await res.json()
                if(data.length>3){
                    setShowmore(true)
                }
                else{
                    setShowmore(false)
                }
                setListings(data)
                setLoading(false)
            }
            fetchListings()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location.search]) 
    //console.log(sideBarData)
    const handleChange= (e)=>{
        if(e.target.id==='all' || e.target.id==='rent' || e.target.id==='sale'){
            setSideBarData({...sideBarData,type:e.target.id})
        }
        if(e.target.id==="searchTerm"){
            setSideBarData({...sideBarData,searchTerm:e.target.value})
        }
        if(e.target.id==='parking' || e.target.id==="furnished" || e.target.id==="offer"){
            setSideBarData({...sideBarData,[e.target.id]:(e.target.checked) })
        }
        if(e.target.id==='sort_order'){
            const sort=e.target.value.split('')[0]||'created_at'
            const order=e.target.value.split('')[0]||'desc'
            setSideBarData({...sideBarData,sort,order})
        }
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const urlParams=new URLSearchParams()
        urlParams.set('searchTerm',sideBarData.searchTerm)
        urlParams.set('type',sideBarData.type)
        urlParams.set('parking',sideBarData.parking)
        urlParams.set('furnished',sideBarData.furnished)
        urlParams.set('offer',sideBarData.offer)
        urlParams.set('sort',sideBarData.sort)
        urlParams.set('order',sideBarData.order)
        const searchQuery=urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
    const onShowMoreClick=async ()=>{
        const numberofListing=listings.length
        const startIndex=numberofListing
        const urlParams=new URLSearchParams(location.search)
        urlParams.set('startIndex',startIndex)
        const searchQuery=urlParams.toString()
        const res=await fetch(`/api/listing/get?${searchQuery}`)
        const data=await res.json()
        if(data.length<9){
            setShowmore(false)
        }
        setListings([...listings,...data])
    }
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 ">
                <label className="whitespace-nowrap  font-semibold">Search Term  </label>
                <input type="text" id="searchTerm" placeholder="Search..." className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse w-full" value={sideBarData.searchTerm} onChange={handleChange}/>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                <label>Type: </label>
                <div className="flex gap-2">
                    <input type="checkbox" id="all" className="w-5" onChange={handleChange} checked={sideBarData.type==='all'} />
                    <span>Rent & Sell</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="rent" className="w-5"  onChange={handleChange} checked={sideBarData.type==="rent"}/>
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={sideBarData.type==="sale"} />
                    <span>Sale</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked={sideBarData.offer===true} />
                    <span>Offer</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                <label>Amenities: </label>
                <div className="flex gap-2">
                    <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={sideBarData.parking===true} />
                    <span>Parking</span>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={sideBarData.furnished===true} />
                    <span>Furnished</span>
                </div>
            </div>
            <div className="fles items-center gap-6 justify-between">
                <label>Sort: </label>
                <select name="" id="sort_order" className="border rounded-lg p-3" onChange={handleChange} default={'created_at_desc'} >
                    <option value="regulerPrice_desc">Price high to Low</option>
                    <option value="regulerPrice_asc">Price low to high</option>
                    <option value="createdAt_desc">Latest</option>
                    <option value="createdAt-asc">Oldest</option>
                </select>
            </div>
            <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse">Search</button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-4">Listing Result: </h1>
        <div className="flex flex-wrap gap-4">
            {!loading && listings.length===0 && (
                <p className="text-font-semibold text-center text-gray-600 p-3 text-xl">No Listing Found</p>
            )}
            {loading && (
                <p className="text-xl text-slate-700 text-center w-full mt-6">Loading...</p>
            )}
             {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
            {showmore && (
                <button onClick={onShowMoreClick} className="text-green-400 hover:underline p-7 text-center w-full">Show More</button>
            )}
        </div>
      </div>
    </div>
  )
}

export default Search
