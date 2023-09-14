import React from "react";
import "./ProfileScreen.css";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import PlansSection from "./PlansSection"


export default function ProfileScreen() {

    const user = useSelector(selectUser);

    return (
        <div className="profile_screen">
            <Navbar />

            <div className="profile_screen_body">
                <h1>Edit Profile</h1>

                <div className="profile_screen_body_info">
                    <img src="/Images/netflix-avatar-smile.gif" alt="netflix avatar" />

                    <div className="profile_screen_body_info_details">
                        <h2>{user.email}</h2>

                        <div className="profile_screen_body_info_details_plans">
                            <h3>Plans</h3>

                            <PlansSection />
                            
                            <button
                                onClick={() => auth.signOut()} 
                                className="profile_screen_body_info_details_plans_sign_out"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

