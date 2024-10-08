import { Icon3dRotate, IconFileText, IconGauge, IconPencilCheck, IconPlus, IconSeeding, IconView360 } from "@tabler/icons-react";

import Navigation from "../../../navigation/Navigation";
import { EnvRoutes } from "../../../../routes/Routes";
import EnvServices from "../services/EnvServices";
import EnvMenu from "./EnvMenu";

const envNavData = [
  { label: "Dashboard", icon: IconGauge, iconColor: 'var(--mantine-color-blue-7)', links: '/env' },
  { label: "Environment Clearance", iconColor: 'var(--mantine-color-green-7)', icon: IconSeeding, links: [
    { label: "Add", icon: IconPlus, iconColor: 'var(--mantine-color-blue-7', link: "ec/add" },
    { label: "View", icon: IconView360, iconColor: 'var(--mantine-color-yellow-7', link: "ec/view" },
  ] },
  {
    label: "Consent",
    icon: IconFileText,
    iconColor: 'var(--mantine-color-grape-7)',
    links: [
      { label: "Add", icon: Icon3dRotate, link: "consent/create" },
      { label: "View", icon: IconPlus, link: "consent/view" },
    ],
  },
  {
    label: "Daily Data",
    icon: IconPencilCheck,
    iconColor: 'var(--mantine-color-orange-7)',
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