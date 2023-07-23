export function fetchWorldTime() {
  fetch('http://worldtimeapi.org/api/ip')
    .then(response => response.json())
    .then(data => {
      const { day_of_week, datetime, timezone } = data;
      const formattedDate = new Date(datetime).toLocaleTimeString('en-US', { timeZone: timezone });
      const dayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][day_of_week];

      const formattedOutput = `${dayOfWeek} / ${formattedDate.substr(0, 8)} KUALA LUMPUR`;
      $('#time-text').text(formattedOutput); 
    })
    .catch(error => {
      $('#time').text('API IS DOWN');
    });
}
  setInterval(fetchWorldTime, 1000);
  