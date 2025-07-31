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
 * ZnetDK modal dialog widget
 *
 * File version: 1.6
 * Last update: 08/24/2021
 */
$(function () {
    $.widget("znetdk.zdkmodal", $.primeui.puidialog, {
        /**
         * Initializes the default options of the parent widget
         */
        options: {
            resizable: false,
            showEffect: 'fade',
            hideEffect: 'fade',
            minimizable: false,
            maximizable: false,
            modal: true,
            width:'auto',
            confirmationOnClose: null
        },
        /**
         * Instantiates the modal dialog and extends the event handlers to close
         * the dialog when the save & close buttons are clicked.  
         */
        _create: function () {
            /* Set Maximizable option from CSS style */
            if (this.element.hasClass('zdk-modal-maximizable')) {
                this.options.maximizable = true;
            }
            
            /* Fix dialog width from HTML5 attribute */
            this._setWidthFromAttribute();
            
            /* Confirmation message from HTML5 attribute */
            this._setConfirmationFromAttribute();
            
            /* Call of the default constructor */
            this._super();

        },
        _bindEvents: function () {
            /* Call of the parent method */
            this._super();
            
            /* The clic events of the inner form cancel and save buttons are catched for closing the dialog */
            var $this = this,
                cancelButton = this.element.find('button.zdk-bt-cancel, button.zdk-bt-no').first(),
                saveButton = this.element.find('button.zdk-bt-save, button.zdk-bt-yes').first(),
                formElement = this.element.find('form.zdk-form');
            
            cancelButton.click(function () {
                if (cancelButton.length && cancelButton.hasClass('zdk-close-dialog')) {
                    $this._closeDialog();
                }
            });
            
            this.element.on('zdkmodalclose', function(event) {
                if (cancelButton.length && cancelButton.hasClass('zdk-close-dialog')) {
                    $this._closeDialog();
                    return false;
                }
            });
            
            if (formElement.length && saveButton.length && saveButton.hasClass('zdk-close-dialog')) {
                formElement.bind("zdkformcomplete", function () {
                    var focusedButton = $this.element.find('.zdk-form button:submit:focus');
                    if (focusedButton.length && !focusedButton.hasClass('zdk-close-dialog')) {
                        // The form was submitted by clicking on a button that does not have
                        // the 'zdk-close-dialog' CSS class
                        return false; // The dialog is not hidden
                    }
                    $this.hide();
                });
            }            
        },
        _closeDialog: function() {
            if (this.options.confirmationOnClose === null) {
                this.hide();
            } else {
                if (this._areFormsModified()) {
                    // Get the dialog title
                    var closeButton = this.element.find('button.zdk-bt-cancel, button.zdk-bt-no').first(),
                        confirmationDialogTitle = closeButton.attr('title'),
                        $this = this;
                    if (confirmationDialogTitle === undefined) {
                        confirmationDialogTitle = closeButton.text();
                    } 
                    znetdk.getUserConfirmation({
                        title: confirmationDialogTitle,
                        message: this.options.confirmationOnClose[0],
                        yesLabel: this.options.confirmationOnClose[1],
                        noLabel: this.options.confirmationOnClose[2],
                        callback: function (confirmation) {
                            if (confirmation) {
                                $this.hide();
                            }
                        }
                    });
                } else {
                    this.hide();
                }
            }
        },
        /**
         * Checks if the forms within the dialog had been modified
         * @returns {boolean} Value true if at least one form data had been
         * modified.
         */
        _areFormsModified: function() {
            var formElement = this.element.find('form.zdk-form');
            if (formElement.length > 0) {
                var isFormModified = false;
                formElement.each(function() {
                    if ($(this).zdkform('isFormModified')) {
                        isFormModified = true;
                        return false;
                    }
                });
                return isFormModified;
            } else {
                return false;
            }
        },
        /**
         * Initializes the width of the dialog from the 'data-zdk-width' HTML5
         * attribute
         */
        _setWidthFromAttribute: function () {
            var widthAttrib = znetdk.getTextFromAttr(this.element, 'data-zdk-width');
            if (widthAttrib !== false) {
                this.options.width = widthAttrib;
            }
        },
        _setConfirmationFromAttribute: function() {
            var confirmationMsg = znetdk.getTextFromAttr(this.element, 'data-zdk-confirm');
            if (confirmationMsg !== false) {
                this.options.confirmationOnClose = confirmationMsg.split(":");
            }
        },
        show: function(resetPosition) {
            if (resetPosition === true) {
                this.positionInitialized = false;
            }
            this._super();
            /* Restore the maximized display when the dialog is maximizable */
            this._restoreMaximizedDisplay();
        },
        toggleMaximize: function() {
            this._super();
            if(this.maximized) { // Height fixed to 100% for getting the scroll bar
                this._setContentAutoHeight();
            } else {
                this.content.height(this.options.height);
                this.element.css('height', 'auto');
            }
            // The maximize state is stored into the web browser local storage.
            znetdk.storeLocalSettings(this.maximizedStorageKey, this.maximized);
        },
        /**
         * Displays the dialog maximized if the dialog is maximizable and if 
         * the maximization state memorized in the local settings corresponds to
         * maximized.
         * The first display of the dialog is forced to maximized if the 
         * viewport height is lower than the minimized dialog height.
         */
        _restoreMaximizedDisplay: function() {
            if (!this.options.maximizable) {
                return false; // Not maximizable ...
            }
            if (this.maximized === true) { // The dialog is displayed maximized...
                this.content.scrollTop(0); // So the dialog content is scrolled to top
            } else if (this.maximized === false) { // The dialog is not maximized
                this.element.css('height', 'auto'); // So the dialog height is fixed to 'auto';
            } 
            if (typeof this.maximized !== 'undefined') {// The dialog has been already displayed one time 
                return; // So nothing more to do...
            }
            var storageKeyPrefix = 'zdkmodal_maximized_',
                isMaximized = false;
            this.maximizedStorageKey = storageKeyPrefix + this.element.uniqueId().attr('id');
            isMaximized  = znetdk.getLocalSettings(this.maximizedStorageKey);
            if (/* Maximization forced if dialog height is too high */
                this.element.outerHeight(true) > $(window).height()
                    ||isMaximized === 'true') {
                this.toggleMaximize();
            }          
        }        
        
    });
});
