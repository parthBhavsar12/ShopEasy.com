import Upside from '../components/Upside.js';
import Signup from '../components/SignupMain.js';
import SignupShopKeeper from '../components/SignupShopKeeper.js';
import SignupCustomer from '../components/SignupCustomer.js';
import Signin from '../components/Signin.js';
import ResetPassword1 from '../components/ResetPassword1.js';
import ResetPassword2 from '../components/ResetPassword2.js';
import ResetPassword3 from '../components/ResetPassword3.js';
import Nav from '../components/Nav.js';
import VerticalNav from '../components/VerticalNav.js';
import Footer from '../components/Footer.js';
import ContactUs from '../components/ContactUs.js';
import AddItems from '../components/AddItems.js';
import About from '../components/About.js';
import MakeOrder from '../components/MakeOrder.js';
import MakePayment from '../components/MakePayment.js';
import FindShops from '../components/FindShops.js';
import UpdateItems from '../components/UpdateItems.js';
import Coupons from '../components/Coupons.js';
import Account from '../components/Account.js';
import Settings from '../components/Settings.js';

import '../css/var.css';
import '../css/entry.css';
import '../css/nav.css';
import '../css/reset_password.css';
import '../css/show_password.css';
import '../css/vertical_nav.css';
import '../css/footer.css';
import '../css/contact_us.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Upside/><Signup/></>
    },
    {
      path: "/signup",
      element: <><Upside/><Signup/></>
    },
    {
      path: "/signin",
      element: <><Upside/><Signin/></>
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path: "/resetpassword",
      element: <><Upside/><ResetPassword1/></>
    },
    {
      path: "/customerhome",
      element: <><Nav iName1="edit" menuTitle1="Make Order" slug1="../makeorder" iName2="balance" menuTitle2="Make Payment" slug2="../makepayment" iName3="store" menuTitle3="Find Shops" slug3="../findshops"/></>
    },
    {
      path: "/shopkeeperhome",
      element: <><Nav iName1="plus-square" menuTitle1="Add Items" slug1="../additems" iName2="upload" menuTitle2="Update Items" slug2="../updateitems" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /></>
    },
    {
      path: "/makeorder",
      element: <><Nav iName1="edit" menuTitle1="Make Order" slug1="../makeorder" iName2="balance" menuTitle2="Make Payment" slug2="../makepayment" iName3="store" menuTitle3="Find Shops" slug3="../findshops"/><MakeOrder/></>
    },
    {
      path: "/makepayment",
      element: <><Nav iName1="edit" menuTitle1="Make Order" slug1="../makeorder" iName2="balance" menuTitle2="Make Payment" slug2="../makepayment" iName3="store" menuTitle3="Find Shops" slug3="../findshops"/><MakePayment/></>
    },
    {
      path: "/findshops",
      element: <><Nav iName1="edit" menuTitle1="Make Order" slug1="../makeorder" iName2="balance" menuTitle2="Make Payment" slug2="../makepayment" iName3="store" menuTitle3="Find Shops" slug3="../findshops"/><FindShops/></>
    },
    {
      path: "/additems",
      element: <><Nav iName1="plus-square" menuTitle1="Add Items" slug1="../additems" iName2="upload" menuTitle2="Update Items" slug2="../updateitems" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><AddItems/></>
    },
    {
      path: "/updateitems",
      element: <><Nav iName1="plus-square" menuTitle1="Add Items" slug1="../additems" iName2="upload" menuTitle2="Update Items" slug2="../updateitems" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><UpdateItems/></>
    },
    {
      path: "/coupons",
      element: <><Nav iName1="plus-square" menuTitle1="Add Items" slug1="../additems" iName2="upload" menuTitle2="Update Items" slug2="../updateitems" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><Coupons/></>
    },
    {
      path: "/menu",
      element: <><Nav iName1="plus-square" menuTitle1="Add Items" slug1="../additems" iName2="upload" menuTitle2="Update Items" slug2="../updateitems" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><VerticalNav/></>
    },
    {
      path: "/account",
      element: <><Nav iName1="plus-square" menuTitle1="Add Items" slug1="../additems" iName2="upload" menuTitle2="Update Items" slug2="../updateitems" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><Account/></>
    },
    {
      path: "/settings",
      element: <><Nav iName1="plus-square" menuTitle1="Add Items" slug1="../additems" iName2="upload" menuTitle2="Update Items" slug2="../updateitems" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><Settings/></>
    },
    {
      path: "/logout",
      element: <><Upside/><Signin/></>
    },
  ])
  return (
    <>
        {/* <VerticalNav/> */}

        {/* Menu for Customer */}

        {/* <Nav iName1="edit" menuTitle1="Make Order" iName2="balance" menuTitle2="Make Payment" iName3="store" menuTitle3="Find Shops"/> */}

        {/* Menu for Shopkeeper */}

        {/* <Nav iName1="plus-square" menuTitle1="Add Items" iName2="upload" menuTitle2="Update Items" iName3="receipt" menuTitle3="Coupons"/> */}

        {/* <Upside/> */}

        {/* <Signup/> */}

        {/* <SignupShopKeeper/> */}

        {/* <SignupCustomer/> */}

        {/* <Signin/> */}

        {/* <ResetPassword1/> */}

        {/* <ResetPassword2/> */}

        {/* <ResetPassword3/> */}

        {/* <Footer/> */}

        {/* <ContactUs/> */}

        {/* <AddItems/> */}

        {/* <Signup/> */}
      
        {/* <Signin/> */}

        {/* <ResetPassword1/> */}
        {/* <Footer/> */}
        <RouterProvider router={router} />
    </>
  );
}

export default App;