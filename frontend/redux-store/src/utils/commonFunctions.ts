import {ProductType} from "../ts/types.tsx";

const totalPrice = (product: ProductType) =>{
    if(product.discount){
        return Math.floor(product.price * (1 - (product.discount/100)));
    }else{
        return product.price;
    }
}

const convertToCurrency = (input:number,convertRate:number) => {
    return Math.round(input * convertRate);
}

const countItem = (item:ProductType,cart:{id: number, q:number, data:ProductType}[]) => {
    let r = 0;
    cart.map((x:{id: number, q: number, data:ProductType})=>{
        if(x.id === item.id){
            r = x.q;
        }
    });
    return r;
}

export {totalPrice,convertToCurrency,countItem}