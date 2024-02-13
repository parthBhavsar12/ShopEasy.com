import Upside from '../components/Upside.js';
import Signup from '../components/Signup1.js';
import Signin from '../components/Signin.js';
import ResetPassword1 from '../components/ResetPassword1.js';
import ResetPassword2 from '../components/ResetPassword2.js';
import ResetPassword3 from '../components/ResetPassword3.js';
import Nav from '../components/Nav.js';

import '../css/var.css';
import '../css/entry.css';
import '../css/nav.css';
import '../css/reset_password.css';
import '../css/show_password.css';

function App() {
  return (
    <>
      <Nav/>
      <Upside/>
      <Signup/>
      <Signin/>
      <ResetPassword1/>
      <ResetPassword2/>
      <ResetPassword3/>
    </>
  );
}

export default App;