// SEO Tracking & Analytics Script
(function() {
  'use strict';
  
  // ============================================
  // 1. INTERNAL LINK TRACKING
  // ============================================
  
  function trackInternalLinks() {
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      link.addEventListener('click', function(e) {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'internal_link_click', {
            'event_category': 'Navigation',
            'event_label': this.href,
            'link_text': this.textContent.trim(),
            'source_page': window.location.pathname
          });
        }
      });
    });
  }
  
  // ============================================
  // 2. EXTERNAL LINK TRACKING
  // ============================================
  
  function trackExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.href.includes(window.location.hostname)) {
        link.addEventListener('click', function(e) {
          if (typeof gtag !== 'undefined') {
            gtag('event', 'external_link_click', {
              'event_category': 'Outbound',
              'event_label': this.href,
              'link_text': this.textContent.trim()
            });
          }
        });
      }
    });
  }
  
  // ============================================
  // 3. SCROLL DEPTH TRACKING
  // ============================================
  
  function trackScrollDepth() {
    const milestones = [25, 50, 75, 100];
    const tracked = new Set();
    
    function checkScrollDepth() {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
              'event_category': 'Engagement',
              'event_label': milestone + '%',
              'value': milestone
            });
          }
        }
      });
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScrollDepth, 100);
    });
  }
  
  // ============================================
  // 4. TIME ON PAGE TRACKING
  // ============================================
  
  function trackTimeOnPage() {
    let startTime = Date.now();
    let intervals = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
    let tracked = new Set();
    
    setInterval(function() {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      intervals.forEach(interval => {
        if (timeSpent >= interval && !tracked.has(interval)) {
          tracked.add(interval);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'time_on_page', {
              'event_category': 'Engagement',
              'event_label': interval + 's',
              'value': interval
            });
          }
        }
      });
    }, 5000);
  }
  
  // ============================================
  // 5. CTA BUTTON TRACKING
  // ============================================
  
  function trackCTAButtons() {
    const ctaSelectors = [
      '.registerDialog',
      '.loginDialog',
      '[href*="register"]',
      '[href*="deposit"]',
      '.cta-button'
    ];
    
    ctaSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(button => {
        button.addEventListener('click', function(e) {
          if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
              'event_category': 'Conversion',
              'event_label': this.textContent.trim() || this.getAttribute('href'),
              'cta_type': selector
            });
          }
        });
      });
    });
  }
  
  // ============================================
  // 6. GAME CLICK TRACKING
  // ============================================
  
  function trackGameClicks() {
    document.querySelectorAll('[data-game-id], .game-item, .game-card').forEach(game => {
      game.addEventListener('click', function(e) {
        const gameName = this.getAttribute('data-game-name') || 
                        this.querySelector('.game-title')?.textContent || 
                        'Unknown';
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'game_click', {
            'event_category': 'Games',
            'event_label': gameName,
            'game_id': this.getAttribute('data-game-id')
          });
        }
      });
    });
  }
  
  // ============================================
  // 7. SEARCH TRACKING
  // ============================================
  
  function trackSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
    
    searchInputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
          if (typeof gtag !== 'undefined') {
            gtag('event', 'search', {
              'event_category': 'Search',
              'search_term': this.value.trim()
            });
          }
        }
      });
    });
  }
  
  // ============================================
  // 8. ERROR TRACKING
  // ============================================
  
  function trackErrors() {
    window.addEventListener('error', function(e) {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'javascript_error', {
          'event_category': 'Error',
          'event_label': e.message,
          'error_file': e.filename,
          'error_line': e.lineno
        });
      }
    });
  }
  
  // ============================================
  // 9. PAGE PERFORMANCE TRACKING
  // ============================================
  
  function trackPagePerformance() {
    window.addEventListener('load', function() {
      setTimeout(function() {
        if ('performance' in window && 'timing' in window.performance) {
          const timing = window.performance.timing;
          const loadTime = timing.loadEventEnd - timing.navigationStart;
          const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
          const firstPaint = timing.responseStart - timing.navigationStart;
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'page_performance', {
              'event_category': 'Performance',
              'page_load_time': loadTime,
              'dom_ready_time': domReady,
              'first_paint_time': firstPaint
            });
          }
        }
      }, 0);
    });
  }
  
  // ============================================
  // 10. CORE WEB VITALS TRACKING
  // ============================================
  
  function trackWebVitals() {
    // LCP - Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              'event_category': 'Web Vitals',
              'event_label': 'LCP',
              'value': Math.round(lastEntry.renderTime || lastEntry.loadTime)
            });
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.log('LCP tracking not supported');
      }
      
      // FID - First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                'event_category': 'Web Vitals',
                'event_label': 'FID',
                'value': Math.round(entry.processingStart - entry.startTime)
              });
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.log('FID tracking not supported');
      }
      
      // CLS - Cumulative Layout Shift
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        
        // Report CLS on page unload
        window.addEventListener('beforeunload', () => {
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              'event_category': 'Web Vitals',
              'event_label': 'CLS',
              'value': Math.round(clsValue * 1000)
            });
          }
        });
      } catch (e) {
        console.log('CLS tracking not supported');
      }
    }
  }
  
  // ============================================
  // 11. BOUNCE RATE OPTIMIZATION
  // ============================================
  
  function trackEngagement() {
    let engaged = false;
    const engagementThreshold = 15000; // 15 seconds
    
    setTimeout(function() {
      if (!engaged) {
        engaged = true;
        if (typeof gtag !== 'undefined') {
          gtag('event', 'engaged_session', {
            'event_category': 'Engagement',
            'event_label': 'User stayed 15+ seconds'
          });
        }
      }
    }, engagementThreshold);
  }
  
  // ============================================
  // 12. SOCIAL SHARE TRACKING
  // ============================================
  
  function trackSocialShares() {
    document.querySelectorAll('[data-share], .share-button').forEach(button => {
      button.addEventListener('click', function(e) {
        const platform = this.getAttribute('data-platform') || 'unknown';
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'social_share', {
            'event_category': 'Social',
            'event_label': platform,
            'page_url': window.location.href
          });
        }
      });
    });
  }
  
  // ============================================
  // INITIALIZE ALL TRACKING
  // ============================================
  
  function initTracking() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initAllTrackers, 1000);
      });
    } else {
      setTimeout(initAllTrackers, 1000);
    }
  }
  
  function initAllTrackers() {
    try {
      trackInternalLinks();
      trackExternalLinks();
      trackScrollDepth();
      trackTimeOnPage();
      trackCTAButtons();
      trackGameClicks();
      trackSearch();
      trackErrors();
      trackPagePerformance();
      trackWebVitals();
      trackEngagement();
      trackSocialShares();
      
      console.log('✅ SEO tracking initialized');
    } catch (error) {
      console.error('SEO tracking error:', error);
    }
  }
  
  // Start tracking
  initTracking();
  
})();
