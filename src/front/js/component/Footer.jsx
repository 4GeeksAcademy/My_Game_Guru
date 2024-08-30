import React from "react";
import "../../styles/footer.css";
import logo from "../../img/openai.png";

const footerLinks = [
    { text: "sobre my game guru", href: "/aboutus" },
    { text: "contacto", href: "/Contact" },
    { text: "términos de servicio", href: "/termsAndServices" },
    { text: "política de privacidad", href: "/privacyPolicy" },
];

const socialIcons = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/413134815398e27b49a5c56d4ee6ac5e9875cf494ca296800df3a7525aa3b65a?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Social Icon 1",
        className: "socialIcon1",
        href: "/",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd38d6a6a810668737bfc813e42271d21899bf8e78d97fe0205527fd6248e8ab?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Facebook",
        className: "socialIcon2",
        href: "https://www.facebook.com/profile.php?id=61564968817590",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c26034d4ce54b44a432a4300171bd31b6e661617630c12b08009e06ad5f802b3?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "Instagram",
        className: "socialIcon3",
        href: "https://www.instagram.com/",
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1908e5f3cd55de4182df88b982b46ed951ce97b95df0750be84326e86d4c4bf9?placeholderIfAbsent=true&apiKey=001bde4c6b2a499891ace6677fe08678",
        alt: "X",
        className: "socialIcon4",
        href: "https://x.com/My_Game_Guru",
    },
];

export function Footer() {
    return (
        <>
            <div className="divider"></div>
            <footer className="footer">
                <nav className="footerLinks">
                    {footerLinks.map((link, index) => (
                        <a key={index} href={link.href} className="footerLink">
                            {link.text}
                        </a>
                    ))}
                </nav>
                <div className="logoContainer">
                    <a
                        href="https://store.steampowered.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
                            alt="Steam Logo"
                            className="steamLogo"
                        />
                    </a>
                    <a
                        href="https://openai.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={logo}
                            alt="OpenAI Logo"
                            className="openAILogo"
                        />
                    </a>
                </div>
                <div className="socialIcons">
                    {socialIcons.map((icon, index) => (
                        <a
                            key={index}
                            href={icon.href}
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
        </>
    );
}
