import { UnstyledButton, Checkbox, Text, Image, SimpleGrid, Radio, CheckIcon } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import classes from './ImageCheckboxes.module.css';
import { ReactNode } from 'react';
import { Icon24Hours, IconBrandAppleFilled, IconSignRight, IconXboxXFilled } from '@tabler/icons-react';

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
  iconColor?: string;
  image: ReactNode;
}

export function ImageCheckbox({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  iconColor,
  className,
  image,
  ...others
}: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  console.log('icon color', iconColor);

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      data-checked={value || undefined}
      className={classes.button}
    >
     <span style={{color: iconColor}}>{image}</span> 

      <div className={classes.body}>
        <Text c="dimmed" size="xs" lh={1} mb={5}>
          {description}
        </Text>
        <Text fw={500} size="sm" lh={1}>
          {title}
        </Text>
      </div>


      <Radio onChange={() => { }}
        tabIndex={-1} checked={value} icon={CheckIcon} />


    </UnstyledButton>
  );
}

const mockdata = [
  { description: 'Applicability', title: 'Yes', image: IconSignRight },
  { description: 'Applicability', title: 'No', image: IconXboxXFilled, iconColor: 'red' },
];

export function ImageCheckboxes() {
  const items = mockdata.map((item) => (
    <ImageCheckbox
      {...item}
      image={<item.image />}
      key={item.title}
    />
  ));
  return <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>{items}</SimpleGrid>;
}