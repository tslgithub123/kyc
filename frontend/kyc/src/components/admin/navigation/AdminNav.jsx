import { IconBuilding, IconGauge, IconUser } from "@tabler/icons-react";
import Navigation from "../../navigation/Navigation";
import  {AdminRoutes, EnvRoutes} from "../../../routes/Routes";
import ActionsGrid from "../services/ActionsGrid";
import AdminMenu from "./AdminMenu";

export default function AdminNav() {
    const adminNavData = [
        { label: "Dashboard", icon: IconGauge, links: '/admin' },
        {
          label: "Users",
          icon: IconUser,
          initiallyOpened: true,
          links: [
            { label: "Create", link: "user/create" },
            { label: "Manage", link: "user/manage" },
          ],
        },
        {
          label: "Companies",
          icon: IconBuilding,
          links: [
            { label: "Create", link: "company/create" },
            { label: "Manage", link: "company/manage" },
          ],
        }
      ];

    return (
        <>
          <Navigation navdata={adminNavData} routes={<AdminRoutes/>} actions={<ActionsGrid/>} menu={<AdminMenu/>}/>    
        </>
    );
}