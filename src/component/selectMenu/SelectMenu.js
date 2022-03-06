import React from "react";
import './SelectMenu.css';
import { useNavigate } from "react-router-dom";

export const SelectMenu = ( { HEADER_MENU_MAIL }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="mail-bar-menu-container">
                {HEADER_MENU_MAIL.map(item => 
                <div className={item.class} key={item.class} onClick={item.cbFn ? () => item.cbFn(item) : () => navigate(-1)}>
                    <img src={item.image} alt="" />
                    {console.log(item.class, item.cbFn)}
                </div>
                )}
                
            </div>
        </>
    )
}