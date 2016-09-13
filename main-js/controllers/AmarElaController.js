app.controller("AmarElaController", function(PlayerService, AmarEla, $scope, $rootScope) {

    $scope.toggleInBasket = function() {
        console.log('toggle in basket');
      };

    // $scope.test = [1,2,3,4,5,6,7];
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
    	console.log(songId);
    	$scope.play($rootScope.randomSongs, songId);
    }

    $scope.play = function(tracks, songId) {        
        $scope.currentPlaylist = tracks;
    	PlayerService.Play(tracks, songId);
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

	var data = [
		{
			StreamUri: 'Tumi Je Amar By Somlata.mp3',
			Title: 'This is title'
		},
		{
			StreamUri: 'http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.mp3',
			Title: 'This is title'
		}
	];
	// PlayerService.Play(data);
	// PlayerService.Play('http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.mp3');
});