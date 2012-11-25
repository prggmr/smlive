/**
 * Spoout
 */
(function(window){

var spoout = {
    /**
     * Spotify
     */
    spotify: {
        /**
         * API client
         */
        client: null,
        /**
         * Spotify Models
         */
        models: null,
    },
    /**
     * Facebook auth settings
     */
    facebook: {
        'permissions': [],
        'app_id': null,
    },
    /**
     * Spoout application start
     */
    start: function(spotify) {
        this.spotify.client = spotify;
        /**
         * Initalize models
         */
        this.spotify.models = spotify.require(
            'sp://import/scripts/api/models'
        )
        console.log(spotify.require(
            'sp://import/scripts/api/models'
        ))
        spotify.require(
            'sp://spoouts/js/spoout/nav'
        )
        this.auth()
        this.nav.start(this.spotify)
        // Remove itself from the window
        // if (window.hasOwnProperty('spoout')) {
        //     window.spoout = null;
        // }
    },
    /**
     * Facebook authentication
     */
    auth: function(){
        console.log('TODO: FACEBOOK AUTH')
    }

}

/**
 * Let the window know.
 */
window.spoout = spoout;

})(window)