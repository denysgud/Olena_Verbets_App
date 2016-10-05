app.controller('ScrollCtrl', ['$scope',  function($scope) { 
  
  var activePosition = 1;
  var position = {
    1: 0,
    2: $('#about-section')[0].offsetTop,
    3: $('#portfolio-section')[0].offsetTop,
    4: $('#how-to-buy-section')[0].offsetTop,
    5: $('#contacts-section')[0].offsetTop
  };

  $scope.scroll = function(someVar, moveTo) {
    activePosition = moveTo;
    console.log(position[activePosition]);
    $('html, body').animate({
      scrollTop: position[activePosition]
    }, 1500).promise().then(function() {
      console.log('yes');
    });
  };

  /*var wheeldelta = {
    x: 0,
    y: 0
    };
  var wheeling;
  $(window).on('mousewheel', function (e) {
  if (!wheeling) {
      console.log('start wheeling!');
  }

  clearTimeout(wheeling);
  wheeling = setTimeout(function() {
    console.log('stop wheeling!');
    wheeling = undefined;

    // reset wheeldelta
    wheeldelta.x = 0;
    wheeldelta.y = 0;
  }, 250);

  wheeldelta.x += e.deltaFactor * e.deltaX;
  wheeldelta.y += e.deltaFactor * e.deltaY;
  console.log(wheeldelta);
  });*/
}]);