angular.module('gameApp', ['angular-timeline', 'angular-scroll-animate'])
  .controller('GameTimelineController', function($scope) {

    $scope.games = games;

    $scope.reorder = function() {
      self.games.sort(function(a, b) {
        return a.title <= b.title;
      });
    };
  });
