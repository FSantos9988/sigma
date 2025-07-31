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
 * ZnetDK Javascript Client API
 *
 * File version: 1.16
 * Last update: 10/18/2023
 */

/* global znetdkAjaxURL */
var znetdk = {
    requestContext: [],
    ajaxInProgress: 0,
    /**
     * Send an AJAX request to the specified controller
     * @param {Object} options object containing the parameters of the request
     * @returns {jqXHR} object used for synchronization purpose.
     */
    request: function (options) {
        var $this = this, ajaxURL = this.getParamsFromAjaxURL(znetdkAjaxURL);
        if (options.control && options.action) {
            var ajaxOptions = {
                type: "POST",
                url: ajaxURL.url,
                success: function (response) {
                    try {
                        if (options.htmlTarget) {
                            options.htmlTarget.prepend(response);
                            var innerForm = options.htmlTarget.find('form.zdk-form').last(),
                                functionToCallback = typeof options.callback === "function",
                                waitUntilFormIsReady = !options.htmlTarget.is('body') && innerForm.length > 0 && functionToCallback;
                            if (waitUntilFormIsReady) {
                                innerForm.one('zdkformready', function() {
                                    options.callback(response);
                                });
                            }
                            $this.autoInitWidgets(options.htmlTarget);
                            if (functionToCallback && !waitUntilFormIsReady) {
                                options.callback(response);
                            }
                        } else if (typeof response === "object") {
                            if (typeof options.callback === "function") {
                                options.callback(response);
                            } else {
                                var levelMsg = response.success === false ? 'error' :
                                        response.warning === true ? 'warn' : 'info',
                                        summary = response.summary === undefined ? 'Message' :
                                        response.summary;
                                $this.message(levelMsg, summary, response.msg);
                            }
                        } else {
                            $this.message('error', 'Message', 'Invalid Ajax response sent by the web server!');
                        }
                    } catch (err) {
                        console.error('ZnetDK - JS error detected on AJAX request', options, err);
                        $('body').trigger('zdkrequestcallbackjserror', {ajaxContext: options, jsError: err});
                    }
                },
                error: function (response) {
                    var isDisconnected, errorMsg, errorSummary, appVersion, reloadSummary, reloadMsg,
                            errorLevel = response.status === 401 ? 'warn' : 'critical';
                    if (/application\/json/.test(response.getResponseHeader('Content-Type'))) {
                        try {
                            let errorObject = JSON.parse(response.responseText);
                            isDisconnected = errorObject.is_disconnected;
                            errorMsg = errorObject.msg;
                            errorSummary = errorObject.summary;
                            appVersion = errorObject.appver;
                            reloadSummary = errorObject.reload_summary;
                            reloadMsg = errorObject.reload_msg;
                        } catch (e) {
                        }
                    }
                    if (response.status === 0) {
                        let msgArray = $('#zdk-network-error-msg').html().split("|");
                        errorSummary = msgArray[0];
                        errorMsg = msgArray[1];
                        errorLevel = 'error';
                    } else if (errorMsg === undefined) {
                        errorMsg = "The JSON response returned by the controller='" + options.control + "' and the action='" + options.action +
                            "' can't be parsed! HTTP status: " + response.status + ' ' + response.statusText;
                        errorSummary = 'Error parsing server response';
                    }
                    $this.message(errorLevel, errorSummary, errorMsg);
                    if (response.status === 401 && isDisconnected === false) {
                        if (typeof appVersion === 'number' && typeof reloadSummary === 'string'
                                && typeof reloadMsg === 'string'
                                && parseInt($('body').data('appver')) < appVersion) {
                            // New app's version, reloading is required
                            reloadApp(reloadSummary, reloadMsg);
                        } else {
                            $this.requestContext.push(options);
                            if ($this.requestContext.length === 1) {
                                $this.showLoginDialog(); // Login dialog to renew user credentials
                            }
                        }
                    } else if (response.status === 401 && isDisconnected === true) {
                        reloadApp(errorSummary, errorMsg);
                    }
                }
            };
            if (options.data && typeof options.data === "object") {
                let requestData;
                if (options.data.length === undefined) {
                    let property;
                    requestData = 'control=' + options.control + '&action=' + options.action;
                    for (property in options.data) {
                        var value = options.data[property],
                            encodedValue = typeof value === 'string' ? encodeURIComponent(value) : value;
                        if (value !== undefined && value !== null) {
                            requestData += '&' + property + '=' + encodedValue;
                        }
                    }
                } else {
                    requestData = 'control=' + options.control + '&action=' + options.action + '&' + $.param(options.data);
                }
                if (ajaxURL.paramName !== undefined) {
                    requestData += '&' + ajaxURL.paramName + '=' + ajaxURL.paramValue;
                }
                ajaxOptions.data = requestData;
            } else if (options.fileToUpload && typeof options.fileToUpload === "object") {
                let formData = new FormData();
                formData.append('control', options.control);
                formData.append('action', options.action);
                if (ajaxURL.paramName !== undefined) {
                    formData.append(ajaxURL.paramName, ajaxURL.paramValue);
                }
                if (options.fileToUpload.inputName !== undefined
                        && options.fileToUpload.file !== undefined) {
                    formData.append(options.fileToUpload.inputName, options.fileToUpload.file,
                            options.fileToUpload.file.name);
                    ajaxOptions.data = formData;
                    ajaxOptions.processData = false;
                    ajaxOptions.contentType = false;
                } else {
                    throw new Error("znetdk.request: 'fileToUpload' option is not properly set!");
                }
            } else {
                ajaxOptions.data = {control: options.control, action: options.action};
                if (ajaxURL.paramName !== undefined) {
                    ajaxOptions.data[ajaxURL.paramName] = ajaxURL.paramValue;
                }
            }
            // Add UI Token to AJAX options
            const token = $('body').data('ui-token');
            if (token && token.length > 0) {
                if (ajaxOptions.data instanceof FormData) {
                    ajaxOptions.data.append('uitk', token);
                } else if (typeof ajaxOptions.data === 'string') {
                    ajaxOptions.data += '&uitk=' + token;
                } else if (typeof ajaxOptions.data === 'object') {
                    ajaxOptions.data.uitk = token;
                }
            }
            // Send AJAX request
            return $.ajax(ajaxOptions);
        } else {
            console.log("Call to znetdk.request failed : ", options.control, options.action);
        }
        function reloadApp(summary, msg) {
            znetdk.notifyUser({
                title: summary,
                message: msg,
                buttonLabel: 'Ok',
                callback: function() {
                    // No longer confirmation message on application reload or close
                    $(window).off('beforeunload').off('unload');
                     // The page is reloaded
                    location.reload();
                }
            });
        }
    },
    /**
     * Loads the view from the web server in under a HTML element
     * @param {Object} options options of the view to load
     * @returns {undefined}
     */
    loadView: function (options) {
        if (options.htmlTarget.length) {
            znetdk.request(options);
        }
    },
    /**
     * Shows the specified ZnetDK modal dialog and execute the callback
     * functions before and after its display.
     * If the dialog does not exist in the DOM, it is loaded first.
     * @param {String} dialogId Identifier of the 'zdkmodal' dialog Element
     * @param {String} viewName Name of the view containing the dialog to display
     * @param {function} beforeShow Function to call before the display of the
     * dialog. If the function returns false, the dialog is not displayed and
     * must be displayed by the calling function.
     * @param {function} afterShow Function to call after the diasplay of the
     * dialog
     */
    showModalDialog: function(dialogId, viewName, beforeShow, afterShow) {
        var callbackFunction = function() {
            if (typeof afterShow === "function") {
                $('#' + dialogId).one('zdkmodalaftershow',function() {
                    afterShow($(this));
                });
            }
            var isToDisplay = true;
            if (typeof beforeShow === "function") {
                isToDisplay = beforeShow($('#' + dialogId)) !== false;
            }
            if (isToDisplay) {
                $('#' + dialogId).zdkmodal('show');
            }
        };
        if ($('#' + dialogId).length === 0) {
            znetdk.loadView({
                control:viewName,
                action:'show',
                htmlTarget:$('body'),
                callback: callbackFunction
            });
        } else {
            callbackFunction();
        }
    },
    /**
     * Execute the pending AJAX requests from the 'requestContext' queue.
     * This requests were not executed due to an error HTTP 401 (user session
     * expired).
     */
    requestFromQueue: function () {
        var queueSize = this.requestContext.length;
        for (index = 0; index < queueSize; index++) {
            this.request(this.requestContext[index]);
        }
        this.requestContext.splice(0, queueSize);
    },
    /**
     * Returns the language set for the page
     * @returns {String} language code (for example 'fr')
     */
    getCurrentLanguage: function () {
        var currentLanguage = $('html').attr('lang');
        if (currentLanguage) {
            return currentLanguage;
        } else {
            return '';
        }
    },
    /**
     * Returns an object that contains a property for the URL and 2 more properties
     * for the specified GET parameter (name + value).
     * @returns {Object} AJAX URL and the GET parameter
     */
    getParamsFromAjaxURL: function () {
        var URLArray = znetdkAjaxURL.split("?"),
            paramArray = [],
            result = new Object();
        result.url = URLArray[0];
        if (URLArray.length === 2) {
            paramArray = URLArray[1].split("=");
            result.paramName = paramArray[0];
            result.paramValue = paramArray[1];
        }
        return result;
    },
    /**
     * Initializes the ZnetDK widgets which are descendants of the specified
     * HTML element
     * @param {jQuery} parentElement HTML element under which the widgets have
     * to be initialized
     */
    autoInitWidgets: function (parentElement) {
        if (parentElement instanceof jQuery && parentElement.length) {
            var forms = parentElement.find('.zdk-form');
            parentElement.find('.zdk-modal').zdkmodal();
            forms.zdkform();
            parentElement.find('.zdk-datatable:not(.zdk-nocreate)').zdkdatatable();
            parentElement.find('.zdk-action-bar').zdkactionbar();
        }
    },
    /**
     * Initializes the widgets which are descendants of the specified HTML element
     * This method is called by the form and action bar ZnetDK widgets.
     * @param {jQuery} parentElement HTML element under which the widgets have
     * to be initialized
     */
    initCommonWidgets: function (parentElement) {
        if (parentElement instanceof jQuery && parentElement.length) {
            // zdkinputrows
            var inputRowsElement = parentElement.find('.zdk-inputrows');
            if (inputRowsElement.length > 0) {
                try {
                    inputRowsElement.zdkinputrows();
                } catch(exception) {
                    console.error("znetdk.initCommonWidgets: the 'zdkinputrows' widget does not exist!");
                }
            }
            // puiinputtext
            parentElement.find(':text,:password,input[type="email"],input[type="number"],'
                    + 'input[type="url"],input[type="time"], input[type="search"]')
                    .not('.zdk-autocomplete').puiinputtext();
            // zdkautocomplete
            parentElement.find('input[type="text"].zdk-autocomplete,'
                    + 'input[type="search"].zdk-autocomplete').zdkautocomplete();
            // zdkinputdate
            parentElement.find('input[type="date"]').zdkinputdate({regional: znetdk.getCurrentLanguage()});
            // zdkinputfile
            parentElement.find('input[type="file"]').zdkinputfile();
            // zdkinputhtml
            parentElement.find('div.zdk-inputhtml').zdkinputhtml();
            // zdkmultiupload
            parentElement.find('div.zdk-multiupload').zdkmultiupload();
            // puiinputtextarea
            parentElement.find('textarea').puiinputtextarea();
            // puibutton
            // yes)
            parentElement.find('button.zdk-bt-yes').puibutton({icon: 'fa-check'});
            // no)
            parentElement.find('button.zdk-bt-no').puibutton({icon: 'fa-close'});
            // add)
            parentElement.find('button.zdk-bt-add').puibutton({icon: 'fa-plus-circle'});
            // edit)
            parentElement.find('button.zdk-bt-edit').puibutton({icon: 'fa-pencil'});
            // remove)
            parentElement.find('button.zdk-bt-remove').puibutton({icon: 'fa-minus-circle'});
            // cancel)
            parentElement.find('button.zdk-bt-cancel').puibutton({icon: 'fa-close'});
            // save)
            parentElement.find('button.zdk-bt-save').puibutton({icon: 'fa-save'});
            // reset)
            parentElement.find('button.zdk-bt-reset').puibutton({icon: 'fa-eraser'});
            // search)
            parentElement.find('button.zdk-bt-search').puibutton({icon: 'fa-search'});
            // clear)
            parentElement.find('button.zdk-bt-clear').puibutton({icon: 'fa-times-rectangle'});
            // refresh)
            parentElement.find('button.zdk-bt-refresh').puibutton({icon: 'fa-refresh'});
            // download)
            parentElement.find('button.zdk-bt-download').puibutton({icon: 'fa-download'});
            // upload)
            parentElement.find('button.zdk-bt-upload').puibutton({icon: 'fa-upload'});
            // Custom)
            parentElement.find('button.zdk-bt-custom').each(function() {
                var iconAttr = znetdk.getTextFromAttr($(this),'data-zdk-icon'),
                    options = {};
                if (iconAttr) {
                    var attrArray = iconAttr.split(":");
                    options.icon = attrArray[0];
                    options.iconPos = attrArray.length === 2 ? attrArray[1] : 'left';
                }
                $(this).puibutton(options);
            });
            // puicheckbox
            parentElement.find(':checkbox').puicheckbox();
            // zdkradiobuttongroup
            parentElement.find('.zdk-radiobuttongroup').zdkradiobuttongroup();
            // puiradiobutton
            parentElement.find(':radio').puiradiobutton();
            // puifieldset
            parentElement.find('fieldset').puifieldset();
            // zdklistbox
            parentElement.find('select.zdk-listbox').zdklistbox();
            // zdkdropdown
            parentElement.find('select.zdk-dropdown').zdkdropdown();
            // zdkpicklist
            parentElement.find('div.zdk-picklist').zdkpicklist();
        }
    },
    /**
     * Displays the specified message in the PrimeUI growl widget
     * @param {String} severity severity of the message ('info','warn','error'
     *  or 'critical')
     * @param {String} summary summary of the message
     * @param {String} detail detailed message
     */
    message: function (severity, summary, detail) {
        if (severity === 'critical') {
            var htmlMessage = '<span class="pui-growl-image zdk-image-fatal" />' +
                    '<h3>' + summary + '</h3><p>' + detail + '</p>';
            $('#zdk-critical-err').puinotify('show', htmlMessage);
        } else {
            $('#zdk-messages').puigrowl('show', [{severity: severity, summary: summary, detail: detail}]);
        }
    },
    /**
     * Displays the specified messages in the PrimeUI growl widget
     * @param {array} messages An array of message objects according to PrimeUI
     * growl syntax (severity, summary and detail properties)
     */
    multiMessages: function (messages) {
        $('#zdk-messages').puigrowl('show', messages);
    },
    /*
     * Displays the specified view of the navigation menu
     * @param {undefined|String} viewName name of the view to display
     * @param {object} options Values to pass as an object to the called view
     */
    showMenuView: function (viewName, options) {
        $('#zdk-classic-menu').zdktabmenu('selectTab', viewName); /* classic tab menu */
        $('#zdk-office-menu').zdkofficemenu('openWindow', viewName, options); /* office vertical menu */
        $('#zdk-custom-menu').zdkgenericmenu('displayView', viewName); /* custom menu */
    },
    /**
     * Displays a confirmation dialog box
     * @param {Object} options The properties of the dialog box:
     * 'title': title to display into the dialog window bar,
     * 'message': the text of the confirmation message,
     * 'yesLabel': the label to display for the 'Yes' button.
     * 'noLabel': the label to display for the 'No' button
     * 'focusOnYes': if true, the Yes button is focused (No button focused by default)
     * 'callback': the function to call back when user has clicked on a button.
     * the parameter of the function is boolean value set to 'true' when user
     * clicks on the 'Yes' button and set to false otherwise.
     */
    getUserConfirmation: function (options) {
        var dialogID = 'znetdk_confirmation_dialog';
        var dialogElement = $('#' + dialogID);
        if (dialogElement.length) { //Dialog already exists...
            // ...then is removed...
            dialogElement.remove();
        }
        // DIV element as dialog wrapper
        $('body').append('<div id="' + dialogID + '"/>');
        dialogElement = $('#' + dialogID);
        dialogElement.attr('title', options.title);
        dialogElement.append('<div class="zdk-image-question"></div>');
        dialogElement.append('<p class="zdk-text-question">' + options.message + '</p>');
        dialogElement.append('<div class="ui-helper-clearfix"/>');
        // Button pane
        dialogElement.append('<div class="pui-dialog-buttonpane ui-widget-content ui-helper-clearfix"/>');
        dialogElement.find('.pui-dialog-buttonpane').append('<button class="zdk-bt-yes" type="button"/>');
        dialogElement.find('.pui-dialog-buttonpane').append('<button class="zdk-bt-no" type="button"/>');
        var buttonYesElement = dialogElement.find('.pui-dialog-buttonpane > button.zdk-bt-yes');
        var buttonNoElement = dialogElement.find('.pui-dialog-buttonpane > button.zdk-bt-no');
        buttonYesElement.text(options.yesLabel);
        buttonNoElement.text(options.noLabel);
        // Button components creation
        buttonYesElement.puibutton({icon: 'fa-check'}).click(function () {
            dialogElement.puidialog('hide');
            if (typeof options.callback === "function") {
                options.callback(true);
            }
        });
        buttonNoElement.puibutton({icon: 'fa-close'}).click(function () {
            dialogElement.puidialog('hide');
            if (typeof options.callback === "function") {
                options.callback(false);
            }
        });
        // Dialog component creation
        dialogElement.puidialog({
            resizable: false,
            showEffect: 'fade',
            hideEffect: 'fade',
            minimizable: false,
            maximizable: false,
            closeOnEscape: false,
            closable: false,
            modal: true,
            width: 350,
            visible: true
        });
        if (options.focusOnYes === true) {
            buttonYesElement.focus();
        } else {
            buttonNoElement.focus();
        }
    },
    /**
     * Display to user a notification dialog
     * @param {Object} options The properties of the dialog box:
     * 'title': title to display into the dialog window bar,
     * 'message': the text of the confirmation message,
     * 'buttonLabel': the OK button's label ('Ok' by default)
     * 'callback': the function to call back when user has clicked on a OK
     *  button.
     */
    notifyUser: function(options) {
        var dialogID = 'znetdk_confirmation_dialog';
        var dialogElement = $('#' + dialogID);
        if (dialogElement.length) { //Dialog already exists...
            // ...then is removed...
            dialogElement.remove();
        }
        // DIV element as dialog wrapper
        $('body').append('<div id="' + dialogID + '"/>');
        dialogElement = $('#' + dialogID);
        dialogElement.attr('title', options.title);
        dialogElement.append('<div class="zdk-image-question"></div>');
        dialogElement.append('<p class="zdk-text-notification">' + options.message + '</p>');
        dialogElement.append('<div class="ui-helper-clearfix"/>');
        // Button pane
        dialogElement.append('<div class="pui-dialog-buttonpane ui-widget-content ui-helper-clearfix"/>');
        dialogElement.find('.pui-dialog-buttonpane').append('<button class="zdk-bt-yes" type="button"/>');
        var buttonYesElement = dialogElement.find('.pui-dialog-buttonpane > button.zdk-bt-yes');
        buttonYesElement.text(typeof options.buttonLabel === 'string' ? options.buttonLabel : 'Ok');
        // Button components creation
        buttonYesElement.puibutton({icon: 'fa-check'}).click(function () {
            dialogElement.puidialog('hide');
            if (typeof options.callback === "function") {
                options.callback();
            }
        });
        // Dialog component creation
        dialogElement.puidialog({
            resizable: false,
            showEffect: 'fade',
            hideEffect: 'fade',
            minimizable: false,
            maximizable: false,
            closeOnEscape: false,
            closable: false,
            modal: true,
            width: 350,
            visible: true
        });
    },
    /* Insert in the HTML tag <head> the style sheet of the specified file */
    useStyleSheet: function (styleSheetFile) {
        var cssLink = $("<link rel='stylesheet' type='text/css' href='" + styleSheetFile + "'>");
        $("head").append(cssLink);
    },
    /* Insert in the HTML tag <head> the script of the specified file */
    useScriptFile: function (scriptFile) {
        var jsLink = $("<script type='text/javascript' src='" + scriptFile + "'>");
        $("head").append(jsLink);
    },
    /** Show message when user cancels connection or logs out
     * @param {String} message The message to display once user disconnected
     */
    showFinalMessage: function (message) {
        $('#zdk-classic-menu').remove();
        $('#zdk-office-menu').remove();
        $('#zdk-custom-menu').remove();
        $('#zdk-win-container').remove();
        $('#zdk-login-dialog').remove();
        $('.zdk-modal').remove();
        $('.ui-widget-overlay').remove();
        $('#zdk-content').empty();
        $("#zdk-connection-area").addClass("ui-helper-hidden-accessible");
        $("#zdk-help-area").addClass("ui-helper-hidden-accessible");
        $("#zdk-language-area").addClass("ui-helper-hidden-accessible");
        $("#zdk-breadcrumb-text").addClass("ui-helper-hidden-accessible");
        $("#zdk-navi-toolbar").addClass("ui-helper-hidden-accessible");
        $('#default_content').removeClass("ui-helper-hidden");
        $("#default_content").html(message);
        znetdk.setFooterSticky(true);
        $('body').trigger('disconnected');
    },
    /**
     * Set document title according to menu item selection
     * @param {string} label the label to display as title of the page
     */
    addLabelToTitle: function (label) {
        var separator = " | ";
        var newTitle = document.title;
        var sepIndex = newTitle.indexOf(separator);
        if (sepIndex === -1) {
            newTitle = label === null || label === "" ? newTitle : label + separator + newTitle;
        } else {
            newTitle = label === null || label === "" ? newTitle.substring(sepIndex + separator.length) : label + separator + newTitle.substring(sepIndex + separator.length);
        }
        document.title = newTitle;
    },
    /**
     * Show the login or the change password dialog
     * @param {undefined|boolean} changepwd if true, display the change password dialog
     */
    showLoginDialog: function (changepwd) {
        var changePwdValue = changepwd !== undefined && changepwd ? true : false,
                applyOption = function () {
                    $('#zdk-login-dialog').zdklogindialog('option', 'changepwd', changePwdValue);
                };
        if ($('#zdk-login-dialog').length) {
            // Login dialog already exists in the DOM
            applyOption();
            $('#zdk-login-dialog').zdklogindialog('show');
        } else {
            // Login dialog must be added in the DOM
            $('body').append('<div id="zdk-login-dialog" />');
            var defaultLoginName = $('#zdk-connection-area').attr('data-zdk-login');
            $('#zdk-login-dialog').zdklogindialog({loginName: defaultLoginName});
            applyOption();
            // Cancel button action
            $('#zdk-login-dialog').bind("zdklogindialogcancel", function (event, response) {
                znetdk.showFinalMessage(response.msg);
                $('#zdk-login-dialog').zdklogindialog('hide');
            });
            // Login button action
            $('#zdk-login-dialog').bind("zdklogindialogsuccess", function (event, response) {
                $('#zdk-login-dialog').zdklogindialog('hide');
                if (znetdk.isMenuExists()) {
                    // Last expected requests are sent
                    znetdk.requestFromQueue();
                } else {
                    // Menu does not exist, page is reloaded for the authenticated user
                    location.reload();
                }
            });
        }
    },
    /***** Return an object containing the id and label of the selected menu *****/
    getSelectedMenu: function () {
        var selectedMenu = null;
        if ($('#zdk-classic-menu').length) { /* classic tab menu */
            selectedMenu = $('#zdk-classic-menu').zdktabmenu('getSelectedTab');
        } else if ($('#zdk-office-menu').length) { /* office vertical menu */
            selectedMenu = $('#zdk-office-menu').zdkofficemenu('getSelectedMenuItem');
        } else if ($('#zdk-custom-menu').length) { /* custom menu */
            selectedMenu = $('#zdk-custom-menu').zdkgenericmenu('getSelectedMenuItem');
        }
        return selectedMenu; /* Returned value */
    },
    /* Go to the page anchor specified in the page URL */
    goToPageAnchor: function () {
        var pageURL = document.URL;
        var sepIndex = pageURL.lastIndexOf('#');
        if (sepIndex !== -1) {
            var anchor = pageURL.substring(sepIndex);
            var tempLink = $('<a href="' + anchor + '"></a>').appendTo('body');
            tempLink[0].click();
            tempLink.remove();
        }
    },
    /**
     * Init the banner select language element
     */
    initLanguageSelect: function() {
        var selectCountryEl = $('#zdk-language-area select');
        if (selectCountryEl.length === 1) {
            const countries = selectCountryEl.data('countries'),
                currentLang = selectCountryEl.data('curlang'),
                rootUri = (znetdk.getParamsFromAjaxURL()).url.replace('index.php', '');
            selectCountryEl.puidropdown({
                data: countries,
                content: function (option) {
                    return '<img id="zdk-language-area-img" src="' + rootUri + option.icon 
                            + '" alt="' + option.label + '" /><span id="zdk-language-area-label">' 
                            + option.label + '</span>';
                },
                change: function () {
                    var selected_lang = $(this).val();
                    if (selected_lang !== currentLang) {
                        $('#zdk-language-area > form').submit();
                    }
                }
            }).puidropdown('selectValue', currentLang);
        }
    },
    /**
     * Init the navigation menu of the application
     */
    initNavigationMenu: function () {
        /* classic tab menu */
        $('#zdk-classic-menu').zdktabmenu({pageReload: znetdk.isPageToBeReloaded()});
        /* office vertical menu */
        $('#zdk-office-menu').zdkofficemenu();
        /* custom menu */
        $('#zdk-custom-menu').zdkgenericmenu({htmlTarget: $("#zdk-content")});
    },
    /**
     * Evaluates whether a menu exists in the DOM of the page or not
     * @returns {Boolean} true if a menu exists in the DOM else false
     */
    isMenuExists: function () {
        return Boolean($('#zdk-classic-menu').length || $('#zdk-office-menu').length
                || $('#zdk-custom-menu').length);
    },
    /**
     * Evaluates whether authentication is required or not once the page is loaded
     * @returns {Boolean}
     */
    isAuthenticationRequired: function () {
        var isDefaultContentHidden = $('#default_content').hasClass("ui-helper-hidden");
        return (!znetdk.isMenuExists() && isDefaultContentHidden);
    },
    /**
     * Evaluates if the page must be reloaded when the user clicks on a menu item
     * @returns {Boolean}
     */
    isPageToBeReloaded: function () {
        return ($('#zdk-classic-menu').hasClass('zdk-pagereload')
                || $('#zdk-office-menu').hasClass('zdk-pagereload')
                || $('#zdk-custom-menu').hasClass('zdk-pagereload'));
    },
    /**
     * Returns the jQuery object of the element matching the ID specified in the
     * attribute of a HTML element
     * @param {jQuery} attribElement jQuery element in which the element ID is to be read
     * @param {String} attribute name of the attribute containing the element ID.
     * @returns {jQuery|Boolean} jQuery object of the element found or false if
     * no element matches
     */
    getElementFromAttr: function (attribElement, attribute) {
        /* Read html attribute */
        var attribText = attribElement.attr(attribute);
        if (attribText !== undefined) {
            var element = $('#' + attribText);
            if (element.length) {
                return element;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    /**
     * Returns the value of the specified element attribute
     * @param {jQuery} attribElement jQuery object of an HTML element
     * @param {String} attribute name of the attribute to read
     * @returns {String|Boolean} value of the attribute or false if no value is found
     */
    getTextFromAttr: function (attribElement, attribute) {
        /* Read html attribute */
        var attribText = attribElement.attr(attribute);
        if (attribText !== undefined) {
            return attribText;
        } else {
            return false;
        }
    },
    /*
     * Returns the controller and the action specified for the attribute
     * "data-zdk-action" of a HTML element
     * @param {jQuery} attribElement jQuery object of the element to be read
     * @returns {Object|Boolean} Object containing the names of the controller
     * and action or false if the attribute "data-zdk-action" does not exist.
     */
    getActionFromAttr: function (attribElement) {
        var actionAttrib = attribElement.attr('data-zdk-action');
        if (actionAttrib !== undefined) {
            var actionArray = actionAttrib.split(":");
            var result = new Object();
            result.controller = actionArray[0];
            result.action = actionArray[1];
            return result;
        } else {
            return false;
        }
    },
    /**
     * Returns the path that prefixes the local storage key to avoid the store
     * values to be overwritten when several applications are installed on the same
     * internet domain name.
     * @returns {String} The local storage key path prefix
     */
    getLocalSettingsKeyPath: function() {
        var params = znetdk.getParamsFromAjaxURL(znetdkAjaxURL),
            url = params.url.replace('index.php', '');
        if (params.hasOwnProperty('paramName') && params.paramName === 'appl'
                && params.hasOwnProperty('paramValue')) {
            url += params.paramValue + '/';
        }
        return url;
    },
    /**
     * Retrieves the value stored in the web browser local storage for the
     * specified key
     * @param {String} storageKey Identifier of the value stored locally
     * @returns {DOMString|Boolean} The value found or false if the value does
     * not exist.
     */
    getLocalSettings: function(storageKey) {
        var url = this.getLocalSettingsKeyPath();
        try {
            var storedValue = localStorage.getItem(url + storageKey);
            if(storedValue) {
                return storedValue;
            } else {
                storedValue = localStorage.getItem(storageKey);
                if (storedValue) {
                    return storedValue;
                }
                return false;
            }
        } catch(e) {
            console.log("ZnetDK 'api.js': local storage not supported by the browser!");
            return false;
        }
    },
    /**
     * Stores in the web browser local storage the specified value
     * @param {String} storageKey Identifier of the value stored locally
     * @param {String} value The value to store
     * @returns {Boolean} true if the storage succeeded, false otherwise.
     */
    storeLocalSettings: function(storageKey, value) {
        var url = this.getLocalSettingsKeyPath();
        try {
            localStorage.setItem(url + storageKey, value);
            return true;
        } catch(e) {
            console.log("ZnetDK 'api.js': local storage not supported by the browser!");
            return false;
        }
    },
    /**
     * Sticks the footer at the bottom of the browser client area when the
     * content of the page is little filled in.
     * @param {undefined|Boolean} fixed indicate if the footer must be fixed at
     * the bottom of the browser client area. By default (undefined), the footer
     * is not fixed.
     */
    setFooterSticky: function (fixed) {
        if ($("#zdk-footer").hasClass('zdk-sticky')) {
            var isFixed = fixed === undefined ? false : fixed;
            if (isFixed) {
                $('#zdk-footer').css({'position': 'fixed', 'bottom': '0'});
            } else {
                var minHeightContent,
                        pageHeight = $(window).height(),
                        contentPosition = $("#zdk-content").offset(),
                        contentExtraHeight = $("#zdk-content").css(["borderTopWidth", "marginTop", "paddingTop"]),
                        footerHeight = $("#zdk-footer").outerHeight(true);
                minHeightContent = pageHeight - footerHeight - contentPosition.top - 1;
                minHeightContent -= parseFloat(contentExtraHeight.borderTopWidth) + parseFloat(contentExtraHeight.marginTop)
                        + parseFloat(contentExtraHeight.paddingTop);
                $("#zdk-content").css('min-height', minHeightContent + 'px');
            }
        }
    },
    /**
     * Registers the service worker specified for the 'body' element through the
     * 'data-service-worker-url' attribute.
     * @returns {Boolean} true if the registration succeeded, false otherwise.
     */
    registerServiceWorker: function() {
        var appUrl = (znetdk.getParamsFromAjaxURL()).url.replace('index.php', ''),
            scriptUrl = $('body').data('service-worker-url'),
            fullUrl = appUrl + scriptUrl;
        if (typeof scriptUrl === 'undefined' || scriptUrl.length === 0) {
            return false;
        }
        if ('serviceWorker' in navigator) {
            // Register a service worker hosted at the root of the
            // site using a more restrictive scope.
            navigator.serviceWorker.register(fullUrl).then(undefined, function (error) {
                console.error("'" + fullUrl + "': " + error.message);
                return false;
            });
        } else {
            console.warn('Service workers are not supported.');
            return false;
        }
        return true;
    },
    /**
     * Reduces the size of the photo specified as File type
     * @param {File} photoAsFile The photo to reduce
     * @param {int} maxWidth Max photo Width in pixels
     * @param {int} maxHeight Max photo Height in pixels
     * @param {function} callback Function called once the image is reduced.
     * The parameter passed to the function is the image reduced to JPG format
     * and of type File. If reduction failed, null value is passed as parameter
     * instead.
     */
    reducePhotoSize: function (photoAsFile, maxWidth, maxHeight, callback) {
        var img = new Image();
        img.src = window.URL.createObjectURL(photoAsFile);
        img.onload = function () {
            var MAX_WIDTH = maxWidth;
            var MAX_HEIGHT = maxHeight;
            var width = img.width;
            var height = img.height;
            if (width > MAX_WIDTH) {
                height = height * (MAX_WIDTH / width);
                width = MAX_WIDTH;
            }
            if (height > MAX_HEIGHT) {
                width = width * (MAX_HEIGHT / height);
                height = MAX_HEIGHT;
            }
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            // Return resized image as Blog type in JPEG Format
            try {
                canvas.toBlob(function(reducedImageAsBlob){
                    var reducedImageAsFile = null;
                    if (reducedImageAsBlob !== null) {
                        reducedImageAsFile = new File(
                            [reducedImageAsBlob],
                            photoAsFile.name, {
                                lastModified: photoAsFile.lastModifiedDate,
                                type: reducedImageAsBlob.type
                            }
                        );
                    }
                    callback(reducedImageAsFile);
                }, 'image/jpeg');
            } catch (err) {
                console.log('miePhotoTools.reduceSize: conversion to BLOB failed.');
                callback(null);
            }
            // Free memory
            window.URL.revokeObjectURL(this.src);
        };
    },
    /**
     * Reduces the photo size to the specified percentage
     * @param {File} photoAsFile The photo to reduce
     * @param {int} percent The percentage of reduction (0 to 100). If set to
     * 0, the photo is reduced to the number of pixels specified for the 
     * minWidthHeight parameter (if its width or height is higher than this 
     * number of pixels). If set to 100, no reduction is done and the original
     * photo is returned.
     * @param {int} minWidthHeight The minimum width or height in pixels of the
     * photo. If the photo size is too low, it is not reduced.
     * @param {function} callback Function to callback once the photo is
     * reduced. If reduction succeeded or percent reduction is 100, the reduced
     * file is passed to the function. Otherwise, null is given instead (invalid
     * parameters or reduction failed).
     * @return {Boolean} Returns true if parameters are valid, false otherwise.
     */
    reducePhotoSizePercent: function (photoAsFile, percent, minWidthHeight, callback) {
        if (!photoAsFile.type.startsWith("image/") // MIME type invalid
                || typeof percent !== 'number' // Percent invalid
                || typeof minWidthHeight !== 'number' // Min Widh or Height invalid
                || percent > 100 // Percent too high
                || percent < 0 // Percent too low
                || minWidthHeight < 1 /* Min Widh or Height too low */) {
            callback(null); // Invalid parameters
            return false;
        }
        if (percent === 100) {
            callback(photoAsFile); // No reduction required
            return true;
        }
        var img = new Image();
        img.src = window.URL.createObjectURL(photoAsFile);
        img.onload = function () {
            const maxWidthHeight = Math.max(img.width, img.height),
                newSize = percent > 0 ? maxWidthHeight * percent / 100 
                    : minWidthHeight;
            window.URL.revokeObjectURL(this.src);
            if (newSize < minWidthHeight
                    || (percent === 0 && minWidthHeight > maxWidthHeight)) {
                callback(photoAsFile); // Photo too small to be reducted
            } else {
                znetdk.reducePhotoSize(photoAsFile, newSize, newSize, callback);
            }
        };
        return true;
    }

};