// Mobile Device Detection and Redirect
(function() {
    'use strict';
    
    // Check if already on mobile page
    if (window.location.pathname.includes('/mobile.html')) {
        return;
    }
    
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check if user prefers desktop version (cookie)
    const preferDesktop = document.cookie.includes('preferDesktop=true');
    
    if (isMobile && !preferDesktop) {
        // Preserve current URL hash and query params
        const currentHash = window.location.hash;
        const currentSearch = window.location.search;
        
        // Redirect to mobile version
        window.location.href = '/mobile.html' + currentSearch + currentHash;
    }
    
    console.log('📱 Mobile detection:', isMobile ? 'Mobile device' : 'Desktop device');
})();
