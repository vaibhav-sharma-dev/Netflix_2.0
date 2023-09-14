import React from "react";
import {useNavigate} from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

    const navigate = useNavigate()

    /* transition navbar on scroll */

    const [show, handleShow] = React.useState(false);

    const transitionNavbar = () => {
        if (window.scrollY > 100)
            handleShow(true);

        else handleShow(false);        
    };

    React.useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar);
    }, []);

    /* ------- */

    return (
        <div className={`navbar ${show && "nav_black"}`}>
            <div className="nav_content">
                <img 
                    className="nav_logo"
                    src="/Images/netflix-logo.png" alt=""
                    onClick={() => navigate("/")}
                />

                <img 
                    className="nav_avatar"
                    src="/Images/netflix-avatar-smile.gif" alt=""
                    onClick={() => navigate("/profile")}
                />
            </div>
        </div>
    )
}