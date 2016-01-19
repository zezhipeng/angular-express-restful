/**
 * Created by root on 16-1-18.
 */
(function (angular) {
    angular.module("app", ["ngResource"])
        .config(['$resourceProvider', function ($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }])
        .factory("restful", function ($resource) {
            var restful = this
            restful.user = $resource("/user/:name", {name: "@id"},
                {
                    getOneUser: {method: "GET"},
                    getUsers: {method: "GET", params: {}, isArray: true},
                    createUser: {method: "POST"},
                    updateUser:{method:"PUT"},
                    delUser:{method:"DELETE"}
                }
            );
            return restful
        })
        .controller("restful", function ($scope, restful) {
            var userInit =  function(){
                restful
                    .user
                    .getUsers()
                    .$promise
                    .then(function (res) {
                        console.log(res)
                        $scope.users = res
                    });
            };
            userInit();
            $scope.login = function (user) {
                restful
                    .user
                    .createUser(user)
                    .$promise
                    .then(function (res) {
                        console.log(res)
                        userInit();
                    })
            };
            $scope.put =function(user){
              console.log(user)
                restful
                    .user
                    .updateUser(user)
                    .$promise
                    .then(function(res){
                        userInit()
                    })
            };
            $scope.del = function(user){
                restful
                    .user
                    .delUser({name:user.name})
                    .$promise
                    .then(function(res){
                        userInit()
                    })
            }

        })

})(window.angular);
