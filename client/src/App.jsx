import Upside from './components/Upside.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import ResetPassword1 from './components/ResetPassword1.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Otp from './components/ResetPassword2.jsx';
import ChangePassword from './components/ResetPassword3.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ContactUs from './components/ContactUs.jsx';
import AddProducts from './components/ManageProducts.jsx';
import About from './components/About.jsx';
import MakeOrder from './components/MakeOrder.jsx';
import AddOrder from './components/AddOrder.jsx';
import MakePayment from './components/MakePayment.jsx';
import FindShops from './components/Shops.jsx';
import UpdateProducts from './components/Bill.jsx';
import Coupons from './components/Coupons.jsx';
import ShopKeeper from './components/ShopKeeper.jsx';
import Customer from './components/Customer.jsx';
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
    },
    {
      path: "/signup",
      element: <><Upside/><Signup/></>
    },
    {
      path: "/signin",
      element: <><Upside/><Signin/></>
    },
    // {
    //   path: "/signin/:msg",
    //   element: <><Upside/><Signin/></>
    // },
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
      path: "/customer-home",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../make-order" iName2="balance" menuTitle2="Payment" slug2="../make-payment" iName3="store" menuTitle3="Shops" slug3="../find-shops" iName4="account" slug4="../shopkeeper-account" /><CustomerHome/></>
    },
    {
      path: "/shopkeeper-home",
      element: <><Nav iName1="view-list" menuTitle1="Manage Products" slug1="../products" iName2="local-grocery-store" menuTitle2="Bill" slug2="../bill" iName3="receipt" menuTitle3="Coupons" slug3="../coupons"  iName4="account" slug4="../shopkeeper-account" /><ShopkeeperHome/></>
    },
    {
      path: "/make-order",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../make-order" iName2="balance" menuTitle2="Payment" slug2="../make-payment" iName3="store" menuTitle3="Shops" slug3="../find-shops" iName4="account" slug4="../shopkeeper-account" /><MakeOrder/></>
    },
    {
      path: "/add-to-order",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../make-order" iName2="balance" menuTitle2="Payment" slug2="../make-payment" iName3="store" menuTitle3="Shops" slug3="../find-shops" iName4="account" slug4="../shopkeeper-account" /><AddOrder/></>
    },
    {
      path: "/make-payment",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../make-order" iName2="balance" menuTitle2="Payment" slug2="../make-payment" iName3="store" menuTitle3="Shops" slug3="../find-shops"  iName4="account" slug4="../shopkeeper-account" /><MakePayment/></>
    },
    {
      path: "/find-shops",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../make-order" iName2="balance" menuTitle2="Payment" slug2="../make-payment" iName3="store" menuTitle3="Shops" slug3="../find-shops"  iName4="account" slug4="../shopkeeper-account" /><FindShops/></>
    },
    {
      path: "/products",
      element: <><Nav iName1="view-list" menuTitle1="Manage Products" slug1="../products" iName2="local-grocery-store" menuTitle2="Bill" slug2="../bill" iName3="receipt" menuTitle3="Coupons" slug3="../coupons"  iName4="account" slug4="../shopkeeper-account" /><AddProducts/></>
    },
    {
      path: "/bill",
      element: <><Nav iName1="view-list" menuTitle1="Manage Products" slug1="../products" iName2="local-grocery-store" menuTitle2="Bill" slug2="../bill" iName3="receipt" menuTitle3="Coupons" slug3="../coupons"  iName4="account" slug4="../shopkeeper-account" /><UpdateProducts/></>
    },
    {
      path: "/coupons",
      element: <><Nav iName1="view-list" menuTitle1="Manage Products" slug1="../products" iName2="local-grocery-store" menuTitle2="Bill" slug2="../bill" iName3="receipt" menuTitle3="Coupons" slug3="../coupons"  iName4="account" slug4="../shopkeeper-account" /><Coupons/></>
    },
    {
      path: "/shopkeeper-account",
      element: <><Nav iName1="view-list" menuTitle1="Manage Products" slug1="../products" iName2="local-grocery-store" menuTitle2="Bill" slug2="../bill" iName3="receipt" menuTitle3="Coupons" slug3="../coupons"  iName4="account" slug4="../shopkeeper-account" /><ShopKeeper/></>
    },
    {
      path: "/customer-account",
      element: <><Nav iName1="edit" menuTitle1="Order" slug1="../make-order" iName2="balance" menuTitle2="Payment" slug2="../make-payment" iName3="store" menuTitle3="Shops" slug3="../find-shops" iName4="account" menuTitle4="activeNavItem" slug4="../shopkeeper-account" /><Customer/></>
    },
    {
      path: "/logout",
      element: <><Upside/><Signin/></>
    },
    {
      path: "/contact",
      element: <><Upside/><ContactUs/></>
    },
    {
      path: "/reset-password",
      element: (
        <>
          <Upside />
          <ResetPassword1 />
        </>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <>
          <Upside />
          <ForgotPassword />
        </>
      ),
    },
    // {
    //   path: "/contact",
    //   element: <><Nav iName1="edit" menuTitle1="Order" slug1="../make-order" iName2="balance" menuTitle2="Payment" slug2="../make-payment" iName3="store" menuTitle3="Shops" slug3="../find-shops"  iName4="account" slug4="../shopkeeper-account" /><ContactUs/></>
    // },
  ])
  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}

export default App;