angular.module('starter', ['ionic', 'starter.controllers', 'starter.routes', 'starter.services', 'starter.directives', 'ngCordova', 'ngResource'])
  .run(function ($rootScope, $ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.keyboard) {
        cordova.plugins.keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.keyboard.disableScroll(true)
      }
      if (window.StatusBar) {
        Status.Bar.styleDefault()
      }
    })

  })
  .constant('ENV',{
    'TB_URL':'http://192.168.0.107/app/index.php?i=1&c=entry&m=welfare',
    'REGULAR_MOBILE':/^1\d{10}$/
  })
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    $ionicConfigProvider.views.transition('no')
  })