// BreadcrumbsComponent.js
import { Breadcrumbs, Anchor } from '@mantine/core';

const BreadcrumbsComponent = ({ items, separator = "→" }) => {
  const breadcrumbItems = items.map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Breadcrumbs separator={separator}>
      {breadcrumbItems}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
