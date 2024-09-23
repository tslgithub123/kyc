import { IconFileText, IconGauge, IconPencilCheck, IconSeeding } from "@tabler/icons-react";

import Navigation from "../../../navigation/Navigation";
import { EnvRoutes } from "../../../../routes/Routes";
import EnvServices from "../services/EnvServices";
import EnvMenu from "./EnvMenu";


const envNavData = [
  { label: "Dashboard", icon: IconGauge, links: '/env' },
  { label: "Environment Clearance", icon: IconSeeding, links: [
    { label: "Add", link: "ec/add" },
    { label: "View", link: "ec/view" },
  ], },
  {
    label: "Consent",
    icon: IconFileText,
    links: [
      { label: "Add", link: "consent/create" },
      { label: "View", link: "consent/view" },
    ],
  },
  {
    label: "Daily Data",
    icon: IconPencilCheck,
    links: [
      { label: "Add", link: "data/daily/add" },
      { label: "View", link: "data/daily/view" },
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