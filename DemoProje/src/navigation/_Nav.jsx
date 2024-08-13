import React from "react";
import ConstructionIcon from '@mui/icons-material/Construction';
import LogoutIcon from '@mui/icons-material/Logout';

const _nav = [
  {
    name: "Configartion",
    to: "/configuration",
    icon: <ConstructionIcon  />
  },
  {
    name: "Log Out",
    to: "/logout",
    icon: <LogoutIcon  />
  }
];

export default _nav;
