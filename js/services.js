angular.module('starter.services', [])
  .factory('Storage', function () {
    return {
      set: function (key, data) {
        return window.localStorage.setItem(key, window.JSON.stringify(data));
      },
      get: function (key) {
        return window.JSON.parse(window.localStorage.getItem(key));
      },
      remove: function (key) {
        return window.localStorage.removeItem(key);
      }
    }
  })
  .factory('Message', function ($ionicLoading) {
    return {
      show: function () {
        var text = arguments[0] ? arguments[0] : 'Hi，出现了一些错误，请检查网络或者退出重试！';
        var duration = arguments[1] ? arguments[1] : 1500;
        var callback = arguments[2] ? arguments[2] : '';
        $ionicLoading.hide();
        if (typeof callback === 'function') {
          $ionicLoading.show({
            noBackdrop: true,
            template: text,
            duration: duration
          }).then(function () {
            callback();
          })
        } else {
          $ionicLoading.show({
            noBackdrop: true,
            template: text,
            duration: duration
          });
        }
      },
      loading: function () {
        var text = arguments[0] ? arguments[0] : '';
        $ionicLoading.hide();
        $ionicLoading.show({
          hideOnStateChange: false,
          duration: 10000,
          template: '<ion-spinner icon="spiral" class="spinner-stable"></ion-spinner><br/>' + text
        })
      },
      hidden: function () {
        $ionicLoading.hide();
      }
    }
  })
  .factory('TokenAuth', function ($q, Storage, $location) {
    return {
      request: function (config) {
        var userInfo = Storage.get('user');
        config.headers = config.headers || {};
        if (userInfo && userInfo.token) {
          config.headers.TOKEN = userInfo.token;
        }
        return config;
      },
      response: function (response) {
        if (response.data.code === 403) {
          Storage.remove('user');
          $location.path('/auth/login');
        }
        return response || $q.when(response);
      }
    };
  })
  .factory('Auth', function ($resource, $rootScope, $q, ENV, Message, $state, Storage) {
    var resource = $resource(ENV.TB_URL + '&do=auth', { op: '@op' });
    //检查手机号格式
    var checkMobile = function (mobile) {
      if (!ENV.REGULAR_MOBILE.test(mobile)) {
        Message.show('请输入正确的11位手机号码', 800);
        return false;
      } else {
        return true;
      }
    };
    //检查密码格式
    var checkPwd = function (pwd) {
      if (!pwd || pwd.length < 6) {
        Message.show('请输入正确的密码(最少6位)', 800);
        return false;
      }
      return true;
    };
    return {
      // 用户注册协议
      fetchAgreement: function () {
        var deferred = $q.defer();
        resource.get({ op: 'agreement' }, function (response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      // 登陆操作
      login: function (mobile, password) {
        if (!checkMobile(mobile)) {
          return false;
        }
        if (!checkPwd(password)) {
          return false;
        }
        Message.loading('登陆中……');
        resource.save({
          op: 'login',
          mobile: mobile,
          password: password
        }, function (response) {
          if (response.code == 0) {
            Message.show('登陆成功', 1000);
            Storage.set("user", response.data);
            $rootScope.globalInfo.user = response.data;
            $state.go('tab.home');
          } else {
            Message.show(response.msg, 1500);
          }
        }, function () {
          Message.show('通信错误，请检查网络', 1500);
        });
      },
      //发送注册验证码
      getSmsCaptcha: function (type, tMobile, mobile, pictureCaptcha) {
        if (!checkMobile(mobile)) {
          return false;
        }
        var deferred = $q.defer();
        Message.loading('加载中');
        var _json = {
          op: 'register',
          type: type,
          tMobile: tMobile,
          mobile: mobile,
          pictureCaptcha: pictureCaptcha
        }
        resource.save(_json, function (response) {
          Message.hidden();
          if (response.code !== 0) {
            Message.show(response.msg);
            deferred.reject();
            return false;
          } else {
            deferred.resolve();
          }
        });
        return deferred.promise;
      },
      //检查验证码
      checkCaptain: function (mobile, captcha, type) {
        if (!checkMobile(mobile)) {
          return false;
        }
        var _json = {
          op: 'register',
          type: 'verifycode',
          mobile: mobile,
          code: captcha
        };
        Message.loading();
        return resource.get(_json, function (response) {
          if (response.code !== 0) {
            Message.show(response.msg, 1500);
            //						Deferred.resolve()
            return;
          }
          $rootScope.$broadcast('Captcha.success');
          Message.show(response.msg, 1000);
        }, function () {
          Message.show('通信错误，请检查网络！', 1500);
        });
      },
      /*设置密码*/
      setPassword: function (reg, type) {
        if (reg.password.length < 6) {
          Message.show('密码长度不能小于6位！', 1500);
          return false;
        }
        if (reg.password != reg.rePassword) {
          Message.show('两次密码不一致，请检查！', 1500);
          return false;
        }
        var _json = {
          op: 'register',
          tMobile: reg.tMobile,
          mobile: reg.mobile,
          password: reg.password,
          repassword: reg.rePassword,
          code: reg.captcha
        };
        console.log(reg.mobile);
        if (type) {
          _json = {
            op: 'forget',
            mobile: reg.mobile,
            password: reg.password,
            repassword: reg.rePassword,
            code: reg.captcha
          };
        }
        Message.loading();
        return resource.save(_json, function (response) {
          if (response.code !== 0) {
            Message.show(response.msg, 1500);
            return;
          }
          $state.go('auth.login');
          Message.show("密码设置成功，请重新登录！", 1500);
        }, function () {
          Message.show('通信错误，请检查网络！', 1500);
        });
      }
    }
  })
  .factory('User', function ($resource, $rootScope, $q, ENV, Message, $state, Storage) {
    var resource = $resource(ENV.TB_URL + '&do=user', { op: '@op' });
    return {
      getGoodInfo: function (cid) {
        var deferred = $q.defer();
        resource.save({ op: 'goodInfo',cid:cid }, function (response) {
          if(response.code == 0){
            deferred.resolve(response.data);
          }else {
            Message.show(response.msg)
            deferred.reject();
          }
          
        });
        return deferred.promise;
      }
    }
  })
  .factory('Order',function($resource, $rootScope, $q, ENV, Message, $state, Storage){
      var resource = $resource(ENV.TB_URL + '&do=order', { op: '@op' });
      return {
        create:function(orderInfo){

        }
      }
  })
