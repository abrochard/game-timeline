angular.module('gameApp',
               [
                 'angular-timeline',
                 'angular-scroll-animate',
                 'ngMaterial'
               ])
  .controller('GameTimelineController', function($scope) {

    $scope.games = setAllVisible(games).sort(sortAlphaDesc);;
    $scope.backup = clone(games);
    $scope.filters = {
      completedOnly: false,
      alphaAsc: false
    };

    function clone(obj) {
      var clone = [];
      for (var i = 0; i < obj.length; i++) {
        clone[i] = obj[i];
      }
      return clone;
    }

    function setAllVisible(list) {
      for (var i = 0; i < list.length; i++) {
        list[i].visible = true;
      }
      return list;
    }

    function sortAlphaAsc(a, b) {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
    }

    function sortAlphaDesc(a, b) {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }

    $scope.isVisible = function(g) {
      return g.visible == true;
    };

    $scope.refresh = function() {
      $scope.games = games;
    };

    $scope.sortAlpha = function(b) {
      if (b) {
        $scope.games.sort(sortAlphaAsc);
      } else {
        $scope.games.sort(sortAlphaDesc);
      }
    };

    $scope.completedOnly = function(b) {
      if (b) {
        for (var i = 0; i < $scope.games.length; i++) {
          if ($scope.games[i].completed != true) {
            $scope.games[i].visible = false;
          }
        }
      } else {
        $scope.games = setAllVisible($scope.games);
      }
    };
  });
