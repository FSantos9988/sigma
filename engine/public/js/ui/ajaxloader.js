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
 * Ajaxloader : ajax loader displayed during Ajax requests
 *
 * File version: 1.1
 * Last update: 07/24/2021
 */
/**
 * Ajaxloader widget
 * Ajax loader displayed during Ajax requests
 */
$.widget("znetdk.zdkajaxloader", {
    _create: function () {
        this.loaderImageId = "zdk-ajax-loading";
        this.loaderImagePath = this.element.attr('src');
        this.ajaxInProgress = 0;
        // Bind events...
        this._bindEvents();
    },
    _bindEvents: function () {
        var $this = this;
        // Before Ajax Request
        $(document).on("ajaxSend.zdkajaxloader", function(){
            if (!$this.ajaxInProgress) {
                $this.setLoadingState();
            }
            $this.ajaxInProgress += 1;
        })
        // Ajax request terminated
        .on("ajaxComplete.zdkajaxloader", function(){
            if ($this.ajaxInProgress === 1) {
                $this.unsetLoadingState();
            }
            $this.ajaxInProgress -= 1;
        });
        // JS error attached
        $(window).on('error.zdkajaxloader', function(event){
            $this.unsetLoadingState();
            if ($this.ajaxInProgress > 0) {
                $this.ajaxInProgress -= 1;
            }
        });
    },
    setLoadingState: function() {
        $('body').block({message:null,overlayCSS:{backgroundColor:'#000',opacity:0},baseZ:3000});
        $('body').append('<img id="'+ this.loaderImageId+'" src="'+ this.loaderImagePath +'"/>');
    },
    unsetLoadingState: function() {
        $('body').unblock();
        $('#'+this.loaderImageId).remove();
    }
});