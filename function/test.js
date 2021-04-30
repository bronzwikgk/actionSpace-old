const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
const isBrowser = typeof window === 'object' && typeof document === 'object';
// You can add more if you want
const isMobile = /Android|BlackBerry|iPad|iPod|iPhone|webOS/i
    .test(navigator.userAgent);
const touchSupported = 'ontouchstart' in window || 
    (window.DocumentTouch && document instanceof DocumentTouch);

var platform = typeof browser === 'undefined'
  ? chrome
  : browser