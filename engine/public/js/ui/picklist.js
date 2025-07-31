/**
 * ZnetDK, Starter Web Application for rapid & easy development
 * See official website http://www.znetdk.fr 
 * Copyright (C) 2018 Pascal MARTINEZ (contact@znetdk.fr)
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
 * PrimeUI Picklist widget, extended version for ZnetDK including:
 * OPTIONS:
 * - controller: name of the controller to call for loading listbox content
 * - action: name of the controller action to call for loading listbox content 
 * METHOD:
 * - refresh: refresh the listbox content by a new call to the specified action
 *
 * File version: 1.1
 * Last update: 10/24/2018
 */

/**
 * ZnetDK Picklist widget
 * The data of the listboxes can load from a ZnetDK controller action.
 */
$(function () {
    $.widget("znetdk.zdkpicklist", $.primeui.puipicklist, {
        options: {
            /** PHP controller name */
            controller: null,
            /** PHP action name */
            action: null,
            /** Extra criteria to pass to the controller action */
            criteria: null
        },
        /**
         * Constructs the widget (overrides the parent constructor)
         */
        _create: function () {
            this._setCaptionFromTitle();
            this._setActionFromAttribute();
            this._setFilterFromAttribute();
            this._super(); // The parent contructor is called...
            this._replaceIcons();
            this._autoLoadFromAttribute();
        },
        /**
         * Set the source and target captions from the 'title' attribute
         * of the two 'select' HTML element.
         */
        _setCaptionFromTitle: function() {
            var sourceTitle = znetdk.getTextFromAttr(this.element.children('select').eq(0), 'title'),
                targetTitle = znetdk.getTextFromAttr(this.element.children('select').eq(1), 'title');
            if (sourceTitle) {
                this.options.sourceCaption = sourceTitle;
            }
            if (targetTitle) {
                this.options.targetCaption = targetTitle;
            }
        },
        /**
         * Initializes the controller action from the HTML5 attribute 'data-zdk-action'
         */
        _setActionFromAttribute: function () {
            var actionAttrib = znetdk.getActionFromAttr(this.element);
            if (actionAttrib !== false) {
                this.options.controller = actionAttrib.controller;
                this.options.action = actionAttrib.action;
            }
        },
        /**
         * Enables the filter feature from the HTML5 attribute 'data-zdk-filter'
         */
        _setFilterFromAttribute: function () {
            var filter = znetdk.getTextFromAttr(this.element, 'data-zdk-filter');
            if (filter === 'true') {
                this.options.filter = true;
                this.options.filterMatchMode = 'contains';
            }
        },
        /** Replaces the jQueryUI icons by the Fontawesome icons */
        _replaceIcons: function() {
            // Search icons
            if(this.options.filter) {
                var searchIcons = this.element.find('div.pui-picklist-filter-container > span.ui-icon');
                searchIcons.each(function(){
                    $(this).removeClass('ui-icon ui-icon-search').addClass('fa fa-fw fa-search');
                });
            }
            // Directional buttons
            this.element.find('.pui-picklist-button-add > .pui-button-icon-left')
                .removeClass('ui-icon-arrow-1-e ui-icon').addClass('pui-icon fa fa-fw fa-angle-right');
            this.element.find('.pui-picklist-button-addall > .pui-button-icon-left')
                .removeClass('ui-icon-arrowstop-1-e ui-icon').addClass('pui-icon fa fa-fw fa-angle-double-right');
            this.element.find('.pui-picklist-button-remove > .pui-button-icon-left')
                .removeClass('ui-icon-arrow-1-w ui-icon').addClass('pui-icon fa fa-fw fa-angle-left');
            this.element.find('.pui-picklist-button-removeall > .pui-button-icon-left')
                .removeClass('ui-icon-arrowstop-1-w ui-icon').addClass('pui-icon fa fa-fw fa-angle-double-left');
        },
        /**
         * Loads the lists on widget creation if the HTML5 attribute 'data-zdk-autoload'
         * is set to 'true'
         */
        _autoLoadFromAttribute: function () {
            var autoLoad = znetdk.getTextFromAttr(this.element, 'data-zdk-autoload');
            if (autoLoad) {
                this._loadData();
            }
        },
        /**
         * Loads the items from the controller action specified
         * through the widget's options
         */
        _loadData: function () {
            if (this.options.controller && this.options.action) {
                var $this = this, request = {
                    control: this.options.controller,
                    action: this.options.action,
                    callback: function (response) {
                        $this._initLists(response);
                        $this._trigger('dataloaded');
                    }
                };
                if (this.options.criteria !== null) {
                    request.data = this.options.criteria;
                }
                znetdk.request(request);
            }
        },
        /**
         * Initializes the source and target lists from the rows specified as
         * parameters.
         * @param {array} rows Rows to load into the source and target lists 
         * according to their 'isSelected' property value.
         */
        _initLists: function(rows) {
            var sourceData = [], targetData = [];
            $.each(rows, function(index, row) {
                if (row.isSelected) {
                    targetData.push(row);
                } else {
                    sourceData.push(row);
                }
            });
            this._setOption('sourceData', sourceData);
            this._setOption('targetData', targetData);
        },
        /**
         * Refresh the lists from remote data provided by the controller
         * action set as options
         * @param {object} Set criteria option before refreshing the content
         * of the lists 
         */
        refresh: function (criteria) {
            if (typeof criteria !== 'undefined') {
                this.options.criteria = criteria;
            }
            this._loadData();
        },
        /**
         * Reload the lists
         */
        reset: function() {
            this._loadData();
        },
        /**
         * Returns the selected items moved to the target list
         * @returns {Array} The selected items as object
         */
        getSelection: function() {
            var options = this.targetInput.children('option'),
                selection = [],
                elementName = this.element.data('name') + '[]';
            if (elementName.length === 0) {
                return selection;
            }
            for(var i = 0; i < options.length; i++) {
                selection.push({name: elementName, value: $(options[i]).val()});
            }
            return selection;
        },
        /**
         * BUG FIXING: the widget events are unbent before setting the data
         * @param {jQuery} input The HTML select element as jQuery object
         * @param {jQuery} listContainer The widget list as jQuery object
         * @param {array} data The data to load into the select element and into
         * the widget list.
         */
        _setOptionData: function(input, listContainer, data) {
            this._unbindEvents();
            this._super(input, listContainer, data);
        }
    });
});