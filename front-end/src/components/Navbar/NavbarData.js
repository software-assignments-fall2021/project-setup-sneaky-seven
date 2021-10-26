import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

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
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Statistics",
    path: "/statistics",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "FAQs",
    path: "/FAQs",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
  {
    title: "Log Out",
    path: "/",
    icon: <FaIcons.FaDoorOpen />,
    cName: "nav-text",
  },
];
