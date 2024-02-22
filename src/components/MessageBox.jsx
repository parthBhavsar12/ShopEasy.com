import React, {useRef} from 'react';

function MessageBox(props) { 

    const msgBox = useRef();

    const closeMsgBox = ()=>{
        msgBox.current.style.display = 'none';
    }

    return (
        <div className="msgBox" id="msgBox" ref={msgBox} >
            <span className="msgTitle">{props.msgTitle}</span>
            <span className="msgText">{props.msgText}</span>
            <button id="closeMsgBox" onClick={closeMsgBox}>Ok</button>
        </div>
    )
}

export default MessageBox;