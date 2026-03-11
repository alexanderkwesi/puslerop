import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Layout, 
  Facebook, 
  Monitor, 
  Package, 
  TrendingUp, 
  Globe, 
  Zap, 
  LogOut,
  Filter,
  ArrowUpRight,
  Star,
  ShieldCheck,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  DollarSign,
  BarChart3,
  MousePointer,
  TrendingDown,
  TrendingUp as TrendUp,
  Wallet,
  ExternalLink
} from "lucide-react";
import "./site.css";
// ─── Simulated Ad Data ────────────────────────────────────────────────────────
const AD_DATA = {
  googleSearch: [
    { id: "gs1", tier: "best", title: "Nike Air Max 2024 – Official Store", desc: "Free next-day delivery. Shop the latest Air Max styles. Limited stock.", url: "https://www.nike.com/gb/w/air-max", cpc: "£1.82", ctr: "8.4%", impressions: "240K", region: "UK", badge: "Top Result", category: "Fashion", commission: "5%", epc: "£0.45" },
    { id: "gs2", tier: "best", title: "Dyson V15 Detect – Free Shipping Today", desc: "The most powerful cord-free vacuum. 60-min runtime. 5yr warranty.", url: "https://www.dyson.co.uk/vacuum-cleaners", cpc: "$2.41", ctr: "7.9%", impressions: "180K", region: "US", badge: "Top Result", category: "Home", commission: "8%", epc: "$0.85" },
    { id: "gs3", tier: "best", title: "MacBook Pro M3 – Apple UK", desc: "Up to 22hr battery. Shop now with 0% finance available.", url: "https://www.apple.com/uk/shop", cpc: "£3.10", ctr: "9.1%", impressions: "320K", region: "UK", badge: "Top Result", category: "Tech", commission: "3%", epc: "£1.20" },
    { id: "gs4", tier: "best", title: "Amazon Prime – Try 30 Days Free", desc: "Unlimited fast delivery, exclusive deals, Prime Video & more.", url: "https://www.amazon.co.uk/prime", cpc: "$1.55", ctr: "11.2%", impressions: "500K", region: "US", badge: "Sponsored", category: "Retail", commission: "£1.50 flat", epc: "$1.50" },
    { id: "gs5", tier: "best", title: "HelloFresh – £25 Off First Box", desc: "Fresh ingredients, easy recipes. Cancel anytime. Rated #1 in UK.", url: "https://www.hellofresh.co.uk", cpc: "£2.20", ctr: "6.8%", impressions: "150K", region: "UK", badge: "Sponsored", category: "Food", commission: "£8 per signup", epc: "£2.40" },
    { id: "gs6", tier: "medium", title: "QuickBooks Online – 75% Off 3 Months", desc: "Manage invoices, expenses & payroll in one place. Free trial.", url: "https://quickbooks.intuit.com", cpc: "$4.20", ctr: "3.9%", impressions: "90K", region: "US", badge: "Sponsored", category: "Software", commission: "25%", epc: "$1.80" },
    { id: "gs7", tier: "medium", title: "PureGym – Join From £17.99/mo", desc: "Open 24/7. 300+ locations across the UK. No contract needed.", url: "https://www.puregym.com", cpc: "£1.30", ctr: "4.2%", impressions: "120K", region: "UK", badge: "Sponsored", category: "Fitness", commission: "£5 per signup", epc: "£0.95" },
    { id: "gs8", tier: "medium", title: "Grammarly Premium – Smarter Writing", desc: "Fix grammar, spelling, clarity & tone. Works everywhere you write.", url: "https://www.grammarly.com", cpc: "$2.80", ctr: "5.1%", impressions: "200K", region: "US", badge: "Sponsored", category: "Software", commission: "30%", epc: "$1.10" },
    { id: "gs9", tier: "low", title: "BrightLocal – Local SEO Tools", desc: "Track local rankings, manage reviews, audit citations.", url: "https://www.brightlocal.com", cpc: "$6.10", ctr: "1.8%", impressions: "22K", region: "US", badge: "Sponsored", category: "Marketing", commission: "20%", epc: "$0.35" },
    { id: "gs10", tier: "low", title: "Zoro UK – Industrial Supplies", desc: "Over 500,000 products. Next day delivery available.", url: "https://www.zoro.co.uk", cpc: "£0.95", ctr: "1.2%", impressions: "18K", region: "UK", badge: "Sponsored", category: "Industrial", commission: "4%", epc: "£0.12" },
  ],
  googleDisplay: [
    { id: "gd1", tier: "best", title: "Spotify Premium", desc: "Listen without limits. 3 months for £0.99.", url: "https://www.spotify.com/uk/premium", cpc: "£0.55", ctr: "6.3%", impressions: "1.2M", region: "UK", badge: "Display", category: "Entertainment", commission: "£3 per signup", epc: "£0.65" },
    { id: "gd2", tier: "best", title: "Airbnb – Find Your Place", desc: "Unique stays worldwide. Book with confidence.", url: "https://www.airbnb.co.uk", cpc: "$0.72", ctr: "5.8%", impressions: "900K", region: "US", badge: "Display", category: "Travel", commission: "3%", epc: "$1.20" },
    { id: "gd3", tier: "best", title: "Adobe Creative Cloud", desc: "All apps. All features. £54.98/mo. Cancel anytime.", url: "https://www.adobe.com/uk/creativecloud", cpc: "£1.20", ctr: "4.9%", impressions: "750K", region: "UK", badge: "Display", category: "Software", commission: "15%", epc: "£2.80" },
    { id: "gd4", tier: "medium", title: "Canva Pro – Design Anything", desc: "100M+ templates. Try free for 30 days.", url: "https://www.canva.com/pro", cpc: "$0.88", ctr: "3.4%", impressions: "480K", region: "US", badge: "Display", category: "Design", commission: "40%", epc: "$1.75" },
    { id: "gd5", tier: "medium", title: "Monzo – Modern Banking", desc: "Free UK current account. Instant spending notifications.", url: "https://monzo.com", cpc: "£0.65", ctr: "2.9%", impressions: "380K", region: "UK", badge: "Display", category: "Finance", commission: "£5 per signup", epc: "£1.30" },
    { id: "gd6", tier: "low", title: "Freelancer.com – Hire Talent", desc: "Find freelancers for any project. Post a job free.", url: "https://www.freelancer.com", cpc: "$1.10", ctr: "1.4%", impressions: "95K", region: "US", badge: "Display", category: "Business", commission: "10%", epc: "$0.45" },
  ],
  metaAds: [
    { id: "ma1", tier: "best", title: "ASOS – New Season Just Dropped 🔥", desc: "Free returns. Shop 850+ brands. Student discount available.", url: "https://www.asos.com", cpc: "£0.45", ctr: "7.2%", impressions: "2.1M", region: "UK", badge: "Sponsored", category: "Fashion", platform: "Instagram", commission: "7%", epc: "£0.85" },
    { id: "ma2", tier: "best", title: "Dollar Shave Club – $5 Starter Set", desc: "Get a great shave for just $5. Shipped to your door.", url: "https://www.dollarshaveclub.com", cpc: "$0.62", ctr: "8.5%", impressions: "1.8M", region: "US", badge: "Sponsored", category: "Grooming", platform: "Facebook", commission: "$10 per signup", epc: "$2.20" },
    { id: "ma3", tier: "best", title: "Gymshark – Train Your Way", desc: "New arrivals every week. Free delivery over £45.", url: "https://www.gymshark.com", cpc: "£0.58", ctr: "6.9%", impressions: "1.5M", region: "UK", badge: "Sponsored", category: "Fitness", platform: "Instagram", commission: "6%", epc: "£0.95" },
    { id: "ma4", tier: "best", title: "Calm – Sleep & Meditate Better", desc: "Join 100M+ users. Reduce anxiety, sleep better tonight.", url: "https://www.calm.com", cpc: "$0.79", ctr: "5.4%", impressions: "1.2M", region: "US", badge: "Sponsored", category: "Wellness", platform: "Facebook", commission: "$8 per signup", epc: "$1.85" },
    { id: "ma5", tier: "medium", title: "Bloom & Wild – Send Flowers", desc: "Letterbox flowers delivered in minutes. From £19.", url: "https://www.bloomandwild.com", cpc: "£0.70", ctr: "3.8%", impressions: "620K", region: "UK", badge: "Sponsored", category: "Gifts", platform: "Instagram", commission: "10%", epc: "£1.15" },
    { id: "ma6", tier: "medium", title: "NordVPN – Your Privacy Matters", desc: "68% off + 3 months free. 5,500+ servers. Trusted by millions.", url: "https://nordvpn.com", cpc: "$0.95", ctr: "4.1%", impressions: "880K", region: "US", badge: "Sponsored", category: "Tech", platform: "Facebook", commission: "40%", epc: "$2.50" },
    { id: "ma7", tier: "low", title: "Pukka Herbs – Feel Good Inside", desc: "Organic herbal teas. Ethically sourced. Free delivery £25+.", url: "https://www.pukkaherbs.com", cpc: "£0.38", ctr: "1.6%", impressions: "210K", region: "UK", badge: "Sponsored", category: "Food", platform: "Instagram", commission: "5%", epc: "£0.18" },
    { id: "ma8", tier: "low", title: "Skillshare – Learn Something New", desc: "Try 1 month free. 30,000+ creative classes.", url: "https://www.skillshare.com", cpc: "$1.25", ctr: "2.1%", impressions: "340K", region: "US", badge: "Sponsored", category: "Education", platform: "Facebook", commission: "$7 per signup", epc: "$1.40" },
  ],
  microsoftAds: [
    { id: "ms1", tier: "best", title: "Microsoft 365 – Official Offer", desc: "1TB OneDrive, Word, Excel, Teams. From £5.99/mo.", url: "https://www.microsoft.com/en-gb/microsoft-365", cpc: "£1.05", ctr: "6.7%", impressions: "340K", region: "UK", badge: "Top Bing Ad", category: "Software", commission: "12%", epc: "£2.10" },
    { id: "ms2", tier: "best", title: "LinkedIn Premium – 1 Month Free", desc: "Get hired faster. See who viewed your profile. Start free.", url: "https://premium.linkedin.com", cpc: "$3.80", ctr: "5.9%", impressions: "280K", region: "US", badge: "Top Bing Ad", category: "Career", commission: "$15 per signup", epc: "$3.50" },
    { id: "ms3", tier: "medium", title: "Zoho CRM – Grow Your Business", desc: "Free plan available. Trusted by 250,000+ businesses.", url: "https://www.zoho.com/crm", cpc: "$2.95", ctr: "3.3%", impressions: "110K", region: "US", badge: "Bing Sponsored", category: "Software", commission: "20%", epc: "$1.85" },
    { id: "ms4", tier: "medium", title: "Trainline – Save on UK Rail", desc: "Find cheapest fares fast. Split ticketing available.", url: "https://www.thetrainline.com", cpc: "£0.80", ctr: "4.5%", impressions: "190K", region: "UK", badge: "Bing Sponsored", category: "Travel", commission: "3%", epc: "£0.95" },
    { id: "ms5", tier: "low", title: "Sage Business Cloud – Accounting", desc: "Award-winning cloud accounting for small businesses.", url: "https://www.sage.com/en-gb", cpc: "£2.30", ctr: "1.7%", impressions: "45K", region: "UK", badge: "Bing Sponsored", category: "Finance", commission: "15%", epc: "£0.55" },
  ],
  amazonAds: [
    { id: "az1", tier: "best", title: "Anker PowerBank 26800mAh", desc: "⭐⭐⭐⭐⭐ 48,000 reviews · £39.99 · Prime FREE delivery", url: "https://www.amazon.co.uk/dp/B123456789?tag=youraffiliate-21", cpc: "£0.48", ctr: "9.2%", impressions: "780K", region: "UK", badge: "Sponsored Product", category: "Tech", rating: 4.8, reviews: "48K", commission: "5%", epc: "£0.95" },
    { id: "az2", tier: "best", title: "Instant Pot Duo 7-in-1", desc: "⭐⭐⭐⭐⭐ 89,000 reviews · $79.95 · Save 35% today", url: "https://www.amazon.com/dp/B987654321?tag=youraffiliate-20", cpc: "$0.92", ctr: "10.4%", impressions: "1.1M", region: "US", badge: "Sponsored Product", category: "Home", rating: 4.7, reviews: "89K", commission: "6%", epc: "$1.85" },
    { id: "az3", tier: "best", title: "Kindle Paperwhite 2024", desc: "⭐⭐⭐⭐⭐ 31,000 reviews · £149.99 · Best e-reader", url: "https://www.amazon.co.uk/dp/B098765432?tag=youraffiliate-21", cpc: "£1.10", ctr: "7.8%", impressions: "650K", region: "UK", badge: "Sponsored Product", category: "Tech", rating: 4.9, reviews: "31K", commission: "4%", epc: "£2.40" },
    { id: "az4", tier: "best", title: "COSRX Snail Mucin 96% Serum", desc: "⭐⭐⭐⭐⭐ 76,000 reviews · $13.99 · #1 Best Seller Skincare", url: "https://www.amazon.com/dp/B555555555?tag=youraffiliate-20", cpc: "$0.70", ctr: "8.9%", impressions: "920K", region: "US", badge: "Best Seller", category: "Beauty", rating: 4.6, reviews: "76K", commission: "8%", epc: "$1.10" },
    { id: "az5", tier: "medium", title: "Philips Hue Starter Kit", desc: "⭐⭐⭐⭐ 12,000 reviews · £79.99 · Smart home lighting", url: "https://www.amazon.co.uk/dp/B777777777?tag=youraffiliate-21", cpc: "£0.85", ctr: "4.3%", impressions: "290K", region: "UK", badge: "Sponsored Product", category: "Home", rating: 4.4, reviews: "12K", commission: "6%", epc: "£0.85" },
    { id: "az6", tier: "medium", title: "Ninja Air Fryer Max XL", desc: "⭐⭐⭐⭐ 22,000 reviews · $99.99 · Crispy results every time", url: "https://www.amazon.com/dp/B888888888?tag=youraffiliate-20", cpc: "$1.15", ctr: "5.6%", impressions: "410K", region: "US", badge: "Sponsored Product", category: "Home", rating: 4.5, reviews: "22K", commission: "7%", epc: "$1.45" },
    { id: "az7", tier: "low", title: "Bamboo Shower Caddy Organiser", desc: "⭐⭐⭐ 1,200 reviews · £18.99 · Eco-friendly storage", url: "https://www.amazon.co.uk/dp/B999999999?tag=youraffiliate-21", cpc: "£0.22", ctr: "1.9%", impressions: "85K", region: "UK", badge: "Sponsored", category: "Home", rating: 3.8, reviews: "1.2K", commission: "8%", epc: "£0.22" },
    { id: "az8", tier: "low", title: "USB-C Hub 7-Port Multiport", desc: "⭐⭐⭐ 3,400 reviews · $24.99 · Compatible with MacBook", url: "https://www.amazon.com/dp/B000000000?tag=youraffiliate-20", cpc: "$0.55", ctr: "2.4%", impressions: "140K", region: "US", badge: "Sponsored", category: "Tech", rating: 3.9, reviews: "3.4K", commission: "6%", epc: "$0.38" },
  ]
};

