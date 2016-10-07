app.controller('ShelvesController', ['$scope', '$timeout', function($scope, $timeout) { 
  $scope.title = 'Olena Verbets Toy Designer'; 
  $scope.tabs = {
      main: {tl: "main",
             id: "menu"}
      /*"about",
      "contacts",
      "blog",
      "store"*/
  };
  $scope.down = false;

  $scope.animation = function () {
      if (!$scope.down) {
          $('#menu-dd').animate({
              bottom: 0
          });
          $scope.down = true;    
      } else {
          $('#menu-dd').animate({
              bottom: '300px'
          });
          $scope.down = false;
      };
  };
  
  $scope.isOpen = false;
  $scope.openShelf = function () {
      $scope.isOpen = true;
      $('#shelf').slideDown();
  };
  $scope.closeShelf = function () {      
      $('#shelf').slideUp();
      $timeout(function () {
          $scope.isOpen = false;
      }, 500);
  };

  /*var jqh = $(window).height();
  var jqdh = $(document).height();
  var scrollDist = 0;
  var jqdh = $(document).height();
  var activePosition = 1;
  var position = {
    1: 0,
    2: $('#about-section')[0].offsetTop,
    3: $('#portfolio-section')[0].offsetTop,
    4: $('#how-to-buy-section')[0].offsetTop,
    5: $('#contacts-section')[0].offsetTop
  };
  var maxScroll = jqdh - jqh;
  var topPosition = $('#top-section')[0].offsetTop;
  var aboutPosition = $('#about-section')[0].offsetTop;
  var portfolioPosition = $('#portfolio-section')[0].offsetTop;
  var howToBuyPosition = $('#how-to-buy-section')[0].offsetTop;
  console.log(topPosition);
  console.log(portfolioPosition);
  console.log(howToBuyPosition);
  $(window).mousewheel(function(event) {
    event.preventDefault();
    scrollDist += event.deltaFactor;
    console.log(scrollDist);
    if (event.deltaY < 0) {
      activePosition += 1;
      scrollDist += event.deltaFactor;
      console.log(scrollDist);
      $('html, body').animate({
        scrollTop: position[activePosition]
      }, 2000).promise().then(function() {
        console.log('scrolled!')
      });
    } else if (event.deltaY > 0) {
      activePosition -= 1;
      scrollDist -= event.deltaFactor;
      console.log(scrollDist);
      $('html, body').animate({
        scrollTop: position[activePosition]
      }, 2000);
    }
  });*/
}]);