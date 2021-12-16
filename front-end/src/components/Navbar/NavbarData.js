import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
// TODO: update icons
export const NavbarData = [
  {
    title: "Home",
    path: "/homepage",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Accounts",
    path: "/accounts",
    icon: <AiIcons.AiFillBank />,
    cName: "nav-text",
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <AiIcons.AiOutlineTransaction />,
    cName: "nav-text",
  },
  {
    title: "Statistics",
    path: "/statistics",
    icon: <IoIcons.IoIosStats />,
    cName: "nav-text",
  },
  {
    title: "Categories",
    path: "/categories",
    icon: <BiIcons.BiCategory />,
    cName: "nav-text",
  },
  {
    title: "FAQs",
    path: "/FAQs",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Log Out",
    path: "/",
    icon: <FaIcons.FaDoorOpen />,
    cName: "nav-text",
  },
];
