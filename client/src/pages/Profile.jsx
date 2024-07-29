import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
//import {getAuth,onAuthStateChanged} from "firebase/auth"
import {
  updateUserStart,
  updateUserSuccess,
  UpdateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserStart,
  signInFailure,
  signoutUserSuccess,
  signoutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerce, setFileperse] = useState(0);
  const [fileUploadError, setFilUploaderror] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setshowListingsError] = useState(false);
  const [showListing, setShowListing] = useState([]);
  // console.log(file,filePerce)
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  //const auth=getAuth(app)
  useEffect(() => {
    if (file) {
      // if the user logged out user can not upload file
      //  onAuthStateChanged(auth,(user)=>{
      //   if(user) handlefileupload(file)
      // })
      handlefileupload(file);
      setFilUploaderror(false);
    }
  }, [file]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(UpdateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(UpdateUserFailure(error.message));
    }
  };
  const handledeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data.message));
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  const handlefileupload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileperse(Math.round(progress));
      },
      //start from here
      () => {
        setFilUploaderror(true);
      },
      // Create a reference to the file we want to download
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleListings = async () => {
    //http://localhost:5173/api/user/listings/669ed93fe7e7c3add6c2df74
    try {
      setshowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setshowListingsError(true);
        return;
      }
      setShowListing(data);
    } catch (error) {
      setshowListingsError(true);
    }
  };
  const handleListingDelete=async (listingId)=>{
    try{
      const res=await fetch(`/api/listing/delete/${listingId}`,{
        method:'DELETE'
      })
      const data=await res.json()
      if(data.success===false){
        console.log(data.message)
        return
      }
      setShowListing((prev)=>prev.filter((listing)=>listing._id!==listingId))
    }
    catch(error){
      console.log(error.message)
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-600">
              Error Image Upload(image must be less than 2mb)
            </span>
          ) : filePerce > 0 && filePerce < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerce}%`}</span>
          ) : filePerce === 100 && !fileUploadError ? (
            <span className="text-green-700">
              {" "}
              Image Uploading SucessFully{" "}
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser.username}
          placeholder="username"
          className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse"
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg hover:border-gray-400 focus:outline-none hover:scale-105 transition duration-200 placeholder:pl-5 animate-pulse"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className=" bg-green-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse"
          to={"/create-listing"}
        >
          create Listing
        </Link>
      </form>
      <div className="flex justify-between p-4">
        <button
          className=" bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse"
          onClick={handledeleteUser}
        >
          Delete Account
        </button>
        <button
          className=" bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80 hover:scale-105 transition duration-200 animate-pulse"
          onClick={handleSignOut}
        >
          Sign-Out
        </button>
      </div>
      <p className="text-red-700 mt-5 text-center">{error ? error : ""}</p>
      <p className="text-green-700 mt-5 text-center">
        {updateSuccess ? "User Update Successfully" : ""}
      </p>
      <button onClick={handleListings} className="text-green-700 w-full">
        Show Listings
      </button>
      <p>{showListingsError ? "Error Showing Listings" : ""}</p>
      {showListing && showListing.length > 0 && (
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-green-600 text-center mt-7 text-3xl font-semibold">Show Listing</h1>
          {showListing.map((listing) => (
            <div
              className="border rounded-lg p-3 flex  justify-between items-center gap-4"
              key={listing._id}
            >
              <Link to={`/listings/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listings cover"
                  className="h-16 w-16 object-contain rounded-lg"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listings/${listing._id}`}
              > 
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col">
                <Link to={`/update-listing/${listing._id}`}>
                <button className="text-green-700" >Edit</button>
                </Link>
                <button className="text-red-700" onClick={()=>handleListingDelete(listing._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
