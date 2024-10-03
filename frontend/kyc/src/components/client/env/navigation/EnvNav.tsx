import { Icon3dRotate, IconFileText, IconGauge, IconPencilCheck, IconPlus, IconSeeding, IconView360 } from "@tabler/icons-react";

import Navigation from "../../../navigation/Navigation";
import { EnvRoutes } from "../../../../routes/Routes";
import EnvServices from "../services/EnvServices";
import EnvMenu from "./EnvMenu";

const envNavData = [
  { label: "Dashboard", icon: IconGauge, iconColor: 'blue', links: '/env' },
  { label: "Environment Clearance", iconColor: 'green', icon: IconSeeding, links: [
    { label: "Add", icon: IconPlus, iconColor: 'blue', link: "ec/add" },
    { label: "View", icon: IconView360, iconColor: 'yellow', link: "ec/view" },
  ] },
  {
    label: "Consent",
    icon: IconFileText,
    iconColor: 'grape',
    links: [
      { label: "Add", icon: Icon3dRotate, link: "consent/create" },
      { label: "View", icon: IconPlus, link: "consent/view" },
    ],
  },
  {
    label: "Daily Data",
    icon: IconPencilCheck,
    iconColor: 'orange',
    links: [
      { label: "Add", icon: IconPlus, link: "data/daily/add" },
      { label: "View", icon: IconPlus, link: "data/daily/view" },
    ],
  },
];

export default function EnvNav() {
  return (
    <Navigation 
      navdata={envNavData} 
      routes={<EnvRoutes/>} 
      actions={<EnvServices/>} 
      menu={<EnvMenu/>}
    />
  );
}