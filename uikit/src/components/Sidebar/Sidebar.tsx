import { useState } from "react";
import "./sidebar.style.css";
import type { NavItem } from "../Header/Header";
const TeddyLogo = new URL("../../brand/LogoTeddy.svg", import.meta.url).href;
const homeIcon = new URL("../../assets/home.svg", import.meta.url).href;
const selectUserIcon = new URL("../../assets/select-user.svg", import.meta.url)
  .href;
const userIcon = new URL("../../assets/user.svg", import.meta.url).href;
const arrowIcon = new URL("../../assets/arrow.svg", import.meta.url).href;

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onExit?: () => void;
  navItems: NavItem[];
}

export default function Sidebar({
  isOpen,
  onClose,
  onExit,
  navItems,
}: SidebarProps) {
  const currentPath = window.location.pathname;
  const initialSelected = navItems.findIndex((item) =>
    currentPath.includes(item.path)
  );
  const [selected, setSelected] = useState(
    initialSelected >= 0 ? initialSelected : 0
  );
  const handleNav = (index: number) => {
    setSelected(index);
    window.location.href = navItems[index].path;
  };

  const getIconForItem = (item: NavItem) => {
    if (
      item.label.toLowerCase().includes("selected") ||
      item.path.includes("selected")
    ) {
      return selectUserIcon;
    } else {
      return userIcon;
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={TeddyLogo} alt="Teddy Logo" />
        </div>
      </div>

      <button className="sidebar_toggle_button" onClick={onClose}>
        <img src={arrowIcon} alt="Fechar" />
      </button>

      <nav className="sidebar_nav">
        {navItems.map((item, index) => (
          <a
            key={item.path}
            href={item.path}
            className={`sidebar_link ${selected === index ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNav(index);
            }}
          >
            <img
              className="sidebar_icon"
              src={getIconForItem(item)}
              alt={`${item.label} icon`}
            />
            {item.label}
          </a>
        ))}
        <a onClick={onExit} className="sidebar_link">
          Sair
        </a>
      </nav>
    </aside>
  );
}
