
import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {ProductType,UserType} from "../ts/types.tsx";
import {btn} from "../assets/defaultStyles.ts";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../reducers/userSlice.js";
import {totalPrice} from "../utils/commonFunctions.ts";
import RateStars from "../components/RateStars.tsx";

const ProductPage = () => {
    const params = useParams();
    const [product,setProduct] = useState<ProductType>();
    const [user,setUser] = useState<UserType>();
    const dispatch = useDispatch();
    const [expandText,setExpandText] = useState<boolean>(true);

    useEffect(()=>{
        if(params){
            axios.get(`${import.meta.env.VITE_API_URL}/products/${params.id}`).
            then((response)=>{
                setProduct(response.data);
            })
        }
    },[]);

    useEffect(()=>{
        if(product){
            axios.get(`${import.meta.env.VITE_API_URL}/users/${product.id_user}`).
            then((response)=>{
                setUser(response.data);
            })
        }
    },[product])
    
    const handleAddItemToCart = () => {
        if(product){dispatch(addItemToCart({item: {id: product.id, q: 1, data: product}}))};
    }

    return(
        <div className="w-full container m-auto min-h-screen">
            {product ? 
            <div className="bg-white dark:bg-primary-800 dark:bg-gradient-to-b dark:from-primary-900 dark:to-primary-800 w-full lg:w-2/3 m-auto flex flex-wrap lg:flex-nowrap border border-primary-300 dark:border-primary-700 shadow-lg rounded-md">
                <div className="w-full p-8">
                    <img src={`https://via.placeholder.com/300x300.png?text=${product.title}`} className="w-full m-auto py-3"/>
                    <p className={`text-primary-700 dark:text-primary-400 text-sm leading-loose text-justify ${expandText ? "line-clamp-4" : "line-clamp-none"}`}>{product.description}</p>
                    <p onClick={()=>{setExpandText(!expandText)}} className="cursor-pointer text-sky-400 font-semibold text-sm py-4">Expand</p>
                </div>
                <div className="w-full p-8">
                    <h2 className="py-3 font-bold text-4xl dark:text-primary-300">{product.title}</h2>
                    <RateStars stars={product.rate}/>
                    <p className="py-4 text-green-600 text-3xl font-bold">${totalPrice(product)}</p>
                    <div>
                        {product.specifications.map((spec,key)=><div key={key} className="p-2 text-sm dark:text-primary-400 border-t-none first:border-t border-x border-b border-primary-300 dark:border-primary-700"><i className="bi bi-check mr-2"/>{spec}</div>)}
                    </div>
                    <div className="py-3">
                        <button className={btn} onClick={()=>{handleAddItemToCart()}}>Add to Cart</button>
                    </div>
                    {user ?
                    <div className="flex items-center">
                        <div>
                            <img src={user.avatar} className="w-16 h-16 rounded-lg shadow-inner"/>
                        </div>
                        <div className="flex-grow px-4">
                            <p className="text-sm dark:text-stone-400">Published By</p>
                            <Link to={`/user/${user.id}`}><h3 className="font-bold text-sky-500">{user.name}</h3></Link>
                        </div>
                    </div> 
                    :<></>}
                </div>
            </div>:
            <div className="dark:text-primary-300">Product not found</div>
            }
        </div>
    )
}
export default ProductPage;