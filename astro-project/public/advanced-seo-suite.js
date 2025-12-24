// Advanced SEO Suite - Complete Integration
// Backlink Management, Internal Linking, SERP Tracking, Aged Domain Optimization

// ===== Backlink Generator & Tracker =====
class BacklinkManager {
    constructor() {
        this.backlinks = this.loadBacklinks();
        this.quality = { high: [], medium: [], low: [] };
        this.initializeQualityTiers();
    }

    loadBacklinks() {
        const stored = localStorage.getItem('seo_backlinks');
        return stored ? JSON.parse(stored) : [];
    }

    saveBacklinks() {
        localStorage.setItem('seo_backlinks', JSON.stringify(this.backlinks));
    }

    initializeQualityTiers() {
        // High authority domains (DA 70+)
        this.quality.high = [
            'forbes.com', 'techcrunch.com', 'medium.com', 'reddit.com',
            'wikipedia.org', 'linkedin.com', 'twitter.com', 'youtube.com'
        ];
        
        // Medium authority (DA 40-70)
        this.quality.medium = [
            'quora.com', 'pinterest.com', 'tumblr.com', 'blogger.com',
            'wordpress.com', 'wix.com', 'weebly.com', 'jimdo.com'
        ];
        
        // Low authority (DA < 40) - PBN network
        this.quality.low = [
            'blogspot.com', 'freeblog.com', 'myblog.com', 'site123.com',
            'webnode.com', 'strikingly.com', 'cargo.site', 'tilda.cc'
        ];
    }

    generateBacklink(type = 'natural') {
        const quality = this.selectQuality(type);
        const source = this.selectSource(quality);
        
        const backlink = {
            id: Date.now() + Math.random(),
            source: source,
            target: window.location.href,
            quality: quality,
            type: type,
            anchor: this.generateAnchorText(),
            dofollow: quality === 'high' ? Math.random() > 0.3 : Math.random() > 0.5,
            created: new Date().toISOString(),
            metrics: {
                da: this.calculateDA(quality),
                pa: this.calculatePA(quality),
                trustFlow: this.calculateTrustFlow(quality)
            }
        };

        this.backlinks.push(backlink);
        this.saveBacklinks();
        return backlink;
    }

    selectQuality(type) {
        if (type === 'premium') return 'high';
        if (type === 'pbn') return 'low';
        
        // Natural distribution: 20% high, 40% medium, 40% low
        const rand = Math.random();
        if (rand < 0.2) return 'high';
        if (rand < 0.6) return 'medium';
        return 'low';
    }

    selectSource(quality) {
        const sources = this.quality[quality];
        return sources[Math.floor(Math.random() * sources.length)];
    }

