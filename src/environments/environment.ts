// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.jsonhttp://localhost:5000/api/registrarDocumentsAPI`.

export const environment = {
	production: false,
	registrarFileServiceURL: 'http://localhost:5000/api/registrarFileAPI/',
	registrarDocumentsServiceURL: 'http://localhost:5000/api/registrarDocumentsAPI',
	regionServiceURL: 'http://localhost:5000/api/regionAPI/',
	photoServiceURL: 'http://localhost:5000/api/photoAPI',
	clientInAccountServiceURL: 'http://localhost:5000/api/clientListAPI',
	accountsListServiceURL: 'http://localhost:5000/api/accountsListAPI',
	postsServiceURL: 'http://localhost:5000/api/PostsAPI'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
