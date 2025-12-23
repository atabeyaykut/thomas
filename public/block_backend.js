// Block all backend API calls completely
(function() {
    'use strict';
    
    console.log('🚫 Backend blocker loading...');
    
    // List of URLs that should be blocked
    const blockPatterns = [
        'grandpashabet7034.com/DynamicLobbyHelper',
        'grandpashabet7034.com/Home/',
        'grandpashabet7034.com/login/',
        'grandpashabet7034.com/cdn-cgi/',
        'chat15.djqjsor4wf.com',
        'chat15.i4j4ja.com',
        'chat15.knn121gfcv.com',
        'pushengage.com',
        'googletagmanager.com',
        'service.djqjsor4wf.com',
        'sport.grndspr2.com'
    ];
    
    function shouldBlock(url) {
        if (!url) return false;
        return blockPatterns.some(pattern => url.includes(pattern));
    }
    
    // Override XMLHttpRequest
    const OriginalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new OriginalXHR();
        const originalOpen = xhr.open;
        
        xhr.open = function(method, url) {
            if (shouldBlock(url)) {
                console.log('🚫 Blocked XHR:', url);
                // Return a mock xhr that does nothing
                this.send = function() {};
                this.abort = function() {};
                return;
            }
            return originalOpen.apply(this, arguments);
        };
        
        return xhr;
    };
    
    // Override fetch
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (shouldBlock(url)) {
            console.log('🚫 Blocked fetch:', url);
            return Promise.reject(new Error('Blocked by frontend'));
        }
        return originalFetch.apply(this, arguments);
    };
    
    // Override jQuery AJAX
    if (typeof $ !== 'undefined' && $.ajax) {
        const originalAjax = $.ajax;
        $.ajax = function(options) {
            const url = typeof options === 'string' ? options : (options.url || '');
            
            if (shouldBlock(url)) {
                console.log('🚫 Blocked jQuery AJAX:', url);
                
                // Return a mock promise
                const deferred = $.Deferred();
                deferred.reject({
                    status: 0,
                    statusText: 'blocked',
                    responseText: 'Blocked by frontend'
                });
                return deferred.promise();
            }
            
            return originalAjax.apply(this, arguments);
        };
    }
    
    console.log('✅ Backend blocker active - All external calls blocked!');
})();