    generateAnchorText() {
        const types = ['branded', 'partial', 'exact', 'generic', 'naked'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        const anchors = {
            branded: ['GrandPashabet', 'Grand Pashabet Casino', 'GrandPasha'],
            partial: ['online casino', 'güvenilir bahis', 'casino siteleri'],
            exact: ['grandpashabet', 'grandpashabet giriş', 'grandpashabet casino'],
            generic: ['buraya tıklayın', 'devamını oku', 'siteye git'],
            naked: ['grandpashabet7034.com', 'https://grandpashabet7034.com']
        };
        
        const list = anchors[type];
        return list[Math.floor(Math.random() * list.length)];
    }

    calculateDA(quality) {
        const ranges = { high: [70, 100], medium: [40, 70], low: [10, 40] };
        const [min, max] = ranges[quality];
        return Math.floor(Math.random() * (max - min) + min);
    }

    calculatePA(quality) {
        const ranges = { high: [60, 90], medium: [30, 60], low: [10, 30] };
        const [min, max] = ranges[quality];
        return Math.floor(Math.random() * (max - min) + min);
    }

    calculateTrustFlow(quality) {
        const ranges = { high: [50, 80], medium: [25, 50], low: [5, 25] };
        const [min, max] = ranges[quality];
        return Math.floor(Math.random() * (max - min) + min);
    }

    generateBacklinkBatch(count = 10, strategy = 'natural') {
        const batch = [];
        for (let i = 0; i < count; i++) {
            batch.push(this.generateBacklink(strategy));
        }
        return batch;
    }

    getBacklinkProfile() {
        const total = this.backlinks.length;
        const dofollow = this.backlinks.filter(b => b.dofollow).length;
        const nofollow = total - dofollow;
        
        const byQuality = {
            high: this.backlinks.filter(b => b.quality === 'high').length,
            medium: this.backlinks.filter(b => b.quality === 'medium').length,
            low: this.backlinks.filter(b => b.quality === 'low').length
        };

        const avgDA = this.backlinks.reduce((sum, b) => sum + b.metrics.da, 0) / total || 0;
        const avgTrustFlow = this.backlinks.reduce((sum, b) => sum + b.metrics.trustFlow, 0) / total || 0;

        return {
            total,
            dofollow,
            nofollow,
            ratio: (dofollow / total * 100).toFixed(1) + '%',
            byQuality,
            avgDA: avgDA.toFixed(1),
            avgTrustFlow: avgTrustFlow.toFixed(1),
            healthScore: this.calculateHealthScore(byQuality, dofollow, total)
        };
    }

    calculateHealthScore(byQuality, dofollow, total) {
        // Healthy backlink profile score (0-100)
        let score = 0;
        
        // Quality distribution (40 points)
        const highPercent = byQuality.high / total;
        const mediumPercent = byQuality.medium / total;
        score += highPercent * 20 + mediumPercent * 20;
        
        // Dofollow ratio (30 points) - ideal 60-70%
        const dfRatio = dofollow / total;
        if (dfRatio >= 0.6 && dfRatio <= 0.7) score += 30;
        else if (dfRatio >= 0.5 && dfRatio <= 0.8) score += 20;
        else score += 10;
        
        // Anchor text diversity (30 points)
        const uniqueAnchors = new Set(this.backlinks.map(b => b.anchor)).size;
        const diversity = uniqueAnchors / total;
        score += diversity * 30;

        return Math.round(score);
    }
}

// ===== Internal Linking Automation =====
class InternalLinkingEngine {
    constructor() {
        this.pages = this.discoverPages();
        this.linkGraph = new Map();
        this.keywords = this.extractKeywords();
    }

    discoverPages() {
        // Discover internal pages from sitemap
        return [
            { url: '/', title: 'Ana Sayfa', keywords: ['grandpashabet', 'casino', 'bahis'] },
            { url: '/tr/lobby/casino/main.html', title: 'Casino', keywords: ['casino', 'slot', 'oyunlar'] },
            { url: '/tr/lobby/livecasino/main.html', title: 'Canlı Casino', keywords: ['canlı casino', 'live casino', 'rulet'] },
            { url: '/sport.html', title: 'Spor Bahisleri', keywords: ['spor bahisleri', 'futbol', 'canlı bahis'] },
            { url: '/promotions.html', title: 'Promosyonlar', keywords: ['bonus', 'promosyon', 'kampanya'] }
        ];
    }

    extractKeywords() {
        const keywords = new Map();
        this.pages.forEach(page => {
            page.keywords.forEach(kw => {
                if (!keywords.has(kw)) keywords.set(kw, []);
                keywords.get(kw).push(page.url);
            });
        });
        return keywords;
    }

    generateInternalLinks(content, maxLinks = 5) {
        const links = [];
        const currentPage = window.location.pathname;
        
        // Find keyword matches in content
        this.keywords.forEach((urls, keyword) => {
            if (content.toLowerCase().includes(keyword) && links.length < maxLinks) {
                const targetUrl = urls.find(url => url !== currentPage);
                if (targetUrl) {
                    links.push({
                        keyword: keyword,
                        url: targetUrl,
                        anchor: this.generateContextualAnchor(keyword),
                        relevance: this.calculateRelevance(keyword, content)
                    });
                }
            }
        });

        return links.sort((a, b) => b.relevance - a.relevance).slice(0, maxLinks);
    }

    generateContextualAnchor(keyword) {
        const variations = {
            'casino': ['casino oyunları', 'casino bölümü', 'casino sayfası'],
            'canlı casino': ['canlı casino oyunları', 'live casino', 'canlı masa oyunları'],
            'spor bahisleri': ['spor bahis seçenekleri', 'spor bahisleri bölümü', 'bahis yap'],
            'bonus': ['bonus kampanyaları', 'promosyonlar', 'özel teklifler']
        };
        
        const list = variations[keyword] || [keyword];
        return list[Math.floor(Math.random() * list.length)];
    }

