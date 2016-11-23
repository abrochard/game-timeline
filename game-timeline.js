angular.module('gameApp', ['angular-timeline', 'angular-scroll-animate'])
    .controller('GameTimelineController', function($scope) {
        var self = this;

        self.games = games;
    });
