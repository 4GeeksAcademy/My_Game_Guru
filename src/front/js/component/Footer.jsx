import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const footerLinks = [
    { text: "sobre my game guru", to: "/" },
    { text: "contacto", to: "/contact" },
    { text: "términos de servicio", to: "/terms" },
    { text: "política de privacidad", to: "/privacy" },
];

const socialIcons = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/413134815398e27b49a5c56d4ee6ac5e9875cf494ca296800df3a7525aa3b65a?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Social Icon 1",
        className: "socialIcon1",
        to: "/",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd38d6a6a810668737bfc813e42271d21899bf8e78d97fe0205527fd6248e8ab?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Social Icon 2",
        className: "socialIcon2",
        to: "/contact",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c26034d4ce54b44a432a4300171bd31b6e661617630c12b08009e06ad5f802b3?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Social Icon 3",
        className: "socialIcon3",
        to: "/terms",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1908e5f3cd55de4182df88b982b46ed951ce97b95df0750be84326e86d4c4bf9?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Social Icon 4",
        className: "socialIcon4",
        to: "/privacy",
    },
];

export function Footer() {
    return (
        <footer className="footer">
            <nav className="footerLinks">
                {footerLinks.map((link, index) => (
                    <Link key={index} to={link.to} className="footerLink">
                        {link.text}
                        <br />
                    </Link>
                ))}
            </nav>
            <div className="socialIcons">
                {socialIcons.map((icon, index) => (
                    <Link key={index} to={icon.to}>
                        <img
                            loading="lazy"
                            src={icon.src}
                            alt={icon.alt}
                            className={icon.className}
                        />
                    </Link>
                ))}
            </div>
        </footer>
    );
}
