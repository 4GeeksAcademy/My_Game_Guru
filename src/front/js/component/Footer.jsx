import React from "react";
import "../../styles/Footer.css";

const footerLinks = [
    { text: "sobre my game guru", url: "https://www.example.com/about" }, // Reemplaza con la URL real
    { text: "contacto", url: "https://www.example.com/contact" }, // Reemplaza con la URL real
    { text: "términos de servicio", url: "https://www.example.com/terms" }, // Reemplaza con la URL real
    { text: "política de privacidad", url: "https://www.example.com/privacy" }, // Reemplaza con la URL real
];

const socialIcons = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/413134815398e27b49a5c56d4ee6ac5e9875cf494ca296800df3a7525aa3b65a?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Social Icon 1",
        className: "socialIcon1",
        url: "https://www.example.com/social1", // Reemplaza con la URL real
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd38d6a6a810668737bfc813e42271d21899bf8e78d97fe0205527fd6248e8ab?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Social Icon 2",
        className: "socialIcon2",
        url: "https://www.example.com/social2", // Reemplaza con la URL real
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c26034d4ce54b44a432a4300171bd31b6e661617630c12b08009e06ad5f802b3?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Social Icon 3",
        className: "socialIcon3",
        url: "https://www.example.com/social3", // Reemplaza con la URL real
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1908e5f3cd55de4182df88b982b46ed951ce97b95df0750be84326e86d4c4bf9?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Social Icon 4",
        className: "socialIcon4",
        url: "https://www.example.com/social4", // Reemplaza con la URL real
    },
];

export function Footer() {
    return (
        <footer className="footer">
            <nav className="footerLinks">
                {footerLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footerLink"
                    >
                        {link.text}
                        <br />
                    </a>
                ))}
            </nav>
            <div className="socialIcons">
                {socialIcons.map((icon, index) => (
                    <a
                        key={index}
                        href={icon.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            loading="lazy"
                            src={icon.src}
                            alt={icon.alt}
                            className={icon.className}
                        />
                    </a>
                ))}
            </div>
        </footer>
    );
}
