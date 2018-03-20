// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: any = {
  name:'develop',
  production: true,
  baseAPIURL: '/api',
  logoutUrl: 'https://cspportal.ais.co.th/SFFWeb/pages/home/portal.jsf',
  homeUrl: 'https://cspportal.ais.co.th/SFFWeb/pages/home/aisMyChannel.jsf',
  cspUrl: 'https://cspportal.ais.co.th/SFFWeb/pages/om/om_customer_portal.jsf?idRefresh=0',
  baseHref: '/',
  sentryDSN: 'https://e92a4386b14a456490ac40393464f28f@sentry.io/182599',
  sentryTags: 'develop',
  checkListMobileStatus: ["000", "377", "378", "379", "384", "310"],
  clientID: ''
};
