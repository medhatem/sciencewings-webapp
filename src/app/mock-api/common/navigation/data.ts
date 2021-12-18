/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    subtitle: 'Unique dashboard designs',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [
      {
        id: 'dashboards.profile',
        title: 'Profile',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/dashboards/profile',
      },
    ],
  },
];
