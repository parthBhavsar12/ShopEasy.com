import Upside from './components/Upside.jsx';
import Signup from './components/Signup.jsx';
import SignupShopKeeper from './components/SignupShopKeeper.jsx';
import SignupCustomer from './components/SignupCustomer.jsx';
import Signin from './components/Signin.jsx';
import ResetPassword1 from './components/ResetPassword1.jsx';
import Otp from './components/ResetPassword2.jsx';
import ChangePassword from './components/ResetPassword3.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ContactUs from './components/ContactUs.jsx';
import AddProducts from './components/ManageProducts.jsx';
import About from './components/About.jsx';
import MakeOrder from './components/MakeOrder.jsx';
import MakePayment from './components/MakePayment.jsx';
import FindShops from './components/Shops.jsx';
import UpdateProducts from './components/Bill.jsx';
import Coupons from './components/Coupons.jsx';
import Account from './components/Account.jsx';
import MessageBox from './components/MessageBox.jsx';
import ShopkeeperHome from './components/ShopkeeperHome.jsx';

import './css/var.css';
import './css/entry.css';
import './css/nav.css';
import './css/reset_password.css';
import './css/show_password.css';
import './css/vertical_nav.css';
import './css/footer.css';
import './css/contact_us.css';
import './css/message_box.css';
import './css/manage_products.css';
import './css/shops.css';
import './css/make_order.css';
import './css/shop_keeper_home.css';
import './css/scrollbar.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CustomerHome from './components/CustomerHome.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Upside/><Signup/></>
      // element: <><Upside/><Signup/><MessageBox/></>
    },
    {
      path: "/signup",
      element: <><Upside/><Signup/></>
      // element: <><Upside/><Signup/><MessageBox/></>
    },
    {
      path: "/signup2",
      element: <><Upside/><SignupCustomer/></>
      // element: <><Upside/><Signup/><MessageBox/></>
    },
    {
      path: "/signup3",
      element: <><Upside/><SignupShopKeeper/></>
      // element: <><Upside/><Signup/><MessageBox/></>
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
      path: "/otp",
      element: <><Upside/><Otp/></>
    },
    {
      path: "/changepassword",
      element: <><Upside/><ChangePassword/></>
    },
    {
      path: "/customerhome",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../makeorder" iName2="balance" menuTitle2="Payment" slug2="../makepayment" iName3="store" menuTitle3="Shops" slug3="../findshops"/><CustomerHome/></>
    },
    {
      path: "/shopkeeperhome",
      element: <><Nav iName1="view-list" menuTitle1="Manage Products" slug1="../products" iName2="local-grocery-store" menuTitle2="Bill" slug2="../bill" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><ShopkeeperHome/></>
    },
    {
      path: "/makeorder",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../makeorder" iName2="balance" menuTitle2="Payment" slug2="../makepayment" iName3="store" menuTitle3="Shops" slug3="../findshops"/><MakeOrder/></>
    },
    {
      path: "/makepayment",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../makeorder" iName2="balance" menuTitle2="Payment" slug2="../makepayment" iName3="store" menuTitle3="Shops" slug3="../findshops"/><MakePayment/></>
    },
    {
      path: "/findshops",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../makeorder" iName2="balance" menuTitle2="Payment" slug2="../makepayment" iName3="store" menuTitle3="Shops" slug3="../findshops"/><FindShops/></>
    },
    {
      path: "/products",
      element: <><Nav iName1="view-list" menuTitle1="Manage Products" slug1="../products" iName2="local-grocery-store" menuTitle2="Bill" slug2="../bill" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><AddProducts/></>
    },
    {
      path: "/bill",
      element: <><Nav iName1="view-list" menuTitle1="Manage Products" slug1="../products" iName2="local-grocery-store" menuTitle2="Bill" slug2="../bill" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><UpdateProducts/></>
    },
    {
      path: "/coupons",
      element: <><Nav iName1="view-list" menuTitle1="Manage Products" slug1="../products" iName2="local-grocery-store" menuTitle2="Bill" slug2="../bill" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><Coupons/></>
    },
    {
      path: "/menu",
      element: <><Nav iName1="plus-square" menuTitle1="Add Products" slug1="../addproducts" iName2="upload" menuTitle2="Update Products" slug2="../updateproducts" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /></>
    },
    {
      path: "/account",
      element: <><Nav iName1="plus-square" menuTitle1="Add Products" slug1="../addproducts" iName2="upload" menuTitle2="Update Products" slug2="../updateproducts" iName3="receipt" menuTitle3="Coupons" slug3="../coupons" /><Account/></>
    },
    {
      path: "/logout",
      element: <><Upside/><Signin/></>
    },
    {
      path: "/contact",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../makeorder" iName2="balance" menuTitle2="Payment" slug2="../makepayment" iName3="store" menuTitle3="Shops" slug3="../findshops"/><ContactUs/></>
    },
  ])
  return (
    <>
        {/* <VerticalNav/> */}

        {/* Menu for Customer */}

        {/* <Nav iName1="edit" menuTitle1="Make Order" iName2="balance" menuTitle2="Make Payment" iName3="store" menuTitle3="Find Shops"/> */}

        {/* Menu for Shopkeeper */}

        {/* <Nav iName1="plus-square" menuTitle1="Add Products" iName2="upload" menuTitle2="Update Products" iName3="receipt" menuTitle3="Coupons"/> */}

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

        {/* <AddProducts/> */}

        {/* <Signup/> */}
      
        {/* <Signin/> */}

        {/* <ResetPassword1/> */}
        {/* <Footer/> */}
        <RouterProvider router={router} />
    </>
  );
}

export default App;