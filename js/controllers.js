angular.module('starter.controllers', [])

  .controller('homeCtrl', function ($scope, Storage) {
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


  })

  .controller('myCtrl', function ($scope) {


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
  .controller('goodInfoCtrl', function ($rootScope, $scope, $stateParams, User) {
    $scope.cid = $stateParams.role;
    $scope.cidStatus = {
      '1': '金牌',
      '2': '铜牌',
      '3': '银牌'
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
  .controller('createOrderCtrl', function ($scope, $rootScope, $cordovaCamera, $ionicActionSheet, $ionicModal) {
    /*上传支付凭证*/
    $scope.payInfo = {
      goodName: '',
      goodPrice: '',
      phone: '',
      img: ''
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

  })
  .controller('userPayCtrl', function ($scope, $rootScope) {
    $scope.payType = 'credit';
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


