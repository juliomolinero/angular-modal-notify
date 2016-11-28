/**
 * Main entry point to start our Angular application
 * Inject ng-animate, ng-sanitize and ui.bootstrap to be able to display modal pop-ups
 * Inject ng-notify to display nice and elegant messages 
 */
var ngAppModule = angular.module('ngAppModule', ['ngNotify', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
.config([function () {
    /* Configuration is where you configure providers ( not instances)*/
    console.log("ngAppModule Configuration hook")
}])
.run([function () {
    /* Run is when the app gets kicked off*/
    console.log("ngAppModule Run hook");
}]);