// ─── Click Tracking Service ─────────────────────────────────────────────────
interface ClickEvent {
  id: string;
  adId: string;
  adTitle: string;
  source: string;
  region: string;
  timestamp: Date;
  epc: string;
  commission: string;
  estimatedEarnings: number;
}

interface EarningsSummary {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
  clicks: number;
  conversionRate: string;
  topEarningAd: { title: string; earnings: number } | null;
}

class ClickTracker {
  private clicks: ClickEvent[] = [];
  private listeners: (() => void)[] = [];

  trackClick(ad: any): ClickEvent {
    // Parse EPC to numeric value
    const epcValue = parseFloat(ad.epc.replace(/[£$]/g, ''));
    
    const click: ClickEvent = {
      id: `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      adId: ad.id,
      adTitle: ad.title,
      source: ad.source || 'Unknown',
      region: ad.region,
      timestamp: new Date(),
      epc: ad.epc,
      commission: ad.commission,
      estimatedEarnings: epcValue
    };
    
    this.clicks.push(click);
    this.notifyListeners();
    
    // Save to localStorage for persistence
    this.saveToStorage();
    
    return click;
  }

  getClicks(): ClickEvent[] {
    return this.clicks;
  }

  getEarningsSummary(): EarningsSummary {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const weekAgo = new Date(now.setDate(now.getDate() - 7));
    const monthAgo = new Date(now.setMonth(now.getMonth() - 1));

    const todayClicks = this.clicks.filter(c => new Date(c.timestamp) >= today);
    const weekClicks = this.clicks.filter(c => new Date(c.timestamp) >= weekAgo);
    const monthClicks = this.clicks.filter(c => new Date(c.timestamp) >= monthAgo);

    const todayEarnings = todayClicks.reduce((sum, c) => sum + c.estimatedEarnings, 0);
    const weekEarnings = weekClicks.reduce((sum, c) => sum + c.estimatedEarnings, 0);
    const monthEarnings = monthClicks.reduce((sum, c) => sum + c.estimatedEarnings, 0);
    const totalEarnings = this.clicks.reduce((sum, c) => sum + c.estimatedEarnings, 0);

    // Find top earning ad
    const adEarnings = this.clicks.reduce((acc, c) => {
      acc[c.adTitle] = (acc[c.adTitle] || 0) + c.estimatedEarnings;
      return acc;
    }, {} as Record<string, number>);

    let topEarningAd = null;
    let maxEarnings = 0;
    for (const [title, earnings] of Object.entries(adEarnings)) {
      if (earnings > maxEarnings) {
        maxEarnings = earnings;
        topEarningAd = { title, earnings };
      }
    }

    // Simulate conversion rate (in real app, this would come from affiliate network)
    const conversionRate = ((this.clicks.length * 0.15) / Math.max(this.clicks.length, 1) * 100).toFixed(1);

    return {
      today: todayEarnings,
      thisWeek: weekEarnings,
      thisMonth: monthEarnings,
      total: totalEarnings,
      clicks: this.clicks.length,
      conversionRate,
      topEarningAd
    };
  }

  private saveToStorage() {
    localStorage.setItem('adpulse_clicks', JSON.stringify(this.clicks));
  }

  loadFromStorage() {
    const stored = localStorage.getItem('adpulse_clicks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.clicks = parsed.map((c: any) => ({
          ...c,
          timestamp: new Date(c.timestamp)
        }));
      } catch (e) {
        console.error('Failed to load clicks from storage', e);
      }
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(l => l());
  }
}

// Create singleton instance
const clickTracker = new ClickTracker();

// Helper function to generate random updates
const generateUpdate = (ad: any) => {
  const operations = [
    { field: 'cpc', transform: (val: string) => {
      const num = parseFloat(val.replace(/[£$]/g, ''));
      const newNum = num * (0.9 + Math.random() * 0.2);
      return val.startsWith('£') ? `£${newNum.toFixed(2)}` : `$${newNum.toFixed(2)}`;
    }},
    { field: 'ctr', transform: (val: string) => {
      const num = parseFloat(val);
      const newNum = num * (0.85 + Math.random() * 0.3);
      return `${newNum.toFixed(1)}%`;
    }},
    { field: 'impressions', transform: (val: string) => {
      const multiplier = val.endsWith('K') ? 1000 : val.endsWith('M') ? 1000000 : 1;
      const num = parseFloat(val) * multiplier;
      const newNum = num * (0.95 + Math.random() * 0.1);
      if (newNum >= 1000000) {
        return `${(newNum / 1000000).toFixed(1)}M`;
      }
      return `${Math.round(newNum / 1000)}K`;
    }}
  ];
  
  const operation = operations[Math.floor(Math.random() * operations.length)];
  return {
    ...ad,
    [operation.field]: operation.transform(ad[operation.field])
  };
};

const TIER_CONFIG = {
  best: { label: "🏆 Top Performer", className: "badge-best" },
  medium: { label: "📈 Mid Tier", className: "badge-medium" },
  low: { label: "📉 Low Performer", className: "badge-low" },
};

// ─── Earnings Dashboard Component ──────────────────────────────────────────
function EarningsDashboard({ onClose }: { onClose: () => void }) {
  const [summary, setSummary] = useState(clickTracker.getEarningsSummary());
  const [clicks, setClicks] = useState<ClickEvent[]>([]);
  const [timeframe, setTimeframe] = useState<'all' | 'today' | 'week' | 'month'>('all');

  useEffect(() => {
    // Update on new clicks
    const unsubscribe = clickTracker.subscribe(() => {
      setSummary(clickTracker.getEarningsSummary());
      setClicks(clickTracker.getClicks());
    });

    // Initial load
    setClicks(clickTracker.getClicks());

    return unsubscribe;
  }, []);

  const filteredClicks = clicks.filter(click => {
    const now = new Date();
    const clickDate = new Date(click.timestamp);
    
    switch (timeframe) {
      case 'today':
        return clickDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return clickDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return clickDate >= monthAgo;
      default:
        return true;
    }
  });

  const formatCurrency = (amount: number, region: string = 'UK') => {
    return region === 'UK' ? `£${amount.toFixed(2)}` : `$${amount.toFixed(2)}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="earnings-dashboard"
    >
      <div className="earnings-header">
        <h2 className="earnings-title">
          <Wallet size={24} /> Earnings Dashboard
        </h2>
        <button onClick={onClose} className="earnings-close">×</button>
      </div>

      {/* Summary Cards */}
      <div className="earnings-grid">
        <div className="earnings-card">
          <div className="earnings-card-icon" style={{ background: 'rgba(79, 70, 229, 0.1)' }}>
            <DollarSign size={20} color="var(--indigo)" />
          </div>
          <div className="earnings-card-content">
            <div className="earnings-card-label">Today</div>
            <div className="earnings-card-value">{formatCurrency(summary.today)}</div>
          </div>
        </div>

        <div className="earnings-card">
          <div className="earnings-card-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <TrendUp size={20} color="var(--green)" />
          </div>
          <div className="earnings-card-content">
            <div className="earnings-card-label">This Week</div>
            <div className="earnings-card-value">{formatCurrency(summary.thisWeek)}</div>
          </div>
        </div>

        <div className="earnings-card">
          <div className="earnings-card-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
            <BarChart3 size={20} color="var(--amber)" />
          </div>
          <div className="earnings-card-content">
            <div className="earnings-card-label">This Month</div>
            <div className="earnings-card-value">{formatCurrency(summary.thisMonth)}</div>
          </div>
        </div>

        <div className="earnings-card">
          <div className="earnings-card-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
            <Wallet size={20} color="var(--red)" />
          </div>
          <div className="earnings-card-content">
            <div className="earnings-card-label">Total</div>
            <div className="earnings-card-value">{formatCurrency(summary.total)}</div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="earnings-stats">
        <div className="earnings-stat">
          <MousePointer size={14} />
          <span>{summary.clicks} Total Clicks</span>
        </div>
        <div className="earnings-stat">
          <TrendingUp size={14} />
          <span>{summary.conversionRate}% Conv. Rate</span>
        </div>
        {summary.topEarningAd && (
          <div className="earnings-stat">
            <TrendingDown size={14} />
            <span>Top: {summary.topEarningAd.title.substring(0, 20)}…</span>
          </div>
        )}
      </div>

      {/* Timeframe Filter */}
      <div className="earnings-timeframe">
        <button 
          className={`timeframe-btn ${timeframe === 'all' ? 'active' : ''}`}
          onClick={() => setTimeframe('all')}
        >
          All Time
        </button>
        <button 
          className={`timeframe-btn ${timeframe === 'month' ? 'active' : ''}`}
          onClick={() => setTimeframe('month')}
        >
          This Month
        </button>
        <button 
          className={`timeframe-btn ${timeframe === 'week' ? 'active' : ''}`}
          onClick={() => setTimeframe('week')}
        >
          This Week
        </button>
        <button 
          className={`timeframe-btn ${timeframe === 'today' ? 'active' : ''}`}
          onClick={() => setTimeframe('today')}
        >
          Today
        </button>
      </div>

      {/* Clicks Table */}
      <div className="earnings-table-container">
        <table className="earnings-table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Source</th>
              <th>Region</th>
              <th>Commission</th>
              <th>EPC</th>
              <th>Earned</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredClicks.length === 0 ? (
              <tr>
                <td colSpan={7} className="earnings-empty">
                  No clicks recorded yet. Click on any ad to start earning!
                </td>
              </tr>
            ) : (
              filteredClicks.map(click => (
                <tr key={click.id}>
                  <td className="earnings-ad-title">{click.adTitle.substring(0, 30)}…</td>
                  <td>{click.source}</td>
                  <td>{click.region === 'UK' ? '🇬🇧' : '🇺🇸'}</td>
                  <td>{click.commission}</td>
                  <td>{click.epc}</td>
                  <td className="earnings-positive">{formatCurrency(click.estimatedEarnings, click.region)}</td>
                  <td className="earnings-time">
                    {new Date(click.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ─── Subscription Gate ────────────────────────────────────────────────────────
function SubscriptionGate({ onSubscribe }: { onSubscribe: () => void }) {
  const [loading, setLoading] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = () => {
    if (!name || cardNum.length < 16 || !expiry || cvv.length < 3) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSubscribe(); }, 2000);
  };

  return (
    <div className="sub-gate">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sub-card"
      >
        <div className="sub-icon">
          <Zap size={32} />
        </div>
        <h2 className="sub-title">Pulse</h2>
        <div className="sub-price">
          <span className="sub-price-amount">£2.99</span>
          <span className="sub-price-period"> / month</span>
        </div>
        
        <div className="sub-features">
          {[
            "Live PPC ads from Google, Meta, Bing & Amazon",
            "UK & US markets — performance ranked",
            "Click-through to live product pages",
            "Performance tiers: Best, Mid & Low sellers",
            "Refreshed ad data daily",
            "💰 Earn money from every click!"
          ].map((f, i) => (
            <div key={i} className="sub-feature-item">
              <div className="sub-feature-dot" />
              {f}
            </div>
          ))}
        </div>

        <div className="sub-divider" />
        
        <div className="sub-form">
          <input 
            className="sub-input" 
            placeholder="Cardholder Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
          <input 
            className="sub-input" 
            placeholder="Card Number" 
            maxLength={16} 
            value={cardNum} 
            onChange={e => setCardNum(e.target.value.replace(/\D/g, ""))} 
          />
          <div className="sub-row">
            <input 
              className="sub-input" 
              placeholder="MM/YY" 
              maxLength={5} 
              value={expiry} 
              onChange={e => setExpiry(e.target.value)} 
            />
            <input 
              className="sub-input" 
              placeholder="CVV" 
              maxLength={3} 
              value={cvv} 
              onChange={e => setCvv(e.target.value.replace(/\D/g, ""))} 
            />
          </div>
          <button 
            className="sub-submit" 
            onClick={handlePay} 
            disabled={loading}
          >
            {loading ? "Processing..." : "Subscribe — £2.99/mo"}
          </button>
        </div>
        
        <div className="sub-secure">
          <ShieldCheck size={12} /> 256-bit SSL · Cancel anytime · No hidden fees
        </div>
      </motion.div>
    </div>
  );
}

interface Ad {
  id: string;
  tier: string;
  title: string;
  desc: string;
  url: string;
  cpc: string;
  ctr: string;
  impressions: string;
  region: string;
  badge: string;
  category: string;
  source?: string;
  icon?: any;
  rating?: number;
  reviews?: string;
  platform?: string;
  commission?: string;
  epc?: string;
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard({ user, onLogout }: any) {
  const [subscribed, setSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [updateStatus, setUpdateStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [showEarnings, setShowEarnings] = useState(false);
  const [earningsSummary, setEarningsSummary] = useState(clickTracker.getEarningsSummary());

  // Load click data on mount
  useEffect(() => {
    clickTracker.loadFromStorage();
    setEarningsSummary(clickTracker.getEarningsSummary());
    
    const unsubscribe = clickTracker.subscribe(() => {
      setEarningsSummary(clickTracker.getEarningsSummary());
    });

    return unsubscribe;
  }, []);

  // Initialize ads
  useEffect(() => {
    const initialAds: Ad[] = [
      ...AD_DATA.googleSearch.map(a => ({ ...a, source: "Google Search", icon: <Search size={14} /> })),
      ...AD_DATA.googleDisplay.map(a => ({ ...a, source: "Google Display", icon: <Layout size={14} /> })),
      ...AD_DATA.metaAds.map(a => ({ ...a, source: "Meta Ads", icon: <Facebook size={14} /> })),
      ...AD_DATA.microsoftAds.map(a => ({ ...a, source: "Microsoft/Bing", icon: <Monitor size={14} /> })),
      ...AD_DATA.amazonAds.map(a => ({ ...a, source: "Amazon Ads", icon: <Package size={14} /> })),
    ];
    setAds(initialAds);
    setLoading(false);
  }, []);

  // Handle ad click
  const handleAdClick = (ad: Ad, e: React.MouseEvent) => {
    // Track the click
    clickTracker.trackClick(ad);
    
    // Show success notification
    setUpdateStatus({ 
      type: 'success', 
      message: `💰 Click tracked! Estimated earnings: ${ad.epc}` 
    });
    setTimeout(() => setUpdateStatus(null), 3000);

    // Open affiliate link in new tab
    window.open(ad.url, '_blank', 'noopener,noreferrer');
  };

  // Live update function
  const refreshData = useCallback(async () => {
    setUpdateStatus(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedAds = ads.map(ad => {
        if (Math.random() < 0.3) {
          return generateUpdate(ad);
        }
        return ad;
      });
      
      setAds(updatedAds);
      setLastUpdated(new Date());
      setUpdateStatus({ 
        type: 'success', 
        message: `Updated ${updatedAds.filter((ad, i) => ad !== ads[i]).length} ads` 
      });
      
      setTimeout(() => setUpdateStatus(null), 5000);
    } catch (error) {
      setUpdateStatus({ type: 'error', message: 'Failed to update data' });
      setTimeout(() => setUpdateStatus(null), 5000);
    }
  }, [ads]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isLive, refreshData]);

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  if (!subscribed) return <SubscriptionGate onSubscribe={() => setSubscribed(true)} />;

  const SOURCE_TABS = [
    { id: "all", label: "All Ads", icon: <TrendingUp size={16} />, count: ads.length },
    { id: "Google Search", label: "Google Search", icon: <Search size={16} />, count: AD_DATA.googleSearch.length },
    { id: "Google Display", label: "Google Display", icon: <Layout size={16} />, count: AD_DATA.googleDisplay.length },
    { id: "Meta Ads", label: "Meta / Social", icon: <Facebook size={16} />, count: AD_DATA.metaAds.length },
    { id: "Microsoft/Bing", label: "Microsoft Bing", icon: <Monitor size={16} />, count: AD_DATA.microsoftAds.length },
    { id: "Amazon Ads", label: "Amazon Ads", icon: <Package size={16} />, count: AD_DATA.amazonAds.length },
  ];

  const filtered = ads.filter(ad => {
    const matchSource = activeTab === "all" || ad.source === activeTab;
    const matchRegion = regionFilter === "all" || ad.region === regionFilter;
    const matchTier = tierFilter === "all" || ad.tier === tierFilter;
    const matchSearch = !search || ad.title.toLowerCase().includes(search.toLowerCase()) || ad.category.toLowerCase().includes(search.toLowerCase());
    return matchSource && matchRegion && matchTier && matchSearch;
  });

  const bestAds = filtered.filter(a => a.tier === "best");
  const mediumAds = filtered.filter(a => a.tier === "medium");
  const lowAds = filtered.filter(a => a.tier === "low");

  const stats = {
    total: filtered.length,
    uk: filtered.filter(a => a.region === "UK").length,
    us: filtered.filter(a => a.region === "US").length,
    avgCtr: filtered.length > 0 
      ? (filtered.reduce((s, a) => s + parseFloat(a.ctr), 0) / filtered.length).toFixed(1)
      : "0.0",
    potentialEarnings: filtered.reduce((sum, a) => {
      const epcValue = parseFloat(a.epc?.replace(/[£$]/g, '') || '0');
      return sum + epcValue;
    }, 0).toFixed(2)
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Update notification */}
      <AnimatePresence>
        {updateStatus && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`update-notification ${updateStatus.type}`}
          >
            {updateStatus.type === 'success' ? (
              <CheckCircle size={18} color="var(--green)" />
            ) : (
              <AlertCircle size={18} color="var(--red)" />
            )}
            <span style={{ fontSize: '0.875rem' }}>{updateStatus.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Earnings Dashboard Modal */}
      <AnimatePresence>
        {showEarnings && (
          <div className="earnings-modal-overlay" onClick={() => setShowEarnings(false)}>
            <div onClick={e => e.stopPropagation()}>
              <EarningsDashboard onClose={() => setShowEarnings(false)} />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="dash-header">
        <div className="dash-header-inner">
          <div className="dash-logo">
            <div className="logo-icon">
              <Zap size={18} />
            </div>
            <span className="logo-text">AdPulse <span className="logo-accent">Pro</span></span>
          </div>
          
          <div className="dash-actions">
            {/* Earnings Button */}
            <button 
              onClick={() => setShowEarnings(true)}
              className="earnings-button"
            >
              <Wallet size={16} />
              <span className="earnings-button-text">
                {earningsSummary.total > 0 ? `£${earningsSummary.total.toFixed(2)}` : 'Earnings'}
              </span>
            </button>

            {/* Live indicator */}
            <div className="live-indicator" onClick={() => setIsLive(!isLive)} style={{ cursor: 'pointer' }}>
              <div className="live-dot" />
              {isLive ? 'LIVE' : 'PAUSED'}
            </div>
            
            {/* Manual refresh button */}
            <button 
              onClick={refreshData}
              className="logout-btn"
              style={{ padding: '7px' }}
              title="Refresh data"
            >
              <RefreshCw size={16} />
            </button>
            
            <div className="market-indicator">
              <Globe size={14} /> UK & US Markets
            </div>
            <div className="separator" />
            <div className="pro-badge">
              <Star size={14} /> Pro Member
            </div>
            
            <button 
              onClick={onLogout}
              className="logout-btn"
            >
              <LogOut size={16} /> <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="dash-main">
        {/* Hero Section with earnings potential */}
        <div className="dash-hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="dash-page-title">PPC Ad Intelligence</h1>
            <p className="dash-description">Real-time data across major platforms, ranked by performance and engagement metrics.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="earnings-potential">
              <DollarSign size={14} />
              <span>Potential: £{stats.potentialEarnings}</span>
            </div>
            <div className="last-updated">
              Last updated: {formatLastUpdated(lastUpdated)}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {[
            { val: stats.total, lbl: "Ads Tracked", color: "indigo" },
            { val: `${stats.uk} / ${stats.us}`, lbl: "UK / US Split", color: "default" },
            { val: `${stats.avgCtr}%`, lbl: "Avg CTR", color: "green" },
            { val: bestAds.length, lbl: "Top Performers", color: "green" },
            { val: mediumAds.length, lbl: "Mid Tier", color: "amber" },
            { val: lowAds.length, lbl: "Low Performers", color: "red" },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className={`stat-val stat-${s.color}`}>{s.val}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Tabs & Filters */}
        <div className="filters-section">
          <div className="tabs-container no-scrollbar">
            {SOURCE_TABS.map(tab => (
              <button 
                key={tab.id} 
                className={`tab-btn ${activeTab === tab.id ? 'tab-btn-active' : 'tab-btn-inactive'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label} <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="filters-row">
            <div className="search-wrap">
              <Search className="search-icon" size={16} />
              <input 
                className="search-input" 
                placeholder="Search ads, keywords, categories..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>
            <div className="filter-group">
              <div className="filter-select-wrap">
                <Globe size={14} className="filter-icon" />
                <select 
                  className="filter-select" 
                  value={regionFilter} 
                  onChange={e => setRegionFilter(e.target.value)}
                >
                  <option value="all">All Regions</option>
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                </select>
              </div>
              <div className="filter-select-wrap">
                <Filter size={14} className="filter-icon" />
                <select 
                  className="filter-select" 
                  value={tierFilter} 
                  onChange={e => setTierFilter(e.target.value)}
                >
                  <option value="all">All Performance</option>
                  <option value="best">Best Sellers</option>
                  <option value="medium">Mid Tier</option>
                  <option value="low">Low Performers</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Sections */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state"
            >
              <div className="empty-emoji">🔍</div>
              <h3 className="empty-title">No ads found</h3>
              <p className="empty-description">Try adjusting your filters or search terms.</p>
            </motion.div>
          ) : (
            <div className="ads-sections">
              {[
                { ads: bestAds, tier: "best", label: "Best Sellers — Top 50% Performers" },
                { ads: mediumAds, tier: "medium", label: "Mid-Tier — 30% Average Performers" },
                { ads: lowAds, tier: "low", label: "Low Performers — Bottom 20%" },
              ].map(({ ads: sectionAds, tier, label }) => sectionAds.length > 0 && (
                <motion.section 
                  key={tier}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ads-section"
                >
                  <div className="section-header">
                    <div className="section-title-group">
                      <h2 className="section-h2">{label}</h2>
                      <span className="section-count">{sectionAds.length}</span>
                    </div>
                    <div className={`tier-badge ${TIER_CONFIG[tier as keyof typeof TIER_CONFIG].className}`}>
                      {TIER_CONFIG[tier as keyof typeof TIER_CONFIG].label}
                    </div>
                  </div>

                  <div className="ads-grid">
                    {sectionAds.map(ad => (
                      <motion.a 
                        key={ad.id}
                        layout
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAdClick(ad, e);
                        }}
                        className="ad-card"
                      >
                        <div className="ad-badge">{ad.badge}</div>

                        {/* Earnings badge */}
                        <div className="ad-earnings-badge">
                          <DollarSign size={10} />
                          {ad.epc}/click
                        </div>

                        <div className="ad-source">
                          <div className="ad-source-icon">{ad.icon}</div>
                          <div className="ad-source-info">
                            <span className="ad-source-label">{ad.source}</span>
                            <span className="ad-source-region">{ad.region === "UK" ? "🇬🇧 United Kingdom" : "🇺🇸 United States"}</span>
                          </div>
                        </div>

                        <h3 className="ad-title">{ad.title}</h3>
                        <p className="ad-desc">{ad.desc}</p>

                        {ad.rating && (
                          <div className="ad-rating">
                            <div className="ad-stars">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={12} 
                                  fill={i < Math.floor(ad.rating!) ? "currentColor" : "none"} 
                                />
                              ))}
                            </div>
                            <span className="ad-review-count">{ad.reviews} reviews</span>
                          </div>
                        )}

                        <div className="ad-url">
                          <ArrowUpRight size={12} /> {ad.url.replace(/^https?:\/\//, '').substring(0, 30)}…
                        </div>

                        <div className="ad-metrics">
                          <div className="ad-metric">
                            <span className="ad-metric-label">CPC</span>
                            <span className="ad-metric-value">{ad.cpc}</span>
                          </div>
                          <div className="ad-metric">
                            <span className="ad-metric-label">CTR</span>
                            <span className="ad-metric-value">{ad.ctr}</span>
                          </div>
                          <div className="ad-metric">
                            <span className="ad-metric-label">IMPS</span>
                            <span className="ad-metric-value">{ad.impressions}</span>
                          </div>
                        </div>

                        {/* Commission info */}
                        <div className="ad-commission">
                          <span className="ad-commission-label">Commission</span>
                          <span className="ad-commission-value">{ad.commission}</span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer CTA */}
      <div className="footer-cta-wrapper">
        <div className="footer-cta-block">
          <div className="footer-cta-content">
            <h2 className="footer-cta-title">💰 Want Higher Commissions?</h2>
            <p className="footer-cta-desc">Upgrade to Enterprise to unlock premium affiliate programs with 2x higher EPC rates and priority support.</p>
          </div>
          <button className="footer-cta-btn">
            Upgrade to Enterprise
          </button>
        </div>
      </div>
    </div>
  );
}