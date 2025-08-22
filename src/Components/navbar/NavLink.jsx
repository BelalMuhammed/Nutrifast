import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function NavLink({ to, children, isHashLink = false, onClick }) {
  const location = useLocation();

  const isActive = isHashLink
    ? location.pathname === to.split("#")[0] &&
      location.hash === `#${to.split("#")[1]}`
    : location.pathname === to && !location.hash;

  const LinkComponent = isHashLink ? HashLink : Link;

  return (
    <LinkComponent
      to={to}
      smooth={isHashLink ? "true" : undefined}
      className={`text-sm hover:opacity-80 transition pb-1 relative text-white`}
      onClick={onClick}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-app-primary"></span>
      )}
    </LinkComponent>
  );
}

export default NavLink;
