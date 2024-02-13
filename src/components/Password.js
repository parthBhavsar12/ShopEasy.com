import React from 'react';
import '../css/var.css';
import '../css/entry.css';

export default function Password() {
  return (
    <>
        <div>
            <label for="password"><i class="zmdi zmdi-lock-outline"></i>Password</label>
        </div>
        <div>
            <input type="password" name="password" id="password" placeholder="Minimum 8 characters" />
        </div>
        <div>
            <label for="password"><i class="zmdi zmdi-lock"></i>Confirm Password</label>
        </div>
        <div>
            <input type="password" name="con_password" id="con_password" placeholder="Minimum 8 characters" />
        </div>
        <div>
            <input type="checkbox" name="show_password" id="show_password" />
            <label htmlFor="show_password" id="label_show_password">Show Password</label>
        </div>
    </>
  )
}
