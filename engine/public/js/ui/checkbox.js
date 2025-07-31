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
 * PrimeUI Checkbox Widget
 * ZnetDK Extended version of the PrimeUI checkbox Widget
 * File version: 1.1
 * Last update: 11/14/2017
 */
$(function () {
    $.widget("primeui.puicheckbox", $.primeui.puicheckbox, {
       /**
        * Overloaded version of the parent method to only enable the widget if is
        * disabled
        */
        enable: function() {
            if (this.box.hasClass('ui-state-disabled')) {
                this._super();
            }
        },
        /**
         * Overloaded version of the parent method including the silent parameter
         * to avoid change event triggering when the checkbox is unchecked
         */
        uncheck: function(silent) {
            if(this.isChecked()) {
                this.element.prop('checked', false);
                this.box.removeClass('ui-state-active');
                this.icon.removeClass('ui-icon ui-icon-check');
                if(!silent) {
                    this.element.trigger('change');
                }
            }
        }
    });
});