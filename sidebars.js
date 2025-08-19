// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsible: true,
      items: [
        'getting-started/what-is-postfun',
        'getting-started/setting-up-wallet'
      ]
    },
    {
      type: 'category',
      label: '💹 Trading on postfun',
      collapsible: true,
      items: [
        'trading/minting-a-post',
        'trading/buying-selling-tokens',
        'trading/pool-lifecycle'
      ]
    },
    {
      type: 'category',
      label: '✍️ For Content Creators',
      collapsible: true,
      items: [
        'creators/earning-on-postfun',
        'creators/claiming-earnings'
      ]
    },
    {
      type: 'category',
      label: '🌐 The postfun Extension',
      collapsible: true,
      items: [
        'extension/command-center'
      ]
    },
    {
      type: 'category',
      label: '💡 Advanced Topics',
      collapsible: true,
      items: [
        'advanced/cpmm-price-impact'
      ]
    },
    {
      type: 'category',
      label: '⚙️ Platform Mechanics',
      collapsible: true,
      items: [
        'mechanics/economic-engine',
        'mechanics/architecture-trust-model',
        'mechanics/security-deep-dive',
        'mechanics/api-reference',
        'mechanics/risk-factors'
      ]
    },
    {
      type: 'category',
      label: '🧑‍💻 Developer & Community',
      collapsible: true,
      items: [
        'developer/building-on-postfun',
        'developer/telegram-bot-tutorial',
        'developer/nostr-integration',
        'developer/brand-kit',
        'developer/community-support'
      ]
    },
    {
      type: 'category',
      label: '❓ FAQ',
      collapsible: true,
      items: [
        'faq/general'
      ]
    }
  ]
};

export default sidebars;
