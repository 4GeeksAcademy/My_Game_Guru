import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginForm.css";

export const LoginForm = () => {
    const navigate = useNavigate();

    const handleSignupClick = (e) => {
        e.preventDefault();
        navigate("/signup");
    };

    return (
        <form className="form">
            <span className="input-span">
                <label htmlFor="email" className="label">
                    Email
                </label>
                <input type="email" name="email" id="email" />
            </span>
            <span className="input-span">
                <label htmlFor="password" className="label">
                    Password
                </label>
                <input type="password" name="password" id="password" />
            </span>
            <span className="span">
                <a href="#">Forgot password?</a>
            </span>
            <input className="submit" type="submit" value="Log in" />
            <span className="span">
                Don't have an account?{" "}
                <a href="#" onClick={handleSignupClick}>
                    Sign up
                </a>
            </span>
        </form>
    );
};