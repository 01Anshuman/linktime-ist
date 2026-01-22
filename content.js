// LinkTime IST v2.0 - Simplified Always-Working Version
console.log('🕐 LinkTime IST v2.0 loaded');

// City to timezone mapping
const CITY_TIMEZONE = {
  // Format: 'city, country': 'Timezone'
  'london, uk': 'Europe/London',
  'london, united kingdom': 'Europe/London',
  'new york, ny': 'America/New_York',
  'new york, usa': 'America/New_York',
  'los angeles, ca': 'America/Los_Angeles',
  'san francisco, ca': 'America/Los_Angeles',
  'chicago, il': 'America/Chicago',
  'singapore': 'Asia/Singapore',
  'singapore, singapore': 'Asia/Singapore',
  'tokyo, japan': 'Asia/Tokyo',
  'sydney, australia': 'Australia/Sydney',
  'dubai, uae': 'Asia/Dubai',
  'bangalore, india': 'Asia/Kolkata',
  'mumbai, india': 'Asia/Kolkata',
  'delhi, india': 'Asia/Kolkata',
  'paris, france': 'Europe/Paris',
  'berlin, germany': 'Europe/Berlin',
  'toronto, canada': 'America/Toronto',
  'amsterdam, netherlands': 'Europe/Amsterdam',
};

// Timezone offsets from UTC (in hours)
const TIMEZONE_OFFSETS = {
  'Europe/London': 0,
  'America/New_York': -5,
  'America/Los_Angeles': -8,
  'America/Chicago': -6,
  'Asia/Singapore': 8,
  'Asia/Tokyo': 9,
  'Australia/Sydney': 11,
  'Asia/Dubai': 4,
  'Asia/Kolkata': 5.5,
  'Europe/Paris': 1,
  'Europe/Berlin': 1,
  'America/Toronto': -5,
  'Europe/Amsterdam': 1,
};

function getTimezoneFromLocation(location) {
  if (!location) return null;
  
  const loc = location.toLowerCase().trim();
  console.log('🔍 Looking for timezone for:', loc);
  
  // Direct match
  if (CITY_TIMEZONE[loc]) {
    console.log('✅ Found timezone:', CITY_TIMEZONE[loc]);
    return CITY_TIMEZONE[loc];
  }
  
  // Partial match
  for (const [city, tz] of Object.entries(CITY_TIMEZONE)) {
    if (loc.includes(city.split(',')[0])) {
      console.log('✅ Partial match found:', tz);
      return tz;
    }
  }
  
  console.log('❌ No timezone found for:', location);
  return null;
}

function getCurrentTime(timezone) {
  const now = new Date();
  const offset = TIMEZONE_OFFSETS[timezone] || 0;
  const istOffset = 5.5; // IST is UTC+5:30
  
  // Get UTC time
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  
  // Get their time
  const theirTime = new Date(utcTime + (offset * 3600000));
  
  // Get IST time
  const istTime = new Date(utcTime + (istOffset * 3600000));
  
  // Format times
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const mins = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${mins} ${ampm}`;
  };
  
  return {
    theirTime: formatTime(theirTime),
    istTime: formatTime(istTime)
  };
}

function extractLocationFromPage() {
  console.log('🔎 Searching for location on page...');
  
  // Try multiple methods to find location
  
  // Method 1: Look in profile header
  const profileElements = document.querySelectorAll('[class*="entity-lockup"], [class*="profile"], span, div');
  
  for (const element of profileElements) {
    const text = element.textContent.trim();
    
    // Pattern: "City, Country" or "City, State"
    if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Z]{2,}/.test(text) && text.length < 50) {
      console.log('📍 Found potential location:', text);
      
      const tz = getTimezoneFromLocation(text);
      if (tz) {
        return { location: text, timezone: tz };
      }
    }
  }
  
  console.log('⚠️ Could not find location on page');
  return null;
}

function createTimeBadge(locationData) {
  console.log('💉 Creating time badge...');
  
  // Remove existing badge
  const existing = document.querySelector('.linktime-badge');
  if (existing) existing.remove();
  
  // Create badge
  const badge = document.createElement('div');
  badge.className = 'linktime-badge';
  
  if (locationData) {
    const times = getCurrentTime(locationData.timezone);
    badge.innerHTML = `
      <div class="linktime-icon">🕐</div>
      <div class="linktime-info">
        <div class="linktime-row">
          <span class="linktime-label">Their Time:</span>
          <span class="linktime-value">${times.theirTime}</span>
        </div>
        <div class="linktime-row">
          <span class="linktime-label">IST:</span>
          <span class="linktime-value">${times.istTime}</span>
        </div>
      </div>
    `;
  } else {
    // Show only IST if location not found
    const times = getCurrentTime('Asia/Kolkata');
    badge.innerHTML = `
      <div class="linktime-icon">🕐</div>
      <div class="linktime-info">
        <div class="linktime-row">
          <span class="linktime-label">IST:</span>
          <span class="linktime-value">${times.istTime}</span>
        </div>
        <div class="linktime-note">Location not detected</div>
      </div>
    `;
  }
  
  // Find where to insert
  const insertPoints = [
    '.msg-thread__topcard-item-list',
    '.msg-overlay-bubble-header__details',
    '.msg-thread__topcard',
  ];
  
  for (const selector of insertPoints) {
    const target = document.querySelector(selector);
    if (target) {
      target.appendChild(badge);
      console.log('✅ Badge inserted at:', selector);
      return true;
    }
  }
  
  console.log('❌ Could not find insertion point');
  return false;
}

function init() {
  console.log('🚀 Initializing LinkTime IST...');
  
  setTimeout(() => {
    const locationData = extractLocationFromPage();
    
    if (locationData) {
      console.log('✅ Location found:', locationData.location);
      console.log('✅ Timezone:', locationData.timezone);
    } else {
      console.log('⚠️ Using IST-only mode');
    }
    
    createTimeBadge(locationData);
    
    // Update every minute
    setInterval(() => {
      createTimeBadge(locationData);
    }, 60000);
    
  }, 2000);
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Watch for navigation
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log('🔄 Page changed, reinitializing...');
    setTimeout(init, 1000);
  }
}).observe(document, { subtree: true, childList: true });

console.log('✅ LinkTime IST ready!');