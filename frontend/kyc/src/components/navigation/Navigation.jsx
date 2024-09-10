import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppShell,
  Burger,
  Chip,
  Group,
  NavLink,
  Pill,
  ScrollArea,
  Skeleton,
  Space,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAdjustments,
  IconBrandMantine,
  IconBuilding,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
  IconUser,
} from "@tabler/icons-react";
import AdminMenu from "../admin/navigation/AdminMenu";
import NavbarLinksGroup from "./NavbarLinksGroup";
import ThemeButton from "../ui/ThemeButton";
import Notifications from "../notifications/Notifications";
export default function Navigation({navdata,routes, actions, menu}) {
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
          <div>
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <IconBrandMantine size={30} />
            </Group></div>
          <Group>
            {/* <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: 'red', to: 'green', deg: 90 }}
            >
              Administrator
            </Text> */}
          </Group>
          <Group>
          {actions}
          <Notifications/>
            <ThemeButton />
            {menu}
            
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {links}
      </AppShell.Navbar>
      <AppShell.Main>
        {routes}
      </AppShell.Main>
    </AppShell>
  );
}