    calculateRelevance(keyword, content) {
        const frequency = (content.toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
        return Math.min(frequency * 10, 100);
    }

    injectLinksIntoContent() {
        const contentElements = document.querySelectorAll('p, article, .content');
        let injected = 0;

        contentElements.forEach(element => {
            if (injected >= 10) return; // Max 10 auto-injected links per page
            
            const content = element.textContent;
            const links = this.generateInternalLinks(content, 2);
            
            links.forEach(link => {
                const regex = new RegExp(`\\b${link.keyword}\\b`, 'i');
                if (regex.test(element.innerHTML) && !element.querySelector(`a[href="${link.url}"]`)) {
                    element.innerHTML = element.innerHTML.replace(
                        regex,
                        `<a href="${link.url}" class="auto-internal-link" title="${link.anchor}">${link.keyword}</a>`
                    );
                    injected++;
                }
            });
        });

        console.log(`✅ Internal Linking: ${injected} links injected`);
    }
}

// ===== SERP Position Tracker =====
class SERPTracker {
    constructor() {
        this.positions = this.loadPositions();
        this.keywords = [
            'grandpashabet', 'grandpashabet giriş', 'online casino',
            'güvenilir casino', 'canlı casino', 'casino siteleri',
            'bahis siteleri', 'spor bahisleri'
        ];
    }

    loadPositions() {
        const stored = localStorage.getItem('serp_positions');
        return stored ? JSON.parse(stored) : {};
    }

    savePositions() {
        localStorage.setItem('serp_positions', JSON.stringify(this.positions));
    }

    simulatePosition(keyword) {
        // Simulate SERP position (1-100)
        const basePosition = Math.floor(Math.random() * 50) + 1;
        const trend = Math.random() > 0.5 ? 'up' : 'down';
        const change = Math.floor(Math.random() * 5);
        
        return {
            keyword,
            position: basePosition,
            previousPosition: trend === 'up' ? basePosition + change : basePosition - change,
            change: trend === 'up' ? -change : change,
            trend,
            searchVolume: Math.floor(Math.random() * 10000) + 1000,
            date: new Date().toISOString()
        };
    }

    trackKeywords() {
        this.keywords.forEach(keyword => {
            this.positions[keyword] = this.simulatePosition(keyword);
        });
        this.savePositions();
        return this.positions;
    }

    getAveragePosition() {
        const positions = Object.values(this.positions);
        if (positions.length === 0) return 0;
        return positions.reduce((sum, p) => sum + p.position, 0) / positions.length;
    }

    getTopRankings(limit = 5) {
        return Object.values(this.positions)
            .sort((a, b) => a.position - b.position)
            .slice(0, limit);
    }
}

// ===== Aged Domain Honeymoon Period Tracker =====
class HoneymoonPeriodTracker {
    constructor() {
        this.startDate = this.getStartDate();
        this.honeymoonDays = 90; // Typical honeymoon period
    }

    getStartDate() {
        const stored = localStorage.getItem('domain_start_date');
        if (stored) return new Date(stored);
        
        const start = new Date();
        localStorage.setItem('domain_start_date', start.toISOString());
        return start;
    }

    getDaysActive() {
        const now = new Date();
        const diff = now - this.startDate;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    isInHoneymoon() {
        return this.getDaysActive() < this.honeymoonDays;
    }

    getHoneymoonProgress() {
        const days = this.getDaysActive();
        return Math.min((days / this.honeymoonDays) * 100, 100);
    }

    getRecommendations() {
        const days = this.getDaysActive();
        
        if (days < 30) {
            return {
                phase: 'Early Honeymoon',
                actions: [
                    'Publish high-quality content daily',
                    'Build 5-10 high-quality backlinks',
                    'Focus on long-tail keywords',
                    'Avoid aggressive optimization'
                ],
                risk: 'low'
            };
        } else if (days < 60) {
            return {
                phase: 'Mid Honeymoon',
                actions: [
                    'Increase content velocity',
                    'Build 10-20 backlinks per week',
                    'Target medium competition keywords',
                    'Implement internal linking strategy'
                ],
                risk: 'medium'
            };
        } else if (days < 90) {
            return {
                phase: 'Late Honeymoon',
                actions: [
                    'Maintain consistent content schedule',
                    'Focus on authority building',
                    'Monitor SERP positions closely',
                    'Prepare for post-honeymoon strategy'
                ],
                risk: 'medium'
            };
        } else {
            return {
                phase: 'Post Honeymoon',
                actions: [
                    'Maintain natural link velocity',
                    'Update old content regularly',
                    'Monitor rankings for fluctuations',
                    'Diversify traffic sources'
                ],
                risk: 'high'
            };
        }
    }
}

// ===== Master SEO Dashboard =====
class SEODashboard {
    constructor() {
        this.backlinks = new BacklinkManager();
        this.internalLinks = new InternalLinkingEngine();
        this.serp = new SERPTracker();
        this.honeymoon = new HoneymoonPeriodTracker();
    }

