angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    },

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

//geeks 
.controller('PlaylistsCtrl', function($scope, $interval) {

    $scope.technologies = ['AngularJS', "Cordova", "D3", "ABAP", "HANA SQLScript", "HANA Modelling", "UI5", "Fiori", "ABAP classic", "ABAP OO"];
    $scope.xBoundary = {
        start: 0,
        end: 100
    };
    $scope.yBoundary = {
        start: 0,
        end: 100
    };
    $scope.colors = ["red", "blue", "green", "yellow"];
    $scope.stepSize = 1;

    $scope.geeks = [];

    $scope.random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $scope.randomMovement = function() {
        if (Math.round(Math.random()) > 0)
            return 1;
        else
            return -1;
    }


    for (i = 0; i < 100; i++) {
        //id
        var geekId = i;

        //color
        var geekColor = $scope.colors[$scope.random(0, 3)];

        //technologies
        $scope.geekTech = [];
        var noOfTech = $scope.random(0, 5);
        var cnt = 0;
        for (t = 0; t < noOfTech; t++) {
            var newTech = $scope.technologies[$scope.random(0, 8)];
            //console.log($scope.geekTech.indexOf(newTech));
            if ($scope.geekTech.indexOf(newTech) == -1) {
                $scope.geekTech[cnt++] = newTech;
            }
        }

        //geek x boundary
        var geekX = $scope.random($scope.xBoundary.start, $scope.xBoundary.end);
        var geekY = $scope.random($scope.yBoundary.start, $scope.yBoundary.end);

        //create a geek
        $scope.geeks.push({
            id: geekId,
            color: geekColor,
            tech: $scope.geekTech,
            x: geekX,
            y: geekY
        });

    }

    $scope.startSimulation = function() {
        //$interval(fn, delay, [count])
        $interval($scope.randomizeGeeks, 500, 10);
    }

    $scope.randomizeGeeks = function() {
        var xStepBoundary = {
            start: 0,
            end: $scope.stepSize
        };
        var yStepBoundary = {
            start: 0,
            end: $scope.stepSize
        };

        for (g = 0; g < $scope.geeks.length; g++) {
            var currentGeek = $scope.geeks[g];
            currentGeek.x = currentGeek.x + ($scope.random(xStepBoundary.start, xStepBoundary.end) * $scope.randomMovement());
            //if new location is out of x boundary
            while (!($scope.xBoundary.start <= currentGeek.x <= $scope.xBoundary.end)) {
                currentGeek.x = currentGeek.x + ($scope.random(xStepBoundary.start, xStepBoundary.end) * $scope.randomMovement());
            }
            currentGeek.y = currentGeek.y + ($scope.random(yStepBoundary.start, yStepBoundary.end) * $scope.randomMovement());
        }
    }



})

.controller('PlaylistCtrl', function($scope, $stateParams) {})