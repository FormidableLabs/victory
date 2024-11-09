import { themes as prismThemes } from "prism-react-renderer";
import { Config } from "@docusaurus/types";

const title = "Victory";
const tagline =
  "Intuitive React components for advanced charting and data visualization.";

const config: Config = {
  title,
  tagline,
  favicon: "favicon.ico",
  url: "https://commerce.nearform.com/",
  baseUrl: "/open-source/victory",
  onBrokenAnchors: "throw",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onDuplicateRoutes: "throw",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          sidebarCollapsed: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-M971D063B9",
        },
        googleTagManager: {
          containerId: "GTM-MD32945",
        },
      },
    ],
  ],
  themes: [
    [
      "@docusaurus/theme-live-codeblock",
      {
        liveCodeBlock: {
          playgroundPosition: "top",
        },
      },
    ],
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        hashed: true,
        indexBlog: false,
      },
    ],
  ],
  plugins: [
    async function tailwindPlugin() {
      return {
        name: "tailwind-plugin",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins = [
            /* eslint-disable @typescript-eslint/no-require-imports */
            require("postcss-import"),
            require("tailwindcss"),
            require("autoprefixer"),
            /* eslint-enable @typescript-eslint/no-require-imports */
          ];
          return postcssOptions;
        },
      };
    },
  ],
  themeConfig: {
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    metadata: [
      {
        name: "title",
        content: `${title} - React Charting Components`,
      },
      {
        name: "description",
        content: tagline,
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1",
      },
      {
        name: "keywords",
        content:
          "victory, documentation, react, charts, charting, data, viz, d3",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://commerce.nearform.com/open-source/victory/",
      },
      { property: "og:title", content: `${title} - React Charting Components` },
      {
        property: "og:description",
        content: tagline,
      },
      {
        property: "og:image",
        content:
          "https://commerce.nearform.com/open-source/victory/open-graph.png",
      },
      { property: "twitter:card", content: "summary_large_image" },
      {
        property: "twitter:url",
        content: "https://commerce.nearform.com/open-source/victory/",
      },
      {
        property: "twitter:title",
        content: `${title} - React Charting Components`,
      },
      {
        property: "twitter:description",
        content: tagline,
      },
      {
        property: "twitter:image",
        content:
          "https://commerce.nearform.com/open-source/victory/open-graph.png",
      },
    ],
    docs: {
      sidebar: {
        hideable: false,
      },
    },
    navbar: {
      title: "VICTORY",
      logo: {
        alt: "Victory",
        src: "favicon/favicon-32x32.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "sidebar",
          position: "left",
          label: "DOCS",
        },
        {
          href: "https://github.com/FormidableLabs/victory",
          "aria-label": "GitHub Repository",
          className: "header-github-link",
          position: "right",
        },
      ],
    },
    footer: {
      logo: {
        alt: "Nearform logo",
        src: "img/nearform-logo-white.svg",
        href: "https://commerce.nearform.com",
        width: 100,
        height: 100,
      },
      copyright: `Copyright © 2013-${new Date().getFullYear()} Nearform`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["diff", "diff-ts"],
    },
  },
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOriginIsolated: "true",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" rel="stylesheet',
      },
    },
  ],
};

export default config;
