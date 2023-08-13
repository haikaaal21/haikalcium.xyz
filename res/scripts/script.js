let currentTime = null; // Store the fetched time

function fetchWorldTime() {
  fetch('https://worldtimeapi.org/api/ip')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const { datetime, utc_offset } = data;
      const currentUtcOffset = parseInt(utc_offset.replace(':', ''));
      currentTime = new Date(datetime);
      currentTime.setUTCMinutes(currentTime.getUTCMinutes() + currentUtcOffset);

      updateFormattedTime(); 
    })
    .catch(error => {
      console.error('Error fetching world time:', error);
      setInterval(() => {
        resetTimeConnection();
      },15000)
      $('#time-text').text('Resetting connection for 15 seconds...');
    });
}

function updateFormattedTime() {
  if (currentTime) {
    const formattedDate = currentTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Kuala_Lumpur' });
    const dayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][currentTime.getUTCDay()];

    const formattedOutput = `${dayOfWeek} / ${formattedDate.substr(0, 8)} KUALA LUMPUR`;
    $('#time-text').text(formattedOutput);
  }
}

function resetTimeConnection() {
  currentTime = null;
  fetchWorldTime();
}

function incrementTime() {
  if (currentTime) {
    currentTime.setSeconds(currentTime.getSeconds() + 1);
    updateFormattedTime();
  }
}

fetchWorldTime();

setInterval(incrementTime, 1000);  