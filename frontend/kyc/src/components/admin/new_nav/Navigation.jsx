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
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AdminRoutes from "../navigation/AdminRoutes";
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
import AdminMenu from "../navigation/AdminMenu";
import NavbarLinksGroup from "./NavbarLinksGroup";
import ThemeButton from "../../ui/ThemeButton";
export default function Navigation() {
  const [opened, { toggle, close }] = useDisclosure(); // Added close for manual control

  const mockdata = [
    { label: "Dashboard", icon: IconGauge, links: '/admin' },
    {
      label: "Users",
      icon: IconUser,
      initiallyOpened: true,
      links: [
        { label: "Create", link: "test/admin/user/create" },
        { label: "Manage", link: "test/admin/user/manage" },
      ],
    },
    {
      label: "Companies",
      icon: IconBuilding,
      links: [
        { label: "Create", link: "test/admin/company/create" },
        { label: "Manage", link: "test/admin/company/manage" },
      ],
    }
  ];
  
  const handleLinkClick = () => {
    // This will close the menu after a link is clicked
    if (opened) {
      close();
    }
  };

  const links = mockdata.map((item) => (
    <NavbarLinksGroup {...item} key={item.label} onLinkClick={handleLinkClick} />
  ));
  
  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 250 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* Header */}
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
          <ThemeButton/>
          <Text
          
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: 'red', to: 'green', deg: 90 }}
    >
      Admin
    </Text>
          <AdminMenu />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {links}
      </AppShell.Navbar>
      <AppShell.Main>
        <AdminRoutes />
      </AppShell.Main>
    </AppShell>
  );
}
