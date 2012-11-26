/**
 * Spoout
 */
(function(window){
/**
 * Error handling
 */
window.SPOOUT_EXCEPTION = SPOOUT_EXCEPTION = {
    /**
     * Invalid runtime detection
     */
    RUNTIME: 1,
    /**
     * Bad arguments recieved in a function
     */
    INVALID_ARGUMENTS: 2
}

var spoout = {
    /**
     * Debug Mode
     */
    debug: false,
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
        /**
         * Load spoout application
         */
        spotify.require(
            'sp://spoouts/js/spoout/nav'
        )
        this.nav.start(spotify)
        this.auth()
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

/**
 * Defining, Throwing and Handling Spoout errors.
 */
function SpooutException(type, message, object) {
    if (spoout.debug) {
        console.log(type, message, object)
    }
    return {
        type: type,
        message: message,
        object: object
    }
}