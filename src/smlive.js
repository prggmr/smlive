/**
 * Copyright 2012 Nickolas Whiting
 * This file is part of proprietary software and use of this file
 * is strictly prohibited without the written consent of the owner.
 */
/**
 * smlive
 *
 * Share music live!
 */
(function(window){
/**
 * Error handling
 */
window.smlive_EXCEPTION = {
    /**
     * Invalid runtime detection
     */
    RUNTIME: 1,
    /**
     * Bad arguments recieved in a function
     */
    INVALID_ARGUMENTS: 2
}
var smlive = {
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
     * smlive application start
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
                var navigation = this.spotify.client.require(
                    'sp://smlive/src/smlive/navigation'
                ).navigation
                this.navigation = navigation
                this.navigation.start(this.spotify)
                // Handle the navigation change
                this.spotify.models.application.observe(
                    this.spotify.models.EVENT.ARGUMENTSCHANGED,
                    // call the navigation using the navigation scope 
                    function(event){
                        navigation.navigate.apply(
                            navigation, [
                              event, navigation.FOWARDBOUND_LINK
                            ]
                        )
                    }
                )
            },
            'Authentication',
            function(){
                this.authentication = this.spotify.client.require(
                    'sp://smlive/src/smlive/authentication'
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
}

/**
 * Let the window know.
 */
window.smlive = smlive;
})(window)

/**
 * Defining, Throwing and Handling smlive errors.
 */
function smliveException(type, message, object) {
    if (window.smlive.debug) {
        console.log(type, message, object)
    }
    return {
        type: type,
        message: message,
        object: object
    }
}

/**
 * Returns the smlive client.
 */
function getSmliveClient(client) {
    if (typeof client === undefined) {
        return window.smlive;
    }
    if (window.smlive.hasOwnProperty(client)) {
        return window.smlive[client]
    }
    throw new smliveException(
        window.smlive_EXCEPTION.RUNTIME, 
        'smlive has no client '+client,
        null
    )
}