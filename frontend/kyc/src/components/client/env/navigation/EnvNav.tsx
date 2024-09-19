import { IconBuilding, IconGauge, IconUser } from "@tabler/icons-react";

import Navigation from "../../../navigation/Navigation";
import { EnvRoutes } from "../../../../routes/Routes";
import EnvServices from "../services/EnvServices";
import EnvMenu from "./EnvMenu";


const adminNavData = [
  { label: "Dashboard", icon: IconGauge, links: '/env' },
  {
    label: "Consent",
    icon: IconUser,
    initiallyOpened: true,
    links: [
      { label: "Create", link: "consent/create" },
      { label: "View", link: "consent/view" },
    ],
  },
  {
    label: "Daily Data",
    icon: IconBuilding,
    links: [
      { label: "Add", link: "/data/daily/add" },
      { label: "View", link: "/data/daily/view" },
    ],
  }
];

export default function EnvNav() {
  return (
    <Navigation 
      navdata={adminNavData} 
      routes={<EnvRoutes/>} 
      actions={<EnvServices/>} 
      menu={<EnvMenu/>}
    />
  );
}