// src/components/navigation/Navigation.tsx
import {
  AppShell,
  Burger,
  Group,
  AppShellFooter
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandMantine } from "@tabler/icons-react";
import NavbarLinksGroup from "./NavbarLinksGroup";
import ThemeButton from "../ui/ThemeButton";
import Notifications from "../notifications/Notifications";
import classes from './Navigation.module.css';

interface NavigationProps {
  navdata: Array<any>;
  routes: React.ReactNode;
  actions?: React.ReactNode;
  menu?: React.ReactNode;
}

export default function Navigation({
  navdata,
  routes,
  actions,
  menu,
}: NavigationProps) {
  const [opened, { toggle, close }] = useDisclosure();

  const handleLinkClick = () => {
    if (opened) {
      close();
    }
  };

  const links = navdata.map((item) => (
    <NavbarLinksGroup {...item} key={item.label} onLinkClick={handleLinkClick} />
  ));

  return (
    
    <AppShell
    layout="default"
      header={{ height: { base: 60, md: 70, lg: 60 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 250 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
        
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
      
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <IconBrandMantine size={30} />
            </Group>
            
         
          <Group>
            {actions}
            <Notifications />
            <ThemeButton />
            {menu}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar  p="md">
        {links}
        <AppShellFooter className={classes.footer}>
            <div className={classes.footerContent}>
            <p>© {new Date().getFullYear()}</p>
            <p>Techknowgreen Solutions Ltd.</p>
            </div>
        </AppShellFooter>
      </AppShell.Navbar>
      <AppShell.Main >{routes}</AppShell.Main>
    </AppShell>
  );
}
