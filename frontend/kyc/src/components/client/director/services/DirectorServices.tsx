import React from 'react';
import { IconFile, IconMail, IconCalendar } from '@tabler/icons-react';
import CalendarAction from '../../../services/common-actions/CalendarAction';
import EmailAction from '../../../services/common-actions/EmailAction';
import FilesAction from '../../../services/common-actions/FilesAction';
import ServicesGrid from '../../../services/ServicesGrid';

const mockdata = [
  { title: 'Files', icon: IconFile, color: 'violet', component: <FilesAction /> },
  { title: 'Email', icon: IconMail, color: 'indigo', component: <EmailAction /> },
  { title: 'Calendar', icon: IconCalendar, color: 'blue', component: <CalendarAction /> },
];

export default function DirectorServices(): React.ReactNode {
  return (
    <>
      <ServicesGrid data={mockdata} />
    </>
  );
}
