import _nav from "../navigation/_Nav";
import "../App.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSessionLoginStatus } from "../network/useSession.jsx";
import { getToken, getLoginStatus } from '../store/slices/loginSlice';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

const AppSidebar = () => {
  const loginStatus = useSessionLoginStatus();
  const { collapseSidebar, toggleSidebar, collapsed, toggled } = useProSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        collapseSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    if (location.pathname === "/logout") {
      dispatch(getToken(""));
      dispatch(getLoginStatus(0));
      navigate("/");
    }
  }, [location.pathname, loginStatus]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onToggle={() => toggleSidebar()}
      >
        <Menu>
          <MenuItem
            className="menuName"
            component={<NavLink to="/" className="link" />}
            icon={
              <MenuRoundedIcon
                onClick={() => {
                  collapseSidebar();
                }}
              />
            }
          >
            <h2>Demo Proje</h2>
          </MenuItem>
          { _nav.map((item, index) => (
            <MenuItem
              key={index}
              component={<NavLink to={item.to} className="link" />} 
              className={`${location.pathname.includes(item.to) ? "activeMenu" : ""}`}
              icon={item.icon}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
}

export default AppSidebar;
