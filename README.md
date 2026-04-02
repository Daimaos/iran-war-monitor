# Iran Conflict Intelligence Dashboard

A real-time geopolitical intelligence dashboard tracking the Iran conflict (Feb 28, 2026 - present) with AI-powered news aggregation, sentiment analysis, and tension monitoring.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-green)

## 🎯 Overview

This dashboard provides real-time conflict intelligence by combining web search, AI analysis, and interactive visualizations to track developments in the ongoing Iran conflict. Built as a learning project exploring AI-powered news aggregation and geopolitical monitoring.

### Key Features

- **Real-Time News Aggregation**: Automatic web search every 30 seconds for latest updates
- **AI-Powered Analysis**: Deep article analysis using Claude Sonnet 4 (Anthropic API)
- **Tension Meter**: Visual representation of current conflict intensity (0-100 scale)
- **Interactive Timeline**: Chronological view of major events
- **Article Deep-Dive**: Click any article for comprehensive AI analysis including:
  - Key developments extraction
  - Stakeholder analysis
  - Geopolitical implications
  - Verification status
- **Export Functionality**: Download complete reports as HTML
- **Auto-Refresh**: Configurable polling intervals (30s, 1min, 2min, 5min, manual)

## 🚀 Live Demo

[View Live Dashboard](https://serene-yeot-f9b1bc.netlify.app/)

## 🛠️ Tech Stack

- **Frontend**: React 18, TailwindCSS
- **AI Engine**: Anthropic API (Claude Sonnet 4)
- **Data Sources**: Real-time web search via Anthropic
- **Optional**: ACLED conflict database integration
- **Deployment**: Netlify/Vercel (recommended)

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm/yarn
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/iran-conflict-dashboard.git
cd iran-conflict-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API key**

Create a `.env` file in the project root:
```env
REACT_APP_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

4. **Start development server**
```bash
npm start
```

The dashboard will open at `http://localhost:3000`

## 🔑 API Configuration

### Anthropic API (Required)

1. Sign up at [console.anthropic.com](https://console.anthropic.com/)
2. Generate an API key from the dashboard
3. Add to `.env` file as shown above
4. **Cost**: ~$0.01-0.05 per analysis depending on article length

### ACLED Integration (Optional)

For researchers with ACLED access, historical conflict data can enhance analysis:

1. Register at [acleddata.com](https://acleddata.com/user/register)
2. Wait for approval (typically 1-2 business days)
3. Generate OAuth token from dashboard
4. Add to `.env`:
```env
REACT_APP_ACLED_ACCESS_TOKEN=your_acled_token
```

**Note**: ACLED is not required for core functionality. The dashboard works fully with web search alone.

## 📊 Dashboard Features

### Tension Meter
Visual gauge (0-100) calculated from:
- Article sentiment analysis
- Keyword intensity (military actions, casualties, escalation terms)
- Update frequency
- Source diversity

### Article Analysis
Each article gets AI-powered breakdown:
- **Summary**: 2-3 sentence overview
- **Key Developments**: Bullet-point extraction
- **Stakeholders**: Actors involved and their positions
- **Implications**: Short and long-term geopolitical impact
- **Verification**: Source credibility assessment

### Export Reports
Download complete intelligence reports containing:
- All analyzed articles
- Tension timeline
- Stakeholder mapping
- Formatted for offline viewing

## 🎨 Version History

### v4 (Current)
- ✅ News ticker with scrolling updates
- ✅ Enhanced UI with dark theme
- ✅ Improved tension calculation algorithm

### v3
- ✅ Article modal with deep analysis
- ✅ HTML export functionality
- ✅ Auto-refresh with configurable intervals
- ✅ Tension meter visualization

### v2
- ✅ Multi-article aggregation
- ✅ Basic sentiment analysis

### v1
- ✅ Single-article prototype
- ✅ Manual refresh only

## 🔧 Customization

### Modify Search Query
Edit the search prompt in the main component:
```javascript
const searchQuery = "Iran conflict latest news"; // Change this
```

### Adjust Refresh Interval
Default intervals available: 30s, 1min, 2min, 5min, manual

### Tension Calculation
Modify weights in `calculateTensionScore()` function to adjust sensitivity.

## ⚠️ Important Notes

### Ethical Use
- This dashboard is for **educational and research purposes**
- Verify information from multiple sources before making decisions
- AI analysis may have biases or inaccuracies
- Always cross-reference with primary sources

### Rate Limits
- Anthropic: 5 requests/minute (Tier 1)
- Implement exponential backoff if hitting limits
- ACLED (if used): Check their current limits

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- [ ] Multi-conflict support (Ukraine, Gaza, etc.)
- [ ] Historical timeline playback
- [ ] Source credibility scoring
- [ ] Map visualization of conflict zones
- [ ] Telegram/Discord bot integration
- [ ] Mobile app version

**To contribute:**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📚 References

- [Anthropic API Documentation](https://docs.anthropic.com/)
- [ACLED Methodology](https://acleddata.com/knowledge-base/methodology/)
- [Iran Conflict Context (Feb 2026)](https://example.com) *(add relevant sources)*

## 🐛 Known Issues

- Large article batches may cause memory issues (>50 articles)
- Export button may timeout on slow connections
- Tension meter occasionally spikes on breaking news
- Mobile responsiveness needs optimization

---

**Disclaimer**: This dashboard aggregates publicly available information and provides AI-generated analysis. It is not affiliated with any government, military, or intelligence organization. Use responsibly.

**Last Updated**: April 2, 2026
