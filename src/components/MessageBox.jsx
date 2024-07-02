import React, {useRef} from 'react';

function MessageBox(props) { 

    const msgBox = useRef();

    const closeMsgBox = ()=>{
        msgBox.current.style.display = 'none';
    }

    return (
        <div className={props.colorClass} id="msgBox" ref={msgBox} >
            <span className="msgTitle">{props.msgTitle}</span>
            <span className="msgText">{props.msgText}</span>
            <button id="closeMsgBox" onClick={closeMsgBox}>Ok</button>
        </div>
    )
}
MessageBox.defaultProps = {
    colorClass: 'msgBoxRed'
};

export default MessageBox;