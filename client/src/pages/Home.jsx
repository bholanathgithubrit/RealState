import {Link} from "react-router-dom"
import {useState,useEffect} from "react"
import {Swiper,SwiperSlide} from "swiper/react"
import {Navigation} from "swiper/modules"
import SwiperCore from "swiper"
import 'swiper/css/bundle'
import ListingItem from "../components/ListingItem"
function Home() {
  const [offerListing,setofferListing]=useState([])
  const [saleListing,setsaleListing]=useState([])
  const [rentListing,setrentListing]=useState([])

  SwiperCore.use([Navigation])
  useEffect(()=>{
    const fetchofferListing=async ()=>{
      try{
        const res=await fetch(`/api/listing/get?offer=true&limit=4`)
        const data=await res.json()
        setofferListing(data)
        fetchrentListing()
      }
      catch(error){
        console.log(error)
      }
    }
    const fetchrentListing=async ()=>{
        try{
          const res=await fetch(`/api/listing/get?type=rent&limit=4`)
          const data=await res.json()
          setrentListing(data)
          fetchsaleListing()
        }
        catch(error){
          console.log(error)
        }
    }
    const fetchsaleListing=async ()=>{
      try{
        const res=await fetch(`/api/listing/get?type=sale&limit=4`)
        const data=await res.json()
        setsaleListing(data)
      }
      catch(error){
        console.log(error)
      }
    }
    
    fetchofferListing()
  },[])
  return (
    <div>
        {/* Top section */}
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">Find your next <span className="text-slate-500">Perfect</span><br />place with ease</h1>
          <div className="text-gray-400 text-xs sm:text-sm">RealSTate is the best place to find your next perfect place to live. <br />We have a wide range of properties for you to choose for</div>
          <Link to={"/search?type=all"} className="text-xs sm:text-sm text-blue-800 font-semibold hover:underline">
          Let us get started...
          </Link>
        </div>




      {/* Swipper */}
      <Swiper>
        {offerListing && offerListing.length>0 && offerListing.map((listing,index)=>(
          <SwiperSlide key={index}>
          <div
            style={{
              background: `url(https://static.wixstatic.com/media/016a5a_61df6ba5bb9e4e70b258bdda740d06db~mv2_d_2716_1810_s_2.jpg/v1/fill/w_1899,h_721,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/016a5a_61df6ba5bb9e4e70b258bdda740d06db~mv2_d_2716_1810_s_2.jpg) center no-repeat`,
              backgroundSize: 'cover',
            }}
            className='h-[500px]'
            key={listing._id}
          ></div>
        </SwiperSlide>
        ))}
      </Swiper>
      {/* listings amd more */}
      <div className="max-w-8xl mx-auto p-3 flex flex-col gap-6 my-10 ml-4">
          {offerListing && offerListing.length &&(
             <div className="">
              <div className="my-3">
                    <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
                    <Link to={`/search?offer=true`} className="text-sm text-blue-600 hover:underline">
                    Show more offer
                    </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
             </div>
             
          )}
          {saleListing && saleListing.length &&(
             <div className="">
              <div className="my-3">
                    <h2 className="text-2xl font-semibold text-slate-600">Recent sale</h2>
                    <Link to={`/search?type=sale`} className="text-sm text-blue-600 hover:underline">
                    Show more place for sale
                    </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
             </div>
          )}
          {rentListing && rentListing.length &&(
             <div className="">
              <div className="my-3">
                    <h2 className="text-2xl font-semibold text-slate-600">Recent Rent</h2>
                    <Link to={`/search?type=rent`} className="text-sm text-blue-600 hover:underline">
                    Show more place for rent
                    </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
             </div>
             
          )}
      </div>
    </div>
  )
}

export default Home
