// LinkTime IST - Error-Free Final Version
console.log('🚀 LinkTime IST Loading...');

// Timezone database (city: UTC offset)
const TIMEZONES = {
  'new york': -5, 'nyc': -5, 'new york, ny': -5,
  'los angeles': -8, 'la': -8, 'los angeles, ca': -8,
  'san francisco': -8, 'sf': -8,
  'chicago': -6, 'seattle': -8, 'boston': -5,
  'miami': -5, 'toronto': -5, 'vancouver': -8,
  'london': 0, 'london, uk': 0,
  'paris': 1, 'berlin': 1, 'amsterdam': 1,
  'dublin': 0, 'madrid': 1, 'rome': 1,
  'singapore': 8, 'tokyo': 9, 'hong kong': 8,
  'dubai': 4, 'bangalore': 5.5, 'bengaluru': 5.5,
  'mumbai': 5.5, 'delhi': 5.5, 'hyderabad': 5.5,
  'sydney': 11, 'melbourne': 11
};

let currentLocation = null;
let badgeElement = null;

// Calculate time for given offset
function calculateTime(offsetHours) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const targetTime = new Date(utc + (offsetHours * 3600000));
  
  let hours = targetTime.getHours();
  const minutes = targetTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  const mins = minutes < 10 ? '0' + minutes : minutes;
  
  return hours + ':' + mins + ' ' + ampm;
}

// Find location on page
function findLocationOnPage() {
  try {
    const pageText = document.body.innerText.toLowerCase();
    
    for (const city in TIMEZONES) {
      if (pageText.indexOf(city) !== -1) {
        console.log('✅ Location found:', city);
        return {
          name: city,
          offset: TIMEZONES[city]
        };
      }
    }
    
    console.log('⚠️ No location detected');
    return null;
  } catch (e) {
    console.error('Error finding location:', e);
    return null;
  }
}

// Create the floating badge
function createFloatingBadge() {
  try {
    // Remove existing badge
    if (badgeElement) {
      badgeElement.remove();
    }
    
    // Find location
    currentLocation = findLocationOnPage();
    
    // Get IST time
    const istTime = calculateTime(5.5);
    
    // Create badge element
    badgeElement = document.createElement('div');
    badgeElement.id = 'linktime-badge';
    
    // Set styles
    badgeElement.style.position = 'fixed';
    badgeElement.style.top = '100px';
    badgeElement.style.right = '20px';
    badgeElement.style.zIndex = '999999';
    badgeElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif';
    badgeElement.style.cursor = 'move';
    badgeElement.style.userSelect = 'none';
    
    // Build HTML based on whether location was found
    if (currentLocation) {
      const theirTime = calculateTime(currentLocation.offset);
      
      badgeElement.innerHTML = 
        '<div style="background: linear-gradient(135deg, #0a66c2, #004182); border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); min-width: 280px; color: white; overflow: hidden;">' +
          '<div style="background: rgba(0,0,0,0.2); padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1);">' +
            '<div style="display: flex; align-items: center; gap: 8px;">' +
              '<span style="font-size: 18px;">🕐</span>' +
              '<span style="font-weight: 700; font-size: 14px;">LinkTime IST</span>' +
            '</div>' +
            '<span style="font-size: 10px; opacity: 0.8;">Drag me</span>' +
          '</div>' +
          '<div style="padding: 16px;">' +
            '<div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 10px; margin-bottom: 10px;">' +
              '<div style="font-size: 10px; opacity: 0.9; margin-bottom: 4px;">📍 Location</div>' +
              '<div style="font-size: 12px; font-weight: 600; text-transform: capitalize;">' + currentLocation.name + '</div>' +
            '</div>' +
            '<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 12px; margin-bottom: 8px;">' +
              '<div style="font-size: 10px; opacity: 0.9; margin-bottom: 4px;">⏰ Their Time</div>' +
              '<div style="font-size: 22px; font-weight: 700; color: #ffd700;">' + theirTime + '</div>' +
            '</div>' +
            '<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 12px;">' +
              '<div style="font-size: 10px; opacity: 0.9; margin-bottom: 4px;">🇮🇳 IST</div>' +
              '<div style="font-size: 22px; font-weight: 700; color: #90EE90;">' + istTime + '</div>' +
            '</div>' +
          '</div>' +
          '<div style="background: rgba(0,0,0,0.2); padding: 8px; text-align: center; font-size: 9px; opacity: 0.8; border-top: 1px solid rgba(255,255,255,0.1);">Updates every minute</div>' +
        '</div>';
    } else {
      // No location found - show IST only
      badgeElement.innerHTML = 
        '<div style="background: linear-gradient(135deg, #ff6b6b, #ee5a6f); border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); min-width: 280px; color: white; overflow: hidden;">' +
          '<div style="background: rgba(0,0,0,0.2); padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1);">' +
            '<div style="display: flex; align-items: center; gap: 8px;">' +
              '<span style="font-size: 18px;">🕐</span>' +
              '<span style="font-weight: 700; font-size: 14px;">LinkTime IST</span>' +
            '</div>' +
            '<span style="font-size: 10px; opacity: 0.8;">Drag me</span>' +
          '</div>' +
          '<div style="padding: 16px;">' +
            '<div style="background: rgba(255,255,255,0.2); border: 2px dashed rgba(255,255,255,0.4); border-radius: 8px; padding: 12px; margin-bottom: 12px; text-align: center;">' +
              '<div style="font-size: 16px; margin-bottom: 4px;">⚠️</div>' +
              '<div style="font-size: 11px; font-weight: 600;">Location Not Detected</div>' +
              '<div style="font-size: 9px; opacity: 0.8; margin-top: 4px;">Contact may not have location set</div>' +
            '</div>' +
            '<div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 12px;">' +
              '<div style="font-size: 10px; opacity: 0.9; margin-bottom: 4px;">🇮🇳 Current IST</div>' +
              '<div style="font-size: 22px; font-weight: 700; color: #90EE90;">' + istTime + '</div>' +
            '</div>' +
          '</div>' +
          '<div style="background: rgba(0,0,0,0.2); padding: 8px; text-align: center; font-size: 9px; opacity: 0.8; border-top: 1px solid rgba(255,255,255,0.1);">Try someone with visible location</div>' +
        '</div>';
    }
    
    // Make draggable
    makeDraggable(badgeElement);
    
    // Add to page
    document.body.appendChild(badgeElement);
    
    console.log('✅ Badge created successfully!');
  } catch (e) {
    console.error('❌ Error creating badge:', e);
  }
}

// Make element draggable
function makeDraggable(element) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;
  
  element.onmousedown = function(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    document.onmouseup = function() {
      document.onmouseup = null;
      document.onmousemove = null;
    };
    
    document.onmousemove = function(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      element.style.top = (element.offsetTop - pos2) + 'px';
      element.style.left = (element.offsetLeft - pos1) + 'px';
      element.style.right = 'auto';
    };
  };
}

// Initialize
function initialize() {
  console.log('🎬 Initializing...');
  
  setTimeout(function() {
    createFloatingBadge();
    
    // Update every minute
    setInterval(function() {
      console.log('🔄 Updating...');
      createFloatingBadge();
    }, 60000);
    
  }, 2000);
}

// Watch for page changes
let lastUrl = location.href;
new MutationObserver(function() {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    console.log('🔄 Page changed');
    setTimeout(createFloatingBadge, 1000);
  }
}).observe(document, {
  subtree: true,
  childList: true
});

// Start when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

console.log('✅ LinkTime IST Loaded - Watch for badge in 2 seconds!');