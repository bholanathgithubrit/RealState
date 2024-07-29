import { useEffect, useState } from "react"
import {getDownloadURL, getStorage,ref,uploadBytesResumable} from "firebase/storage"
import {app} from "../../firebase"
import {useSelector} from "react-redux"
import { useNavigate,useParams } from "react-router-dom"
function UpdateListing() {
  const {currentUser}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const [files,setFile]=useState([])
  const [formData,setformData]=useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:2,
    bathrooms:2,
    regulerPrice:50,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false
  })
  const [loading,setLoading]=useState(false)
  const [imageUploadError,setImageUploaderror]=useState(false)
  const [imageUploadProgress,setImageUploadProgress]=useState(null)
  const [formSubmitError,setformSubmitError]=useState(false)
  const [formSubmitLoading,setFormSubmitLoading]=useState(false)
  const params=useParams()
  useEffect(()=>{
    const fetchListing=async ()=>{
        const listingId=params.listingId
        //console.log(listingId)
        const res=await fetch(`/api/listing/get/${listingId}`)
        const data=await res.json()
        if(data.success===false){
            console.log(data.message)
            return
        }
        setformData(data)
    }
    fetchListing()
  },[])
  const handleImageSubmit=()=>{
    if(files.length>0 && files.length+formData.imageUrls.length<7){
      setLoading(true)
      setImageUploaderror(false)
      const promises=[]
      for(let i=0;i<files.length;i++){
        if(!files[i].type.startsWith('image/','/pdf')){
          setImageUploaderror("Only image files are allowed")
          setLoading(false)
          return
        }
        if(files[i].size/(1024*1024)>2){
          setImageUploaderror("File size ezceeds 2 MB limit")
          setLoading(false)
          return
        }
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls)=>{
        setformData({...formData,imageUrls:formData.imageUrls.concat(urls)})
        setImageUploaderror(false)
        setLoading(false)
      }).catch((error)=>{
        setImageUploaderror(error,'Image Upload Failed (2 mb max per image')
        setLoading(false)
      })
    }
    else{
      setImageUploaderror('You can Only upload max 6 image per Listining')
      setLoading(false)
    }
  }
  const storeImage=async (file)=>{
      return new Promise((resolve,reject)=>{
        const storage=getStorage(app)
        const filename= new Date().getTime() + file.name
        const storageRef=ref(storage,filename)
        const uploadTask=uploadBytesResumable(storageRef,file)
        uploadTask.on(
          "state_changed",
          (snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100 
            setImageUploadProgress(progress)
            console.log(`Uploading is ${progress}% done`)
            //setLoading(false)
          },
          (error)=>{
              reject(error)  
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL)=>{
              resolve(getDownloadURL)
            })
          }
        )
      })
  }
  const handleRemoveImage=(index)=>{
    setformData({...formData,imageUrls: formData.imageUrls.filter((_,i)=>i!==index)})
  }
  const handleChange=(e)=>{
    if(e.target.id==="sale" || e.target.id==="rent"){
      setformData({...formData,type:e.target.id})
    }
   if(e.target.id==="parking" ||e.target.id==="furnished" ||e.target.id==="offer"){
    setformData({...formData,[e.target.id]:e.target.checked})
   } 
   if(e.target.type==="number" || e.target.type==="text"||e.target.type==="textarea"){
    setformData({...formData,[e.target.id]:e.target.value})
   } 
   if(e.target.id==="bathrooms"||e.target.id==="bedrooms"||e.target.id==="regulerPrice"||e.target.id==="discountPrice"){
    setformData({...formData,[e.target.id]:e.target.value})
   }
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
        if(+formData.regulerPrice<+formData.discountPrice)return setformSubmitError("Discount Price must be minimum than Reguler Price")
          if(formData.imageUrls.length<1)return setformSubmitError("Please Upload atleast one image")
      setFormSubmitLoading(true)
      setformSubmitError(false)

      const res=await fetch(`/api/listing/update/${params.listingId}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          ...formData,userRef:currentUser._id
        })
      })
      const data=await res.json()
      console.log(data)
      setFormSubmitLoading(false)
      navigate(`/listings/${data._id}`)

      if(data.success===false){
        setformSubmitError(data.message)
      }
      navigate(`/listings/${data._id}`)
    }
    catch(error){
      setFormSubmitLoading(false)
      setformSubmitError(error.message)
    }
  }
    return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Update a Listing
      </h1>
      <p className="text-red-500 text-1xl font-semibold text-center my-7">**** You Must have to Upload atleast One Image *****
      </p>

      <form action="" className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse"
            id="name"
            maxLength="62"
            minLength="10"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            type="textarea"
            placeholder="Description"
            className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse"
            id="description"
            required
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse"
            id="address"
            required
            value={formData.address}
            onChange={handleChange}
            
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale"  
            onChange={handleChange}
            checked={formData.type==="sale"}
            />
              <span>sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent"   
            onChange={handleChange}
            checked={formData.type==="rent"}
            />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking"   value={formData.parking}
            onChange={handleChange}/>
              <span>Parking Slot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished"   value={formData.furnished}
            onChange={handleChange}/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer"   value={formData.offer}
            onChange={handleChange}/>
              <span>offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input type="number" id="bedrooms" min="2" max="20" required className="p-3 border-gray-300 rounded-lg"  value={formData.bedrooms}
            onChange={handleChange}/>
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="bathrooms" min="2" max="10" required className="p-3 border-gray-300 rounded-lg"  value={formData.bathrooms}
            onChange={handleChange}/>
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="regulerPrice" min="50" max="1000000" required className="p-3 border-gray-300 rounded-lg"  value={formData.regulerPrice}
            onChange={handleChange}/>
                <div className="flex flex-col items-center">
                <p>Reguler Price</p>
                <span className="text-sm">($ / month)</span>
                </div>
            </div>
            {formData.offer && (<div className="flex items-center gap-2">
              <input type="number" id="discountPrice" min="0" max="1000000" required className="p-3 border-gray-300 rounded-lg"  value={formData.discountPrice}
            onChange={handleChange}/>
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>) }
            
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">Images: 
              <span className="font-normal text-gray-600 ml-2">The first Image must be the cover (max 6)</span>
            </p>
            <div className="flex gap-4">
                <input onChange={(e)=>setFile(e.target.files)} type="file" id="images" accept="images/*" multiple className="p-3 border border-gray-300 rounded w-full "/>
                <button disabled={loading} type="button" className=" border-gray-600 border text-green-400 p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse" onClick={handleImageSubmit}>{loading?  "Uploading":"upload"}          
                </button>
            </div>
            <p className="text-pink-600">{imageUploadProgress? `${imageUploadProgress}% done`:""}</p>
            <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
            {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url,index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='bg-red-400 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse'
                >
                  Delete
                </button>
              </div>
            ))}
            <button disabled={formSubmitLoading || !imageUploadProgress} className="bg-gray-600 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse">{formSubmitLoading?"Updateing":"Update Listing"}</button>
            {formSubmitError && <p className="text-red-500 text-sm">{formSubmitError}</p>}
        </div>
      </form>
    </main>
  );
}

export default UpdateListing;
