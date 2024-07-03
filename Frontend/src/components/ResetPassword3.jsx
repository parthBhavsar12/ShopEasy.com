import React, { useRef, useState } from 'react';
import LeftLogo from './LeftLogo';
import GoTo from './GoTo';
import MessageBox from './MessageBox';

export default function ResetPassword3() {
    const [formData, setFormData] = useState({
        password: '',
        conPassword: ''
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const { password, conPassword } = formData;

        if (password !== conPassword && password.length < 8) {
            setError('Passwords do not match, Password must be at least 8 characters long.');
            return;
        }

        if (password !== conPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        console.log('Form submitted successfully', formData);
    };

    const pwd = useRef();
    const conPwd = useRef();
    const checkBox = useRef();
    const span1 = useRef();
    const span2 = useRef();
    const rdo1 = useRef();
    const rdo2 = useRef();

    const handleOnChange = () => {
        pwd.current.type = checkBox.current.checked ? "text" : "password";
        conPwd.current.type = checkBox.current.checked ? "text" : "password";
    };

    return (
        <>
            <div className="main">

                <LeftLogo />

                <div className="container">

                    <div className="title"><strong>Reset Password</strong></div>

                    <form onSubmit={handleSubmit} method='post'>
                        <div className="divUser">
                            <label className='userResetPassword'>User: abc@xyz.pqr</label>
                        </div>

                        <div>
                            <label htmlFor="password"><i className="zmdi zmdi-lock-outline"></i>Password</label>
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Minimum 8 characters"
                                ref={pwd}
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="conPassword"><i className="zmdi zmdi-lock"></i>Confirm Password</label>
                        </div>
                        <div>
                            <input
                                type="password"
                                name="conPassword"
                                id="conPassword"
                                placeholder="Minimum 8 characters"
                                ref={conPwd}
                                value={formData.conPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="checkbox"
                                name="show_password"
                                id="show_password"
                                onChange={handleOnChange}
                                ref={checkBox}
                            />
                            <label htmlFor="show_password" id="label_show_password">Show Password</label>
                        </div>

                        <div className="btn"><button type="submit"><i className="zmdi zmdi-redo"></i>Reset Password</button></div>

                    </form>
                    <GoTo title="Go to " goto="Sign in" slug="../signin" />
                </div>

            </div>
            {error && <MessageBox msgTitle="Error" msgText={error} />}
        </>
    )
}
