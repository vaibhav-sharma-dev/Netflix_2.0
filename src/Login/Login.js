import React from "react";
import "./Login.css"
import SignIn from "./SignIn";

export default function Login() {

    /* flip state on "sign-in" / "get started" */
    const [signIn, setSignIn] = React.useState(false)

    return (
        <div className="login">
            <div className="login_background">
                <img 
                    className="login_logo"
                    src="/Images/netflix-logo.png"
                    alt="netflix logo" 
                />

                <button 
                    className="login_sign_in_button"
                    onClick={() => setSignIn(true)}    
                >
                    Sign In
                </button>

                <div className="login_gradient" />
            </div>

            <div className="login_body">
                {
                    signIn
                    ? <SignIn />
                    : (
                        <>
                            <h1>Unlimited films, TV programmes and more.</h1>

                            <h2>Watch anywhere. Cancel at anytime.</h2>

                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                            <div className="login_input">
                                <form>
                                    <input 
                                        type="email"
                                        placeholder="Email address"
                                    />
                                    
                                    <button 
                                        className="login_input_get_started"
                                        onClick={() => setSignIn(true)}    
                                    >
                                        GET STARTED
                                    </button>
                                </form>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}