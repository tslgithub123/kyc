import React from 'react';
import { IconFile, IconMail, IconCalendar } from '@tabler/icons-react';
import ServicesGrid from '../../../services/ServicesGrid';
import FilesAction from '../../../services/common-actions/FilesAction';
import EmailAction from '../../../services/common-actions/EmailAction';
import CalendarAction from '../../../services/common-actions/CalendarAction';

const mockdata = [
  { title: 'Files', icon: IconFile, color: 'violet', component: <FilesAction /> },
  { title: 'Email', icon: IconMail, color: 'indigo', component: <EmailAction /> },
  { title: 'Calendar', icon: IconCalendar, color: 'blue', component: <CalendarAction /> },
];

export default function ManServices(): React.ReactNode {
  return (
    <>
      <ServicesGrid data={mockdata} />
    </>
  );
}
