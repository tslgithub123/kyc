import {
  AppShell,
  Burger,
  Group,
  AppShellFooter,
  Transition
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconBrandMantine } from "@tabler/icons-react";
import NavbarLinksGroup from "./NavbarLinksGroup";
import ThemeButton from "../ui/ThemeButton";
import Notifications from "../notifications/Notifications";
import classes from './Navigation.module.css';
import { useState, useCallback, useMemo } from "react";

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
  const [opened, { close }] = useDisclosure();
  const [navbarVisible, setNavbarVisible] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const memoizedRoutes = useMemo(() => routes, [routes]);

  console.log('navbarVisible', navbarVisible);

  const handleLinkClick = useCallback(() => {
    if (opened) {
      close();
    }
    if (isSmallScreen) {
      setNavbarVisible(false);
    }
  }, [opened, close, isSmallScreen]);

  const toggleNavbar = useCallback(() => {
    setNavbarVisible((prev) => !prev);
  }, []);

  const links = useMemo(() => navdata.map((item) => (
    <NavbarLinksGroup {...item} key={item.label} onLinkClick={handleLinkClick} />
  )), [navdata, handleLinkClick]);

  return (
    <AppShell
    
      layout="default"
      header={{ height: { base: 60, md: 70, lg: 60 } }}
      navbar={{
        width: { base: 250, md: 300, lg: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      
    >
      <AppShell.Header >
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={navbarVisible}
              onClick={toggleNavbar}
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

      <Transition
        mounted={navbarVisible}
        transition="slide-right"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <AppShell.Navbar  p="md" style={styles}>
            {links}
            <AppShellFooter className={classes.footer}>
              <div className={classes.footerContent}>
                <p>© {new Date().getFullYear()}</p>
                <p>Techknowgreen Solutions Ltd.</p>

              </div>
            </AppShellFooter>
          </AppShell.Navbar>
        )}
      </Transition>

      <AppShell.Main
        style={{
          display: 'block',
          transition: 'all 300ms ease',
          paddingLeft: navbarVisible ? undefined : '16px',
          paddingRight: navbarVisible ? undefined : '16px',
        }}
        pt={navbarVisible ? undefined : '76px'}
      >
        {memoizedRoutes}
      </AppShell.Main>
    </AppShell>
  );
}
