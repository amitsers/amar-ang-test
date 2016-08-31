app.directive("jplayer", ['$window', 'PlayerService', function ($window, PlayerService) {
    return {
        restrict: "E",
        // Have our own scope - we only want to watch the service and not conflict with other scopes
        scope: {},
        // Serve up some html with our player
        templateUrl: "partials/player.html",
        link: function (scope, element, attrs) {

            // An element on the page to attach the jPlayer to. Could also use "element" from linkFN ^
            var jPlayer = angular.element("#jquery_jplayer_1").jPlayer();

            // Point to the css
            $window.jplayerCss = "#playlist";
            // Set up a playlist

            var jPlaylist = angular.element("#playlist").jPlayer();
            console.log(jPlaylist);
            
            // Add the player service to the scope so we can watch stuff!
            scope.PlayerService = PlayerService;
            // When the Current track (on the service) changes - we want to tell jPlayer to play that new song
            scope.$watch('PlayerService.CurrentTrack', function (value) {   
                console.log(value);
                $window.myPlaylist = new jPlayerPlaylist({
                    jPlayer: "#jplayer_N",
                    cssSelectorAncestor: "#jp_container_N"
                }, value, {
                    playlistOptions: {
                        enableRemoveControls: true,
                        autoPlay: true,
                        loopOnPrevious: true
                    },
                    swfPath: "js/jPlayer",
                    supplied: "webmv, ogv, m4v, oga, mp3",
                    smoothPlayBar: true,
                    keyEnabled: true,
                    loop: true,

              });
                
                if (value) {
                    for(i=0; i<value.length; i++) {
                        if(value[i].currentTrack) {
                            $window.myPlaylist.play(i);
                        }
                    }
                    
                    // jPlayer.jPlayer('setMedia', {
                    //     mp3: value.songUrl,
                    //     title: value.songName 
                    // }).jPlayer('play');
                }
            });

            // Pausing is controlled from a service (so many things can toggle it).
            // So watch it an control jPlayer when it changes
            scope.$watch('PlayerService.IsPaused', function (value) {
                if (value != null) {
                    if (value == true) {
                        jPlayer.jPlayer('pause');
                    }
                    else {
                        jPlayer.jPlayer('play');
                    }
                }
            });

            jPlayer.bind($.jPlayer.event.ended, function (event) {
                // Song has ended, try to go next
                if (scope.PlayerService.HasNext) {
                   scope.PlayerService.Next();
                }
            });

            scope.$on('$destroy', function () {
                // Clean up memory from the events 
                jPlayer.unbind($.jPlayer.event.ended);
                jPlayer.unbind($.jplayer.event.play);
                // Don't think we'll ever destroy it (it's on every page) - and why would you want to?
                jPlayer.jPlayer('destroy');
            });
        }
    };
}]);

app.service("PlayerService", [function () {
    this.IsPaused = false;
    this.CurrentTrack = null;
    this.HasNext = false;
    // this.playList = null;
    
    this.Play = function (tracks, songId) {
        var data;
        var playlist = [];
        var current = false;
        for(var i=0; i<tracks.length; i++) {
            if(tracks[i].id === songId) {
                current = true;
            }
            playlist[i] = {
                title: tracks[i].songName,
                artist: tracks[i].artistName,
                mp3: tracks[i].songUrl,
                poster: tracks[i].albumArt,
                currentTrack: current
            };
            current = false;
        }
        

        this.CurrentTrack = playlist;
        this.IsPaused = false;

        if(tracks.length > 1) {
            this.HasNext = true;
        }
    };
    this.Pause = function () {
        this.IsPaused = !this.IsPaused;
    };
    this.Next = function () {
        console.log(2888);
    }
}]);