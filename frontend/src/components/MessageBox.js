import React from "react";

export default function MessageBox(props) { /*props is used here to access the child */
    return (
        <div className = {`alert alert-${props.variant || 'info'}`}>
           {props.children}
        </div>
    )
}