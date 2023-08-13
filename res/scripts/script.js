 function fetchWorldTime() {
  fetch('https://worldtimeapi.org/api/ip')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const { day_of_week, datetime, timezone } = data;
      const formattedDate = new Date(datetime).toLocaleTimeString('en-US', { timeZone: timezone });
      const dayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][day_of_week];

      const formattedOutput = `${dayOfWeek} / ${formattedDate.substr(0, 8)} KUALA LUMPUR`;
      $('#time-text').text(formattedOutput); 
    })
    .catch(error => {
      console.error('Error fetching world time:', error);
      $('#time-text').text('Loading time...');
    });
}
  setInterval(fetchWorldTime, 1000);
  