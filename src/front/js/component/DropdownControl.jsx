import React, { useEffect } from "react";

const DropdownControl = () => {
    useEffect(() => {
        const dropdownToggle = document.querySelector("#yourDropdownToggleId");
        if (dropdownToggle) {
            const handleClick = (e) => {
                e.stopPropagation();
            };

            dropdownToggle.addEventListener("click", handleClick);

            // Cleanup the event listener on component unmount
            return () => {
                dropdownToggle.removeEventListener("click", handleClick);
            };
        }
    }, []);

    return <div>{/* Contenido del dropdown si es necesario */}</div>;
};

export default DropdownControl;
