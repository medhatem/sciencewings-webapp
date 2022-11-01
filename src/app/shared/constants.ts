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
  CREATE_PROJECT_FAILED: 'ORGANIZATION.PROJECTS.ERROR.CREATE_COMPLETED',
  FATAL_ERROR_OCCURED: 'FATAL_ERROR_OCCURED',
  UPDATE_SUCCESSFULLY: 'STATES.UPDATE_SUCCESSFULLY',
  SOMETHING_WENT_WRONG: 'STATES.SOMETHING_WENT_WRONG',
  CREATE_RESOURCE_COMPLETED: 'ORGANIZATION.SETTINGS.RESOUCES.SUCCESS.CREATE_COMPLETED',
  INVALID_RESERVATION: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.EVENTS.INVALID',
  INVALID_RESERVATION_PAST: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.EVENTS.INVALID_PAST',
  INVALID_RESERVATION_DURATION_LIMIT: 'ORGANIZATION.SETTINGS.RESOUCES.RESERVATION.EVENTS.INVALID_RESERVATION_DURATION_LIMIT',
  CREATE_GROUP_COMPLETED: 'ORGANIZATION.GROUPS.SUCCESS.CREATE_COMPLETED',
  CREATE_GROUP_FAILED: 'ORGANIZATION.GROUPS.ERROR.CREATE_FAILED',
  UPDATE_GROUP_COMPLETED: 'ORGANIZATION.GROUPS.SUCCESS.UPDATE_COMPLETED',
  UPDATE_GROUP_FAILED: 'ORGANIZATION.GROUPS.ERROR.UPDATE_FAILED',
  // resource side bar
  RESOURCE_SETTING: 'APP.ROUTES.ADMIN.RESOURCE_SETTINGS',
  INVITE_MEMBER_FAILED: 'ORGANIZATION.MEMBERS.ERROR.CREATE_FAILED',
  INVITE_MEMBER_COMPLETED: 'ORGANIZATION.MEMBERS.SUCCESS.CREATE_COMPLETED',
  COMPLETING_MEMBER_PROFILE_INFO: 'ORGANIZATION.MEMBERS.INFO.EDIT_PROFILE',
  CREATE_INFRASTRUCTURE_COMPLETED: 'ORGANIZATION.INFRASTRUCTURES.SUCCESS.CREATE_COMPLETED',
  UPDATE_PROJECT_FAILED: 'ORGANIZATION.PROJECTS.ERROR.update_FAILED',
  UPDATE_PROJECT_COMPLETED: 'ORGANIZATION.PROJECTS.SUCCESS.UPDATE_COMPLETED',
  UPDATE_INFRASTRUCTURE_FAILED: 'ORGANIZATION.INFRASTRUCTURES.ERROR.UPDATE_FAILED',
  UPDATE_INFRASTRUCTURE_COMPLETED: 'ORGANIZATION.INFRASTRUCTURES.SUCCESS.UPDATE_COMPLETED',

  /**
   * LocalStorage & Cookies items keys
   */
  CURRENT_USER_KEYCLOAK_ID: 'kcid',
  CURRENT_USER_ID: 'pgid',
  CURRENT_ORGANIZATION_ID: 'orgid',
  CURRENT_MODULE: 'module',
  CURRENT_PROJECT_ID: 'projectId',
  CURRENT_INFRASTRUCTURE_ID: 'infraId',
  CURRENT_RESOURCE_ID: 'resourceId',

  /**
   * ****************** ROUTING *******************
   * Modules routings urls/paths
   * App routing urls/paths
   */
  MODULES_ROUTINGS_URLS: {
    ADMIN: 'admin',
    RESOURCES: 'resources',
    RESOURCE: 'resources/resource/create/*',
    RESOURCES_LIST: '/resources/resource/',
    RESOURCES_SETTINGS: 'resource-settings',
    INFRASTRUCTURE: '/resources/Infrastructure/',
    LANDING_PAGE: 'landing-page',
    PROJECT: 'project',
    GROUP: 'organization-groups',
    ERROR_PAGE: '**',
  },
  MODULES_ROUTINGS_CHILDREN_URLS: {
    ADMIN: {
      LANDING_PAGE: 'landing-page',
      ORGANIZATION_PROFILE: 'organization-profile',
      ORGANIZATION_MEMBERS: 'organization-members',
      MEMBER_PROFILE: 'memberProfile',
      ORGANIZATION_GROUPS: 'organization-groups',
      ORGANIZATION_SETTINGS: 'organization-settings',
      ORGANIZATION_PROJECT: 'project',
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
