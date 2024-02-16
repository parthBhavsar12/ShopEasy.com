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

import '../css/var.css';
import '../css/entry.css';
import '../css/nav.css';
import '../css/reset_password.css';
import '../css/show_password.css';
import '../css/vertical_nav.css';
import '../css/footer.css';
import '../css/contact_us.css';

function App() {
  return (
    <>
      {/* <VerticalNav/> */}

      {/* Menu for Customer */}

      <Nav iName1="edit" menuTitle1="Make Order" iName2="balance" menuTitle2="Make Payment" iName3="store" menuTitle3="Find Shops"/>

      {/* Menu for Shopkeeper */}

      {/* <Nav iName1="plus-square" menuTitle1="Add Items" iName2="upload" menuTitle2="Update Items" iName3="receipt" menuTitle3="Coupons"/> */}
      {/* <Upside/>
      <Signup/> */}
      {/* <SignupShopKeeper/>
      <SignupCustomer/>
      <Signin/>
      <ResetPassword1/>
      <ResetPassword2/>
      <ResetPassword3/> */}
      {/* <Footer/> */}
      <ContactUs/>
    </>
  );
}

export default App;