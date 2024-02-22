import React, {useRef} from 'react';

import { useForm } from "react-hook-form";

export default function Password() {
    const {
        register,
        formState: { errors },
      } = useForm();

    const pwd = useRef();
    const con_pwd = useRef();
    const checkBox = useRef();
    const handleOnChange = ()=>{
        pwd.current.type = checkBox.current.checked ? "text" : "password";
        con_pwd.current.type = checkBox.current.checked ? "text" : "password";
    }

  return (
    <>
        <div>
            <label htmlFor="password"><i className="zmdi zmdi-lock-outline"></i>Password</label>
        </div>
        <div>
            <input type="password" name="password" id="password" placeholder="Minimum 8 characters" ref={pwd} />
            {/* {...register("password", { pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/ })} */}
        </div>
        {/* {errors.password && <MessageBox msgTitle="Error" msgText={errors.password.message}/>} */}
        <div>
            <label htmlFor="password"><i className="zmdi zmdi-lock"></i>Confirm Password</label>
        </div>
        <div>
            <input type="password" name="con_password" id="con_password" placeholder="Minimum 8 characters" ref={con_pwd} />
            {/* {...register("con_password", { pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/ })} */}
        </div>
        {/* {errors.password && <MessageBox msgTitle="Error" msgText={errors.password.message}/>} */}
        <div>
            <input type="checkbox" name="show_password" id="show_password" onChange={handleOnChange} ref={checkBox}/>
            <label htmlFor="show_password" id="label_show_password">Show Password</label>
        </div>
    </>
  )
}
