# Affiliate Programs Guide

## Overview
This document tracks affiliate programs for AI tools featured on VibeStack, including application status, commission rates, and integration notes.

## Active Affiliate Programs

### ✅ Already Configured
1. **Cursor** - https://cursor.sh
   - Status: Configured
   - Commission: Unknown (direct link)
   - Notes: Using direct referral

2. **v0 by Vercel** - https://v0.dev
   - Status: Configured
   - Commission: Unknown (direct link)
   - Notes: Using direct referral

---

## 🎯 High Priority - Apply Immediately

### Developer Tools

1. **Notion**
   - Program: https://affiliate.notion.so
   - Estimated Commission: 50% recurring for 12 months
   - Application: Direct signup
   - Target URL Pattern: `https://affiliate.notion.so/vibestack`
   - Status: ⏳ Pending Application

2. **Linear**
   - Program: Impact.com Partner Network
   - Estimated Commission: 20-30% monthly recurring
   - Application: https://impact.com
   - Status: ⏳ Pending Application

3. **GitHub Copilot**
   - Program: GitHub Partner Program
   - URL: https://partner.github.com
   - Estimated Commission: Varies
   - Status: ⏳ Pending Application

### AI Writing & Productivity

4. **Grammarly**
   - Program: https://www.grammarly.com/affiliates
   - Commission: $0.20 per free signup, $20 per premium sale
   - Cookie Duration: 90 days
   - Status: ⏳ PendingApplication

5. **Jasper**
   - Program: https://www.jasper.ai/affiliates
   - Commission: 30% recurring for 12 months
   - Status: ⏳ Pending Application

6. **Copy.ai**
   - Program: Impact.com or direct
   - Commission: 30-50% recurring
   - Status: ⏳ Pending Application

7. **Descript**
   - Program: https://www.descript.com/affiliates
   - Commission: 25% recurring
   - Status: ⏳ Pending Application

### Project Management

8. **ClickUp**
   - Program: https://clickup.com/partners/affiliates
   - Commission: 30% recurring for 12 months
   - Status: ⏳ Pending Application

9. **Asana**
   - Program: impact.com
   - Commission: Variable
   - Status: ⏳ Pending Application

10. **Motion**
    - Program: Impact.com or PartnerStack
    - Commission: 20-40% recurring
    - Status: ⏳ Pending Application

---

## 🔍 Medium Priority

### Coding Tools

11. **Replit**
    - Program: Replit Partners (direct inquiry)
    - Status: 📧 Needs Outreach

12. **Tabnine**
    - Program: Direct partnership
    - Status: 📧 Needs Outreach

13. **Supermaven**
    - Program: Direct partnership (startup)
    - Status: 📧 Needs Outreach

14. **Windsurf/Codeium**
    - Program: Direct partnership
    - Status: 📧 Needs Outreach

15. **Stack Blitz**
    - Program: StackBlitz Partners
    - Status: 📧 Needs Outreach

16. **CodeSandbox**
    - Program: CodeSandbox Partners
    - Status: 📧 Needs Outreach

### AI Assistants

17. **Claude / Anthropic**
    - Program: Direct partnership (enterprise focus)
    - Status: 📧 Needs Outreach
    - Notes: May not have affiliate program yet

18. **Perplexity**
    - Program: Unknown
    - Status: 🔍 Research Needed

19. **Character.AI**
    - Program: Unknown
    - Status: 🔍 Research Needed

### Design & Media

20. **Figma**
    - Program: Unknown (likely enterprise only)
    - Status: 🔍 Research Needed

21. **Canva**
    - Program: https://www.canva.com/affiliates/
    - Commission: $36 per Canva Pro referral
    - Status: ⏳ Pending Application

22. **Runway**
    - Program: Unknown
    - Status: 🔍 Research Needed

---

## ❌ No Affiliate Program (Use Direct Links)

- **OpenAI ChatGPT** - No public affiliate program
- **Google Gemini** - No affiliate program
- **Ollama** - Open source, no monetization
- **Continue** - Open source, no monetization
- **Aider** - Open source, no monetization
- **HuggingFace** - No affiliate program

---

## 📊 Affiliate Network Programs

### Impact.com
Apply once, access multiple partners:
- Linear
- Asana
- Motion
- Copy.ai
- Many more

**Application:** https://impact.com/advocate/

### ShareASale
General affiliate network with tech tools:
- Various SaaS products
- Good for smaller tools

**Application:** https://www.shareasale.com/

### PartnerStack
SaaS-focused affiliate platform:
- Many developer tools
- Good tracking and payouts

**Application:** https://www.partnerstack.com/

---

## 🎨 Integration Guide

### URL Structure
All affiliate links follow this pattern:
```typescript
const affiliateUrl = `${baseUrl}?ref=vibestack&utm_source=vibestack&utm_campaign=directory`;
```

### Adding New Affiliate Link

1. **Get approved** in affiliate program
2. **Copy tracking link** (e.g., `https://partner.example.com/12345`)
3. **Update `lib/tools.ts`**:
   ```typescript
   {
     slug: "example-tool",
     // ... other fields
     affiliateUrl: "https://partner.example.com/12345",
   }
   ```
4. **Test the link** - ensure tracking works
5. **Update this document** with status

---

## 📈 Tracking & Analytics

All affiliate clicks are tracked via Google Analytics with event:
```javascript
gtag('event', 'affiliate_click', {
  tool_slug: 'notion',
  tool_name: 'Notion AI',
  url: 'https://affiliate.notion.so/vibestack'
});
```

### Monitoring Performance
1. Check GA4 Events → affiliate_click
2. Review each affiliate program dashboard
3. Monthly reconciliation of clicks vs. conversions

---

## 💰 Revenue Projections

Based on industry standards:

| Tier | Monthly Clicks | Conv Rate | Sales | Avg Commission | Monthly Revenue |
|------|---------------|-----------|-------|----------------|-----------------|
| Low  | 500           | 2%        | 10    | $30            | $300            |
| Med  | 2,000         | 2.5%      | 50    | $35            | $1,750          |
| High | 10,000        | 3%        | 300   | $40            | $12,000         |

**Current Status:** 0 clicks (needs affiliate program approvals)

---

## ✅ Action Items

### Week 1
- [ ] Apply to Notion affiliate program
- [ ] Apply to Grammarly affiliate program  
- [ ] Apply to ClickUp affiliate program
- [ ] Apply to Jasper affiliate program
- [ ] Sign up for Impact.com

### Week 2
- [ ] Apply to Canva affiliate program
- [ ] Apply to Descript affiliate program
- [ ] Reach out to Replit for partnership
- [ ] Reach out to Tabnine for partnership

### Week 3
- [ ] Follow up on pending applications
- [ ] Add approved affiliate URLs to `tools.ts`
- [ ] Test all affiliate links
- [ ] Monitor GA4 for affiliate click events

---

## 📝 Notes

- **Cookie Duration:** Most SaaS affiliates offer 30-90 day cookies
- **Payment Terms:** Typically NET 30-60 days
- **Minimum Payout:** Usually $50-100
- **Approval Time:** 1-7 days for most programs

**Last Updated:** 2026-02-06
