import React, { useState, useEffect, useContext } from "react";
import PropTypes, { elementType } from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = (props) => {
    const { store, actions } = useContext(Context);
    const {
      gameTitle,
      appid,
      img,
      urlInfo,
    } = props;

    return (
        <div className="card" style="width: 18rem;">
            <img src={img} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{gameTitle}</h5> 
            <p className="card-text">{appid}</p> 
            <Link href={urlInfo} className="btn btn-primary">Go somewhere</Link>
            </div>
        </div>
    );
  };