async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

  // Task 1
  const div = document.querySelector('#weatherWidget');
  div.style.display = 'none'
  
  //Task 2

  document.querySelector('#citySelect').addEventListener('change', async evt => {
    console.log('selection test')
    document.querySelector('#citySelect').setAttribute('disabled', 'disabled')
      document.querySelector('#weatherWidget').style.display = 'none'
      document.querySelector('.info').textContent = 'Fetching weather data...'
      let city = evt.target.value
      let url = `http://localhost:3003/api/weather?city=${city}`
      axios.get(url)
        .then(res => {
          console.log(res.data)
          document.querySelector('#citySelect').removeAttribute('disabled')
      document.querySelector('#weatherWidget').style.display = 'block'
      document.querySelector('.info').textContent = ''
      let {data} = res
      document.querySelector('#apparentTemp div:nth-child(2)').textContent = `${data.current.apparent_temperature}°`;
      document.querySelector('#todayDescription').textContent = descriptions.find(d => d[0] === data.current.weather_description)[1];
      document.querySelector('#todayStats div:nth-child(1)').textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`;
      document.querySelector('#todayStats div:nth-child(2)').textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`;
      document.querySelector('#todayStats div:nth-child(3)').textContent = `Humidity: ${data.current.humidity}%`;
      document.querySelector('#todayStats div:nth-child(4)').textContent = `Wind: ${data.current.wind_speed}m/s`;

      data.forecast.daily.forEach((day, idx) => {
        let card = document.querySelectorAll('.next-day')[idx]

        let weekDay = card.children[0]
        weekDay.textContent = getDayOfWeek(day.date)
        let apparent = card.children[1]
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
        let minMax = card.children[2]
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
        let precip = card.children[3]
        precip.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
      })
      document.querySelector('#location').firstElementChild.textContent = data.location.city
        })
        .catch(err => {
          console.log('Request failed, error message ->', err.message)
        })
        function getDayOfWeek(dateString) {
          const date = new Date(dateString);
          const options = { weekday: 'long' };
          return date.toLocaleDateString('en-US', options);
      }
    /* try {
      document.querySelector('#citySelect').setAttribute('disabled', 'disabled')
      document.querySelector('#weatherWidget').style.display = 'none'
      document.querySelector('.info').textContent = 'Fetching weather data...'
      let city = evt.target.value
      let url = `http://localhost:3003/api/weather?city=${city}`
      console.log(url)
      const res = await axios.get(url)
      console.log(res.data)
     }
     catch (err) {
      console.log('Request failed, error message ->', err.message)

     } */
  })


  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
