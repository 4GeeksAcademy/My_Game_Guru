import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Aboutus = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    return (
        <div className="jumbotron">
            <h1 className="display-4">
                This will show the demo element:
            </h1>
            <img src={rigoImageUrl} />
            <hr className="my-4" />

            <Link to="/">
                <span className="btn btn-primary btn-lg" href="#" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};