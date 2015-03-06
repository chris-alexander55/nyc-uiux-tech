var $ = require('jquery');
var Modernizr = require('modernizr');
var $ = require('jquery');
var MQListener = require('./plugins/mqlistener');

'use strict';

var Z63 = (function (parent, $) {

    var MediaQueryListener = function() {
        this.afterElement = window.getComputedStyle ? window.getComputedStyle(document.body, ':after') : false;
        this.currentBreakpoint = '';
        this.lastBreakpoint = '';
        this.init();
    };

    MediaQueryListener.prototype = {

        init: function () {
            var self = this;

            if (!self.afterElement) {
                return;
            }

            self._resizeListener();

        },
        _resizeListener: function () {
            var self = this;

            $(window).on('resize orientationchange load', function() {
                self.currentBreakpoint = self.afterElement.getPropertyValue('content');

                if (self.currentBreakpoint !== self.lastBreakpoint) {
                    $(window).trigger('breakpoint-change', self.currentBreakpoint);
                    self.lastBreakpoint = self.currentBreakpoint;
                }

            });
        }

    };

    parent.mediaqueryListener = parent.mediaqueryListener || new MediaQueryListener();

    return parent;

}(Z63 || {}, jQuery));

try {
	// feature detection
	if (!Modernizr.fontface || !Modernizr.backgroundsize || !Modernizr.cssanimations || !Modernizr.cssgradients || !Modernizr.csstransitions) {
		$('.user-agent').removeClass('hide').addClass('show');
	}

	// load image assets

	// init twitter

	// init gmap

	// media-query listener
	$(window).on('breakpoint-change', function(e, breakpoint) {

	    switch(breakpoint) {
	    	case 'mobile':
	    		break;
	    	case 'mobile-retina':
	    		break;
	    	case 'tablet':
	    		break;
	    	case 'tablet-retina':
	    		break;
	    	case 'desktop':
	    		break;
	    	case 'desktop-retina':
	    		break;
	    	case 'display':
	    		break;
	    	case 'display-retina':
	    		break;
	    	default:
	    		break;
	    }

	});
}
catch(ex) {

}
	