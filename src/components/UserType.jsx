import React from 'react';

export default function UserType() {
  return (
    <div>
        <label><i class="zmdi zmdi-account"></i>You are a</label>
        <span class="rdo">
            <input type="radio" name="user_type" id="shopkeeper" value="shopkeeper"/>
            <label for="shopkeeper">Shopkeeper</label>
        </span>

        <span class="rdo">
            <input type="radio" name="user_type" id="customer" value="customer" />
            <label for="customer">Customer</label>
        </span>
    </div>
  )
}