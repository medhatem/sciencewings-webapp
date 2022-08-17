/**
 *  Global constants
 */
export const constants = {
  /**
   * Translation constants
   */
  EMPTY_ORGANIZATIONS: 'EMPTY_ORGANIZATIONS',
  CREATE_ORGANIZATION_FAILED: 'ORGANIZATION.ERROR.CREATE_FAILED',
  CREATE_ORGANIZATION_COMPLETED: 'ORGANIZATION.SUCCESS.CREATE_COMPLETED',
  ERROR_LOADING_ORGANIZATIONS: 'ORGANIZATION.LANDING_PAGE.ERROR_LOADING_ORGANIZATIONS',
  FETCH_ORGANIZATION_FAILED: 'ORGANIZATION.ERROR.FETCH_FAILED',
  WRONG_ORG_ID: 'ORGANIZATION.ERROR.WRONG_ORG_ID',
  ERROR_LOADING_MEMBERS: 'ORGANIZATION.MEMBERS.ERROR_LOADING_MEMBERS',
  KEYCLOAK_LOGIN_ERROR: 'APP.KEYCLOAK_LOGIN_ERROR',
  KEYCLOAK_LOGOUT_ERROR: 'APP.KEYCLOAK_LOGOUT_ERROR',
  FAILED_LOAD_COUNTRIES: 'FAILED_LOAD_COUNTRIES',
  COMPLETING_FORM_REQUIRED: 'COMPLETING_FORM_REQUIRED',
  CREATE_PROJECT_COMPLETED: 'ORGANIZATION.PROJECTS.FORM.CREATE_COMPLETED',
  CREATE_PROJECT_FAILED: 'PROJECT.ERROR.CREATE_FAILED',
  FATAL_ERROR_OCCURED: 'FATAL_ERROR_OCCURED',

  /**
   * LocalStorage & Cookies items keys
   */
  CURRENT_USER_KEYCLOAK_ID: 'kcid',
  CURRENT_USER_ID: 'pgid',
  CURRENT_ORGANIZATION_ID: 'orgid',
  CURRENT_MODULE: 'module',

  /**
   * ****************** ROUTING *******************
   * Modules routings urls/paths
   * App routing urls/paths
   */
  MODULES_ROUTINGS_URLS: {
    ADMIN: 'admin',
    RESOURCES: 'resources',
    RESOURCES_SETTINGS: 'resource-settings',
    LANDING_PAGE: 'landing-page',
    PROJECT: 'project',
    ERROR_PAGE: '**',
  },
  MODULES_ROUTINGS_CHILDREN_URLS: {
    ADMIN: {
      LANDING_PAGE: 'landing-page',
      ORGANIZATION_PROFILE: 'organization-profile',
      ORGANIZATION_MEMBERS: 'organization-members',
      ORGANIZATION_GROUPS: 'organization-groups',
      ORGANIZATION_SETTINGS: 'organization-settings',
      ORGANIZATION_PROJECT: 'project',
      PROJECT_SETTINGS: 'project-settings',
    },
    RESOURCES: {
      RESOURCE: 'resource',
      RESOURCE_UPDATE: 'resource/update',
      SCHEDULE: 'schedule',
      GENERAL_SETTINGS: 'settings-general',
      RESERVATION_SETTINGS: 'settings-reservation',
    },
    INFRASTRUCTURES: {
      INFRASTRUCTURE: 'Infrastructure',
    },
    USER: {
      USER_PROFILE: 'user-profile',
    },
  },

  /**
   * Dates formats
   */
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
  MINIMUM_AGE: 14,
};

export interface Countries {
  code: string;
  code3: string;
  name: string;
  callingCode: string;
}
