import { useState } from "react";

import "./header.style.css";
import Sidebar from "../Sidebar/Sidebar";
const TeddyLogo = new URL("../../brand/LogoTeddy.svg", import.meta.url).href;
const Stripes = new URL("../../assets/stripes.svg", import.meta.url).href;

export interface NavItem {
  path: string;
  label: string;
}

export interface HeaderProps {
  userName: string;
  navItems: NavItem[];
  onExit: () => void;
}

export default function Header({ userName, navItems, onExit }: HeaderProps) {
  const currentPath = window.location.pathname;
  const initialSelected = navItems.findIndex((item) =>
    currentPath.includes(item.path)
  );
  const [selected, setSelected] = useState(
    initialSelected >= 0 ? initialSelected : 0
  );

  const [showFloat, setShowFloat] = useState<boolean>(false);

  const handleNav = (index: number) => {
    setSelected(index);
    window.location.href = navItems[index].path;
  };

  return (
    <div className="header_wrapper">
      <Sidebar
        isOpen={showFloat}
        navItems={navItems}
        onClose={() => setShowFloat(false)}
      />

      <button
        onClick={() => setShowFloat((prev) => !prev)}
        className="button-sidebar"
      >
        <img src={Stripes} alt="stripes icon" />
      </button>
      <section className="header_container">
        <button
          onClick={() => setShowFloat((prev) => !prev)}
          className="button-sidebar-mobile"
        >
          <img src={Stripes} alt="stripes icon" />
        </button>
        <img src={TeddyLogo} />
        <div className="header_section">
          {navItems.map((item, index) => (
            <a
              key={item.path}
              href={item.path}
              className={`header_section_title ${
                selected === index ? "header_section_active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNav(index);
              }}
            >
              {item.label}
            </a>
          ))}
          <a onClick={onExit} className="header_section_title">
            Sair
          </a>
        </div>
        <div className="header_user_info">
          Olá,&nbsp;
          <strong className="header_user_name">{userName}!</strong>
        </div>
      </section>
    </div>
  );
}
