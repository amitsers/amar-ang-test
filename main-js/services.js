app.factory('AmarEla', function($http, CONFIG) {	
    return {
        GetAlbumDetailsTypeWiseAPI: function(data) {
            var params = {
                type: data.type,
                numRec: data.numRec,
                isRandom: data.random || false
            };
            var url = CONFIG.serverDetails.host + CONFIG.serverDetails.basepath + "album.php?get=ALBMTYPWISE&type="+params.type + '&api_key='+CONFIG.serverDetails.api_key + '&num_rec='+params.numRec + '&random='+params.isRandom;
            $http.defaults.headers.common.Authorization = 'Basic';
            return $http.get(url);
        },

        GetTopSongs: function(data) {
            var params = {
                numRec: data.numRec
            };
            var url = CONFIG.serverDetails.host + CONFIG.serverDetails.basepath + "songs.php?get=TOPSNGS&api_key="+CONFIG.serverDetails.api_key + "&num_rec="+params.numRec;
            $http.defaults.headers.common.Authorization = 'Basic';
            return $http.get(url);
        },

        GetRandomSongs: function(data) {
            var params = {
                numRec: data.numRec
            };
            var url = CONFIG.serverDetails.host + CONFIG.serverDetails.basepath + "songs.php?get=TOPSNGS&api_key="+CONFIG.serverDetails.api_key + "&num_rec="+params.numRec;
            $http.defaults.headers.common.Authorization = 'Basic';
            return $http.get(url);
        },

        GetAlbumSongsByAlbumId: function(data) {
            var params = {
                id: data.id
            };
            var url = CONFIG.serverDetails.host + CONFIG.serverDetails.basepath + "songs.php?get=SNGSBYALBMID&api_key="+CONFIG.serverDetails.api_key + "&id="+params.id;
            $http.defaults.headers.common.Authorization = 'Basic';
            return $http.get(url);
        },
    };
});