import {Link} from "react-router-dom";
import LogoWhite from "../assets/logo-white.svg";

const TopBar = (props: {onHandleForm: Function}) => {
    const {onHandleForm} = props;
    return(
        <div className="hidden md:flex bg-gradient-to-r from-gray-900 to-primary-900 py-1 items-center justify-center">
        <div className="container m-auto w-full lg:w-2/3 flex items-center">
          <div className="px-4 w-auto">
            <Link to="/"><img src={LogoWhite} className="h-20 m-auto -translate-y-1"/></Link>
          </div>
          <div className="w-full">
            <form onSubmit={(e)=>{onHandleForm(e)}} className="flex m-auto px-2">
              <input id="searchbar" type="text" placeholder="Type what you are looking for..." className="dark:text-primary-300 dark:bg-primary-800 w-full p-2 px-3 focus:outline-sky-300 outline outline-1 outline-primary-600"/>
              <button className="w-16 p-2 px-3 bg-primary-800 outline outline-1 outline-primary-700 text-primary-50"><i className="bi bi-search"/></button>
            </form>
          </div>
        </div>
      </div>
    )
}
export default TopBar;