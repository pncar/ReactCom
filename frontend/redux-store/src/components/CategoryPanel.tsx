import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Product from "../components/Product.tsx";

const CategoryPanel = (props: {id: number, title: string, url: string}) => {
    const {id, title, url} = props;

    const [products,setProducts] = useState([]);

    useEffect(()=>{
        axios.get(url).
        then(response => {
            const prods = response.data;
            setProducts(prods);
        }
        )
    },[]);

    return(
        <div className="py-4">
            <div className="px-2"><Link to={`/store/category/${id}`}><h3 className="dark:text-stone-300">{title}</h3></Link></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.slice(0,4).map((product,key)=><Product key={key} product={product}/>)}
            </div>
        </div>
    )
}
export default CategoryPanel;