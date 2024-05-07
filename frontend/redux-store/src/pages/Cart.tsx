import { useSelector, useDispatch } from "react-redux";
import { cleanCart, removeItemFromCart, modifyItemCountFromCart} from "../reducers/userSlice.js";
import {ProductType} from "../ts/types.ts";
import {btn} from "../assets/defaultStyles.ts";
import {Link} from "react-router-dom";

const Cart = () => {

    const dispatch  = useDispatch();
    const { cart, cartTotalItemCount, totalPrice } = useSelector((state:any) => state.user);

    const handleCleanCart = () => {
        dispatch(cleanCart());
    }
    
    const handleModify = (item: {id: number, q: number, data: ProductType},decrease = false) => {
        dispatch(modifyItemCountFromCart({item:{id: item.id, q: item.q, data: item.data}, decrease: decrease}));
    }

    const handleCartFinish = () => {
        console.log(cart);
    }

    return(
        <div className="container m-auto w-auto py-8 min-h-screen">
            {cart.length > 0 ? 
            <>
            <h2 className="dark:text-primary-300 py-6">Total Items: {cartTotalItemCount}</h2>
            <div className="flex flex-wrap">
                {cart.map((item: {id: number, q: number, data: ProductType},key: number)=>
                <div key={key} className="flex w-full p-4 dark:text-primary-300 bg-white dark:bg-primary-800 border border-primary-300 dark:border-primary-700 items-center my-1">
                    <div className="w-full dark:text-primary-300"><Link to={`/product/${item.id}`}>{item.data.title}</Link></div>
                    <div className="w-24 px-3 h-full flex items-center justify-end">
                        ${item.data.price * item.q}
                    </div>
                    <div className="w-32 flex h-full items-center">
                        <div onClick={()=>{handleModify(item,true)}} className="rounded-md cursor-pointer px-2 w-10 h-10 flex items-center justify-center bg-primary-300 dark:bg-primary-700 dark:text-primary-300"><i className="bi bi-dash"/></div>
                        <div className="w-full flex items-center justify-center">{item.q}</div>
                        <div onClick={()=>{handleModify(item,false)}} className="rounded-md cursor-pointer px-2 w-10 h-10 flex items-center justify-center bg-primary-300 dark:bg-primary-700 dark:text-primary-300"><i className="bi bi-plus"/></div>
                    </div>
                    <div className="w-24 p-2 h-full flex items-center justify-end"><button onClick={()=>{dispatch(removeItemFromCart({item:item}))}} className="bg-red-500 p-2 px-3 bg-red-600 text-primary-100 rounded-md">Remove</button></div>
                </div>)}
            </div>
            <div className="py-5">
                <p className="text-3xl text-green-600">${totalPrice}</p>
            </div>
            <div className="py-4">
                <button onClick={handleCartFinish} className="bg-green-600 text-primary-100 p-2 px-3 text-sm mr-2">Finish</button>
                <button onClick={()=>{handleCleanCart()}} className={btn}>Clean Cart</button>
            </div>
            </>:
            <p className="dark:text-primary-300">No items in cart</p>
            }
        </div>
    )
}
export default Cart;
