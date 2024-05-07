import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogIn = (props:{onHandleSetUser: Function}) => {
    const {onHandleSetUser} = props;
    const { set, name} = useSelector((state:any) => state.user);
    const navigate = useNavigate();

    const handleAttemptLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        const mail = e.target.mail.value;
        axios.get(`${import.meta.env.VITE_API_URL}/users?mail=${mail}`).
        then((response)=>{
            console.log(response.data);
            if(response.data[0]){
                onHandleSetUser(response.data[0].id);
                console.log(`Logged in successfully as ${response.data[0].name}`)
            }else{
                console.error("Couldn't log in");
            }
        });
    }

    useEffect(()=>{
        if(set){
            setTimeout(()=>{
                navigate("/");
            },500);
        }
    },[set]);

    return(
        <div className="container w-full m-auto min-h-[60vh]">
            <div className="text-center m-auto p-16 dark:text-primary-300 w-full lg:w-2/3 bg-white dark:bg-primary-800 border border-primary-300 dark:border-primary-700 shadow-lg">
                {!set ? 
                <>
                <p className="text-lg font-semibold">Log In</p>
                <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{handleAttemptLogin(e)}} className="w-full lg:w-2/3 m-auto">
                    <input name="mail" type="text" className="p-2 px-4 rounded-md shadow-inner bg-primary-200 dark:bg-primary-900 my-2 block w-full"/>
                    <input name="password" type="password" className="p-2 px-4 rounded-md shadow-inner bg-primary-200 dark:bg-primary-900 my-2 block w-full"/>
                    <input type="submit" value="Submit" className="cursor-pointer my-2 p-2 px-4 bg-primary-300 dark:bg-primary-700 w-full rounded-md shadow-sm"/>
                </form>
                </>:
                <>
                Already Logged In as <span className="font-semibold">{name}</span>
                <p>Redirecting...</p>
                </>
                }
            </div>
        </div>
    )
}
export default LogIn;