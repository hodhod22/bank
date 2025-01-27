import React, { useState } from "react";
import Language from "./Language";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser, FaHome, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const { t } = useTranslation();

  const languageHandle = () => {
    setShow(true);
  };
  return (
    <nav className="bg-green-500 text-white py-4 px-8 flex justify-between items-center">
      <div className="text-xl text-[#d65076] font-extrabold">
        {t("Navbar.title")}
      </div>
      <div className="flex space-x-6">
        <Link to="/dashboard" className="flex items-center">
          <FaHome className="mr-2" />
        </Link>
        {role === "admin" && (
          <Link to="/admin/users" className="flex items-center">
            <FaUsers className="mr-2" /> Manage Users
          </Link>
        )}
        <Link to="/profile" className="flex items-center">
          <FaUser className="mr-2" />
        </Link>

        {show ? (
          <Language  />
        ) : (
          <Link onClick={languageHandle} className="flex items-center">
            <GrLanguage className="mr-2" />
          </Link>
        )}

        <Link to="/" className="flex items-center">
          <FaSignOutAlt className="mr-2" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
