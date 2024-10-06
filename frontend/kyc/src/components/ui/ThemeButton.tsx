import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ThemeButton.module.css';

export default function ThemeButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <IconSunFilled style={{ color: 'var(--mantine-color-yellow-5)'}} className={cx(classes.icon, classes.light)}  />
      <IconMoonFilled color='var(--mantine-color-violet-9)' className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}