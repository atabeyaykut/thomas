// Google Indexing Boost - Maximum Crawl Signals
// This script sends maximum signals to Google for rapid indexing

(function() {
    'use strict';
    
    // 1. Google Analytics Event Tracking (shows site activity)
    function trackPageView() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
    }
    
    // 2. Send crawl hints to Google
    function sendCrawlHints() {
        // Create link elements for important pages (crawl hints)
        const importantPages = [
            '/tr/lobby/casino/main.html',
            '/tr/lobby/livecasino/main.html',
            '/sport.html',
            '/promotions.html',
            '/giris',
            '/uye-ol'
        ];
        
        importantPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = window.location.origin + page;
            document.head.appendChild(link);
        });
    }
    
    // 3. Generate user engagement signals
    function generateEngagementSignals() {
        // Scroll depth tracking
        let maxScroll = 0;
        window.addEventListener('scroll', function() {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll > 25 && maxScroll < 30) {
                    console.log('User engaged: 25% scroll');
                } else if (maxScroll > 50 && maxScroll < 55) {
                    console.log('User engaged: 50% scroll');
                } else if (maxScroll > 75 && maxScroll < 80) {
                    console.log('User engaged: 75% scroll');
                }
            }
        });
        
        // Time on page tracking
        const startTime = Date.now();
        window.addEventListener('beforeunload', function() {
            const timeOnPage = (Date.now() - startTime) / 1000;
            console.log('Time on page:', timeOnPage, 'seconds');
        });
    }
    
    // 4. Internal link discovery helper
    function enhanceInternalLinks() {
        const links = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
        links.forEach(link => {
            // Add rel attributes for better crawling
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'follow');
            }
        });
    }
    
    // 5. Structured data validation signal
    function validateStructuredData() {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        if (scripts.length > 0) {
            console.log('✅ Structured data found:', scripts.length, 'schemas');
            scripts.forEach((script, index) => {
                try {
                    JSON.parse(script.textContent);
                    console.log('✅ Schema', index + 1, 'is valid');
                } catch (e) {
                    console.error('❌ Schema', index + 1, 'is invalid:', e);
                }
            });
        }
    }
    
    // 6. Performance metrics (Core Web Vitals signals)
    function trackPerformance() {
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }
    
    // Initialize all boosters
    function init() {
        trackPageView();
        sendCrawlHints();
        generateEngagementSignals();
        enhanceInternalLinks();
        validateStructuredData();
        trackPerformance();
        
        console.log('🚀 Google Indexing Boost Active');
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
