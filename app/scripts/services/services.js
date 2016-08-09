angular.module('webApp')
    .service('getReposForUserService', ['$http', '$q', function($http, $q) {
        this.getRepos = function(repoUserName) {
            var deffered = $q.defer();

            $http.get('https://api.github.com/users/' + repoUserName + '/repos').then(function(data){
                deffered.resolve(data)
            }, function(err){
                deffered.reject(err);
            });

            return deffered.promise;
        };
   }]);
