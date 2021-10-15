/**
 * Google Tag Manager
 */
const TagManager = require('react-gtm-module');

export const initGoogleTagManager = () => {
  if (typeof document === 'undefined') {
    return {};
  } else {
    return TagManager.initialize({ gtmId: 'GTM-MD32945' });
  }
};
