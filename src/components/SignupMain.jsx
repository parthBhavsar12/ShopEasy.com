import React, {useRef} from 'react';
import LeftLogo from './LeftLogo';
import Password from './Password';
import UserType from './UserType';
import GoTo from './GoTo';
// import MessageBox from './MessageBox';

import { useForm } from "react-hook-form";

export default function Signup1() {
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => console.log(data);

  // const main = useRef();
  // const msgBox = useRef();

  // const showMessageBox = ()=>{
  //     main.current.style.opacity = '0.6';
  //     main.current.style.filter = 'blur(1px)';
  //     main.current.style.pointerEvents = 'none';

  //     msgBox.current.style.opacity = 'unset';
  //     msgBox.current.style.filter = 'unset';
  //     msgBox.current.style.pointerEvents = 'unset';
  // }

  return (
    <>
        <div className="main">
        {/* ref={main} */}

            <LeftLogo/>

            <div className="container">

                <div className="title"><strong>Sign up</strong></div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <input
                    {...register("firstName", { required: true })}
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName?.type === "required" && (
                    <p role="alert">First name is required</p>
                  )}

                  <input
                    {...register("mail", { required: "Email Address is required" })}
                    aria-invalid={errors.mail ? "true" : "false"}
                  />
                  {errors.mail && <p role="alert">{errors.mail.message}</p>}

                  <input type="submit" />
                </form> */}
                    
                    <UserType/>
                    {/* {...register("firstName", { required: true, maxLength: 20 })}  */}
                    <div><label htmlFor="email"><i className="zmdi zmdi-email"></i>Email</label></div>
                    {/* <div><input type="email" placeholder="abc@xyz.pqr" {...register("email", { required: true, message: 'Email id is required for registration'})}/></div> */}
                    <div><input placeholder="abc@xyz.pqr" type='email'
                    {...register("mail", { required: "Email Address is required" })}
                    aria-invalid={errors.mail ? "true" : "false"}
                  /></div>
                  {errors.mail && <MessageBox msgTitle="Error" msgText={errors.mail.message}/>}

                  {/* ref={msgBox} */}
                  {/* {errors.mail && showMessageBox()} */}

                    <Password/>

                    <div className="btn"><button type="submit"><i className="zmdi zmdi-fast-forward"></i>Next</button></div>

                </form>
                
                <GoTo title="Have an account? " goto="Sign in" slug="../signin"/>
            </div>

        </div>
    </>
  )
}
