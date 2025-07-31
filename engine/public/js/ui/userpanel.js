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
 * ZnetDK User Informations panel
 *
 * File version: 1.3
 * Last updated: 07/31/2022 
 */
$.widget("znetdk.zdkuserpanel", {
    /**
     * Widget's constructor: initialization from the HTML5 attributes
     * 'data-zdk-username', 'data-zdk-usermail' and 'data-zdk-changepwd'.
     */
    _create: function () {
        var username = this.element.attr('data-zdk-username'),
            mail = this.element.attr('data-zdk-usermail'),
            pwdlabel = this.element.attr('data-zdk-changepwd'),
            userRightslabel = this.element.attr('data-zdk-myuserrights');
        if (username.length) {
            this.menu = $('<ul id="zdk-profile-view"/>').appendTo('body');
            this.menu.append('<li class="username">' + username + '</li>');
            this.menu.append('<li class="usermail">' + mail + '</li>');
            this.menu.append('<li class="changepwd"><a class="ui-state-default"><i class="fa fa-unlock-alt"></i>&nbsp;&nbsp;'
                    + pwdlabel + '</a></li>');
            this.menu.append('<li class="my-user-rights"><a class="ui-state-default"><i class="fa fa-key"></i>&nbsp;&nbsp;'
                    + userRightslabel + '</a></li>');
            this.menu.puimenu({
                popup: true,
                trigger: $('#zdk-profile')
            });
            $('#zdk-profile-view').parent('div.pui-menu-dynamic').addClass('zdk-user-panel');
            // Bind events...
            this._bindEvents();
        }
    },
    /**
     * Handles the clic events of the menu's items
     */
    _bindEvents: function () {
        /* Change password */
        this.menu.find('li.changepwd').on('click.zdkuserpanel', function () {
            znetdk.showLoginDialog(true);
        });
        /* Display user rights */
        this.menu.find('li.my-user-rights').on('click.zdkuserpanel', function () {
            znetdk.showModalDialog('znetdk_my_user_rights_dialog', 'myuserrights');
        });
    }
});