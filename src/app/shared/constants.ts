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
  USER_ORGANIZATION_ID: 'orgId',
  NEW_USER: {
    DEFAULT_COUNTRY: 'Algeria',
    DEFAULT_COUNTRY_CODE: '+213',
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
};

export interface Countries {
  code: string;
  code3: string;
  name: string;
  callingCode: string;
}

export const countries: Countries[] = [
  { code: 'AF', code3: 'AFG', name: 'Afghanistan', callingCode: '004' },
  { code: 'AL', code3: 'ALB', name: 'Albania', callingCode: '008' },
  { code: 'DZ', code3: 'DZA', name: 'Algeria', callingCode: '012' },
  { code: 'AS', code3: 'ASM', name: 'American Samoa', callingCode: '016' },
  { code: 'AD', code3: 'AND', name: 'Andorra', callingCode: '020' },
  { code: 'AO', code3: 'AGO', name: 'Angola', callingCode: '024' },
  { code: 'AI', code3: 'AIA', name: 'Anguilla', callingCode: '660' },
  { code: 'AQ', code3: 'ATA', name: 'Antarctica', callingCode: '010' },
  { code: 'AG', code3: 'ATG', name: 'Antigua and Barbuda', callingCode: '028' },
  { code: 'AR', code3: 'ARG', name: 'Argentina', callingCode: '032' },
  { code: 'AM', code3: 'ARM', name: 'Armenia', callingCode: '051' },
  { code: 'AW', code3: 'ABW', name: 'Aruba', callingCode: '533' },
  { code: 'AU', code3: 'AUS', name: 'Australia', callingCode: '036' },
  { code: 'AT', code3: 'AUT', name: 'Austria', callingCode: '040' },
  { code: 'AZ', code3: 'AZE', name: 'Azerbaijan', callingCode: '031' },
  { code: 'BS', code3: 'BHS', name: 'Bahamas (the)', callingCode: '044' },
  { code: 'BH', code3: 'BHR', name: 'Bahrain', callingCode: '048' },
  { code: 'BD', code3: 'BGD', name: 'Bangladesh', callingCode: '050' },
  { code: 'BB', code3: 'BRB', name: 'Barbados', callingCode: '052' },
  { code: 'BY', code3: 'BLR', name: 'Belarus', callingCode: '112' },
  { code: 'BE', code3: 'BEL', name: 'Belgium', callingCode: '056' },
  { code: 'BZ', code3: 'BLZ', name: 'Belize', callingCode: '084' },
  { code: 'BJ', code3: 'BEN', name: 'Benin', callingCode: '204' },
  { code: 'BM', code3: 'BMU', name: 'Bermuda', callingCode: '060' },
  { code: 'BT', code3: 'BTN', name: 'Bhutan', callingCode: '064' },
  { code: 'BO', code3: 'BOL', name: 'Bolivia (Plurinational State of)', callingCode: '068' },
  { code: 'BQ', code3: 'BES', name: 'Bonaire, Sint Eustatius and Saba', callingCode: '535' },
  { code: 'BA', code3: 'BIH', name: 'Bosnia and Herzegovina', callingCode: '070' },
  { code: 'BW', code3: 'BWA', name: 'Botswana', callingCode: '072' },
  { code: 'BV', code3: 'BVT', name: 'Bouvet Island', callingCode: '074' },
  { code: 'BR', code3: 'BRA', name: 'Brazil', callingCode: '076' },
  { code: 'IO', code3: 'IOT', name: 'British Indian Ocean Territory (the)', callingCode: '086' },
  { code: 'BN', code3: 'BRN', name: 'Brunei Darussalam', callingCode: '096' },
  { code: 'BG', code3: 'BGR', name: 'Bulgaria', callingCode: '100' },
  { code: 'BF', code3: 'BFA', name: 'Burkina Faso', callingCode: '854' },
  { code: 'BI', code3: 'BDI', name: 'Burundi', callingCode: '108' },
  { code: 'CV', code3: 'CPV', name: 'Cabo Verde', callingCode: '132' },
  { code: 'KH', code3: 'KHM', name: 'Cambodia', callingCode: '116' },
  { code: 'CM', code3: 'CMR', name: 'Cameroon', callingCode: '120' },
  { code: 'CA', code3: 'CAN', name: 'Canada', callingCode: '124' },
  { code: 'KY', code3: 'CYM', name: 'Cayman Islands (the)', callingCode: '136' },
  { code: 'CF', code3: 'CAF', name: 'Central African Republic (the)', callingCode: '140' },
  { code: 'TD', code3: 'TCD', name: 'Chad', callingCode: '148' },
  { code: 'CL', code3: 'CHL', name: 'Chile', callingCode: '152' },
  { code: 'CN', code3: 'CHN', name: 'China', callingCode: '156' },
  { code: 'CX', code3: 'CXR', name: 'Christmas Island', callingCode: '162' },
  { code: 'CC', code3: 'CCK', name: 'Cocos (Keeling) Islands (the)', callingCode: '166' },
  { code: 'CO', code3: 'COL', name: 'Colombia', callingCode: '170' },
  { code: 'KM', code3: 'COM', name: 'Comoros (the)', callingCode: '174' },
  { code: 'CD', code3: 'COD', name: 'Congo (the Democratic Republic of the)', callingCode: '180' },
  { code: 'CG', code3: 'COG', name: 'Congo (the)', callingCode: '178' },
  { code: 'CK', code3: 'COK', name: 'Cook Islands (the)', callingCode: '184' },
  { code: 'CR', code3: 'CRI', name: 'Costa Rica', callingCode: '188' },
  { code: 'HR', code3: 'HRV', name: 'Croatia', callingCode: '191' },
  { code: 'CU', code3: 'CUB', name: 'Cuba', callingCode: '192' },
  { code: 'CW', code3: 'CUW', name: 'Curaçao', callingCode: '531' },
  { code: 'CY', code3: 'CYP', name: 'Cyprus', callingCode: '196' },
  { code: 'CZ', code3: 'CZE', name: 'Czechia', callingCode: '203' },
  { code: 'CI', code3: 'CIV', name: "Côte d'Ivoire", callingCode: '384' },
  { code: 'DK', code3: 'DNK', name: 'Denmark', callingCode: '208' },
  { code: 'DJ', code3: 'DJI', name: 'Djibouti', callingCode: '262' },
  { code: 'DM', code3: 'DMA', name: 'Dominica', callingCode: '212' },
  { code: 'DO', code3: 'DOM', name: 'Dominican Republic (the)', callingCode: '214' },
  { code: 'EC', code3: 'ECU', name: 'Ecuador', callingCode: '218' },
  { code: 'EG', code3: 'EGY', name: 'Egypt', callingCode: '818' },
  { code: 'SV', code3: 'SLV', name: 'El Salvador', callingCode: '222' },
  { code: 'GQ', code3: 'GNQ', name: 'Equatorial Guinea', callingCode: '226' },
  { code: 'ER', code3: 'ERI', name: 'Eritrea', callingCode: '232' },
  { code: 'EE', code3: 'EST', name: 'Estonia', callingCode: '233' },
  { code: 'SZ', code3: 'SWZ', name: 'Eswatini', callingCode: '748' },
  { code: 'ET', code3: 'ETH', name: 'Ethiopia', callingCode: '231' },
  { code: 'FK', code3: 'FLK', name: 'Falkland Islands (the) [Malvinas]', callingCode: '238' },
  { code: 'FO', code3: 'FRO', name: 'Faroe Islands (the)', callingCode: '234' },
  { code: 'FJ', code3: 'FJI', name: 'Fiji', callingCode: '242' },
  { code: 'FI', code3: 'FIN', name: 'Finland', callingCode: '246' },
  { code: 'FR', code3: 'FRA', name: 'France', callingCode: '250' },
  { code: 'GF', code3: 'GUF', name: 'French Guiana', callingCode: '254' },
  { code: 'PF', code3: 'PYF', name: 'French Polynesia', callingCode: '258' },
  { code: 'TF', code3: 'ATF', name: 'French Southern Territories (the)', callingCode: '260' },
  { code: 'GA', code3: 'GAB', name: 'Gabon', callingCode: '266' },
  { code: 'GM', code3: 'GMB', name: 'Gambia (the)', callingCode: '270' },
  { code: 'GE', code3: 'GEO', name: 'Georgia', callingCode: '268' },
  { code: 'DE', code3: 'DEU', name: 'Germany', callingCode: '276' },
  { code: 'GH', code3: 'GHA', name: 'Ghana', callingCode: '288' },
  { code: 'GI', code3: 'GIB', name: 'Gibraltar', callingCode: '292' },
  { code: 'GR', code3: 'GRC', name: 'Greece', callingCode: '300' },
  { code: 'GL', code3: 'GRL', name: 'Greenland', callingCode: '304' },
  { code: 'GD', code3: 'GRD', name: 'Grenada', callingCode: '308' },
  { code: 'GP', code3: 'GLP', name: 'Guadeloupe', callingCode: '312' },
  { code: 'GU', code3: 'GUM', name: 'Guam', callingCode: '316' },
  { code: 'GT', code3: 'GTM', name: 'Guatemala', callingCode: '320' },
  { code: 'GG', code3: 'GGY', name: 'Guernsey', callingCode: '831' },
  { code: 'GN', code3: 'GIN', name: 'Guinea', callingCode: '324' },
  { code: 'GW', code3: 'GNB', name: 'Guinea-Bissau', callingCode: '624' },
  { code: 'GY', code3: 'GUY', name: 'Guyana', callingCode: '328' },
  { code: 'HT', code3: 'HTI', name: 'Haiti', callingCode: '332' },
  { code: 'HM', code3: 'HMD', name: 'Heard Island and McDonald Islands', callingCode: '334' },
  { code: 'VA', code3: 'VAT', name: 'Holy See (the)', callingCode: '336' },
  { code: 'HN', code3: 'HND', name: 'Honduras', callingCode: '340' },
  { code: 'HK', code3: 'HKG', name: 'Hong Kong', callingCode: '344' },
  { code: 'HU', code3: 'HUN', name: 'Hungary', callingCode: '348' },
  { code: 'IS', code3: 'ISL', name: 'Iceland', callingCode: '352' },
  { code: 'IN', code3: 'IND', name: 'India', callingCode: '356' },
  { code: 'ID', code3: 'IDN', name: 'Indonesia', callingCode: '360' },
  { code: 'IR', code3: 'IRN', name: 'Iran (Islamic Republic of)', callingCode: '364' },
  { code: 'IQ', code3: 'IRQ', name: 'Iraq', callingCode: '368' },
  { code: 'IE', code3: 'IRL', name: 'Ireland', callingCode: '372' },
  { code: 'IM', code3: 'IMN', name: 'Isle of Man', callingCode: '833' },
  { code: 'IL', code3: 'ISR', name: 'Israel', callingCode: '376' },
  { code: 'IT', code3: 'ITA', name: 'Italy', callingCode: '380' },
  { code: 'JM', code3: 'JAM', name: 'Jamaica', callingCode: '388' },
  { code: 'JP', code3: 'JPN', name: 'Japan', callingCode: '392' },
  { code: 'JE', code3: 'JEY', name: 'Jersey', callingCode: '832' },
  { code: 'JO', code3: 'JOR', name: 'Jordan', callingCode: '400' },
  { code: 'KZ', code3: 'KAZ', name: 'Kazakhstan', callingCode: '398' },
  { code: 'KE', code3: 'KEN', name: 'Kenya', callingCode: '404' },
  { code: 'KI', code3: 'KIR', name: 'Kiribati', callingCode: '296' },
  { code: 'KP', code3: 'PRK', name: "Korea (the Democratic People's Republic of)", callingCode: '408' },
  { code: 'KR', code3: 'KOR', name: 'Korea (the Republic of)', callingCode: '410' },
  { code: 'KW', code3: 'KWT', name: 'Kuwait', callingCode: '414' },
  { code: 'KG', code3: 'KGZ', name: 'Kyrgyzstan', callingCode: '417' },
  { code: 'LA', code3: 'LAO', name: "Lao People's Democratic Republic (the)", callingCode: '418' },
  { code: 'LV', code3: 'LVA', name: 'Latvia', callingCode: '428' },
  { code: 'LB', code3: 'LBN', name: 'Lebanon', callingCode: '422' },
  { code: 'LS', code3: 'LSO', name: 'Lesotho', callingCode: '426' },
  { code: 'LR', code3: 'LBR', name: 'Liberia', callingCode: '430' },
  { code: 'LY', code3: 'LBY', name: 'Libya', callingCode: '434' },
  { code: 'LI', code3: 'LIE', name: 'Liechtenstein', callingCode: '438' },
  { code: 'LT', code3: 'LTU', name: 'Lithuania', callingCode: '440' },
  { code: 'LU', code3: 'LUX', name: 'Luxembourg', callingCode: '442' },
  { code: 'MO', code3: 'MAC', name: 'Macao', callingCode: '446' },
  { code: 'MG', code3: 'MDG', name: 'Madagascar', callingCode: '450' },
  { code: 'MW', code3: 'MWI', name: 'Malawi', callingCode: '454' },
  { code: 'MY', code3: 'MYS', name: 'Malaysia', callingCode: '458' },
  { code: 'MV', code3: 'MDV', name: 'Maldives', callingCode: '462' },
  { code: 'ML', code3: 'MLI', name: 'Mali', callingCode: '466' },
  { code: 'MT', code3: 'MLT', name: 'Malta', callingCode: '470' },
  { code: 'MH', code3: 'MHL', name: 'Marshall Islands (the)', callingCode: '584' },
  { code: 'MQ', code3: 'MTQ', name: 'Martinique', callingCode: '474' },
  { code: 'MR', code3: 'MRT', name: 'Mauritania', callingCode: '478' },
  { code: 'MU', code3: 'MUS', name: 'Mauritius', callingCode: '480' },
  { code: 'YT', code3: 'MYT', name: 'Mayotte', callingCode: '175' },
  { code: 'MX', code3: 'MEX', name: 'Mexico', callingCode: '484' },
  { code: 'FM', code3: 'FSM', name: 'Micronesia (Federated States of)', callingCode: '583' },
  { code: 'MD', code3: 'MDA', name: 'Moldova (the Republic of)', callingCode: '498' },
  { code: 'MC', code3: 'MCO', name: 'Monaco', callingCode: '492' },
  { code: 'MN', code3: 'MNG', name: 'Mongolia', callingCode: '496' },
  { code: 'ME', code3: 'MNE', name: 'Montenegro', callingCode: '499' },
  { code: 'MS', code3: 'MSR', name: 'Montserrat', callingCode: '500' },
  { code: 'MA', code3: 'MAR', name: 'Morocco', callingCode: '504' },
  { code: 'MZ', code3: 'MOZ', name: 'Mozambique', callingCode: '508' },
  { code: 'MM', code3: 'MMR', name: 'Myanmar', callingCode: '104' },
  { code: 'NA', code3: 'NAM', name: 'Namibia', callingCode: '516' },
  { code: 'NR', code3: 'NRU', name: 'Nauru', callingCode: '520' },
  { code: 'NP', code3: 'NPL', name: 'Nepal', callingCode: '524' },
  { code: 'NL', code3: 'NLD', name: 'Netherlands (the)', callingCode: '528' },
  { code: 'NC', code3: 'NCL', name: 'New Caledonia', callingCode: '540' },
  { code: 'NZ', code3: 'NZL', name: 'New Zealand', callingCode: '554' },
  { code: 'NI', code3: 'NIC', name: 'Nicaragua', callingCode: '558' },
  { code: 'NE', code3: 'NER', name: 'Niger (the)', callingCode: '562' },
  { code: 'NG', code3: 'NGA', name: 'Nigeria', callingCode: '566' },
  { code: 'NU', code3: 'NIU', name: 'Niue', callingCode: '570' },
  { code: 'NF', code3: 'NFK', name: 'Norfolk Island', callingCode: '574' },
  { code: 'MP', code3: 'MNP', name: 'Northern Mariana Islands (the)', callingCode: '580' },
  { code: 'NO', code3: 'NOR', name: 'Norway', callingCode: '578' },
  { code: 'OM', code3: 'OMN', name: 'Oman', callingCode: '512' },
  { code: 'PK', code3: 'PAK', name: 'Pakistan', callingCode: '586' },
  { code: 'PW', code3: 'PLW', name: 'Palau', callingCode: '585' },
  { code: 'PS', code3: 'PSE', name: 'Palestine, State of', callingCode: '275' },
  { code: 'PA', code3: 'PAN', name: 'Panama', callingCode: '591' },
  { code: 'PG', code3: 'PNG', name: 'Papua New Guinea', callingCode: '598' },
  { code: 'PY', code3: 'PRY', name: 'Paraguay', callingCode: '600' },
  { code: 'PE', code3: 'PER', name: 'Peru', callingCode: '604' },
  { code: 'PH', code3: 'PHL', name: 'Philippines (the)', callingCode: '608' },
  { code: 'PN', code3: 'PCN', name: 'Pitcairn', callingCode: '612' },
  { code: 'PL', code3: 'POL', name: 'Poland', callingCode: '616' },
  { code: 'PT', code3: 'PRT', name: 'Portugal', callingCode: '620' },
  { code: 'PR', code3: 'PRI', name: 'Puerto Rico', callingCode: '630' },
  { code: 'QA', code3: 'QAT', name: 'Qatar', callingCode: '634' },
  { code: 'MK', code3: 'MKD', name: 'Republic of North Macedonia', callingCode: '807' },
  { code: 'RO', code3: 'ROU', name: 'Romania', callingCode: '642' },
  { code: 'RU', code3: 'RUS', name: 'Russian Federation (the)', callingCode: '643' },
  { code: 'RW', code3: 'RWA', name: 'Rwanda', callingCode: '646' },
  { code: 'RE', code3: 'REU', name: 'Réunion', callingCode: '638' },
  { code: 'BL', code3: 'BLM', name: 'Saint Barthélemy', callingCode: '652' },
  { code: 'SH', code3: 'SHN', name: 'Saint Helena, Ascension and Tristan da Cunha', callingCode: '654' },
  { code: 'KN', code3: 'KNA', name: 'Saint Kitts and Nevis', callingCode: '659' },
  { code: 'LC', code3: 'LCA', name: 'Saint Lucia', callingCode: '662' },
  { code: 'MF', code3: 'MAF', name: 'Saint Martin (French part)', callingCode: '663' },
  { code: 'PM', code3: 'SPM', name: 'Saint Pierre and Miquelon', callingCode: '666' },
  { code: 'VC', code3: 'VCT', name: 'Saint Vincent and the Grenadines', callingCode: '670' },
  { code: 'WS', code3: 'WSM', name: 'Samoa', callingCode: '882' },
  { code: 'SM', code3: 'SMR', name: 'San Marino', callingCode: '674' },
  { code: 'ST', code3: 'STP', name: 'Sao Tome and Principe', callingCode: '678' },
  { code: 'SA', code3: 'SAU', name: 'Saudi Arabia', callingCode: '682' },
  { code: 'SN', code3: 'SEN', name: 'Senegal', callingCode: '686' },
  { code: 'RS', code3: 'SRB', name: 'Serbia', callingCode: '688' },
  { code: 'SC', code3: 'SYC', name: 'Seychelles', callingCode: '690' },
  { code: 'SL', code3: 'SLE', name: 'Sierra Leone', callingCode: '694' },
  { code: 'SG', code3: 'SGP', name: 'Singapore', callingCode: '702' },
  { code: 'SX', code3: 'SXM', name: 'Sint Maarten (Dutch part)', callingCode: '534' },
  { code: 'SK', code3: 'SVK', name: 'Slovakia', callingCode: '703' },
  { code: 'SI', code3: 'SVN', name: 'Slovenia', callingCode: '705' },
  { code: 'SB', code3: 'SLB', name: 'Solomon Islands', callingCode: '090' },
  { code: 'SO', code3: 'SOM', name: 'Somalia', callingCode: '706' },
  { code: 'ZA', code3: 'ZAF', name: 'South Africa', callingCode: '710' },
  { code: 'GS', code3: 'SGS', name: 'South Georgia and the South Sandwich Islands', callingCode: '239' },
  { code: 'SS', code3: 'SSD', name: 'South Sudan', callingCode: '728' },
  { code: 'ES', code3: 'ESP', name: 'Spain', callingCode: '724' },
  { code: 'LK', code3: 'LKA', name: 'Sri Lanka', callingCode: '144' },
  { code: 'SD', code3: 'SDN', name: 'Sudan (the)', callingCode: '729' },
  { code: 'SR', code3: 'SUR', name: 'Suriname', callingCode: '740' },
  { code: 'SJ', code3: 'SJM', name: 'Svalbard and Jan Mayen', callingCode: '744' },
  { code: 'SE', code3: 'SWE', name: 'Sweden', callingCode: '752' },
  { code: 'CH', code3: 'CHE', name: 'Switzerland', callingCode: '756' },
  { code: 'SY', code3: 'SYR', name: 'Syrian Arab Republic', callingCode: '760' },
  { code: 'TW', code3: 'TWN', name: 'Taiwan', callingCode: '158' },
  { code: 'TJ', code3: 'TJK', name: 'Tajikistan', callingCode: '762' },
  { code: 'TZ', code3: 'TZA', name: 'Tanzania, United Republic of', callingCode: '834' },
  { code: 'TH', code3: 'THA', name: 'Thailand', callingCode: '764' },
  { code: 'TL', code3: 'TLS', name: 'Timor-Leste', callingCode: '626' },
  { code: 'TG', code3: 'TGO', name: 'Togo', callingCode: '768' },
  { code: 'TK', code3: 'TKL', name: 'Tokelau', callingCode: '772' },
  { code: 'TO', code3: 'TON', name: 'Tonga', callingCode: '776' },
  { code: 'TT', code3: 'TTO', name: 'Trinidad and Tobago', callingCode: '780' },
  { code: 'TN', code3: 'TUN', name: 'Tunisia', callingCode: '788' },
  { code: 'TR', code3: 'TUR', name: 'Turkey', callingCode: '792' },
  { code: 'TM', code3: 'TKM', name: 'Turkmenistan', callingCode: '795' },
  { code: 'TC', code3: 'TCA', name: 'Turks and Caicos Islands (the)', callingCode: '796' },
  { code: 'TV', code3: 'TUV', name: 'Tuvalu', callingCode: '798' },
  { code: 'UG', code3: 'UGA', name: 'Uganda', callingCode: '800' },
  { code: 'UA', code3: 'UKR', name: 'Ukraine', callingCode: '804' },
  { code: 'AE', code3: 'ARE', name: 'United Arab Emirates (the)', callingCode: '784' },
  { code: 'GB', code3: 'GBR', name: 'United Kingdom of Great Britain and Northern Ireland (the)', callingCode: '826' },
  { code: 'UM', code3: 'UMI', name: 'United States Minor Outlying Islands (the)', callingCode: '581' },
  { code: 'US', code3: 'USA', name: 'United States of America (the)', callingCode: '840' },
  { code: 'UY', code3: 'URY', name: 'Uruguay', callingCode: '858' },
  { code: 'UZ', code3: 'UZB', name: 'Uzbekistan', callingCode: '860' },
  { code: 'VU', code3: 'VUT', name: 'Vanuatu', callingCode: '548' },
  { code: 'VE', code3: 'VEN', name: 'Venezuela (Bolivarian Republic of)', callingCode: '862' },
  { code: 'VN', code3: 'VNM', name: 'Viet Nam', callingCode: '704' },
  { code: 'VG', code3: 'VGB', name: 'Virgin Islands (British)', callingCode: '092' },
  { code: 'VI', code3: 'VIR', name: 'Virgin Islands (U.S.)', callingCode: '850' },
  { code: 'WF', code3: 'WLF', name: 'Wallis and Futuna', callingCode: '876' },
  { code: 'EH', code3: 'ESH', name: 'Western Sahara', callingCode: '732' },
  { code: 'YE', code3: 'YEM', name: 'Yemen', callingCode: '887' },
  { code: 'ZM', code3: 'ZMB', name: 'Zambia', callingCode: '894' },
  { code: 'ZW', code3: 'ZWE', name: 'Zimbabwe', callingCode: '716' },
  { code: 'AX', code3: 'ALA', name: 'Åland Islands', callingCode: '248' },
];

export interface IOrganizationTypes {
  abbr?: string;
  name: string;
}

export const organizationTypes: IOrganizationTypes[] = [
  { abbr: 'compagnie', name: 'Société par actions' },
  { abbr: 'S.E.N.C.', name: 'Société en nom collectif' },
  { abbr: 'S.E.C.', name: 'Société en commandite' },
  { abbr: '', name: 'Société en participation' },
  { abbr: '', name: 'Personne morale sans but lucratif' },
  { abbr: '', name: 'Syndicat de copropriété' },
  { abbr: '', name: 'Association' },
  { abbr: '', name: 'Autre' },
];
