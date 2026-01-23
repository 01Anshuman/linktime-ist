// LinkTime IST - FORCE VISIBLE VERSION
console.log('🚀 LinkTime IST - FORCE VISIBLE VERSION');

const CITY_TIMEZONE = {
  'london': 'Europe/London',
  'london, uk': 'Europe/London',
  'new york': 'America/New_York',
  'new york, ny': 'America/New_York',
  'singapore': 'Asia/Singapore',
  'tokyo': 'Asia/Tokyo',
  'sydney': 'Australia/Sydney',
  'dubai': 'Asia/Dubai',
  'bangalore': 'Asia/Kolkata',
  'bengaluru': 'Asia/Kolkata',
  'mumbai': 'Asia/Kolkata',
  'delhi': 'Asia/Kolkata',
};

const TIMEZONE_OFFSETS = {
  'Europe/London': 0,
  'America/New_York': -5,
  'Asia/Singapore': 8,
  'Asia/Tokyo': 9,
  'Australia/Sydney': 11,
  'Asia/Dubai': 4,
  'Asia/Kolkata': 5.5,
};

function getTimezoneFromLocation(location) {
  if (!location) return null;
  const loc = location.toLowerCase().trim();
  
  if (CITY_TIMEZONE[loc]) return CITY_TIMEZONE[loc];
  
  for (const [city, tz] of Object.entries(CITY_TIMEZONE)) {
    if (loc.includes(city.split(',')[0])) return tz;
  }
  
  return null;
}

function getCurrentTime(timezone) {
  const now = new Date();
  const offset = TIMEZONE_OFFSETS[timezone] || 0;
  const istOffset = 5.5;
  
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const theirTime = new Date(utcTime + (offset * 3600000));
  const istTime = new Date(utcTime + (istOffset * 3600000));
  
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
  console.log('🔍 Searching for location...');
  
  // Get ALL text on page
  const allText = document.body.innerText;
  
  // Try to find location patterns
  const patterns = [
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?),\s*([A-Z]{2,})/g,
    /\b(London|New York|Singapore|Tokyo|Dubai|Bangalore|Mumbai|Delhi)\b/gi
  ];
  
  for (const pattern of patterns) {
    const matches = allText.match(pattern);
    if (matches) {
      for (const match of matches) {
        const tz = getTimezoneFromLocation(match);
        if (tz) {
          console.log('✅ Found location:', match);
          return { location: match, timezone: tz };
        }
      }
    }
  }
  
  console.log('⚠️ No location found');
  return null;
}

function createFloatingBadge(locationData) {
  console.log('💉 Creating FLOATING badge...');
  
  // Remove existing
  const existing = document.getElementById('linktime-floating-badge');
  if (existing) existing.remove();
  
  // Create floating badge (IMPOSSIBLE TO MISS)
  const badge = document.createElement('div');
  badge.id = 'linktime-floating-badge';
  
  if (locationData) {
    const times = getCurrentTime(locationData.timezone);
    badge.innerHTML = `
      <div style="
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 999999;
        background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);
        color: white;
        padding: 16px 20px;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        min-width: 280px;
        animation: slideInRight 0.5s ease-out;
      ">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span style="font-size: 24px;">🕐</span>
          <span style="font-weight: 700; font-size: 16px;">LinkTime IST</span>
        </div>
        <div style="background: rgba(255,255,255,0.15); height: 1px; margin: 12px 0;"></div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="opacity: 0.9; font-size: 13px;">📍 Location:</span>
            <span style="font-weight: 600; font-size: 13px;">${locationData.location}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="opacity: 0.9; font-size: 13px;">⏰ Their Time:</span>
            <span style="font-weight: 700; font-size: 16px; color: #ffd700;">${times.theirTime}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="opacity: 0.9; font-size: 13px;">🇮🇳 IST:</span>
            <span style="font-weight: 700; font-size: 16px; color: #90EE90;">${times.istTime}</span>
          </div>
        </div>
        <div style="
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.2);
          font-size: 11px;
          opacity: 0.8;
          text-align: center;
        ">
          Updates every minute
        </div>
      </div>
    `;
  } else {
    const times = getCurrentTime('Asia/Kolkata');
    badge.innerHTML = `
      <div style="
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 999999;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
        color: white;
        padding: 16px 20px;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        min-width: 280px;
        animation: slideInRight 0.5s ease-out;
      ">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span style="font-size: 24px;">🕐</span>
          <span style="font-weight: 700; font-size: 16px;">LinkTime IST</span>
        </div>
        <div style="background: rgba(255,255,255,0.15); height: 1px; margin: 12px 0;"></div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="
            background: rgba(255,255,255,0.2);
            padding: 8px 12px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 8px;
          ">
            <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px;">⚠️ Location Not Detected</div>
            <div style="font-size: 10px; opacity: 0.8;">Contact may not have location in profile</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="opacity: 0.9; font-size: 13px;">🇮🇳 Current IST:</span>
            <span style="font-weight: 700; font-size: 18px; color: #90EE90;">${times.istTime}</span>
          </div>
        </div>
        <div style="
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.2);
          font-size: 10px;
          opacity: 0.8;
          text-align: center;
        ">
          Try opening a chat with someone who has<br>their location visible (e.g., "New York, NY")
        </div>
      </div>
    `;
  }
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Insert into page
  document.body.appendChild(badge);
  console.log('✅✅✅ FLOATING BADGE INSERTED!');
  
  // Make it draggable (bonus feature!)
  makeDraggable(badge);
}

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  element.onmousedown = dragMouseDown;
  element.style.cursor = 'move';
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.right = "auto";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }
  
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function init() {
  console.log('🚀 Initializing...');
  
  setTimeout(() => {
    const locationData = extractLocationFromPage();
    createFloatingBadge(locationData);
    
    // Update every minute
    setInterval(() => {
      createFloatingBadge(locationData);
    }, 60000);
    
    console.log('✅ Ready!');
  }, 3000);
}

// Start
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
    init();
  }
}).observe(document, { subtree: true, childList: true });

console.log('🎬 LinkTime IST loaded!');