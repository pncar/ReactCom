import axios from "axios";
import {useState,useEffect} from "react";
import CategoryPanel from "../components/CategoryPanel.tsx";

const Index = () => {

    const [categories,setCategories] = useState([]);
    
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/productTypes`)
        .then((response)=>{
            console.log(response.data);
            setCategories(response.data);
        })
    },[]);

    return(
        <div className="w-full m-auto container py-8">
            {categories.map((item:{id:number,name:string},key)=><CategoryPanel key={key} id={item.id} title={item.name} url={`${import.meta.env.VITE_API_URL}/products?id_productType=${item.id}`}/>)}
        </div>
    )
}
export default Index;