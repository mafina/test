angular.module('webApp')
    .controller('MainController', function($scope, getReposForUserService, httpStatusCodes){
        $scope.repoData = [];
        $scope.repoName = {name: ''};
        $scope.err = {};

        $scope.getListOfRepos = function() {
            getReposForUserService.getRepos($scope.repoName.name).then(
            function(res){
                $scope.err = {};
                $scope.repoData = res.data;       
            }, function(err){
                $scope.repoData = [];
                $scope.err = httpStatusCodes[err.status]; 
            });
        };

    });
