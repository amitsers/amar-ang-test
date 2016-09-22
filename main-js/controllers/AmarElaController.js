app.controller("AmarElaController", function(PlayerService, AmarEla, $scope, $rootScope, $route, $location) {

    $scope.redirectTo = function(url) {
        $location.path(url);
    }

    $scope.play = function(tracks, songId) {        
        $scope.currentPlaylist = tracks;
        PlayerService.Play(tracks, songId);
    }

    if($route.current) {
        if($location.path().split('/')[1] == 'album') {
            var albumId = $route.current.params.albumId;
            $scope.haha = false;
            AmarEla.GetAlbumSongsByAlbumId({id: albumId}).success(function(res) {
                $scope.albumSongs = res;
                console.log(res);
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
                    console.log(resp.lists);
                }).error(function(error) {
                    console.log(error);
                });
            }).error(function(error) {
                console.log(error);
            });
    
            $scope.playFromSongPlaylist = function(songId){
                $scope.play($scope.albumSongs, songId);
            }
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