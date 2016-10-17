app.controller('ScrollController', ['$scope', '$window', '$interval', '$timeout', function($scope, $window, $interval, $timeout) {
  
  var position = {
    1: 0,
    2: $('#about-section')[0].offsetTop,
    3: $('#portfolio-section')[0].offsetTop,
    4: $('#how-to-buy-section')[0].offsetTop,
    5: $('#contacts-section')[0].offsetTop
  };
  var wind = $(window);
  var windHeight = wind.height();
  var doc = $(document);
  var wheeling;
  var queue = [];
  var activeScrolling = false;
  $scope.scrollMenuIsVisible = false;
  var photoAnimationIsActive = true;
  var activePosition = Math.floor(wind.scrollTop() / windHeight) + 1;
  var mobScrlDir;
  var mobScrlDetected = false;



  $scope.scroll = function(deltaY, scrollTo) {
    activeScrolling = true;
    if (deltaY) {
      //activePosition = Math.floor(wind.scrollTop() / windHeight) + 1;
      if (deltaY > 0 && activePosition > 1) {
        activePosition -= 1;
        scrollImgAnim(activePosition);
        if (activePosition === 1) {
          //startPhotoAnimation();
        }
        $('html, body').animate({
          scrollTop: position[activePosition]
        }, 1500).promise().then(function() {
          forEachScroll(activePosition);
          if (queue[0]) {
            $scope.scroll(queue[0]);
            queue[0] = null;
          } else {
            activeScrolling = false;
          }
        });
      } else if (deltaY < 0 && activePosition < 5) {
        if (activePosition === 1) {
          //stopPhotoAnimation();
        }
        activePosition += 1;
        scrollImgAnim(activePosition);
        $('html, body').animate({
          scrollTop: position[activePosition]
        }, 1500).promise().then(function() {
          forEachScroll(activePosition);
          if (queue[0]) {
            $scope.scroll(queue[0]);
            queue[0] = null;
          } else {
            activeScrolling = false;
          }
        });
      } else if (activePosition === 1 || activePosition === 5) {
        activeScrolling = false;
        // Photo animation block
        if (activePosition === 1 && !photoAnimationIsActive) {
          //startPhotoAnimation();
        }
      }
    } else {
      if (activePosition === 1 && scrollTo != 1) {
        //stopPhotoAnimation();
      } else if (activePosition !== 1 && scrollTo == 1) {
        //startPhotoAnimation();
      }
      activePosition = scrollTo;
      scrollImgAnim(activePosition);
      $('html, body').animate({
        scrollTop: position[activePosition]
      }, 1500).promise().then(function() {
        forEachScroll(activePosition);
        if (queue[0]) {
          $scope.scroll(queue[0]);
          queue[0] = null;
        } else {
          activeScrolling = false;
        }
      });
    }
    // $timeout uses instead $apply
    $timeout(function() {
      activePosition;
    });
  };

  wind.on('mousewheel', function (e) {
    e.preventDefault();
    if (!wheeling && activeScrolling) {
      queue[0] = e.deltaY;
    }
    if (!wheeling) {
      clearTimeout(wheeling);
      wheeling = setTimeout(function() {
        wheeling = undefined;
        if (!activeScrolling) {
          $scope.scroll(e.deltaY);
        }
        // reset wheeldelta
        /*wheeldelta.x = 0;
        wheeldelta.y = 0;*/
      }, 250);
    }
    

    /*wheeldelta.x += e.deltaFactor * e.deltaX;
    wheeldelta.y += e.deltaFactor * e.deltaY;*/
  });

  /*wind.on('scroll', function(e) {
    if (wind.scrollTop() > windHeight && !$scope.scrollMenuIsVisible) {
      $scope.scrollMenuIsVisible = true;
      $scope.$digest();
    } else if (wind.scrollTop() < windHeight) {
      $scope.scrollMenuIsVisible = false;
      $scope.$digest();
    }
  });*/

  wind.on({'touchstart': function(e) {
    var swipe = e.originalEvent.touches;
    var startY = swipe[0].pageY;
    var startX = swipe[0].pageX;

    $(this).on('touchmove', function(e) {
      e.preventDefault();
      var contact = e.originalEvent.touches;
      var endY = contact[0].pageY;
      var endX = contact[0].pageX;
      var distanceY = endY - startY;
      var distanceX = endX - startX;

      if (distanceY < -30) {
        mobScrlDir = 'up';
        mobScrlDetected = true;
      }
      if (distanceY > 30) {
        mobScrlDir = 'down';
        mobScrlDetected = true;
      }
      if (distanceX > 30) {
        mobScrlDir = 'left';
        mobScrlDetected = true;
      }
      if (distanceX < -30) {
        mobScrlDir = 'right';
        mobScrlDetected = true;
      }
    })
    .one('touchend', function() {
      if (mobScrlDetected === true) {
        if (mobScrlDir === 'up') {
          $scope.scroll(-1);
          mobScrlDetected = false;
        } else if (mobScrlDir === 'down') {
          $scope.scroll(1);
          mobScrlDetected = false;
        } else if (mobScrlDir === 'right') {
          $scope.mobileContentSwitch(activePosition, 1, null);
          mobScrlDetected = false;
        } else {
          $scope.mobileContentSwitch(activePosition, -1, null);
          mobScrlDetected = false;
        }
      }
      $(this).off('touchmove touchend');
    });
  }
  });

  /*wind.on({
    'touchend': function(e) { 
    }
  });*/
  
  doc.keydown(function (e) {
    if (e.keyCode == 40) {
      e.preventDefault();
      if (activePosition < 5) {
        $scope.scroll(-1);
      }
    }
    if (e.keyCode == 38) {
      e.preventDefault();
      if (activePosition > 1) {
        $scope.scroll(1);
      }
    }
    if (e.keyCode == 37) {
      e.preventDefault();
      if (activePosition === 3) {
        $scope.clickOnLeftArrow();
      }
    }
    if (e.keyCode == 39) {
      e.preventDefault();
      if (activePosition === 3) {
        $scope.clickOnRightArrow();
      }
    }
  });

  /*wind.on("orientationchange", function(e) {
    console.log(e.orientation);;
  });*/

  /* **************** End Scroll script ******************** */

  
  /* **************** Start Animation script ******************** */
  var animObj = {
    1: "",
    2: "",
    3: bookAnimation,
    4: paperAnimation,
    5: contactsAnimation
  };
  var scrollImages = $('.scroll-imgs');

  //animObj[1](1);
  
  function scrollImgAnim(activeImg) {
    scrollImages.removeClass('active');
    scrollImages.eq(activeImg - 1).addClass('active');
  }

  function paperAnimation() {
    $('#pen').addClass('animated');
  }

  function bookAnimation() {
    $scope.clickOnLeftArrow();
  }

  function contactsAnimation() {
    $('#facebook').addClass('visited');
    $('#instagram').addClass('visited');
    $('#phone-list').addClass('visited');
  }

  function forEachScroll(activePosition) {
    if (animObj[activePosition]) {
      animObj[activePosition]();
      animObj[activePosition] = "";
    }
  }


  /* **************** Start Animation script ******************** */

  /* **************** Start Book script ******************** */
  var leftArrow = $('.arrow-left');
  var rightArrow = $('.arrow-right');
  var pages = {
    1: [
      $('#1-1'),
      $('#1-2')
    ],
    2: [
      $('#2-1'),
      $('#2-2')
    ],
    3: [
      $('#3-1'),
      $('#3-2')
    ]
  };
  var activePage = 2;
  var inactiveTurning = true;

  $scope.clickOnLeftArrow = function() {
    if (inactiveTurning) {
      if (activePage > 1) {
        pages[activePage][0].addClass('turned-left-page');
        pages[activePage - 1][0].removeClass('closed-page');
        inactiveTurning = false;
        //pages[activePage - 1][1].css('display', 'block');
      }
    }
  }
  $scope.clickOnRightArrow = function() {
    if (inactiveTurning) {
      if (activePage < _.size(pages)) {
        pages[activePage][1].addClass('turned-right-page');
        pages[activePage + 1][1].removeClass('closed-page');
        inactiveTurning = false;
        //pages[activePage + 1][0].css('display', 'block');
      }
    }
  }

  _.forEach(pages, function(item, key) {
    item[0].on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      function() {
        if (/turned-left-page/.test(item[0].attr('class'))) {
          pages[activePage][0].addClass('closed-page');
          /*pages[activePage - 1][1].css('display', 'block').promise().then(function() {
            pages[activePage - 1][1].removeClass('turned-right-page');
          });*/
          pages[activePage - 1][1].removeClass('turned-right-page');
          pages[activePage - 1][1].removeClass('closed-page');
          pages[activePage - 1][1].addClass('opened-page');
          pages[activePage - 1][0].addClass('opened-page');
          pages[activePage][1].removeClass('opened-page');
          pages[activePage][0].removeClass('opened-page');
          activePage -= 1;
        } else if (/opened-page/.test(item[0].attr('class'))) {
          pages[activePage - 1][0].addClass('closed-page');
          inactiveTurning = true;
        }
      }
    );

    item[1].on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      function() {
        if (/turned-right-page/.test(item[1].attr('class'))) {
          pages[activePage][1].addClass('closed-page');
          /*pages[activePage + 1][0].css('display', 'block').promise().then(function() {
            pages[activePage + 1][0].removeClass('turned-left-page');
          });*/
          pages[activePage + 1][0].removeClass('turned-left-page');
          pages[activePage + 1][0].removeClass('closed-page');
          pages[activePage + 1][0].addClass('opened-page');
          pages[activePage + 1][1].addClass('opened-page');
          pages[activePage][1].removeClass('opened-page');
          pages[activePage][0].removeClass('opened-page');
          activePage += 1;
        } else if (/opened-page/.test(item[1].attr('class'))) {
          pages[activePage + 1][1].addClass('closed-page');
          inactiveTurning = true;
        }
      }
    );
  });

  //leftArrow.on('click', clickOnLeftArrow);
  //rightArrow.on('click', clickOnRightArrow);


  /* **************** End Book script ******************** */

  /* **************** Start photo-animation script ******************** */

  var firstImg = angular.element('#first-img');
  var secondImg = angular.element('#second-img');
  var thirdImg = angular.element('#third-img');
  var topImgs = angular.element('.top-imgs');
  var bannerBlock = angular.element('#top-section');
  var photosTopOffset = (windHeight - bannerBlock.height() - parseInt(bannerBlock.css('margin-top')) - firstImg.height()) / 2;
  var photosLeftOffset = $('#photos > div').width() - firstImg.width() + 20;

  /*var fiMaxOffset = firstImg.offset().left + firstImg.width();
  var siMaxOffset = secondImg.offset().left + secondImg.width();
  var tiMaxOffset = thirdImg.offset().left + thirdImg.width();
  var firOffset = wind.width() - firstImg.offset().left - 50;
  var sirOffset = firOffset - firstImg.width();
  var tirOffset = sirOffset - secondImg.width() - 50;
  var fioffset = 0;
  var sioffset = 0;
  var tioffset = 0;
  var fiRotInd;
  var siRotInd;
  var tiRotInd;
  var rotateIndex = -1;

  var animationPromise;


  topImgs.css('top', photosTopOffset);

  var startPhotoAnimation = function() {
    // stops any running interval to avoid two intervals running at the same time
    stopPhotoAnimation();
    $scope.scrollMenuIsVisible = false;
    // store the interval promise
    animationPromise = $interval(photoAnimation, 2000);
    photoAnimationIsActive = true;
  };

  var stopPhotoAnimation = function() {
    $scope.scrollMenuIsVisible = true;
    $interval.cancel(animationPromise);
    photoAnimationIsActive = false;
  };

  // starting the interval by default
  startPhotoAnimation();

  // stops the interval when the scope is destroyed,
  // this usually happens when a route is changed and 
  // the ItemsController $scope gets destroyed. The
  // destruction of the ItemsController scope does not
  // guarantee the stopping of any intervals, you must
  // be responsible of stopping it when the scope is
  // is destroyed.
  $scope.$on('$destroy', function() {
    stopPhotoAnimation();
  });

  function photoAnimation() {
    firstImg.css({
      left: photosLeftOffset * Math.random(),
      top: photosTopOffset * 2 * Math.random(),
      transform: 'rotate(' + ((Math.random() - 0.5) * 11) + 'deg)'
    });
    secondImg.css({
      left: photosLeftOffset * Math.random(),
      top: photosTopOffset * 2 * Math.random(),
      transform: 'rotate(' + ((Math.random() - 0.5) * 11) + 'deg)'
    });
    thirdImg.css({
      left: photosLeftOffset * Math.random(),
      top: photosTopOffset * 2 * Math.random(),
      transform: 'rotate(' + ((Math.random() - 0.5) * 11) + 'deg)'
    });
  }*/

  /*function photoAnimation() {
    // *** First image animation *** 
    fioffset -= 100;
    if (fioffset * -1 <= fiMaxOffset) {
      fiRotInd = rotateIndex * Math.ceil(Math.random() * 6 - 1);
      rotateIndex *= -1;
      firstImg.css({
        left: fioffset + 'px',
        transform: 'rotate(' + fiRotInd + 'deg)'
      });
    } else {
      fioffset = firOffset;
      firstImg.css({
        left: fioffset + 'px'
      });
    }

    // *** Second image animation *** 

    sioffset -= 100;
    if (sioffset * -1 <= siMaxOffset) {
      siRotInd = rotateIndex * Math.ceil(Math.random() * 6 - 1);
      rotateIndex *= -1;
      secondImg.css({
        left: sioffset + 'px',
        transform: 'rotate(' + siRotInd + 'deg)'
      });
    } else {
      sioffset = sirOffset;
      secondImg.css({
        left: sioffset + 'px'
      });
    }
    
    // *** Third image animation *** 

    tioffset -= 100;
    if (tioffset * -1 <= tiMaxOffset) {
      tiRotInd = rotateIndex * Math.ceil(Math.random() * 6 - 1);
      rotateIndex *= -1;
      thirdImg.css({
        left: tioffset + 'px',
        transform: 'rotate(' + tiRotInd + 'deg)'
      });
    } else {
      tioffset = tirOffset;
      thirdImg.css({
        left: tioffset + 'px'
      });
    }
  };*/


  // ***** Resize function *****
  wind.on('resize', recalculateParameters);
  function recalculateParameters() {
    position = {
      1: 0,
      2: $('#about-section')[0].offsetTop,
      3: $('#portfolio-section')[0].offsetTop,
      4: $('#how-to-buy-section')[0].offsetTop,
      5: $('#contacts-section')[0].offsetTop
    };
    photosTopOffset = (wind.height() - bannerBlock.height() - parseInt(bannerBlock.css('margin-top')) - firstImg.height()) / 2;
    photosLeftOffset = $('#photos > div').width() - firstImg.width() + 20;
    $('html, body').animate({
      scrollTop: position[activePosition]
    }, 15);
  }
  
  /* **************** Start mobile-menu script ******************** */
  var myMenu = $("#mobile-menu-container");
  var idReference = {
    2: {
      section: 'about',
      menuItems: angular.element('#about-list li'),
      contentItems: angular.element('#about-list-content li'),
      activeContent: 0
    },
    3: {
      section: 'portfolio',
      menuItems: angular.element('#portfolio-list li'),
      contentItems: angular.element('#portfolio-list-content li'),
      activeContent: 0
    },
    4: {
      section: 'htb',
      menuItems: angular.element('#htb-list li'),
      contentItems: angular.element('#htb-list-content li'),
      activeContent: 0
    }
  };

  $scope.toggleMobMenu = function() {
    myMenu.addClass("mobile-menu-animatable");
    if(!myMenu.hasClass("mobile-menu-visible")) {		
      myMenu.addClass("mobile-menu-visible");
    } else {
      myMenu.removeClass('mobile-menu-visible');		
    }
  };

  function OnTransitionEnd() {
    myMenu.removeClass("mobile-menu-animatable");
  }

  myMenu.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', OnTransitionEnd);

  $scope.mobileContentSwitch = function(currentSection, switchDirection, switchTo) {
    var menuList = idReference[currentSection].menuItems;
    var contentList = idReference[currentSection].contentItems;
    var activeContent = idReference[currentSection].activeContent;
    if (!switchTo && switchTo != 0) {
      switchTo = activeContent + switchDirection;
    }
    idReference[currentSection].activeContent = switchTo;

    if (switchTo < 0) {
      contentList.removeClass('active');
      contentList.eq(0).addClass('last-page-left');
    } else if (switchTo > idReference[currentSection].menuItems.length - 1) {
      contentList.removeClass('active');
      contentList.eq(idReference[currentSection].menuItems.length - 1).addClass('last-page-right');
    } else {
        // Change classes in menu list
        menuList.removeClass('active');
        if (menuList.eq(activeContent).index() < switchTo) {
          menuList.eq(activeContent).addClass('moved-left');
        } else {
          menuList.eq(activeContent).addClass('moved-right');
        }

        // Change classes in content list
        contentList.removeClass('active');
        if (contentList.eq(activeContent).index() < switchTo) {
          contentList.eq(activeContent).addClass('moved-left');
        } else {
          contentList.eq(activeContent).addClass('moved-right');
        }

        // Add active class to appropriate container
        menuList.eq(switchTo).removeClass();
        menuList.eq(switchTo).addClass('active');
        contentList.eq(switchTo).removeClass();
        contentList.eq(switchTo).addClass('active');
    }
  };
  
  _.forEach(idReference, function(value, key) {
    var itemLength = value.contentItems.length;
    value.contentItems.eq(0).on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      if (value.contentItems.eq(0).hasClass('last-page-left')) {
        value.contentItems.removeClass('last-page-left');
        value.contentItems.eq(0).addClass('active');
        idReference[key].activeContent = 0;
      }
    });
    value.contentItems.eq(itemLength - 1).on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      if (value.contentItems.eq(itemLength - 1).hasClass('last-page-right')) {
        value.contentItems.removeClass('last-page-right');
        value.contentItems.eq(itemLength - 1).addClass('active');
        idReference[key].activeContent = itemLength - 1;
      }
    })
  });

}]);


