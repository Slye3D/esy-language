# Angular
Esy provides a way to work with angular.js with it's special blocks.

**Syntax**:

config:
```
($appname).config([...services]){

}
```
controller:
```
($appname).controller<name>([...services]){

}
```

> Note: In Esy you must start your app name with $

Example:
let **$**app = angular.module(...)

# Example
This is just a complete example show you how to work with Angular.js in Esy
```esy
let $app = angular.module('slye', [
        'ngRoute',
        'slye.dashboard'
]);

$app.config($routeProvider){
        $routeProvider.when('/dashboard', {
                templateUrl : 'views/slye.dashboard.html',
                controller  : 'DashboardCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/dashboard'});
}
$app.controller<"DashboardCtrl">($route, $routeParams){

}
```