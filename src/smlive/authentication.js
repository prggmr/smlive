/**
 * Copyright 2012 Nickolas Whiting
 * This file is part of proprietary software and use of this file
 * is strictly prohibited without the written consent of the owner.
 */
"use strict";
/**
 * Authentication
 * 
 * Authenticating through facebook.
 */
exports.authentication = {
    /**
     * The Spotify Client
     */
    spotify: null,
    /**
     * Access token
     */
    token: null,
    /**
     * Identifier for storage token in local
     */
    AUTH_TOKEN: 'auth_token',
    /**
     * Handles the inital load of authentication.
     *
     * If the user is not authenticated it will ask to recieve.
     * 
     * @return  void
     */
    start: function(spotify, smlive) {
        this.spotify = spotify
        var token = window.localStorage.getItem(this.AUTH_TOKEN)
        if (token === null) {
            var auth = this.spotify.client.require(
                'sp://import/scripts/api/auth'
            );
            var navigation = getSmliveClient('navigation')
            navigation.navigate(navigation.pages.authentication)
            /* Set the permissions you want from the user. For more
             * info, check out http://bit.ly/A4KCW3 */
            var permissions = ['user_about_me', 'publish_stream','manage_notifications'];
            var app_id = '344581888972496';
            var login = document.getElementById('login')
            login.addEventListener('click', function(){
                auth.authenticateWithFacebook(app_id, permissions, {
                    onSuccess: function(accessToken, ttl) {
                        console.log('SUCCESS', accessToken, ttl)
                    },
                    onFailure: function(error) {
                        console.log('Authentication failed with error: ' + error);
                    },
                    onComplete: function() { 
                        console.log('THIS COMPLETED')
                    }
                })
            })
        }
    }
}