// Force scroll to be always enabled - prevent any script from blocking it
(function() {
    'use strict';
    
    // Remove any overflow:hidden on body/html
    function enableScroll() {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.style.height = '';
        document.body.style.height = '';
        
        // Remove position:fixed that might block scroll
        if (document.body.style.position === 'fixed') {
            document.body.style.position = '';
        }
    }
    
    // Run immediately
    enableScroll();
    
    // Run after DOM loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enableScroll);
    }
    
    // Run after everything loaded
    window.addEventListener('load', enableScroll);
    
    // Monitor for changes and re-enable
    const observer = new MutationObserver(function() {
        const bodyOverflow = window.getComputedStyle(document.body).overflow;
        const htmlOverflow = window.getComputedStyle(document.documentElement).overflow;
        
        if (bodyOverflow === 'hidden' || htmlOverflow === 'hidden') {
            enableScroll();
        }
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    
    console.log('✅ Scroll protection active');
})();
