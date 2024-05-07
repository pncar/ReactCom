import {Link} from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import {LocalSettingsType} from "../ts/types.tsx";
const Navbar = (props:{localSettings: LocalSettingsType | null, onHandleLocalSettings: Function, onHandleSetUser: Function, onHandleUnsetUser: Function}) => {    
    const {localSettings, onHandleLocalSettings, onHandleUnsetUser} = props;
    const { set, name, cartTotalItemCount, totalPrice } = useSelector((state:any) => state.user);

    const Cart = () => {
        return(
            <li className="text-sm inline-block bg-red-600 rounded-md shadow-lg w-[200px]"><Link to="/cart" className="block flex items-center p-2"><div className="w-full text-center justify-center"><i className="bi bi-cart"/> ({cartTotalItemCount})</div><div className="w-full text-center justify-center"> ${totalPrice}</div></Link></li>
        )
    }
    
    const [openNav,setOpenNav] = useState<boolean>(true);

    /*
    const Currency = () => {
        return(
            <div className="flex items-center">
                <span><i className="bi bi-coin mx-2 text-lg"/></span>
                <select defaultValue={localSettings ? localSettings.currency : "usd"} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{onHandleLocalSettings({...localSettings,currency:e.target.value})}} className="p-2 px-3 border border-primary-700 rounded-md shadow-md bg-primary-800">
                    <option value="usd">USD</option>
                    <option value="ars">ARS</option>
                    <option value="jpy">JPY</option>
                    <option value="krw">KRW</option>
                    <option value="rub">RUB</option>
                    <option value="inr">INR</option>
                    <option value="ils">ILS</option>
                </select>
            </div>
        )
    }
    */

    return(
        <div className="border-b lg:border-b-0 border-primary-600 z-30 flex relative flex-wrap items-center bg-primary-900 lg:bg-gradient-to-r from-primary-950 to-primary-800 shadow-lg w-full z-10 top-0">
            <div className="md:hidden text-primary-300 w-full">
                <div onClick={()=>{setOpenNav(!openNav)}} className="cursor-pointer m-1 bg-primary-800 shadow-md rounded-md w-12 h-12 flex items-center justify-center"><i className="bi bi-list text-xl"/></div>
            </div>
            <div className={`m-auto w-full container ${openNav ? "block" : "hidden md:block"}`}>
                <div className="text-xs text-primary-50 flex flex-wrap lg:flex-nowrap">
                    <ul className="py-1 w-full flex flex-wrap md:flex-nowrap items-center uppercase tracking-widest justify-center lg:justify-start">
                        <li className="inline-block w-full lg:w-20"><Link to="/" className="p-4 block">Index</Link></li>
                        <li className="inline-block w-full lg:w-20"><Link to="/store" className="p-4 block">Store</Link></li>
                        <li className="inline-block w-full lg:w-20"><Link to="/about" className="p-4 block">About</Link></li>
                    </ul>
                    <ul className="py-1 w-full flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-end">
                        <li className="inline-block w-full lg:w-auto">{localSettings? <span className="p-4 block cursor-pointer" onClick={()=>{onHandleLocalSettings({...localSettings,darkMode:!localSettings.darkMode})}}>{localSettings.darkMode ? <i className="bi bi-sun"/> : <i className="bi bi-moon"/>}</span>:<></>}</li>
                        <li className="inline-block w-full lg:w-auto group relative">
                            {set ? 
                            <div className="flex items-center">
                                <Link to="/user-settings" className="p-4 block">{name}</Link>
                                <i className="bi bi-door-closed cursor-pointer" onClick={()=>{onHandleUnsetUser()}}/>
                            </div>
                            :<Link to="/login" className="p-4 block">Log In</Link>}
                        </li>
                    {set && cartTotalItemCount > 0 ? <Cart/> : <></>}
                    </ul>
                </div>
            </div>
      </div>
    )
}
export default Navbar;