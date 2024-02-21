import React from 'react';

function MessageBox() { //props
    return (
        <div class="msgBox" id="msgBox">
            {/* <div class="msgHeading"><span class="msgTitle">{props.msgTitle}</span></div> */}
            <span class="msgTitle">Warning</span>
            {/* <div class="msgContent"><span class="msgText">{props.msgText}</span></div> */}
            <span class="msgText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore quasi totam aperiam.</span>
            <button id="ok-btn">Ok</button>
        </div>
    )
}

export default MessageBox