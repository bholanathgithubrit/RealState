import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Profile from "./pages/Profile.jsx"
import Signup from "./pages/Signup.jsx"
import Signin from "./pages/Signin.jsx"
import Header from "./components/Header.jsx"
import Contact from "./pages/Contact.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import CreateListing from "./pages/CreateListing.jsx"
import UpdateListing from "./pages/UpdateListing.jsx"
import Listing from "./pages/Listing.jsx"
import Search from "./pages/Search.jsx"
function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/sign-in" element={<Signin />}/>
    <Route path="/sign-up" element={<Signup />}/>
    <Route path="/listings/:listingId" element={<Listing />}/>
    <Route path="/search" element={<Search/>}/>
    <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/create-listing" element={<CreateListing />}/>
      <Route path="/update-listing/:listingId" element={<UpdateListing />}/>
    </Route>
    <Route path="/contact" element={<Contact />}/>
    
  </Routes>
  </BrowserRouter>
}

export default App
