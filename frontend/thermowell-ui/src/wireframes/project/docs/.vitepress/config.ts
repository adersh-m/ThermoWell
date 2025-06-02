import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'Heatwave Alert',
  description: 'Timely heatwave alerts and health advisories for vulnerable populations',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Alerts', link: '/alerts' },
      { text: 'Health Advisory', link: '/health-advisory' },
      { text: 'Prevention', link: '/prevention' },
      { text: 'Emergency Contacts', link: '/emergency' }
    ],

    sidebar: [
      {
        items: [
          { text: 'Current Alerts', link: '/alerts' },
          { text: 'Health Advisory', link: '/health-advisory' },
          { text: 'Prevention Tips', link: '/prevention' },
          { text: 'Emergency Contacts', link: '/emergency' },
          { text: 'Vulnerable Groups', link: '/vulnerable-groups' }
        ]
      }
    ]
  }
});