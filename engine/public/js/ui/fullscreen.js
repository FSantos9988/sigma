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
 * Fullscreen : displaying element in full screen
 *
 * File version: 1.0
 * Last update: 08/10/2018
 */
/**
 * Fullscreen widget
 */
$.widget("znetdk.zdkfullscreen", {
    _create: function () {
        // Nothing to do
    },
    toggleFullScreen: function() {
        var isInFullScreen = this._isInFullScreen();
        if (!isInFullScreen) {
            this._requestFullScreen();
        } else {
            this._exitFullScreen();
        }
        this._trigger('toggle', this, {isInFullScreen: isInFullScreen});
    },
    _isInFullScreen: function() {
        var fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement
                || document.mozFullScreenElement || document.msFullscreenElement || null;
        return fullScreenElement !== null;
    },
    _requestFullScreen: function() {
        if(this.element[0].requestFullscreen) {
            this.element[0].requestFullscreen();
        } else if(this.element[0].mozRequestFullScreen) {
            this.element[0].mozRequestFullScreen();
        } else if(this.element[0].webkitRequestFullscreen) {
            this.element[0].webkitRequestFullscreen();
        } else if(this.element[0].msRequestFullscreen) {
            this.element[0].msRequestFullscreen();
        }
        this.element.addClass('zdk-fullscreen-on');
    },
    _exitFullScreen: function() {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if(document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        this.element.removeClass('zdk-fullscreen-on');
    }

});