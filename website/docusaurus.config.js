// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// TODO: REMOVE -- FORCE CHANGE FOR GH ACTIONS 003
const path = require('path');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Victory',
  tagline: 'Charting for React and React Native',
  url: 'https://formidable.com',
  baseUrl: '/open-source/victory/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    // needed to handle the custom ReactLiveScope
    // without this Webpack resolves both ./node_modules/react and ./../node_modules/react which causes errors with Victory imports in ReactLiveScope
    // this is a common problem with doc sites that consume a package from a parent directory
    function resolveReactPlugin() {
      return {
        name: 'resolve-react-plugin',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                'react': path.resolve('./node_modules/react')
              }
            }
          }
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/FormidableLabs/victory/tree/main/website',
          breadcrumbs: false
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        liveCodeBlock: {
          /**
           * The position of the live playground, above or under the editor
           * Possible values: "top" | "bottom"
           */
          playgroundPosition: 'top',
        },
        navbar: {
        title: 'Victory',
        logo: {
          alt: 'Victory Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'Introduction/0',
            position: 'left',
            label: 'Docs',
          },
          {to: '/gallery', label: 'Gallery', position: 'left'},
          {
            type: 'doc',
            docId: 'Support/1',
            position: 'left',
            label: 'FAQs',
          },
          {
            href: 'https://github.com/FormidableLabs/spectacle',
            className: 'header-github-link',
            'aria-label': 'GitHub Repository',
            position: 'right'
          },
          {
            href: 'https://formidable.com',
            className: 'header-formidable-link',
            'aria-label': 'Formidable Website',
            position: 'right'
          }
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Formidable Labs, LLC. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
