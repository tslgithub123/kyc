import {
  AppShell,
  Burger,
  Group,
  AppShellFooter,
  Transition,
  Divider,
  Paper,
  Text,
  Indicator
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconBrandMantine } from "@tabler/icons-react";
import NavbarLinksGroup from "./NavbarLinksGroup";
import ThemeButton from "../ui/ThemeButton";
import Notifications from "../notifications/Notifications";
import classes from './Navigation.module.css';
import { useState, useCallback, useMemo, useEffect } from "react";
import { useAuthStore } from "../../store/store";
import { getUserTypeColor } from "../../utils/colorUtils";
import axios from "axios";

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
  const [navbarVisible, setNavbarVisible] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const designation = useAuthStore((state) => state.user?.designation);
  const user_id = useAuthStore((state) => state.user?.id);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNavbarVisible(!isSmallScreen);
  }, [isSmallScreen]);

  const memoizedRoutes = useMemo(() => routes, [routes]);

  function fetchNotifications(){
    const endpoint = `http://localhost:8080/api/notification/user/${user_id}`;
    console.log({endpoint})
    axios.get(endpoint)
      .then(response => {
        setNotifications(response.data);
        console.log({notifications});
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });
  }

  useEffect(() => {
    fetchNotifications();
    
  }, []);




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
          </Group>
          <Group style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Paper bg={getUserTypeColor(designation ?? '', '1')} m="sm" radius="sm">
              <Group justify="center">
                <Text size="1.3rem" pl='14px' pr='14px' p='7px' variant="text" c={getUserTypeColor(designation ?? '')}  gradient={{ from: 'blue', to: 'red', deg: 90 }}>
                  {designation}
                </Text>
              </Group>
            </Paper>
          </Group>
          <Group>
            {actions}
            { notifications ? <Indicator inline processing color="red" ><Notifications /></Indicator> : <Notifications />}
            <Divider mt='xs' mb='xs' mr='sm' size='sm' orientation="vertical" />
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
          <AppShell.Navbar p="md" style={styles}>
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
