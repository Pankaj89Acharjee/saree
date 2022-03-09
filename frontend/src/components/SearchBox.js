import React, { useState } from "react";

export default function SearchBox(props) {
    /*Hooks for managing names that enters users in the search box*/
    const [name, setName] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`); /*Redirecting user to the search page and not the search result here*/
    };
    return(
        <form className="search" onSubmit={submitHandler}>
            <div className="row">
                <input type = "text"
                name = "q"
                id = "q"
                onChange={(e) => setName(e.target.value)}></input>

                <button className="primary" type="submit">
                    <i className="fa fa-search"></i>
                </button>
                
            </div>
        </form>
        
    )
}