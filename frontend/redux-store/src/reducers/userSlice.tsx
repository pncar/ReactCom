import {createSlice} from "@reduxjs/toolkit";
import {UserType, ProductType} from "../ts/types.tsx";

// import "current" from @reduxjs/toolkit to display on console the state on reducers

const initialState = {
    set: false,
    mail: "",
    name: "",
    token: "",
    age: "",
    city: "",
    address: "",
    country: "",
    phone: "",
    cart: [],
    cartTotalItemCount: 0,
    totalPrice: 0
}

const countItems = (cart: {id: number, q: number}[]) => {
    let count = 0;
    for(let i=0;i<cart.length;i++){
        count += cart[i].q;
    }
    return count;
}

// REMEMBER TO APPLY DISCOUNTS
const totalPrice = (cart: {id: number, q:number, data:ProductType}[]) => {
    let count = 0;
    for(let i=0;i<cart.length;i++){
        let price = cart[i].data.price;
        if(cart[i].data.discount){
            price = Math.floor(cart[i].data.price * (1 - (cart[i].data.discount/100)));
        }
        count += price * cart[i].q;
    }
    return count;
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUser: (state,action) => {
            const { propertyName, propertyValue } = action.payload;
            // @ts-ignore
            state[propertyName as keyof UserType] = propertyValue;
        },
        setUser: (state,action) => {
            state.set = true,
            state.mail = action.payload.mail,
            state.name = action.payload.name,
            state.token = action.payload.token,
            state.cart = action.payload.cart,
            state.age = action.payload.age,
            state.address = action.payload.address,
            state.phone = action.payload.phone,
            state.city = action.payload.city,
            state.country = action.payload.country
        },
        unsetUser: (state) => {
            state.set = false,
            state.mail = "",
            state.name = "",
            state.token = "",
            state.age = "",
            state.address = "",
            state.phone = "",
            state.city = "",
            state.country = "",
            state.cart = [],
            state.cartTotalItemCount = 0
        },
        cleanCart: (state) => {
            state.cart = [];
            state.cartTotalItemCount = 0;
        },
        removeItemFromCart: (state,action) =>{
            let temp = state.cart.filter((x:{id: number,q: number, data: ProductType})=>{
                return x.id !== action.payload.item.id;
            })
            state.cart = temp;
            state.cartTotalItemCount = countItems(state.cart);
            state.totalPrice = totalPrice(state.cart);
        },
        addItemToCart: (state: any,action) => {
            if(state.set){
                let itemExists = false;
                state.cart.map((x:{id: number,q: number, data: ProductType})=>{
                    if(x.id === action.payload.item.id){
                        itemExists = true;
                    }
                });
                if(itemExists){
                    state.cart = state.cart.map((x:{id: number,q: number, data: ProductType})=>{
                        if(x.id === action.payload.item.id){
                            return {...x,q:x.q+1}
                        }
                        return x;
                    });
                }else{
                    state.cart = [...state.cart,action.payload.item];
                }
                state.cartTotalItemCount = countItems(state.cart);
                state.totalPrice = totalPrice(state.cart);
            }else{
                console.error("User is not set");
            }
        },
        modifyItemCountFromCart: (state:any,action) => {
            let temp = state.cart.map((x:{id: number,q: number, data: ProductType})=>{
                if(x.id === action.payload.item.id){
                    if(action.payload.decrease){
                        if(x.q > 1){
                            return {...x,q:x.q-1};
                        }else{
                            return null;
                        }
                    }else{
                        return {...x,q:x.q+1};
                    }
                }
                return x;
            });
            temp = temp.filter((x:{id: number,q: number, data: ProductType})=>{
                if(x){
                    return x;
                }
            })
            state.cartTotalItemCount = countItems(state.cart);
            state.totalPrice = totalPrice(state.cart);
            state.cart = temp;
        }
    }
});

export const {updateUser,setUser,unsetUser,cleanCart,removeItemFromCart,addItemToCart,modifyItemCountFromCart} = userSlice.actions;

export default userSlice.reducer;