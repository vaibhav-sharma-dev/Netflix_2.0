import React from "react";
import "./SignIn.css"
import { auth } from "../firebase";

export default function SignIn() {

    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);

    const register = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) => {
            console.log(authUser);
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    const signIn = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) => {
            console.log(authUser);
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    return (
        <div className="sign_in">
            <form>
                <h1>Sign In</h1>

                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />

                <button
                    type="submit"
                    onClick={signIn}
                >
                    Sign In
                </button>

                <h4>
                    <span className="sign_up_message">New to Netflix? </span>

                    <span 
                        className="sign_up_message_link"
                        onClick={register}
                    >
                        Sign Up now.
                    </span>
                </h4>
            </form>
        </div>
    )
}