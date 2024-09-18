import { IconBuilding, IconGauge, IconUser } from "@tabler/icons-react";

import Navigation from "../../../navigation/Navigation";
import { ManRoutes } from "../../../../routes/Routes";
import ManMenu from "./ManMenu";
import ManServices from "../services/ManServices";


const manNavData = [
  { label: "Dashboard", icon: IconGauge, links: '/man' },
  {
    label: "Example",
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

export default function ManNav() {
  return (
    <Navigation 
      navdata={manNavData} 
      routes={<ManRoutes/>} 
      actions={<ManServices/>} 
      menu={<ManMenu/>}
    />
  );
}