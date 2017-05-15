angular.module('starter', ['ionic', 'starter.controllers', 'starter.routes', 'starter.services', 'starter.directives', 'ngCordova', 'ngResource'])
  .run(function ($rootScope, $ionicPlatform, Storage) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.keyboard) {
        cordova.plugins.keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.keyboard.disableScroll(true)
      }
      if (window.StatusBar) {
        Status.Bar.styleDefault()
      }
    })

    		// 初始化全局变量
		$rootScope.globalInfo = {
			user: (function() {
				return Storage.get('user') || {
					uid: false,
				}
			})()
		};

  })
  .constant('ENV', {
    'TB_URL': 'http://192.168.0.122/app/index.php?i=1&c=entry&m=taobao',
    'REGULAR_MOBILE': /^1\d{10}$/
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
   
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.withCredentials = true;
    var param = function (obj) {
      var query = '',
        name, value, fullSubName, subName, subValue, innerObj, i;
      for (name in obj) {
        value = obj[name];
        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
      return query.length ? query.substr(0, query.length - 1) : query;
    };
    $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
    /*$httpProvider.defaults.headers.post['X-CSRFToken'] = 11;*/
    $httpProvider.interceptors.push('TokenAuth');
  });