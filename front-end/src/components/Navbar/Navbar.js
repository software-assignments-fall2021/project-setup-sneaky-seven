import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import { Link } from 'react-router-dom';
import '../css/Navbar.css'
import { IconContext } from 'react-icons';

// TODO(jennifer): update icons
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

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={() => setSidebar(true)} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={() => setSidebar(false)}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {NavbarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;