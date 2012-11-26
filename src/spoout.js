/**
 * Copyright 2012 Nickolas Whiting
 * This file is part of proprietary software and use of this file
 * is strictly prohibited without the written consent of the owner.
 */
"use strict";
/**
 * Spoout
 *
 * Listen to Spotify and share it live!
 */
(function(window){
/**
 * Error handling
 */
window.SPOOUT_EXCEPTION = {
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
     * Debug
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
        var _loaders = [
            'Spotify App',
            function(spoout){
                spoout.spotify.models = spotify.require(
                    'sp://import/scripts/api/models'
                )
                var sp = getSpotifyApi();
                var models = sp.require('sp://import/scripts/api/models');

                models.player.observe(models.EVENT.CHANGE, function(event) {
                  console.log('Something changed!', event);
                });
            },
            'Navigation',
            function(spoout){
                spoout.navigation = spotify.require(
                    'sp://spoout/src/spoout/navigation'
                ).navigation
                spoout.navigation.start(spoout.spotify)
                spoout.spotify.models.application.observe(
                    spoout.spotify.models.EVENT.ARGUMENTSCHANGED,
                    // call the navigation within the navigation scope 
                    function(event){
                        spoout.navigation.navigate.apply(
                            spoout.navigation, [event]
                        )
                    }
                )
            },
            'Authentication',
            function(spoout){
                spoout.auth()
            }
        ]
        /**
         * Add a progress bar ... like its needed ...
         */
        var _percent = document.getElementById('load_percent')
        var _item = document.getElementById('load_id')
        for (var i=0;i!=_loaders.length;i++) {
            var _load = _loaders[i]
            if (typeof _load === 'function') {
                _percent.innerHTML = Math.round(((i+1) / _loaders.length) * 100, 0)
                _load(this)
            }
            if (typeof _load === 'string') {
                _item.innerHTML = _load
            }
        }
        this.navigation.hide(document.getElementById('load'))
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