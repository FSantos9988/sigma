/**
 * ZnetDK, Starter Web Application for rapid & easy development
 * See official website http://www.znetdk.fr
 * Copyright (C) 2015 Pascal MARTINEZ (contact@znetdk.fr)
 * License GNU GPL http://www.gnu.org/licenses/gpl-3.0.html GNU GPL
 * --------------------------------------------------------------------
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * --------------------------------------------------------------------
 * PrimeUI Autocomplete widget, extended version for ZnetDK.
 *
 * File version: 1.7
 * Last update: 06/30/2022
 */

/**
 * zdkautocomplete widget
 * This widget can request and retrieve data from a ZnetDK controller action.
 */
$(function () {
    $.widget("znetdk.zdkautocomplete", $.primeui.puiautocomplete, {
        options: {
            /** PHP controller name */
            controller: null,
            /** PHP action name */
            action: null,
            /** Criteria to pass to the controller to limit the suggestions */
            criteria: null,
            /** Adjust automatically the width of the suggestions panel */
            autoWidth: false,
            /** Max number of cached items */
            maxNumberOfCachedItems: 0,
            /** Cache lifetime: 'selection', 'page' or 'localStorage' (TODO) */
            cacheLifetime: 'page'
        },
        /**
         * Overloaded _create method.
         */
        _create: function () {
            // Controller and action are initialized as options from the
            // matching HTML5 attribute.
            this._setOptionsFromAttribute();

            // Setting the AJAX request to send for getting suggestions...
            this._setOptionCompleteSource();

            // Add attribute autocomplete="off"...
            this.element.attr("autocomplete", "off");

            // Autocomplete not suspended by default
            this.suspended = false;

            // Previous query string
            this.prevQueryString = null;

            // Item Cache
            this.itemCache = [];

            // The parent contructor is called...
            this._super();
        },
        /**
         * Initializes the widget options from the matching HTML5 attribute:
         * - 'controller' and 'action' from the attribute 'data-zdk-action'
         * - 'delay' from the attribute 'data-zdk-delay'
         * - 'autoWidth' from the attribute 'data-zdk-autowidth'
         */
        _setOptionsFromAttribute: function () {
            var actionAttrib = znetdk.getActionFromAttr(this.element);
            if (actionAttrib !== false) {
                this.options.controller = actionAttrib.controller;
                this.options.action = actionAttrib.action;
            }
            var delay = znetdk.getTextFromAttr(this.element, 'data-zdk-delay');
            if (delay !== false) {
                this.options.delay = delay;
            }
            var autoWidth = znetdk.getTextFromAttr(this.element, 'data-zdk-autowidth');
            if (autoWidth !== false) {
                this.options.autoWidth = autoWidth === 'true';
            }
            var maxCachedItems = znetdk.getTextFromAttr(this.element, 'data-zdk-maxcacheditems');
            if (maxCachedItems !== false) {
                this.options.maxNumberOfCachedItems = parseInt(maxCachedItems, 10);
            }
            var cacheLifetime = znetdk.getTextFromAttr(this.element, 'data-zdk-cachelifetime');
            if (cacheLifetime !== false) {
                this.options.cacheLifetime = cacheLifetime;
            }
        },
        /**
         * Initialize the option 'completeSource' to query suggestions from
         * the controller action specified for the widget.
         */
        _setOptionCompleteSource: function() {
            var $this = this;
            if (this.options.action !== undefined) {
                this.options.completeSource = function(request, response) {
                    if ($this.suspended) {
                        return false;
                    }
                    if (!_isRequestRequired(request.query)) {
                        return; // Useless request, no result for the previous query string
                    }
                    if (_showCachedSuggestions(request.query, response)) {
                        return; // Suggestions stored in cache are shown
                    }
                    var requestData = {query: request.query};
                    if ($this.options.criteria !== null) {
                        requestData.criteria = $this.options.criteria;
                    }
                    znetdk.request({
                        control: $this.options.controller,
                        action: $this.options.action,
                        data: requestData,
                        callback: function (data) {
                            response.call($this, data);
                            if (data.length > 0) {
                                _addToCacheData(data, request.query);
                            }
                            _setPreviousQueryString(request.query, data.length);
                        }
                    });
                };
            }
            /**
             * Memorizes the previous query string
             * @param {String} queryString The previous query string
             * @param {Integer} responseCount The count of suggestions found for this
             * query string
             */
            function _setPreviousQueryString(queryString, responseCount) {
                $this.prevQueryString = {
                    queryString: queryString,
                    responseCount: responseCount
                };
            }
            /**
            * For optimization purpose, checks if retrieving suggestions from the
            * remote web server is required or not according to the previous query
            * string value and the count of matching suggestions.
            * @param {String} queryString The current query string
            * @returns {Boolean} Returns false if the previous query string is set,
            * if no suggestions were found for it and if it is contained into the
            * current query string. Otherwise return true.
            */
           function _isRequestRequired(queryString) {
               if ($this.prevQueryString !== null
                       && $this.prevQueryString.responseCount === 0
                       && queryString.indexOf($this.prevQueryString.queryString) > -1) {
                    // current query string is included into the previous query string
                    // And the previous query string returned no suggestions.
                   return false;
               }
               return true;
           }
           /**
            * Shows existing suggestions in cache matching the specified query
            * string
            * @param {String} queryString The query string to search in cache
            * @param {function} responseCallback The callback function in charge
            * of displaying the suggestion list
            * @returns {Boolean} Returns true if data exist in cache
            */
           function _showCachedSuggestions(queryString, responseCallback) {
                for (let i=0; i < $this.itemCache.length; i++) {
                    if ($this.itemCache[i].queryString === queryString) {
                        responseCallback.call($this, $this.itemCache[i].listOfItems);
                        // Cache removed on selection
                        $this.element.off('zdkautocompleteselect.zdkautocomplete')
                        .one('zdkautocompleteselect.zdkautocomplete', function() {
                            if ($this.options.cacheLifetime === 'selection') {
                                $this.itemCache = []; // Cache entries removed
                            }
                        });
                        return true;
                    }
                }
                return false; // No cache data
            }
            /**
             * Adds data in cache matching the specified query string
             * @param {array} response The data to store in cache
             * @param {String} queryString The query string
             */
            function _addToCacheData(response, queryString) {
                if ($this.itemCache.length
                        >= $this.options.maxNumberOfCachedItems) {
                    $this.itemCache.shift(); // remove old cache item
                }
                if ($this.options.maxNumberOfCachedItems > 0) {
                    $this.itemCache.push({
                        queryString: queryString,
                        listOfItems: response
                    });
                }
            }
        },
        /**
         * Enables the inputtext widget
         */
        enable: function() {
            this.element.puiinputtext('enable');
        },
        /**
         * Disables the inputtext widget
         */
        disable: function() {
            this.element.puiinputtext('disable');
        },
        /**
         * Suspends the autocomplete function
         * @param {Boolean} isSuspended Value true for suspending the autocomplete
         * or false for restoring the autocomplete.
         */
        suspend: function(isSuspended) {
            this.suspended = isSuspended;
        },
        /**
         * Sets the criterium to pass to the controller to limit the suggested
         * items to those matching the criterium
         * @param {string} criteria Criterium to send to the PHP controller
         */
        setCriteria: function(criteria) {
            this.options.criteria = criteria;
        },
        /**
         * Overloads the parent method to force the left position of the panel
         * to zero if the calculated value is negative and to change the panel
         * CSS width property value to 'auto' when the 'autoWidth' option is set
         * to 'true'.
         */
        _alignPanel: function() {
            this._super();
            var leftPosition =  parseInt(this.panel.css('left'));
            if (leftPosition < 0) {
                this.panel.css('left', 0);
            }
            if (this.options.autoWidth) {
                this.panel.css('width', 'auto');
            }
        }
    });
});