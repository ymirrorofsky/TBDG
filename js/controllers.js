angular.module('starter.controllers', [])

  .controller('homeCtrl', function ($scope, Storage, $ionicPopup, $state, $rootScope, User, $ionicSlideBoxDelegate, $ionicLoading) {

    User.getHome().then(function (data) {
      console.log('返回成功')
      $scope.info = data;
      if ($scope.info.banner) {
        $ionicSlideBoxDelegate.$getByHandle("slideimgs").update();
      }
    })

    $scope.doRefresh = function () {

      User.getHome().then(function (data) {
        console.log('返回成功')
        $scope.info = data;
        if ($scope.info.banner) {
          $ionicSlideBoxDelegate.$getByHandle("slideimgs").update();
        }
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.show({
          noBackdrop: true,
          template: '刷新成功！',
          duration: '2000'
        });
      })
    }

    $scope.slideImgs = [
      {
        src: 'http://img.zcool.cn/community/01f20b580dc026a84a0e282bace64b.jpg@900w_1l_2o_100sh.jpg'
      },
      {
        src: 'http://img3.imgtn.bdimg.com/it/u=2700298075,1732077336&fm=23&gp=0.jpg'
      },
      {
        src: 'http://img.zcool.cn/community/01d75b57e0ff840000018c1b748e15.jpg@900w_1l_2o_100sh.jpg'
      }
    ];
    $scope.goods = [
      {
        src: 'http://pic.58pic.com/58pic/17/25/71/21G58PICDik_1024.jpg'
      },
      {
        src: 'http://img3.imgtn.bdimg.com/it/u=2700298075,1732077336&fm=23&gp=0.jpg'
      },
      {
        src: 'http://img.zcool.cn/community/01d75b57e0ff840000018c1b748e15.jpg@900w_1l_2o_100sh.jpg'
      }
    ];
    $scope.buyLists = [
      {
        src: 'http://img1.imgtn.bdimg.com/it/u=49089206,3766566677&fm=23&gp=0.jpg',
        title: '苏宁易购'
      },
      {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495183937&di=43c1432663e9b2c3bdd0602e139ae762&imgtype=jpg&er=1&src=http%3A%2F%2F7.pic.pc6.com%2Fthumb%2Fup%2F2016-5%2F2016518151329_600_0.png',
        title: '蘑菇街'
      },
      {
        src: 'http://91.gdown.baidu.com/img/0/512_512/a4a00005fbebc5354884d3da5a514b38.png',
        title: '美丽说'
      },
      {
        src: 'http://h.hiphotos.bdimg.com/wisegame/pic/item/462dd42a2834349bbc7272afc3ea15ce36d3bea0.jpg',
        title: '天猫'
      },
      {
        src: 'http://img1.imgtn.bdimg.com/it/u=49089206,3766566677&fm=23&gp=0.jpg',
        title: '苏宁易购'
      },
      {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495183937&di=43c1432663e9b2c3bdd0602e139ae762&imgtype=jpg&er=1&src=http%3A%2F%2F7.pic.pc6.com%2Fthumb%2Fup%2F2016-5%2F2016518151329_600_0.png',
        title: '蘑菇街'
      },
      {
        src: 'http://91.gdown.baidu.com/img/0/512_512/a4a00005fbebc5354884d3da5a514b38.png',
        title: '美丽说'
      },
      {
        src: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/e1e94eafe693ae655648cf3bdae9f329_121_121.jpg',
        title: '国美在线'
      },
      {
        src: 'http://img1.imgtn.bdimg.com/it/u=49089206,3766566677&fm=23&gp=0.jpg',
        title: '苏宁易购'
      },
      {
        src: 'https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/e1e94eafe693ae655648cf3bdae9f329_121_121.jpg',
        title: '国美在线'
      },
      {
        src: 'http://91.gdown.baidu.com/img/0/512_512/a4a00005fbebc5354884d3da5a514b38.png',
        title: '美丽说'
      },
      {
        src: 'http://h.hiphotos.bdimg.com/wisegame/pic/item/462dd42a2834349bbc7272afc3ea15ce36d3bea0.jpg',
        title: '天猫'
      }
    ]
    $scope.createOrder = function () {
      if ($rootScope.globalInfo.user.role == 0) {
        console.log('role==0')
        var alertPopup = $ionicPopup.alert({
          title: '提示',
          template: '该账号不能下单，请先购买会员商品',
          okText: '确定'
        });
        alertPopup.then(function (res) {
          return false;
        });
      } else {
        $state.go('user.createOrder')
      }

    }

  })

  .controller('myCtrl', function ($rootScope, $scope, $state, Message, User, $ionicLoading) {
    $scope.myInfo = {};
    User.getMyInfo().then(function (data) {
      $scope.info = data
    })

    $scope.doRefresh = function () {
      User.getMyInfo().then(function (data) {
        $scope.info = data;
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.show({
          noBackdrop: true,
          template: '刷新成功！',
          duration: '2000'
        });
      })

    }

  })
  .controller('loginCtrl', function ($rootScope, $scope, $ionicModal, $state, Message, Auth) {
    $scope.agree = true;
    $scope.authAgree = function () {
      $scope.agree = !$scope.agree;
    };
    $scope.login = {
      mobile: '',
      password: ''
    };
    $ionicModal.fromTemplateUrl('templates/modal/single-page.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.spTitle = '用户注册协议';
      //此处是请求用户注册协议
    });
    $scope.showAgreement = function ($event) {
      $scope.modal.show();
      $event.stopPropagation();
    };
    $scope.login = function () {
      if (!$scope.agree) {
        Message.show('请勾选会员注册协议')
        return false;
      }
      Auth.login($scope.login.mobile, $scope.login.password);
    }

  })
  .controller('registerCtrl', function ($rootScope, $scope, $ionicModal, $state, Message, ENV, $interval, Auth) {
    console.log('registers')
    $scope.reg = {
      step: 1,
      tMobile: '',
      mobile: '',
      pictrueCaptcha: '',
      captcha: '',
      agree: true,
      password: '',
      rePassword: '',
      number: 60,
      bol: false
    }

    //会员注册协议
    $ionicModal.fromTemplateUrl('templates/modal/single-page.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.spTitle = '用户注册协议';
      //用户注册协议请求
    })
    $scope.showAgreement = function ($event) {
      $scope.modal.show();
      $event.stopPropagation();
    }
    //获取图片验证码
    $scope.pictureCaptchaUrl = ENV.TB_URL + '&do=utility&op=getPictureCaptcha';
    //获取短信验证码
    $scope.getSmsCaptcha = function () {
      if ($scope.reg.tMobile) {
        if (!ENV.REGULAR_MOBILE.test($scope.reg.tMobile)) {
          Message.show('请输入正确的推荐人手机号');
          return;
        }
      }
      if (!$scope.reg.mobile || !ENV.REGULAR_MOBILE.test($scope.reg.mobile)) {
        Message.show('请输入正确的手机号');
        return;
      }
      if (!$scope.reg.pictureCaptcha) {
        Message.show('请输入验证码');
        return;
      }
      //发送手机验证码的请求
      Auth.getSmsCaptcha('send', $scope.reg.tMobile, $scope.reg.mobile, $scope.reg.pictureCaptcha).then(function () {
        $scope.reg.step = 2;
        $scope.countDown();
      }, function () {
        document.querySelector('img[update-img]').src = $scope.pictureCaptchaUrl; // 更新图片验证码
      });
    }
    // 验证验证码，设置密码
    $scope.next = function () {
      if ($scope.reg.step == 2) {
        Auth.checkCaptain($scope.reg.mobile, $scope.reg.captcha);
      } else if ($scope.reg.step == 3) {
        Auth.setPassword($scope.reg);
      }
    };
    //发送验证码倒计时
    $scope.countDown = function () {
      $scope.reg.step = 2;
      $scope.reg.bol = true;
      $scope.reg.number = 60;
      var timer = $interval(function () {
        if ($scope.reg.number <= 1) {
          $interval.cancel(timer);
          $scope.reg.bol = false;
          $scope.reg.number = 60;
        } else {
          $scope.reg.number--;
        }
      }, 1000)
    }
    //监听短信验证码是否成功
    $scope.$on('Captcha.success', function () {
      $scope.reg.step = 3;
    })
  })
  .controller('resetPsdCtrl', function ($rootScope, $scope, $ionicModal, $state, Message, ENV, $interval, Auth) {
    $scope.reg = {
      captcha: null,
      mobile: null,
      password: null,
      repassword: null,
      number: 60,
      bol: false
    };
    $scope.showNext = 1;
    //获取短信验证码
    $scope.getCaptcha = function () {
      Auth.getCaptcha(function (response) {
        if (response.code !== 0) {
          Message.show(response.msg);
          return false;
        }
        $rootScope.$broadcast('Captcha.send');
        Message.show(response.msg, 1000);
      }, function () {
        Message.show('通信错误，请检查网络!', 1500);
      }, $scope.reg.mobile);
    };
    //发送验证后倒计时
    $scope.$on("Captcha.send", function () {
      $scope.reg.bol = true;
      $scope.reg.number = 60;
      var timer = $interval(function () {
        if ($scope.reg.number <= 1) {
          $interval.cancel(timer);
          $scope.reg.bol = false;
          $scope.reg.number = 60;
        } else {
          $scope.reg.number--;
        }
      }, 1000)
    });
    //验证成功后
    $scope.$on("Captcha.success", function () {
      $scope.showNext = 3;
    });
    // 验证验证码
    $scope.next = function () {
      if ($scope.showNext == 3) {
        Auth.setPassword($scope.reg, 1);
      } else if ($scope.showNext == 1) {
        Auth.checkCaptain($scope.reg.mobile, $scope.reg.captcha, 1);
      }
    };
  })
  .controller('goodInfoCtrl', function ($rootScope, $scope, $stateParams, User) {
    $scope.cid = $stateParams.role;
    $scope.cidStatus = {
      '1': '金牌',
      '2': '银牌',
      '3': '铜牌'
    }
    $scope.info = {
      num: 1
    }
    User.getGoodInfo($scope.cid).then(function (data) {
      $scope.info = data;
    })
    $scope.slideImgs = [
      {
        src: 'http://img.zcool.cn/community/01f20b580dc026a84a0e282bace64b.jpg@900w_1l_2o_100sh.jpg'
      },
      {
        src: 'http://img3.imgtn.bdimg.com/it/u=2700298075,1732077336&fm=23&gp=0.jpg'
      },
      {
        src: 'http://img.zcool.cn/community/01d75b57e0ff840000018c1b748e15.jpg@900w_1l_2o_100sh.jpg'
      }
    ];

  })
  .controller('createOrderCtrl', function ($scope, $rootScope, $cordovaCamera, $ionicActionSheet, $ionicModal, ENV, Order, $state) {
    /*上传支付凭证*/
    $scope.payInfo = {
      goodName: '',
      price: '',
      mobile: '',
      img: '',
      message: ''
    };
    var selectImages = function (from) {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        targetWidth: 1500,
        targetHeight: 2000,
        correctOrientation: true,
        cameraDirection: 0
      };
      if (from == 'camera') {
        options.sourceType = Camera.PictureSourceType.CAMERA;
      }
      document.addEventListener("deviceready", function () {
        $cordovaCamera.getPicture(options).then(function (imageURI) {
          $scope.payInfo.img = "data:image/jpeg;base64," + imageURI;
          var image = document.getElementById('divImg');
          image.style.backgroundImage = "url(data:image/jpeg;base64," + imageURI + ")";
          image.setAttribute('class', 'on')
        }, function (error) {
          console.log('失败原因：' + error);
          Message.show('选择失败,请重试.', 1000);
        });
      }, false);
    };
    // 弹出选择图片 
    $scope.uploadAvatar = function () {
      var buttons = [];
      buttons = [{
        text: "拍一张照片"
      },
        {
          text: "从相册选一张"
        }
      ]
      $ionicActionSheet.show({
        buttons: buttons,
        titleText: '请选择',
        cancelText: '取消',
        buttonClicked: function (index) {
          if (index == 0) {
            selectImages("camera");
          } else if (index == 1) {
            selectImages();
          }
          return true;
        }
      })
    };

    $ionicModal.fromTemplateUrl('templates/modal/showOrder.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.orderImg = modal;
    })
    $scope.showOrder = function () {

      $scope.orderImg.show()
    }

    $scope.sureSubmit = function () {
      console.log('nihaoa')
      if (!$scope.payInfo.goodName) {
        Message.show("商品名称不能为空！");
        return false;
      }
      if (!$scope.payInfo.price) {
        Message.show("商品价格不能为空！");
        return false;
      }
      if (!$scope.payInfo.mobile || !ENV.REGULAR_MOBILE.test($scope.payInfo.mobile)) {
        Message.show("收货人联系方式！");
        return false;
      }
      if (!$scope.payInfo.img) {
        Message.show("订单凭证不能为空！");
        return false;
      }
      Order.create($scope.payInfo).then(function (data) {
        $state.go('user.orderInfo', { orderId: data.orderId, type: 1 })
      })
    }

  })
  .controller('userPayCtrl', function ($scope, $rootScope) {
    $scope.payType = 'alipay';
    $scope.selectPayType = function (type) {
      $scope.payType = type;
    };
    $scope.orderConfirm = function () {
      if ($scope.payType == 'wechat') {
        //noinspection JSUnresolvedVariable
        console.log('weixin')
        if (!window.Wechat) {
          alert("暂不支持微信支付！");
          return false;
        }
        Payment.wechatPay(model);
      } else if ($scope.payType == 'alipay') {
        console.log('支付宝')
        alert("证书尚未配置，请用微信支付！");
      }
    };
  })
  .controller('userOrderListCtrl', function ($scope, $rootScope, $stateParams, Order, $ionicModal, $timeout, $ionicLoading) {
    $scope.orderStatus = {
      '1': '待付款',
      '2': '待收货',
      '3': '已收货',
      '4': '退货',
      '5': '已完成',
      '6': '正返现',
      '7': '已返完',
    }
    $scope.orderEmpty = false;
    $scope.type = $stateParams.type;
    Order.getList($scope.type).then(function (data) {
      if (data == '' || data.length == 0) {
        $scope.orderEmpty = true;
      } else {
        $scope.orderEmpty = false;
        $scope.orderList = data;
      }
    });
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.noMore = true;
      Order.getList($scope.type).then(function (data) {
        if (data == '' || data.length == 0) {
          $scope.orderEmpty = true;
        } else {
          $scope.orderEmpty = false;
          $scope.orderList = data;
        }
        $scope.$broadcast('scroll.refreshComplete');
        $timeout(function () {
          $scope.noMore = false;
        }, 1000)
        $ionicLoading.show({
          noBackdrop: true,
          template: '刷新成功！',
          duration: '1200'
        });



      });
    }
    // 下拉加载
    $scope.noMore = false;
    $scope.page = 2;
    $scope.loadMore = function () {
      Order.getList($scope.page).then(function (response) {
        $scope.page++;
        $scope.orderList = $scope.orderList.concat(response.data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if (response.code != 0) {
          $scope.noMore = true;
          $ionicLoading.show({
            noBackdrop: true,
            template: '没有更多了！',
            duration: '1200'
          });
        }
      });
    };




  })
  .controller('userOrderInfoCtrl', function ($scope, $rootScope, $stateParams, Order, $state, $ionicModal) {
    $scope.orderStatus = {
      '1': '待付款',
      '2': '待收货',
      '3': '以收货',
      '4': '退货',
      '5': '已完成',
      '6': '正返现',
      '7': '已返完',
    }
    Order.getInfo($stateParams.orderId).then(function (response) {
      $scope.orderInfo = response.data
      $scope.payInfo = {};
      if ($scope.orderInfo.thumbs) {
        $scope.payInfo.img = $scope.orderInfo.thumbs
      }
      // if ($scope.orderInfo.status == 3) {
      //   if ($scope.orderInfo.timeout) {

      //   }
      // }
    })
    $scope.sureGet = function () {
      Order.sureGet($stateParams.orderId).then(function (data) {
        $state.go('user.orderList', ({ type: 3 }))
      })
    }
    $scope.sureFinish = function () {
      Order.sureFinish($stateParams.orderId).then(function (data) {
        $state.go('user.orderList', ({ type: 5 }))
      })
    }
    $ionicModal.fromTemplateUrl('templates/modal/showOrder.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.orderImg = modal;
    })
    $scope.showOrder = function () {
      $scope.orderImg.show()
    }


  })
  .controller('userCenterCtrl', function ($scope, $rootScope, $stateParams, User, $state, $ionicActionSheet, $ionicHistory, $ionicLoading, $timeout) {
    // 退出登录
    $scope.logout = function () {
      $ionicActionSheet.show({
        destructiveText: '退出登录',
        titleText: '确定退出当前登录账号吗？',
        cancelText: '取消',
        cancel: function () {
          return true;
        },
        destructiveButtonClicked: function () {
          User.logout();
          $ionicHistory.nextViewOptions({ //退出后清除导航的返回
            disableBack: true
          });
          $ionicLoading.show({
            noBackdrop: true,
            template: '退出成功！',
            duration: '1500'
          });
          $timeout(function () {
            $state.go('auth.login');
          }, 1200);
          return true;
        }
      });
    };
  })
  .controller('userRealNameCtrl', function ($scope, $rootScope, $stateParams, User, $state) {
    $scope.info = {
      realname: '',
      gender: 1,
    };
    // $scope.getCaptchaSuccess = false;
    $scope.personalSuccess = false;
    $scope.select = function (type) {
      $scope.info.gender = type;
    };
    $scope.sex = {
      1: '男',
      2: '女'
    }
    User.getSettingInfo().then(function (data) {
      if (data.realname == '') {
        $scope.info = {
          realname: '',
          gender: 1,
        };
        return false;
      }
      $scope.personalSuccess = true;
      $scope.info = data
    })
    $scope.submit = function () {
      var info = {
        realname: $scope.info.realname,
        gender: $scope.info.gender,
      };
      if (!$scope.info.realname || $scope.info.realname.length <= 1) {
        Message.show('请输入真实姓名！');
        return false;
      }
      User.settingInfo(info).then(function (data) {
        $state.go("user.realName")
      })
    }
  })
  .controller('userLoginPswCtrl', function ($scope, $stateParams, Message, User, $interval) {
    $scope.type = $stateParams.type;
    $scope.getCaptchaSuccess = false;
    $scope.pageData = {
      oldpsd: '',
      code: '',
      newpsd: '',
      respsd: ''
    };
    $scope.reg = {
      number: 60
    };
    // 获取修改登录或支付验证码
    $scope.getCode = function (oldpsd, newpsd, respsd, type) {
      if (oldpsd.length < 6 || newpsd.length < 6 || respsd.length < 6) {
        Message.show('请输入至少6位的密码');
        return;
      } else if (newpsd != respsd) {
        Message.show('两次密码不一致');
        return;
      }
      User.getCaptcha(oldpsd, newpsd, respsd, type).then(function (data) {
        $scope.getCaptchaSuccess = true;
        var timer = $interval(function () {
          if ($scope.reg.number <= 1) {
            $interval.cancel(timer);
            $scope.getCaptchaSuccess = false;
            $scope.reg.number = 60;
          } else {
            $scope.reg.number--;
          }
        }, 1000)
      })
    };
    $scope.savePsd = function (oldpsd, code, newpsd, respsd) {
      if (oldpsd.length < 6 || newpsd.length < 6 || respsd.length < 6) {
        Message.show('请输入至少6位的密码');
        return;
      } else if (newpsd != respsd) {
        Message.show('两次密码不一致');
        return;
      }
      else if (code.length < 4) {
        Message.show('请输入正确的验证码');
        return;
      }
      if ($scope.type == 1) {
        User.changeLoginPsd(oldpsd, code, newpsd, respsd);
      } else if ($scope.type == 2) {
        User.changePayPsd(oldpsd, code, newpsd, respsd);
      }
    }

  })
  .controller('userGetRealMoneyCtrl', function ($scope, $rootScope, User, Message, ENV, $ionicPopup, $state) {
    angular.element(document).ready(function () {
      // console.log($scope.info.cost.cash_less)
      $scope.info = {};
      $scope.allow = false;
      //请求提现余额及其他
      User.getRealMoneytotal().then(function (data) {
        $scope.info = data;
        $scope.info.bankName = data.bank.bankName || '';
        $scope.info.bankCard = data.bank.bankCard || '';
        $scope.info.bankMobile = data.bank.bankMobile || '';
        $scope.info.bankUserName = data.bank.bankUserName || '';
        $scope.info.takeMoney = ''
        if ($scope.info.money == 0) {
          $scope.allow = true;
        } else {
          $scope.allow = false;
        }
      })
      $scope.submit = function () {
        if (!$scope.info.bankName) {
          Message.show('请输入银行全称');
          return;
        }
        if (!$scope.info.bankCard || !ENV.BANK_CARD.test($scope.info.bankCard)) {
          Message.show('请输入正确的银行卡号');
          return;
        }
        if (!$scope.info.bankUserName) {
          Message.show('请输入银行开户姓名');
          return;
        }
        if (!$scope.info.bankMobile) {
          Message.show('请输入银行预留手机号');
          return;
        }
        if (!$scope.info.takeMoney || !ENV.REGULAR_MONEY.test($scope.info.takeMoney)) {
          Message.show('请输入提现金额');
          return;
        }
        // if ($scope.info.takeMoney > $scope.info.money) {
        //   Message.show('提现余额不足');
        //   return;
        // }
        // if ($scope.info.takeMoney < $scope.info.cost.cash_less) {
        //   console.log('yanby')
        //   Message.show('单次提现金额最低为' + $scope.info.cost.cash_less + '元');
        //   return false;
        // }
        // if ($scope.info.takeMoney > $scope.info.cost.cash_most) {
        //   Message.show('单日提现金额最高为' + $scope.info.cost.cash_most + '元');
        //   return false;
        // }

        User.applyRealMoney($scope.info).then(function (data) {

          var alertPopup = $ionicPopup.alert({
            title: '申请已提交',
          });
          alertPopup.then(function (res) {
            $state.go('user.repoList')
          });
        })

      }
    })
  })
  .controller('userRepoListCtrl', function ($scope, $rootScope, User, $ionicLoading, $stateParams, $timeout) {
    $scope.type = $stateParams.type;
    $scope.repoList = {};
    $scope.orderEmpty = false;
    $scope.select = $scope.type || 1;
    User.getRepoList($scope.select).then(function (response) {
      if (response.data == '' || response.data.length == 0) {
        $scope.orderEmpty = true;
      } else {
        $scope.orderEmpty = false;
        $scope.repoList = response.data
      }
    });

    $scope.active = function (id) {
      $scope.select = id;
      $scope.noMore = false;
      User.getRepoList(id).then(function (response) {
        if (response.data == '' || response.data.length == 0) {
          $scope.orderEmpty = true;
        } else {
          $scope.orderEmpty = false;
          $scope.repoList = response.data
        }
      });
    };

    // 下拉刷新
    $scope.doRefresh = function () {
      $scope.noMore = true;
      User.getRepoList($scope.select).then(function (response) {
        if (response.data == '' || response.data.length == 0) {
          $scope.orderEmpty = true;
        } else {
          $scope.orderEmpty = false;
          $scope.repoList = response.data
        }
        $scope.$broadcast('scroll.refreshComplete');
        $timeout(function () {
          $scope.noMore = false;
        }, 1000)
        $ionicLoading.show({
          noBackdrop: true,
          template: '刷新成功！',
          duration: '1200'
        });
      });
    };
    // 下拉加载
    $scope.noMore = false;
    $scope.page = 2;
    $scope.loadMore = function () {
      User.getRepoList($scope.select, $scope.page).then(function (response) {
        $scope.page++;
        $scope.repoList = $scope.repoList.concat(response.data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if (response.code != 0) {
          $scope.noMore = true;
          $ionicLoading.show({
            noBackdrop: true,
            template: '没有更多了！',
            duration: '1200'
          });
        }
      });
    };
  })
  .controller('userRepoInfoCtrl', function ($scope, Message, User, $stateParams) {
    $scope.id = $stateParams.id;
    $scope.repoInfo = {};
    $scope.orderEmpty = false;
    User.getRepoInfo($scope.id).then(function (response) {
      if (response.data == '' || response.data.length == 0) {
        $scope.orderEmpty = true;
      } else {
        $scope.repoInfo = response.data;
      }
    });
  })
  .controller('userMoneyBackCtrl', function ($scope, $stateParams, Order, $ionicLoading, $timeout) {
    $scope.moneyBack = {}
    $scope.orderEmpty = false;
    Order.getMoneyBack().then(function (data) {
      $scope.moneyBackInfo = data
      $scope.orderEmpty = false;
      if (data == '' || data.length == 0) {
        $scope.orderEmpty = true;
      }
    })

    //下拉刷新
    $scope.doRefresh = function () {
      $scope.noMore = true;
      Order.getMoneyBack().then(function (data) {
        $scope.moneyBackInfo = data
        $scope.orderEmpty = false;
        if (data == '' || data.length == 0) {
          $scope.orderEmpty = true;
        }
        $scope.$broadcast('scroll.refreshComplete');
        $timeout(function () {
          $scope.noMore = false;
        }, 1000)
        $ionicLoading.show({
          noBackdrop: true,
          template: '刷新成功！',
          duration: '2000'
        });
      })

    };
    //上拉加载
    $scope.noMore = false;
    $scope.page = 2;
    $scope.loadMore = function () {
      $scope.refreshing = false;
      Order.getMoneyBack($scope.page).then(function (data) {
        $scope.page++;
        $scope.moneyBackInfo = $scope.moneyBackInfo.concat(data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if (data.code != 0) {
          $ionicLoading.show({
            noBackdrop: true,
            template: '没有更多了！',
            duration: '1200'
          });
          $scope.noMore = true;
        }
      });
    };



  })
  .controller('recPersonDetailCtrl', function ($scope, $stateParams, User, $ionicLoading, $timeout, $ionicSlideBoxDelegate) {
    $scope.type = $stateParams.type;
    $scope.info = {};
    $scope.orderEmpty = false;
    $scope.select = $scope.type || 1;
    User.fetchRecPerson().then(function (data) {
      $scope.info.count = data
    })
    User.fetchRecPersonList($scope.select).then(function (data) {
      if (data == '' || data.length == 0) {
        $scope.orderEmpty = true;
      } else {
        $scope.orderEmpty = false;
        $scope.info.recList = data
      }
    })
    $scope.active = function (select) {
      $scope.select = select;
      $scope.noMore = true;
      User.fetchRecPersonList($scope.select).then(function (data) {
        $scope.noMore = false;
        if (data == '' || data.length == 0) {
          $scope.orderEmpty = true;
        } else {
          $scope.orderEmpty = false;
          $scope.info.recList = data
        }
      })
    };
    $scope.onSwipe = function (a) {
      if (a == 'l') {
        $scope.select++;
        console.log('l')
        if ($scope.select <= 3) {
          User.fetchRecPersonList($scope.select).then(function (data) {
            if (data == '' || data.length == 0) {
              $scope.orderEmpty = true;
            } else {
              $scope.orderEmpty = false;
              $scope.info.recList = data
            }
          });
        }
        $scope.select = Math.min(4, $scope.select);
      } else {
        console.log('r')
        $scope.select--;
        if ($scope.select > 0) {
          User.fetchRecPersonList($scope.select).then(function (data) {
            if (data == '' || data.length == 0) {
              $scope.orderEmpty = true;
            } else {
              $scope.orderEmpty = false;
              $scope.info.recList = data
            }
          });
        }
        $scope.select = Math.max(1, $scope.select);
      }
    };

    //下拉刷新
    $scope.doRefresh = function () {
      $scope.noMore = true;
      User.fetchRecPerson().then(function (data) {
        $scope.info.count = data
      })
      User.fetchRecPersonList($scope.select).then(function (data) {
        if (data == '' || data.length == 0) {
          $scope.orderEmpty = true;
        } else {
          $scope.orderEmpty = false;
          $scope.info.recList = data
        }
        $timeout(function () {
          $scope.noMore = false;
        }, 1000)
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.show({
          noBackdrop: true,
          template: '刷新成功！',
          duration: '2000'
        });
      })
    }
    //上拉加载
    $scope.noMore = false;
    $scope.page = 2;
    $scope.loadMore = function () {
      $scope.refreshing = false;
      User.fetchRecPersonList($scope.select, $scope.page).then(function (data) {
        $scope.page++;
        $scope.info.recList = $scope.info.recList.concat(data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if (data.code != 0) {
          $ionicLoading.show({
            noBackdrop: true,
            template: '没有更多了！',
            duration: '1200'
          });
          $scope.noMore = true;
        }
      });
    };
  })
  .controller('recPersonProfitCtrl', function ($scope, $stateParams, User, $ionicLoading, $timeout, $ionicSlideBoxDelegate) {
    $scope.type = $stateParams.type;
    $scope.info = {};
    $scope.orderEmpty = false;
    $scope.select = $scope.type || 1;
    User.fetchRecProfit().then(function (data) {
      $scope.info.count = data
    })

    User.fetchRecProfitList($scope.select).then(function (data) {
      if (data == '' || data.length == 0) {
        $scope.orderEmpty = true;
      } else {
        $scope.orderEmpty = false;
        $scope.info.profitList = data
      }
    })
    $scope.active = function (select) {
      $scope.select = select;
      $scope.noMore = true;
      User.fetchRecProfitList($scope.select).then(function (data) {
        $scope.noMore = false;
        if (data == '' || data.length == 0) {
          $scope.orderEmpty = true;
        } else {
          $scope.orderEmpty = false;
          $scope.info.profitList = data
        }
      })
    };
    $scope.onSwipe = function (a) {
      if (a == 'l') {
        $scope.select++;
        console.log('l')
        if ($scope.select <= 3) {
          User.fetchRecProfitList($scope.select).then(function (data) {
            if (data == '' || data.length == 0) {
              $scope.orderEmpty = true;
            } else {
              $scope.orderEmpty = false;
              $scope.info.profitList = data
            }
          })
        }
        $scope.select = Math.min(4, $scope.select);
      } else {
        console.log('r')
        $scope.select--;
        if ($scope.select > 0) {
          User.fetchRecProfitList($scope.select).then(function (data) {
            if (data == '' || data.length == 0) {
              $scope.orderEmpty = true;
            } else {
              $scope.orderEmpty = false;
              $scope.info.profitList = data
            }
          })
        }
        $scope.select = Math.max(1, $scope.select);
      }
    };
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.noMore = true;
      User.fetchRecProfit().then(function (data) {
        $scope.info.count = data
      })
      User.fetchRecProfitList($scope.select).then(function (data) {
        if (data == '' || data.length == 0) {
          $scope.orderEmpty = true;
        } else {
          $scope.orderEmpty = false;
          $scope.info.profitList = data
        }
        $timeout(function () {
          $scope.noMore = false;
        }, 1000)
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.show({
          noBackdrop: true,
          template: '刷新成功！',
          duration: '2000'
        });
      })
    }
    //上拉加载
    $scope.noMore = false;
    $scope.page = 2;
    $scope.loadMore = function () {
      $scope.refreshing = false;
      User.fetchRecProfitList($scope.select, $scope.page).then(function (data) {
        $scope.page++;
        $scope.info.profitList = $scope.info.profitList.concat(data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if (data.code != 0) {
          $ionicLoading.show({
            noBackdrop: true,
            template: '没有更多了！',
            duration: '1200'
          });
          $scope.noMore = true;
        }
      });
    };
  })
  .controller('recBuyProfitCtrl', function ($scope, $stateParams, User, $ionicLoading, $timeout, $ionicSlideBoxDelegate) {
    $scope.type = $stateParams.type;
    $scope.info = {};
    $scope.orderEmpty = false;
    $scope.select = $scope.type || 1;
    User.fetchRecBProfit().then(function (data) {
      $scope.info.count = data
    })


    User.fetchRecBProfitList($scope.select).then(function (data) {
      if (data == '' || data.length == 0) {
        $scope.orderEmpty = true;
      } else {
        $scope.orderEmpty = false;
        $scope.info.buyList = data
      }
    })
    $scope.active = function (select) {
      $scope.select = select;
      $scope.noMore = true;
      User.fetchRecBProfitList($scope.select).then(function (data) {
        $scope.noMore = false;
        if (data == '' || data.length == 0) {
          $scope.orderEmpty = true;
        } else {
          $scope.orderEmpty = false;
          $scope.info.buyList = data
        }
      })
    };
    $scope.onSwipe = function (a) {
      if (a == 'l') {
        $scope.select++;
        console.log('l')
        if ($scope.select <= 3) {
          User.fetchRecBProfitList($scope.select).then(function (data) {
            if (data == '' || data.length == 0) {
              $scope.orderEmpty = true;
            } else {
              $scope.orderEmpty = false;
              $scope.info.buyList = data
            }
          })
        }
        $scope.select = Math.min(4, $scope.select);
      } else {
        console.log('r')
        $scope.select--;
        if ($scope.select > 0) {
          User.fetchRecBProfitList($scope.select).then(function (data) {
            if (data == '' || data.length == 0) {
              $scope.orderEmpty = true;
            } else {
              $scope.orderEmpty = false;
              $scope.info.buyList = data
            }
          })
        }
        $scope.select = Math.max(1, $scope.select);
      }
    };
    //下拉刷新
    $scope.doRefresh = function () {
      $scope.noMore = true;
      User.fetchRecBProfit().then(function (data) {
        $scope.info.count = data
      })
      User.fetchRecBProfitList($scope.select).then(function (data) {
        if (data == '' || data.length == 0) {
          $scope.orderEmpty = true;
        } else {
          $scope.orderEmpty = false;
          $scope.info.buyList = data
        }
        $timeout(function () {
          $scope.noMore = false;
        }, 1000)
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.show({
          noBackdrop: true,
          template: '刷新成功！',
          duration: '2000'
        });
      })
    }
    //上拉加载
    $scope.noMore = false;
    $scope.page = 2;
    $scope.loadMore = function () {
      $scope.refreshing = false;
      User.fetchRecBProfitList($scope.select, $scope.page).then(function (data) {
        $scope.page++;
        $scope.info.buyList = $scope.info.buyList.concat(data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        if (data.code != 0) {
          $ionicLoading.show({
            noBackdrop: true,
            template: '没有更多了！',
            duration: '1200'
          });
          $scope.noMore = true;
        }
      });
    };
  })



