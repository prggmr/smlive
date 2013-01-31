/**
 * Copyright 2012 Nickolas Whiting
 * This file is part of proprietary software and use of this file
 * is strictly prohibited without the written consent of the owner.
 */
"use strict";
/**
 * Navigation
 * 
 * The navigation works by keeping the current and indexing the entire 
 * navigation, when the page is to change it closes the current and displays
 * the next.
 *
 * This also adds a nice ability for transversing through states though limited 
 * by memory.
 *
 * TODO
 * ----
 * - Keep track memory usage in history
 * - Store the history
 * - Create a nice transitioning effect between navigating pages 
 */
exports.navigation = {
    /**
     * Forwardbound link
     */
    FOWARDBOUND_LINK: 1,
    /**
     * Backwordsbound link
     */
    BACKWARDS_BOUND: 2,
    /**
     * Memory allowed for storing states in bytes.
     */
    ALLOWED_MEMORY: 1024,
    /**
     * Amount of memory consumed
     */
    MEMORY_CONSUMED: 0,
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
    backward_history: [],
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
                if (this.pages.hasOwnProperty(page.id)) {
                    throw new smliveException(
                        smlive_EXCEPTION.RUNTIME,
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
     * @param
     *
     * @throws
     * @return  void
     */
    navigate: function(event, type) {
        var page = this.spotify.models.application.arguments[0]
        if (typeof page !== 'object') {
            if (!this.pages.hasOwnProperty(page)) {
                throw new smliveException(
                    smlive_EXCEPTION.INVALID_ARGUMENTS,
                    "Invalid page "+page+" requested",
                    this
                )
            }
            page = this.pages[page]
        }
        if (null !== this.current) {
            this.hide(this.current)
        }
        this.show(page)
        this.current = page
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