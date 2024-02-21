import React, {useRef} from 'react';

export default function UserType() {

  const span1  = useRef();
  const span2 = useRef();
  const rdo1 = useRef();
  const rdo2 = useRef();
  const handleOnChange1 = ()=>{
    if (rdo1.current.checked){
      span1.current.style.border = '1px solid var(--dark-red)';
      span1.current.style.borderRadius = '5px';
      span1.current.style.backgroundColor = 'var(--red)';
      // span1.current.style.padding = '0 1px';

      // rdo1.current.style.display = 'none';
      // rdo2.current.style.display = 'unset';
      
      span2.current.style.backgroundColor = 'unset';
      span2.current.style.border = 'none';
    }
  }
  const handleOnChange2 = ()=>{
    if (rdo2.current.checked){
      span2.current.style.border = '1px solid var(--dark-red)';
      span2.current.style.borderRadius = '5px';
      span2.current.style.backgroundColor = 'var(--red)';
      // span2.current.style.padding = '0 1px';

      // rdo2.current.style.display = 'none';
      // rdo1.current.style.display = 'unset';

      span1.current.style.backgroundColor = 'unset';
      span1.current.style.border = 'none';
    }
  }

  return (
    <div>
        <label><i class="zmdi zmdi-account"></i>You are a</label>
        <span class="rdo" ref={span1}>
            <input type="radio" name="user_type" id="shopkeeper" value="shopkeeper" onChange={handleOnChange1} ref={rdo1}/>
            <label for="shopkeeper">Shopkeeper</label>
        </span>

        <span class="rdo" ref={span2}>
            <input type="radio" name="user_type" id="customer" value="customer" onChange={handleOnChange2} ref={rdo2}/>
            <label for="customer">Customer</label>
        </span>
    </div>
  )
}