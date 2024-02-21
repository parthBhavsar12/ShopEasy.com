import React, {useRef} from 'react';

function MessageBox(props) { 

    const msgBox = useRef();

    const closeMsgBox = ()=>{
        msgBox.current.style.display = 'none';
    }

    return (
        <div class="msgBox" id="msgBox" ref={msgBox} >
            <span class="msgTitle">{props.msgTitle}</span>
            <span class="msgText">{props.msgText}</span>
            <button id="closeMsgBox" onClick={closeMsgBox}>Ok</button>
        </div>
    )
}

export default MessageBox;