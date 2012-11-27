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
        models: null
    },
    /**
     * Facebook auth settings
     */
    facebook: {
        'permissions': [],
        'app_id': null
    },
    /**
     * Spoout application start
     */
    start: function(spotify) {
        this.spotify.client = spotify;
        var _loaders = [
            'Spotify App',
            function(){
                this.spotify.models = this.spotify.client.require(
                    'sp://import/scripts/api/models'
                )
                this.spotify.models.player.observe(
                    this.spotify.models.EVENT.CHANGE, 
                    function(event) {
                        console.log('Something changed!', event, this)
                    }
                );
            },
            'Navigation',
            function(){
                this.navigation = this.spotify.client.require(
                    'sp://spoout/src/spoout/navigation'
                ).navigation
                this.navigation.start(this.spotify)
                // Handle the navigation change
                this.spotify.models.application.observe(
                    this.spotify.models.EVENT.ARGUMENTSCHANGED,
                    // call the navigation using the navigation scope 
                    function(event){
                        this.navigation.navigate.apply(
                            this.navigation, [
                              event, this.navigation.FOWARDBOUND_LINK
                            ]
                        )
                    }
                )
            },
            'Authentication',
            function(){
                console.log(console);
                this.authentication = this.spotify.client.require(
                    'sp://spoout/src/spoout/authentication'
                ).authentication
                this.authentication.start(this.spotify)
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
                _load.apply(this)
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