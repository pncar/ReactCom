import {useState,useEffect} from "react";
import axios from "axios";
import {ProductType,UserType} from "../ts/types.tsx";
import {useParams} from "react-router-dom";
import Product from "../components/Product.tsx";

const UserProfile = () => {
    const [user,setUser] = useState<UserType>();
    const [userProducts,setUserProducts] = useState<ProductType[]>([]);
    const params = useParams();

    useEffect(()=>{
        if(params){
            axios.get(`${import.meta.env.VITE_API_URL}/users/${params.id}`).
            then((response)=>{
                setUser(response.data);
            })
        }
    },[]);

    useEffect(()=>{
        if(user){
            axios.get(`${import.meta.env.VITE_API_URL}/products?id_user=${user.id}`).
            then((response)=>{
                setUserProducts(response.data);
            })
        }
    },[user])

    return(
        <div className="container w-full m-auto dark:text-primary-300 min-h-1/2">
            {user ? 
            <div className="flex flex-wrap lg:flex-nowrap">
                <div className="flex-grow lg:w-1/4">
                    <div className="w-full p-8 bg-white dark:bg-primary-800 border border-primary-300 dark:border-primary-700 shadow-lg rounded-md">
                        <img src={user.avatar} className="w-full rounded-lg shadow-lg"/>
                        <h2 className="font-semibold py-3">{user.name}</h2>
                        <p className="text-sm">{user.city}, <span className="font-semibold">{user.country}</span></p>
                        <p className="text-xs py-2 text-primary-600 dark:text-primary-400 text-justify break-all">{user.bio}</p>
                        <div>
                            <div>
                                <div className="flex items-center py-2"><div className="w-8"><i className="bi bi-phone"/></div><div><span className="text-sm">{user.phone}</span></div></div>
                                <div className="flex items-center py-2"><div className="w-8"><i className="bi bi-envelope"/></div><div><span className="text-sm">{user.mail}</span></div></div>
                                <div className="flex items-center py-2"><div className="w-8"><i className="bi bi-geo-alt"/></div><div><span className="text-sm">{user.address}</span></div></div>
                            </div>
                            <div className="py-4">
                                <button className="bg-green-600 text-center font-semibold text-primary-50 w-full p-3 text-sm rounded-lg shadow-lg">Contact Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow px-4">
                    <p className="text-2xl p-2 py-4">{user.name} is offering:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {userProducts.map((item:ProductType,key:number)=><Product key={key} product={item}/>)}
                    </div>
                </div>
            </div>
            :<>No user</>}
        </div>
    )
}
export default UserProfile;