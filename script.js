// 🔊 Activate SOS Alert
function triggerSOS() {
  const siren = document.getElementById('sirenAudio');
  siren.currentTime = 0;
  siren.play();
  document.body.classList.add('panic-mode');
}

// ⛔ Stop SOS Alert
function stopSOS() {
  const siren = document.getElementById('sirenAudio');
  siren.pause();
  siren.currentTime = 0;
  document.body.classList.remove('panic-mode');
}

// 🌗 Toggle Panic Mode (manually)
function toggleTheme() {
  document.body.classList.toggle('panic-mode');
}

// 📍 Show live location in browser
function shareLocation() {
  const output = document.getElementById('locationOutput');

  if (!navigator.geolocation) {
    output.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
      output.innerHTML = `
        Latitude: ${lat.toFixed(5)}<br>
        Longitude: ${lon.toFixed(5)}<br>
        <a href="${mapLink}" target="_blank">📍 View on Map</a>
      `;
    },
    () => {
      output.textContent = "Unable to retrieve your location.";
    }
  );
}

// 📤 Share location on WhatsApp
function shareOnWhatsApp() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const message = `Help! I am in danger. My location: https://www.google.com/maps?q=${lat},${lon}`;
      const encodedMsg = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/?text=${encodedMsg}`;
      window.open(whatsappURL, "_blank");
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
}

// 👩‍👧 Add trusted contact
function addContact() {
  const input = document.getElementById('contactInput');
  const contactList = document.getElementById('contactList');
  const value = input.value.trim();

  if (value !== "") {
    const li = document.createElement('li');
    li.textContent = value;
    contactList.appendChild(li);
    input.value = "";
  }
}

// 📞 Trigger fake call
function startFakeCall() {
  const audio = document.getElementById('fakeCallAudio');
  audio.currentTime = 0;
  audio.play();
  document.getElementById('callStatus').textContent = "📞 Incoming fake call...";
}

// ❌ Cancel fake call
function cancelFakeCall() {
  const audio = document.getElementById('fakeCallAudio');
  audio.pause();
  audio.currentTime = 0;
  document.getElementById('callStatus').textContent = "";
}

// 💡 Open safety tips modal
function openTips() {
  document.getElementById('tipsModal').style.display = 'block';
}

// ❌ Close tips modal
function closeTips() {
  document.getElementById('tipsModal').style.display = 'none';
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('✅ Service Worker Registered'))
    .catch(err => console.error('❌ SW registration failed:', err));
}
