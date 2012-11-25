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
window.spoout.nav = {
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
     * Creating the navigation index and adding a handle to the navigation 
     * change.
     */
    start: function(spotify) {
        console.log(this)
        this.spotify = spotify
        // onload setup the navigation
        if (null === this.pages) {
            this.pages = {}
            var pages = document.getElementsByClassName('page')
            for (i=0;i<pages.length;i++) {
                var page = pages[i]
                if (this.pages.hasOwnProperty(page.id)) {
                    throw new Exception("Page " + id + " already exists")
                }
                this.hide(page)
                this.pages[page.id] = page
            }
            // register for the onchange event
            this.spotify.models.application.observe(
                this.spotify.models.EVENT.ARGUMENTSCHANGED, 
                this.navigate
            )
        }
    },
    /**
     * Navigates between pages
     */
    navigate: function(){
        console.log()
        page = this.spotify.models.application.arguments[0]
        if (null !== this.current) {
            this.hide(this.current)
        }
        this.show(this.pages.page)
    },
    /**
     * TODO: Add a nice transition for going page to page.
     * 
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
}
