import React, { useState, useRef } from "react";
import "../../styles/ProfileCard.css";

export const ProfileCard = ({ onLogout }) => {
    const [profileImage, setProfileImage] = useState(
        "https://via.placeholder.com/120"
    );
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onLogout) onLogout();
    };

    return (
        <div className="container">
            <div className="card">
                <main>
                    <a href="#" onClick={handleImageClick}>
                        <img src={profileImage} alt="Profile" />
                    </a>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                    <span>✓</span>
                </main>
            </div>
            <div className="info">
                <h2>nombnre de usuario</h2>
                <p>correo electronic</p>
                <a href="#" className="logout-btn" onClick={handleLogout}>
                    cerrar sesion
                </a>
            </div>
        </div>
    );
};
