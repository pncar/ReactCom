import {useState, useEffect, useRef} from "react";
import {ProductType} from "../ts/types.ts";
import {useParams, useLocation} from "react-router-dom";
import axios from "axios";
import Product from "../components/Product.tsx";

const Store = () => {
    const [products,setProducts] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");

    const [sortType,setSortType] = useState<string>("id");

    const params = useParams();
    const location = useLocation();

    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        let url = `${import.meta.env.VITE_API_URL}/products`;
        if(params.id){
            url = `${import.meta.env.VITE_API_URL}/products?id_category=${params.id}`
        }
        axios.get(`${url}`).
        then((response)=>{
            setProducts(response.data);
        })
    },[params]);

    useEffect(()=>{
        if(location.state){
            setSearchTerm(location.state.searchTerm);
        }
    },[location]);

    const containsSearchTerm = (item: ProductType) => {
        if(!searchTerm || searchTerm.length < 1){
            return true;
        }else{
            if(item.title.toLowerCase().includes(searchTerm.toLowerCase())){
                return true;
            }else{
                return false;
            }
        }
    }

    const sortArray = (array:any) => {
        switch(sortType){
            case "highest_price":
                return array.sort((a:ProductType,b:ProductType)=>{return b.price - a.price});
            break;
            case "lowest_price":
                return array.sort((a:ProductType,b:ProductType)=>{return a.price - b.price});
            break;
            case "oldest":
                return array.sort((a:ProductType,b:ProductType)=>{return Date.parse(b.published.date) -  Date.parse(a.published.date)});
            break;
            case "newest":
                return array.sort((a:ProductType,b:ProductType)=>{return Date.parse(a.published.date) -  Date.parse(b.published.date)});
            break;
            case "highest_rate":
                return array.sort((a:ProductType,b:ProductType)=>{return b.rate -  a.rate});
            break;
            case "lowest_rate":
                return array.sort((a:ProductType,b:ProductType)=>{return a.rate -  b.rate});
            break;
            default:
                return array.sort((a:ProductType,b:ProductType)=>{return a.id - b.id});
            break;
        }
    }

    return(
        <div className="container w-full m-auto min-h-screen">
            <div className="flex flex-wrap">
                <div className="m-2 p-4 rounded-md shadow-lg bg-white dark:bg-primary-800 border border-primary-300 dark:border-primary-700 flex flex-grow py-2 px-2 items-center">
                    <div className="w-full px-4">
                        <input ref={searchRef} onChange={(e)=>{setSearchTerm(e.target.value)}} className="bg-primary-200 dark:bg-primary-900 dark:text-primary-300 outline-0 p-2 px-3 dark:bg-primary-800 border border-primary-300 dark:border-primary-600 w-full rounded-md"/>
                    </div>
                    <div className="w-full px-4 flex items-center">
                        <p className="dark:text-primary-300 w-auto text-sm mr-2 font-semibold">Sort:</p>
                        <select onChange={(e)=>{setSortType(e.target.value)}} className="w-full bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:bg-primary-800 my-2 w-full p-2 border border-primary-300 dark:border-primary-700 rounded-md">
                            <option value="id">Best</option>
                            <option value="lowest_price">Lowest Price</option>
                            <option value="highest_price">Highest Price</option>
                            <option value="oldest">Oldest</option>
                            <option value="newest">Newest</option>
                            <option value="highest_rate">Highest Rate</option>
                            <option value="lowest_rate">Lowest Rate</option>
                        </select>
                    </div>
                </div>
                <div className="flex-grow">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {
                        products.filter((item)=>{return containsSearchTerm(item)}).length > 0 ? 
                        sortArray(products).filter((item:ProductType)=>{return containsSearchTerm(item)}).slice(0,24).map((product: ProductType,key:number)=><Product key={key} product={product}/>):
                        <div className="p-4">
                            <p className="dark:text-primary-300">No product adjusts to your search term.</p>
                            <button onClick={()=>{setSearchTerm(""); if(searchRef && searchRef.current){searchRef.current.value = ""}}} className="dark:text-primary-300 font-semibold">Clear All</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Store;