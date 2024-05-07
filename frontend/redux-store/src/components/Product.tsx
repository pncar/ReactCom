import {ProductType} from "../ts/types.tsx";
import {Link} from "react-router-dom";
import {addItemToCart,removeItemFromCart} from "../reducers/userSlice.js";
import {useSelector, useDispatch} from "react-redux";
import {btn,btnDelete} from "../assets/defaultStyles.ts";
import {totalPrice,countItem} from "../utils/commonFunctions.ts";
import RateStars from "../components/RateStars.tsx";

const Product = (props: {product: ProductType}) => {
    const {product} = props;
    const dispatch = useDispatch();
    const {set,cart} = useSelector((state:any) => state.user);


    const handleAddItemToCart = () => {
        dispatch(addItemToCart({item: {id: product.id, q: 1, data: product}}));
    }

    const handleRemoveItemFromCart = ()=> {
        dispatch(removeItemFromCart({item: product}));
    }

    return(
        <div className="p-1 lg:p-2">
            <div className="rounded-md p-4 transition-all duration-1000 shadow-md hover:shadow-xl border border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800">
                <Link to={`/product/${product.id}`}><p className="dark:text-primary-300">{product.title}</p></Link>
                <img src={`https://via.placeholder.com/300x300.png?text=${product.title}`} className="w-full m-auto py-3"/>
                {product.price != totalPrice(product) ? 
                <p className="text-green-600 text-lg"><span className="font-bold">${totalPrice(product)}</span> <span className="text-sm text-primary-600 dark:text-primary-400 line-through">${product.price}</span> <span className="text-sm text-primary-600 dark:text-primary-400">({product.discount}% off)</span></p>: 
                <p className="text-primary-600 dark:text-primary-300 text-lg"><span className="font-bold">${totalPrice(product)}</span></p>
                }
                <RateStars stars={product.rate}/>
                <div className="flex items-center">
                    <div className="py-2 pr-2">
                    {set ? <button onClick={()=>{handleAddItemToCart()}} className={btn}><i className="bi bi-cart"/> Add {countItem(product,cart) > 0 ? <>({countItem(product,cart)})</> : <></>}</button> : <></>}
                    </div>
                    <div className="py-2 pr-2">
                    {countItem(product,cart) > 0 ? <button className={btnDelete} onClick={()=>{handleRemoveItemFromCart()}}>Remove</button> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;