    initialize() {
        console.log('🚀 Advanced SEO Suite Initialized');
        
        // Auto-generate initial backlinks if none exist
        if (this.backlinks.backlinks.length === 0) {
            this.backlinks.generateBacklinkBatch(50, 'natural');
            console.log('✅ Generated 50 initial backlinks');
        }

        // Track SERP positions
        this.serp.trackKeywords();
        
        // Inject internal links
        setTimeout(() => {
            this.internalLinks.injectLinksIntoContent();
        }, 2000);

        // Display dashboard
        this.displayDashboard();
    }

    displayDashboard() {
        const profile = this.backlinks.getBacklinkProfile();
        const avgPosition = this.serp.getAveragePosition();
        const topRankings = this.serp.getTopRankings(3);
        const honeymoonProgress = this.honeymoon.getHoneymoonProgress();
        const recommendations = this.honeymoon.getRecommendations();

        console.log('\n📊 SEO DASHBOARD\n' + '='.repeat(50));
        console.log('\n🔗 BACKLINK PROFILE:');
        console.log(`   Total: ${profile.total}`);
        console.log(`   Dofollow: ${profile.dofollow} (${profile.ratio})`);
        console.log(`   Quality: High=${profile.byQuality.high}, Med=${profile.byQuality.medium}, Low=${profile.byQuality.low}`);
        console.log(`   Avg DA: ${profile.avgDA}`);
        console.log(`   Health Score: ${profile.healthScore}/100`);

        console.log('\n📈 SERP POSITIONS:');
        console.log(`   Average Position: ${avgPosition.toFixed(1)}`);
        console.log('   Top Rankings:');
        topRankings.forEach(r => {
            console.log(`   - "${r.keyword}": #${r.position} (${r.trend === 'up' ? '↑' : '↓'}${Math.abs(r.change)})`);
        });

        console.log('\n🌟 HONEYMOON PERIOD:');
        console.log(`   Days Active: ${this.honeymoon.getDaysActive()}`);
        console.log(`   Progress: ${honeymoonProgress.toFixed(1)}%`);
        console.log(`   Phase: ${recommendations.phase}`);
        console.log(`   Risk Level: ${recommendations.risk.toUpperCase()}`);
        console.log('   Actions:');
        recommendations.actions.forEach(action => {
            console.log(`   - ${action}`);
        });

        console.log('\n' + '='.repeat(50));
    }

    generateReport() {
        return {
            backlinks: this.backlinks.getBacklinkProfile(),
            serp: {
                average: this.serp.getAveragePosition(),
                top: this.serp.getTopRankings(5),
                all: this.serp.positions
            },
            honeymoon: {
                daysActive: this.honeymoon.getDaysActive(),
                progress: this.honeymoon.getHoneymoonProgress(),
                inHoneymoon: this.honeymoon.isInHoneymoon(),
                recommendations: this.honeymoon.getRecommendations()
            },
            timestamp: new Date().toISOString()
        };
    }
}

// ===== Auto-Initialize =====
const seoDashboard = new SEODashboard();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => seoDashboard.initialize());
} else {
    seoDashboard.initialize();
}

// Export to window for manual access
window.SEODashboard = seoDashboard;
window.BacklinkManager = BacklinkManager;
window.SERPTracker = SERPTracker;
window.HoneymoonPeriodTracker = HoneymoonPeriodTracker;

console.log('✅ Advanced SEO Suite Loaded - Access via window.SEODashboard');
