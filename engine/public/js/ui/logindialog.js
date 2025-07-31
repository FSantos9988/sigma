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
 * ZnetDK login dialog widget
 *
 * File version: 1.3
 * Last update: 08/05/2022
 */
$(function () {
    $.widget("znetdk.zdklogindialog", $.primeui.puidialog, {
        options: {
            /** When specified, the login name is pre-filled in the form */
            loginName: null,
            /** When set to true, display the form to change the password */
            changepwd: false
        },
        /**
         * Constructs the login dialog
         */
        _create: function () {
            /* Add icon to dialog bar */
            this.element.data('icon', 'fa-unlock-alt');
            /* Login Form is not yet created */
            this.formCreated = false;

            /* By default, the login form is displayed */
            this.loginFormDisplayed = true; /* false when change password form is displayed */

            /* Add empty form element */
            this.loginForm = $('<form/>').appendTo(this.element);

            /* Login dialog properties */
            this.options.resizable = false;
            this.options.showEffect = 'fade';
            this.options.hideEffect = 'fade';
            this.options.minimizable = false;
            this.options.maximizable = false;
            this.options.closable = false;
            this.options.closeOnEscape = false;
            this.options.modal = true;
            this.options.width = 380;
            this.options.visible = true;

            /* Call of the default constructor */
            this._super();
        },
        /**
         * Create the login form according to the server configuration
         * (see parameters CFG_SESSION_SELECT_MODE & CFG_SESSION_DEFAULT_MODE)
         */
        _createLoginForm: function () {
            /* Construction of the login form content */
            this.element.find('.pui-dialog-title').text(this.labels.title);

            var formEntryTag = '<div class="zdk-form-entry"/>';
            $('<label>' + this.labels.loginFieldLabel + '</label>').appendTo(this.loginForm);
            this.loginField = $('<input name="login_name" maxlength="50" type="text" autocomplete="username" value="" required data-errmess-required="' + this.labels.fieldMandatory + '">').appendTo(this.loginForm);

            this.passwordLabel = $('<label>' + this.labels.passwordFieldLabel + '</label>').appendTo(this.loginForm);
            this.passwordField = $('<input name="password" maxlength="20" type="password" autocomplete="current-password" value="" required data-errmess-required="' + this.labels.fieldMandatory + '">').appendTo(this.loginForm);

            var storedAccess = this._getStoredAccessMode();
            if (this.labels.selectAccess) {
                this.formEntryAccess = $(formEntryTag).appendTo(this.loginForm);
                $('<label class="required">' + this.labels.accessLabel + '</label>').appendTo(this.formEntryAccess);
                var radioButtonGroup = $('<div class="zdk-radiobuttongroup" data-name="access"/>').appendTo(this.formEntryAccess);
                var publicRadioButton = $('<input type="radio" id="public-access" value="public">').appendTo(radioButtonGroup);
                radioButtonGroup.append('<label for="public-access">' + this.labels.publicAccessLabel + '</label>');
                radioButtonGroup.append('<br>');
                var privateRadioButton = $('<input type="radio" id="private-access" value="private">').appendTo(radioButtonGroup);
                radioButtonGroup.append('<label for="private-access">' + this.labels.privateAccessLabel + '</label>');
                if (storedAccess !== false) {
                    this.labels.defaultAccess = storedAccess;
                }
                if (this.labels.defaultAccess === 'public') {
                    publicRadioButton.prop('checked', true);
                } else if (this.labels.defaultAccess === 'private') {
                    privateRadioButton.prop('checked', true);
                }
            }

            this.formEntryNewPassword = $(formEntryTag).appendTo(this.loginForm).hide();
            $('<input name="login_password" maxlength="20" type="password" disabled autocomplete="off" data-errmess-required="' + this.labels.fieldMandatory + '">').appendTo(this.formEntryNewPassword);
            $('<label>' + this.labels.changePasswordNew + '</label>').prependTo(this.formEntryNewPassword);
            this.formEntryConfirmPassword = $(formEntryTag).appendTo(this.loginForm).hide();
            $('<input name="login_password2" maxlength="20" type="password" disabled autocomplete="off" data-errmess-required="' + this.labels.fieldMandatory + '">').appendTo(this.formEntryConfirmPassword);
            $('<label>' + this.labels.changePasswordConfirm + '</label>').prependTo(this.formEntryConfirmPassword);
            if (typeof(this.labels.forgotPasswordAnchor) === 'string' && storedAccess !== false
                    && !znetdk.isMenuExists()
                    && (this.options.loginName === null || this.options.loginName === '')) {
                this.forgotPwdAnchor = $('<div class="forgot-pwd"><a href="#">' + this.labels.forgotPasswordAnchor +'</a></div>').appendTo(this.loginForm);
            }
            this.loginButton = $('<button class="zdk-bt-yes" type="submit">' + this.labels.loginButtonLabel + '</button>').appendTo(this.loginForm);
            this.cancelButton = $('<button class="zdk-bt-cancel" type="button">' + this.labels.cancelButtonLabel + '</button>').appendTo(this.loginForm);

            this.loginForm.zdkform({controller: 'security', action: 'login', msgsuccess: false});

            /* Bind login events */
            this._bindLoginEvents();
        },
        /**
         * Shows the login dialog
         */
        show: function () {
            if (!this.formCreated) {
                /* Memorize that the form is being created */
                this.formCreated = true;
                this._getLabels();
            } else {
                if (this.options.changepwd && this.loginFormDisplayed)
                    this._showChangePasswordForm();
                else if (!this.options.changepwd && !this.loginFormDisplayed)
                    this._showLoginForm();
                /* Call of the parent method */
                this._super();
            }
        },
        /**
         * Requests the localized labels to display into the form.
         * This labels are provided by the 'getLoginDialogLabels' action of the
         * 'security' controller
         */
        _getLabels: function () {
            var $this = this;
            znetdk.request({
                control: 'security',
                action: 'getLoginDialogLabels',
                callback: function (response) {
                    /* Labels are memorized */
                    $this.labels = response;
                    $this._createLoginForm();
                    $this.show();
                }
            });
        },
        /**
         * Handles the events of the form's buttons when clicked
         */
        _bindLoginEvents: function () {
            var $this = this;
            /* On click on Cancel Button */
            this.cancelButton.on('click.zdklogindialog', function (e) {
                if ($this.options.changepwd) {
                    $this.hide();
                } else {
                    znetdk.request({
                        control: 'security',
                        action: 'cancellogin',
                        callback: function (response) {
                            $this._trigger('cancel', null, response);
                        }
                    });
                }
                e.preventDefault();
            });
            /* On form submited with success */
            this.loginForm.on("zdkformcomplete.zdklogindialog", function (event, response) {
                // Access mode is memorized in local storage
                var accessMode = $(this).zdkform('getInputValues', 'access');
                $this._storeAccessMode(accessMode[0]);
                // Login name is memorized if private connection
                $this._storeLoginNameInLocalStorage(accessMode[0]);
                // Success event triggered or dialog is hidden
                if ($this.loginFormDisplayed || !$this.options.changepwd) {
                    $this._trigger('success', null, response);
                } else {
                    $this.hide();
                }
            });
            /* On form submited with error */
            this.loginForm.on("zdkformfailed.zdklogindialog", function (event, response) {
                if (response.newpasswordrequired) {
                    $this._showChangePasswordForm();
                } else {
                    if (response.toomuchattempts) {
                        $this.loginButton.puibutton('disable');
                    }
                    $this._trigger('failed', null, response);
                }
            });
            /* On click on the forgotten password link */
            if (this.forgotPwdAnchor) {
                this.forgotPwdAnchor.on('click.zdklogindialog', 'a', function(event){
                    znetdk.showModalDialog('znetdk_forgot_password_dialog', 'forgotpassword',null, function(dialog){
                        dialog.one('zdkmodalafterhide.zdklogindialog', function(){
                            $this.cancelButton.trigger('click');
                        });
                    });
                    event.preventDefault();
                });
            }
            /* Once login dialog is hidden */
            this.options.afterHide = function () {
                $this.loginForm.zdkform('reset');
            };
        },
        /**
         * Gives the focus to the password field if the Login name is specified
         * as a widget's option or is memorized in the local storage
         */
        _applyFocus: function () {
            /* Init login name if defined as an option or is memorized */
            var loginName = this.options.loginName ? this.options.loginName
                : this._getLoginNameFromLocalStorage();
            if (loginName.length > 0) {
                this.loginField.val(loginName);
                this.passwordField.focus();
            } else {
                this._super();
            }
        },
        _storeAccessMode: function(accessMode) {
            znetdk.storeLocalSettings('zdklogindialog_access_mode', accessMode);
        },
        _getStoredAccessMode: function() {
            return znetdk.getLocalSettings('zdklogindialog_access_mode');
        },
        /**
         * Shows the form with the entry fields needed to change the user's
         * password
         */
        _showChangePasswordForm: function () {
            this.element.find('.pui-dialog-title').text(this.labels.changePasswordTitle);
            this.loginButton.find('.pui-button-text').text(this.labels.changePasswordButton);
            this.loginField.puiinputtext('disable');
            this.passwordLabel.text(this.labels.changePasswordOriginal);

            this.formEntryNewPassword.show();
            this.formEntryNewPassword.find(':input').prop('required', true).puiinputtext('enable');
            this.formEntryConfirmPassword.show();
            this.formEntryConfirmPassword.find(':input').prop('required', true).puiinputtext('enable');
            if (this.formEntryAccess) { this.formEntryAccess.hide(); }
            if (this.forgotPwdAnchor) { this.forgotPwdAnchor.hide(); }
            this.passwordField.val('');
            this.passwordField.focus();
            this.loginFormDisplayed = false;
            this.loginForm.zdkform('option', 'msgsuccess', true);
        },
        /**
         * Shows the login form for user authentication. If the form for
         * changing the password was previously displayed, all its extra field
         * are hidden
         */
        _showLoginForm: function () {
            this.element.find('.pui-dialog-title').text(this.labels.title);
            this.loginButton.find('.pui-button-text').text(this.labels.loginButtonLabel);
            this.loginField.puiinputtext('enable');
            this.passwordLabel.text(this.labels.passwordFieldLabel);

            this.formEntryNewPassword.find(':input').prop('required', false).puiinputtext('disable');
            this.formEntryNewPassword.hide();
            this.formEntryConfirmPassword.find(':input').prop('required', true).puiinputtext('disable');
            this.formEntryConfirmPassword.hide();
            if (this.formEntryAccess) { this.formEntryAccess.show(); }
            if (this.forgotPwdAnchor) { this.forgotPwdAnchor.show(); }
            this.passwordField.val('');
            this.passwordField.focus();
            this.loginFormDisplayed = true;
            this.loginForm.zdkform('option', 'msgsuccess', false);
        },
        /**
         * Memorizes in the local storage the login name if the access mode is
         * 'private'. If access mode is 'public', an empty string is memorized
         * @param {String} accessMode Value 'public' or 'private'
         */
        _storeLoginNameInLocalStorage: function(accessMode) {
            var loginName = accessMode === 'public' ? '' : this.loginField.val();
            znetdk.storeLocalSettings('zdklogindialog_login_name', loginName);
        },
        /**
         * Returns the login name memorized in the local storage
         * @returns {String} The stored login name or an empty string
         */
        _getLoginNameFromLocalStorage: function() {
            var value = znetdk.getLocalSettings('zdklogindialog_login_name');
            return value === false ? '' : value;
        }
    });
});