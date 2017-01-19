angular.module('gameApp',
               [
                 'angular-timeline',
                 'angular-scroll-animate',
                 'ngMaterial'
               ])
  .controller('GameTimelineController', function($scope) {

    $scope.games = setAllVisible(games).sort(sortAlphaDesc);
    $scope.backup = clone(games);
    $scope.filters = {
      completedOnly: false,
      alphaAsc: false,
      playedDate: false
    };

    $scope.isOpen = false;

    $scope.isMobile = function() {
      return window.innerWidth <= 800;
    };

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

    function sortPlayedDateAsc(a, b) {
      if (a.date === '' && b.date === '') {
        return sortAlphaDesc(a, b);
      } else if (a.date === '') {
        return 1;
      } else if (b.date === '') {
        return -1;
      }
      return (new Date(a.date) < new Date(b.date)) ?
        1 : (new Date(a.date) > new Date(b.date)) ? -1 : 0;
    }

    function sortPlayedDateDesc(a, b) {
      if (a.date === '' && b.date === '') {
        return sortAlphaDesc(a, b);
      } else if (a.date === '') {
        return 1;
      } else if (b.date === '') {
        return -1;
      }
      return (new Date(a.date) < new Date(b.date)) ?
        -1 : (new Date(a.date) > new Date(b.date)) ? 1 : 0;
    }

    $scope.isVisible = function(g) {
      return g.visible === true;
    };

    $scope.refresh = function() {
      $scope.games = games;
    };

    $scope.sortAlpha = function() {
      if ($scope.filters.alphaAsc === false) {
        $scope.games.sort(sortAlphaAsc);
        $scope.filters.alphaAsc = true;
      } else {
        $scope.games.sort(sortAlphaDesc);
        $scope.filters.alphaAsc = false;
      }
    };

    $scope.completedOnly = function() {
      if ($scope.filters.completedOnly === false) {
        for (var i = 0; i < $scope.games.length; i++) {
          if ($scope.games[i].completed !== true) {
            $scope.games[i].visible = false;
          }
        }
        $scope.filters.completedOnly = true;
      } else {
        $scope.games = setAllVisible($scope.games);
        $scope.filters.completedOnly = false;
      }
    };

    $scope.playedDate = function() {
      if ($scope.filters.playedDate === false) {
        $scope.games.sort(sortPlayedDateAsc);
        $scope.filters.playedDate = true;
      } else {
        $scope.games.sort(sortPlayedDateDesc);
        $scope.filters.playedDate = false;
      }
    };

    $scope.random = function() {
      shuffle($scope.games);
    };
  });
