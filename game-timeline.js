angular.module('gameApp',
               [
                 'angular-timeline',
                 'angular-scroll-animate'
               ])
  .controller('GameTimelineController', function($scope) {

    $scope.games = games;
    $scope.backup = clone(games);
    $scope.filters = {};

    function clone(obj) {
      var clone = [];
      for (var i = 0; i < obj.length; i++) {
        clone[i] = obj[i];
      }
      return clone;
    }

    $scope.reorder = function() {
      if ($scope.filters.alphabetical == true) {
        $scope.games = clone($scope.backup);
        $scope.filters.alphabetical = false;
      } else {
        $scope.games.sort(function(a, b) {
          return a.title > b.title;
        });
        $scope.filters.alphabetical = true;
      }
    };

    $scope.completedOnly = function() {
      if ($scope.filters.completedOnly == true) {
        $scope.games = $scope.backup;
        $scope.filters.completedOnly = false;
      } else {
        $scope.games = $scope.games.filter(function(g) {
          return g.completed == true;
        });
        $scope.filters.completedOnly = true;
      }
    };
  });
