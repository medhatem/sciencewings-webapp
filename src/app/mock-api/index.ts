import { ChatMockApi } from 'app/mock-api/apps/chat/api';
import { ContactsMockApi } from 'app/mock-api/apps/contacts/api';
import { FileManagerMockApi } from 'app/mock-api/apps/file-manager/api';
import { HelpCenterMockApi } from 'app/mock-api/apps/help-center/api';
import { MailboxMockApi } from 'app/mock-api/apps/mailbox/api';
import { MessagesMockApi } from 'app/mock-api/common/messages/api';
import { NotesMockApi } from 'app/mock-api/apps/notes/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { SearchMockApi } from 'app/mock-api/common/search/api';
import { ShortcutsMockApi } from 'app/mock-api/common/shortcuts/api';
import { MyOrganizationsMockApi } from './apps/my-organizations/api';
import { OrganizationUsersMockApi } from './apps/organization-users/api';
import { ECommerceInventoryMockApi } from './apps/ecommerce/inventory/api';
import { OrganizationDashboardMockApi } from './apps/organization-dashboard/api';
import { FinanceMockApi } from './apps/finance/api';
import { ProjectMockApi } from './apps/projects/api';

export const mockApiServices = [
  ChatMockApi,
  ContactsMockApi,
  FileManagerMockApi,
  HelpCenterMockApi,
  MailboxMockApi,
  MessagesMockApi,
  FinanceMockApi,
  NotesMockApi,
  OrganizationDashboardMockApi,
  NotificationsMockApi,
  SearchMockApi,
  ShortcutsMockApi,
  MyOrganizationsMockApi,
  OrganizationUsersMockApi,
  ECommerceInventoryMockApi,
  ProjectMockApi,
];
