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

    $scope.isOpen = false;

    function clone(obj) {
      var clone = [];
      for (var i = 0; i < obj.length; i++) {
        clone[i] = obj[i];
      }
      return clone;
    }

    function shuffle(a) {
      var j;
      var x;
      var i;
      for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
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

    function sortFinishedAsc(a, b) {
      return a.date > b.date;
    }

    function sortFinishedDesc(a, b) {
      return a.date < b.date;
    }

    $scope.isVisible = function(g) {
      return g.visible == true;
    };

    $scope.refresh = function() {
      $scope.games = games;
    };

    $scope.sortAlpha = function() {
      if ($scope.filters.alphaAsc == false) {
        $scope.games.sort(sortAlphaAsc);
        $scope.filters.alphaAsc = true;
      } else {
        $scope.games.sort(sortAlphaDesc);
        $scope.filters.alphaAsc = false;
      }
    };

    $scope.completedOnly = function() {
      if ($scope.filters.completedOnly == false) {
        for (var i = 0; i < $scope.games.length; i++) {
          if ($scope.games[i].completed != true) {
            $scope.games[i].visible = false;
          }
        }
        $scope.filters.completedOnly = true;
      } else {
        $scope.games = setAllVisible($scope.games);
        $scope.filters.completedOnly = false;
      }
    };

    $scope.random = function() {
      shuffle($scope.games);
    };
  });
