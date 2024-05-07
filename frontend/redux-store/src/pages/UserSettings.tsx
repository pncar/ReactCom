import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import {useDispatch} from "react-redux";
import {updateUser} from "../reducers/userSlice.tsx";

const UserSettings = () => {
    const { set, name, mail, age, phone, address, city, country} = useSelector((state:any) => state.user);

    const UserData = (props: {title: string, propKey: string, value: string}) => {
        const {title,propKey,value} = props;
        const [editMode,setEditMode] = useState(false);
        const valueRef = useRef<HTMLInputElement>(null);
        const dispatch = useDispatch();

        const handleInput = (e:HTMLFormElement) => {
            e.preventDefault();
            if(editMode){
                //@ts-ignore
                dispatch(updateUser({propertyName: propKey, propertyValue: valueRef.current.value}));
                setEditMode(false);
            }else{
                setEditMode(true);
            }
        }

        return(
            <div className="dark:text-primary-300 flex flex-nowrap w-full border-b last:border-b-0 border-primary-300 dark:border-primary-900">
                <div className="w-full flex py-2 px-2 flex-wrap w-full">
                    <div className="w-full text-primary-500 text-sm px-3 py-1">{title}</div>
                    {!editMode ? 
                    <div className="w-full font-medium p-1 px-3 border border-transparent">{value}</div> : 
                    <input onBlur={(e:any)=>{handleInput(e)}} ref={valueRef} type="text" defaultValue={value} className="w-full p-1 px-3 border border-primary-300 dark:border-primary-800 shadow-inner bg-primary-200 dark:bg-primary-900"/>}
                </div>
                <form onSubmit={(e:any)=>{handleInput(e)}} className="w-10 flex items-center justify-center cursor-pointer transition-all">
                    {!editMode ? 
                    <button className="w-full h-full"><i className={`block bi bi-pen text-xs transition-all scale-100 hover:scale-110`}/></button>:
                    <button className="w-full h-full"><i className={`block bi bi-check text-xs transition-all scale-100 hover:scale-110`}/></button>
                    }
                </form>
            </div>
        )
    }

    return(
    <div className="w-full container m-auto lg:py-8 min-h-screen">
        {set ? 
        <div className="">
            <div className="py-8 bg-white dark:bg-primary-800 lg:w-1/3 m-auto lg:border border-primary-300 dark:border-primary-900 p-4 px-7 lg:shadow-lg">
                <p className="font-bold py-3 dark:text-primary-300">User Settings</p>
                <UserData title={"Name"} propKey={"name"} value={name}/>
                <UserData title={"Mail"} propKey={"mail"} value={mail}/>
                <UserData title={"Age"} propKey={"age"} value={age}/>
                <UserData title={"Address"} propKey={"address"} value={address}/>
                <UserData title={"Phone"} propKey={"phone"} value={phone}/>
                <UserData title={"Country"} propKey={"country"} value={country}/>
                <UserData title={"City"} propKey={"city"} value={city}/>
            </div>
        </div>
        : "User is not set"}
    </div>
    )
}
export default UserSettings;