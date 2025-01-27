import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "../i18n";
const Language = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [showSelect, setShowSelect] = useState(false);

  return (
    <div
      className={`text-black ${showSelect === true ? "hidden" : "visible"} `}
    >
      <select name="" id="" onClick={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="fa">فارسی</option>
      </select>
    </div>
  );
};

export default Language;
