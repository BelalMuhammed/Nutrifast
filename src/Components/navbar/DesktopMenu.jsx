import NavLink from "./NavLink";

function DesktopMenu({ menuItems }) {
  return (
    <div className="hidden md:flex items-center space-x-10">
      {menuItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          isHashLink={item.isHashLink}
          onClick={item.onClick}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export default DesktopMenu;
