const data = {
  siteTitle: "Victory", // Site title.,
  siteDescription: "React.js components for modular charting and data visualization.",
  siteTitleAlt: "Victory.js React Charting Library", // Alternative site title for SEO.
  siteLogo: "/logos/favicon.ico", // Logo used for SEO and manifest.
  siteUrl: "https://commerce.nearform.com", // Domain of your website without pathPrefix.
  keywords: ["victory", "documentation", "react", "charting", "data", "viz"],
  pathPrefix: "/open-source/victory", // Prefixes all links when deployed (amazing).
  googleAnalyticsID: "UA-43290258-1", // GA tracking ID.
  googleTagManagerID: "GTM-MD32945", // GTM tracking ID.
  projectLinks: [
    {
      label: "GitHub",
      url: "https://github.com/FormidableLabs/victory",
    },
  ],
  copyright: `Copyright © ${new Date().getFullYear()} Nearform`, // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0", // Used for setting manifest background color.
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
      type: "image/png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "manifest",
      url: "/favicon/site.webmanifest",
    },
    {
      rel: "mask-icon",
      url: "/favicon/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
    {
      rel: "shortcut icon",
      url: "/favicon.ico",
    },
  ],
};

export default data;
