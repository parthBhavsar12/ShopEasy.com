import React, {useRef} from 'react';
import LeftLogo from './LeftLogo';
import UserType from './UserType';
import GoTo from './GoTo';
import MessageBox from './MessageBox';
import { useForm } from "react-hook-form";

export default function Signin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => console.log(data);

  const pwd = useRef();
  const checkBox = useRef();
  const handleOnChange = ()=>{
      pwd.current.type = checkBox.current.checked ? "text" : "password";
  }

  return (
    <>
        <div className="main">

            <LeftLogo/>
            
            <div className="container">

                <div className="title"><strong>Sign in</strong></div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <UserType/>

                    <div><label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label></div>
                    <div><input placeholder="abc@xyz.pqr" type='email'
                    {...register("mail", { required: "Email Address is required" })}
                    aria-invalid={errors.mail ? "true" : "false"}/></div>
                  {errors.mail && <MessageBox msgTitle="Error" msgText={errors.mail.message}/>}
                    {/* <div><input type="email" name="email" id="email" placeholder="abc@xyz.pqr" /></div> */}

                    <div><label htmlFor="password"><i className="zmdi zmdi-lock"></i>Password</label></div>
                    <div><input type="password" name="password" id="password" placeholder="Minimum 8 characters" ref={pwd}/></div>

                    <div>
                      <input type="checkbox" name="show_password" id="show_password" onChange={handleOnChange} ref={checkBox}/>
                      <label htmlFor="show_password" id="label_show_password">Show Password</label>
                    </div>

                    <div className="btn"><button type="submit"><i className="zmdi zmdi-sign-in"></i>Sign in</button></div>

                </form>

                
                <GoTo title="New to ShopEasy.com? " goto="Sign up" slug="../signup"/>

                <GoTo title="" goto="Forgot Password?" slug="../resetpassword"/>
            </div>

        </div>
    </>
  )
}
