import { memo, useCallback, useEffect, useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import global from '../ui/Global.module.css';
import { NavLink } from 'react-router-dom';
import classes from './NavbarLinksGroup.module.css';

interface Link {
  icon: React.ComponentType<{ style: React.CSSProperties }>;
  link: string;
  iconColor?: string;
  label: string;
}

interface NavbarLinksGroupProps {
  icon: React.ComponentType<{ style: React.CSSProperties }>;
  label: string;
  iconColor?: string;
  initiallyOpened?: boolean;
  links?: Link[] | string;
  onLinkClick?: () => void;
}

const NavbarLinksGroup = ({
  icon: Icon,
  label,
  iconColor,
  initiallyOpened = false,
  links,
  onLinkClick,
}: NavbarLinksGroupProps) => {
  const hasLinks = Array.isArray(links);
  const isSingleLink = typeof links === 'string';
  const [opened, setOpened] = useState(initiallyOpened);

  useEffect(() => {
    
    if (iconColor) {
      console.log({ iconColor });
      console.log({ iconColor: iconColor.slice(0, -2) + '0' });
    }
  }, []);

  const handleLinkClick = useCallback(() => {
    if (onLinkClick) {
      onLinkClick();
    }
  }, [onLinkClick]);

  const items = (hasLinks ? links : []).map((link: Link) => {
    const IconComponent = link.icon as React.ComponentType<{ style: React.CSSProperties }>;
    return (
      <>
      <div className={classes.division}></div>
      <NavLink
        to={link.link}
        key={link.label}
        className={({ isActive }) =>
          `${classes.link} ${isActive ? classes.activeLink : ''}`
        }
        
        
        end
        onClick={handleLinkClick}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <ThemeIcon c={link.iconColor} bg={`${iconColor?.slice(0,-2)}0`} radius="xl" variant="light" size={30}>
          <IconComponent style={{ width: rem(18), height: rem(18) }} />
        </ThemeIcon>
        <Box ml="sm">{link.label}</Box>
      </NavLink>
      </>
    );
  });

  const content = (
    <Group className={global.navlinks} justify="space-between"  gap={0}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <ThemeIcon c={iconColor} bg={`${iconColor?.slice(0,-2)}0`} variant="light" size={30}>
          <Icon style={{ width: rem(18), height: rem(18) }} />
        </ThemeIcon>
        <Box ml="md">{label}</Box>
      </Box>
      {hasLinks && (
        <IconChevronRight
          className={classes.chevron}
          stroke={1.5}
          style={{
            width: rem(16),
            height: rem(16),
            transform: opened ? 'rotate(-90deg)' : 'none',
          }}
        />
      )}
    </Group>
  );

  return (
    <>
      {isSingleLink ? (
        <NavLink
          to={links as string}
          style={{ textDecoration: 'none' }}
          className={({ isActive }) =>
            `${classes.control} ${isActive ? classes.activeLink : ''}`
          }
          end
          onClick={handleLinkClick}
        >
          {content}
        </NavLink>
      ) : (
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
        >
          {content}
        </UnstyledButton>
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
};

export default memo(NavbarLinksGroup);