export const constants = {
  // Global constants
  DEFAULT_CLIENT_ROLES: 'default-roles',
  EMPTY_ORGANIZATIONS: 'EMPTY_ORGANIZATIONS',
  CREATE_ORGANIZATION_FAILED: 'ORGANIZATION.ERROR.CREATE_FAILED',
  CREATE_ORGANIZATION_COMPLETED: 'ORGANIZATION.SUCCESS.CREATE_COMPLETED',
  // Translation constants
  KEYCLOAK_LOGIN_ERROR: 'APP.KEYCLOAK_LOGIN_ERROR',
  KEYCLOAK_LOGOUT_ERROR: 'APP.KEYCLOAK_LOGOUT_ERROR',
  KEYCLOAK_USER_ID: 'kcid',
  CURRENT_USER_ID: 'pgid',
  USER_ORGANIZATION_ID: 'orgId',
  FATAL_ERROR_OCCURED: 'FATAL_ERROR_OCCURED',
  NEW_USER: {
    DEFAULT_COUNTRY: 'Canada',
    DEFAULT_COUNTRY_CODE: '+1',
    DEFAULT_TYPE: 'User',
  },
  // Date of birth format:
  DATE_FORMAT_YYYY_MM_DD: 'YYYY-MM-DD',
  DATE_OF_BIRTH_FORMATS: {
    parse: {
      dateInput: 'YYYY/MM/DD',
    },
    display: {
      dateInput: 'YYYY/MM/DD',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  },
  FAILED_LOAD_COUNTRIES: 'FAILED_LOAD_COUNTRIES',
  COMPLETING_FORM_REQUIRED: 'COMPLETING_FORM_REQUIRED',
  MINIMUM_AGE: 14,
  ROUTING_URL: 'url',
  ROUTINGS_URLS: {
    DASHBOARD: 'dashboard',
    RESOURCES: 'resources',
    RESOURCES_SETTINGS: 'resource-settings',
  },
};

export interface Countries {
  code: string;
  code3: string;
  name: string;
  callingCode: string;
}
