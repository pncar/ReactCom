import Logo from "../assets/logo-white.svg";
const Footer = () => {
    return(
      <>
        <div className="bg-gradient-to-b from-primary-950 to-primary-800 p-8 min-h-40">
            <div className="text-primary-300 container w-full m-auto grid grid-cols-2 lg:grid-cols-4">
              <div className="px-4">
                <img src={Logo} className="w-32"/>
              </div>
              <div className="px-4">
              <p className="font-semibold text-lg py-2">Store</p>
                <ul className="text-sm">
                  <li className="py-2">Warranty</li>
                  <li className="py-2">About Us</li>
                  <li className="py-2">Terms & Conditions</li>
                  <li className="py-2">Social Media</li>
                </ul>
              </div>
              <div className="px-4">
                <p className="font-semibold text-lg py-2">Help</p>
                <ul className="text-sm">
                  <li className="py-2">Official Stores</li>
                  <li className="py-2">User Guides</li>
                  <li className="py-2">Newest Providers</li>
                  <li className="py-2">Software</li>
                  <li className="py-2">Contact</li>
                  <li className="py-2">Technical Service</li>
                </ul>
              </div>
              <div className="px-4">
                <p><i className="bi bi-facebook mr-2"/> /ourstore</p>
                <p><i className="bi bi-twitter mr-2"/> @ourstore</p>
              </div>
            </div>
        </div>
        <div className="bg-primary-950 py-3 w-full flex items-center justify-center">
          <p className="text-primary-300 text-xs">Something something</p>
        </div>
      </>
    )
}
export default Footer;