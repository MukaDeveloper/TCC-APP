// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://localhost:5078',
  // apiUrl: 'https://api-stocktrack-fuc3b4epc6g3byhm.brazilsouth-01.azurewebsites.net',
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBWkNv7131x1DLsPCF8gqI6cCIvu3bCtVM",
    authDomain: "desenfila-67924.firebaseapp.com",
    databaseURL: "https://desenfila-67924.firebaseio.com/",
    projectId: "desenfila-67924",
    storageBucket: "desenfila-67924.appspot.com",
    messagingSenderId: "729994050756",
    appId: "1:729994050756:web:07e572d37496f586b09d91",
    measurementId: "G-VTR1JNTG3L"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
