/* This component serves solely to provide links for parent components.
 * Does not include its own style file.
 * It is styled by its parent component as needed */

import { NavLink } from "react-router-dom";

interface IProps {
  closeToggle?: () => void;
}

const NavLinks: React.FC<IProps> = ({ closeToggle }) => {
  return (
    <ul>
      <li>
        <NavLink to="/" onClick={closeToggle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/search" onClick={closeToggle}>
          Search
        </NavLink>
      </li>
      <li>
        <NavLink to="/createcar" onClick={closeToggle}>
          Sell Car
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" onClick={closeToggle}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" onClick={closeToggle}>
          Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
