app.controller("AmarElaController", function(PlayerService, AmarEla, $scope, $rootScope, $route, $location, $routeParams) {
    $scope.loadSearchItems = function (search) {
        AmarEla.SearchOnAmarEla({text: search, limit: 10}).success(function(resp) {
            $scope.searchText = resp;
            console.log(resp);
        }).error(function(error) {
            console.log(error);
        });
    }


    $scope.redirectTo = function(url) {
        $location.path(url);
    }

    $scope.play = function(tracks, songId) {
        $scope.currentPlaylist = tracks;
        PlayerService.Play(tracks, songId);
    }

    if($route.current) {
        if($location.path().split('/')[1] == 'search') {
            console.log(2222222);
        }
        else if($location.path().split('/')[1] == 'album') {
            var albumId = $route.current.params.albumId;
            $scope.haha = false;
            AmarEla.GetAlbumSongsByAlbumId({id: albumId}).success(function(res) {
                $scope.albumSongs = res;
                var type = res[0].type;
                if(res[0].type = 'Unknown') {
                    type = 'Modern';
                }
                var GetrelatedAlbumParams = {
                    type: type,
                    numRec: 12,
                    random: true
                }
                AmarEla.GetAlbumDetailsTypeWiseAPI(GetrelatedAlbumParams).success(function(resp) {
                    $scope.relatedAlbums = resp.lists;
                }).error(function(error) {
                    console.log(error);
                });
            }).error(function(error) {
                console.log(error);
            });
    
            $scope.playFromSongPlaylist = function(songId){
                $scope.play($scope.albumSongs, songId);
            }
        } else if($location.path().split('/')[1] == 'albums') {
            var albumType = $route.current.params.type;
            $scope.albumType = albumType;
            var GetAlbumDetailsTypeWiseAPIParams = {
                type: albumType,
                numRec: 10000
            }

            AmarEla.GetAlbumDetailsTypeWiseAPI(GetAlbumDetailsTypeWiseAPIParams).success(function(res) {
                $scope.allAlbums = res.lists;
                console.log(res.lists);
            }).error(function(error) {
                console.log(error);
            });
        }
    } else {
        AmarEla.GetTopSongs({numRec: 5}).success(function(res) {
            $scope.test = res;
            $rootScope.topFive = res;
        }).error(function(error) {
            console.log(error);
        });

        AmarEla.GetRandomSongs({numRec: 8}).success(function(res) {
            $rootScope.randomSongs = res;
        }).error(function(error) {
            console.log(error);
        });

        $scope.playRandomSong = function(songId) {
            $scope.play($rootScope.randomSongs, songId);
        }

        $scope.playTopFive = function(songId) {
            $scope.play($rootScope.topFive, songId);
        }

        var GetAlbumDetailsTypeWiseAPIParams = {
            type: 'Recently-added',
            numRec: 12
        }

        AmarEla.GetAlbumDetailsTypeWiseAPI(GetAlbumDetailsTypeWiseAPIParams).success(function(res) {
            $scope.albums = res.lists;
        }).error(function(error) {
            console.log(error);
        });
    }
});