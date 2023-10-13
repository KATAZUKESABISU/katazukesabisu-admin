import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as ReactLink } from 'react-router-dom';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  navigationData: BreadcrumbItem[];
}

const renderBreadcrumbs = (item: BreadcrumbItem, index: number) => {
  if (item.href) {
    return (
      <Link key={index} component={ReactLink} underline="hover" fontSize="14px" to={item.href}>
        {item.name}
      </Link>
    );
  }

  return (
    <Typography key={index} fontSize="14px" color="#b0b0b0">
      {item.name}
    </Typography>
  );
};

export default function CollapsedBreadcrumbs({ navigationData }: BreadcrumbProps) {
  return (
    <div role="presentation">
      <Breadcrumbs maxItems={3} aria-label="breadcrumb" className="[&>ol]:justify-end">
        {navigationData.map(renderBreadcrumbs)}
      </Breadcrumbs>
    </div>
  );
}
