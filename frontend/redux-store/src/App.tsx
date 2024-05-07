import {LocalSettingsType} from "./ts/types.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setUser,unsetUser} from "./reducers/userSlice.js";
import Index from "./pages/Index.tsx";
import Home from "./pages/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import TopBar from "./components/TopBar.tsx";
import Footer from "./components/Footer.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import UserSettings from "./pages/UserSettings.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import Store from "./pages/Store.tsx";
import Cart from "./pages/Cart.tsx";
import LogIn from "./pages/LogIn.tsx";
import About from "./pages/About.tsx";

function App() {

  const [localSettings,setLocalSettings] = useState<LocalSettingsType|null>(null);

  const defaultSettings = {
    darkMode: false,
    currency: "usd",
    currencyData: null
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForm = (e:any) => {
    e.preventDefault();
    console.log(e.target.searchbar.value);
    navigate("/store",{state:{searchTerm:e.target.searchbar.value}});
  }

  const handleLocalSettings = (settings:LocalSettingsType) => {
    setLocalSettings(settings);
  }

  const handleSetUser = (id:number=1) => {
    let tempUser = null;
    axios.get(`${import.meta.env.VITE_API_URL}/users?id=${id}`).
    then(response => {
        tempUser = response.data[0];
        if(tempUser){
            dispatch(setUser({
                mail: tempUser.mail, 
                name: tempUser.name, 
                age: tempUser.age, 
                address: tempUser.address, 
                city: tempUser.city,
                country: tempUser.country,
                phone: tempUser.phone,
                cart: []
            }));
        }else{
            console.error("An error has occurred");
            console.error(response);
        }
    })
  }

  const handleUnsetUser = () => {
    dispatch(unsetUser());
  }

  useEffect(()=>{
    if(localSettings !== null){
      localStorage.setItem(`reduxStoreSettings`,JSON.stringify(localSettings));
    }
  },[localSettings]);

  useEffect(()=>{
    if(localSettings !== null){
      axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`).
      then((response)=>{
        setLocalSettings({...localSettings,currencyData:response.data});
      })
    }
  },[]);

  useEffect(()=>{
    const savedData: string | null = localStorage.getItem('reduxStoreSettings');
    if(savedData){
      setLocalSettings(JSON.parse(savedData))
    }else{
      setLocalSettings(defaultSettings);
    }
  },[]);


  return (
      <div className={`bg-white ${localSettings && localSettings.darkMode ? "dark" : ""}`}>
          <TopBar onHandleForm={(e:HTMLFormElement)=>{handleForm(e)}}/>
          <Navbar localSettings={localSettings} onHandleLocalSettings={handleLocalSettings} onHandleSetUser={handleSetUser} onHandleUnsetUser={handleUnsetUser}/>
          <div className="py-6 lg:py-16 bg-primary-200 dark:bg-primary-900">
            <Routes>
              <Route path="/" element={<Index />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/product/:id" element={<ProductPage />}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="/user-settings" element={<UserSettings />}/>
              <Route path="/user/:id" element={<UserProfile />}/>
              <Route path="/store" element={<Store />} />
              <Route path="/login" element={<LogIn onHandleSetUser={(user:number)=>{handleSetUser(user)}}/>}/>
              <Route path="/about" element={<About />} />
              <Route path="/store/category/:id" element={<Store />}/>
              <Route path="/*" element={<NotFound />}/>
            </Routes>
          </div>
          <Footer/>
      </div>
  )
}

export default App
