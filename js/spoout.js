/**
 * Spoout
 */
(function(){
// on application start
window.onload = function() {
    // load spoout with spotify API client
    spoout.start(getSpotifyApi(1))
}

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
     * Navigation
     */
    navigation: {
        /**
         * Current page
         */
        current: null,
        /**
         * History of navigation.
         *
         * Each history node contains.
         * {
         *     'page': pageID,
         *     'time': Timestamp
         * }
         */
        history: [],
        /**
         * Foward history navigation
         *
         * Storage nodes are contained indentically to the history.
         */
        foward_history: [],
        /**
         * Nodes
         *
         * Page navigation nodes.
         */
        pages: null
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
        this.auth()
        this.nav.load()
    },
    /**
     * Navigation
     * 
     * The navigation works but keeping the current and indexing the entire 
     * navigation, when the page is to change it closes the current and displays
     * the next.
     *
     * This also adds a nice navigation ability for going back through the app 
     * wether it is handled manually or by a signal from the spotify app. 
     * 
     */
    nav: {
        /**
         * Handles the inital load of the navigation.
         *
         * Creating the navigation index and adding a handle to the navigation 
         * change.
         */
        load: function() {
            // onload setup the navigation
            if (null === parent.navigation.pages) {
                this.navigation.pages = {}
                var pages = document.getElementsByClassName('page')
                var conf = this.navigation.pages
                for (i=0;i<pages.length;i++) {
                    var page = pages[i]
                    if (conf.hasOwnProperty(page.id)) {
                        throw new Exception("Page " + id + " already exists")
                    }
                    conf[page.id] = page
                }
                // register for the onchange event
                this.spotify.models.application.observe(
                    models.EVENT.ARGUMENTSCHANGED, 
                    this.nav.navigate
                )
            }
        },
        /**
         * Navigates between pages
         */
        navigate: function(){
            page = this.spotify.models.application.arguments[0]
            if (null !== this.navigation.current) {
                this.navigation.hide(this.navigation.current)
            }
            this.navigation.show(this.navigation.pages.page)
        },
        /**
         * Shows a page
         */
        show: function(page) {
            page.style.display = 'block'
        },
        /**
         * Hide a page
         */
        hide: function(page) {
            page.style.display = 'none'
        }
    },
    /**
     * Facebook authentication
     */
    auth: function(){
        console.log('TODO: FACEBOOK AUTH')
    }

}
})(window)