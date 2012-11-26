/**
 * Navigation
 * 
 * The navigation works by keeping the current and indexing the entire 
 * navigation, when the page is to change it closes the current and displays
 * the next.
 *
 * This also adds a nice navigation ability for going back through the app 
 * wether it is handled manually or by a signal from the spotify app. 
 * 
 */
"use strict";

exports.navigation = {
    /**
     * The Spotify Client
     */
    spotify: null,
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
    pages: null,
    /**
     * Handles the inital load of the navigation.
     *
     * Creates the navigation index and adds a handle to the navigation 
     * change.
     *
     * @param  object  spotify  The spotify API client
     *
     * @return  void
     */
    start: function(spotify) {
        this.spotify = spotify
        // setup the navigation
        if (null === this.pages) {
            this.pages = {}
            var pages = document.getElementsByClassName('page')
            for (var i=0;i<pages.length;i++) {
                var page = pages[i]
                console.log(page)
                if (this.pages.hasOwnProperty(page.id)) {
                    throw new SpooutException(
                        SPOOUT_EXCEPTION.RUNTIME,
                        "Page " + id + " already exists",
                        this
                    )
                }
                this.hide(page)
                this.pages[page.id] = page
            }
            // Navigate
            this.navigate()
        }
    },
    /**
     * Navigates between pages.
     *
     * @throws
     * @return  void
     */
    navigate: function(){
        console.log("TEST")
        var page = this.spotify.models.application.arguments[0]
        if (!this.pages.hasOwnProperty(page)) {
            throw new SpooutException(
                SPOOUT_EXCEPTION.INVALID_ARGUMENTS,
                "Invalid page "+page+" requested",
                this
            )
        }
        page = this.pages[page]
        if (null !== this.current) {
            this.hide(this.current)
        }
        this.current = page
        this.show(page)
    },
    /**
     * TODO: Add a nice transition for going page to page.
     * 
     * Shows a page.
     *
     * @param  object  page  DOMElement to show
     *
     * @return  void
     */
    show: function(page) {
        page.style.display = 'block'
    },
    /**
     * Hide a page.
     *
     * @param  object  page  DOMElement to show
     *
     * @return  void
     */
    hide: function(page) {
        page.style.display = 'none'
    }
}