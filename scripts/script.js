var selectGenres = [genreCold, genreChill, genreTemplate, genreHot, genreHell];

function success(pos) {
  let crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  
  axios.get(`https://api.darksky.net/forecast/1c84b3466b079157584b54e4079af66a/${crd.latitude},${crd.longitude}?lang=es&units=auto&exclude=minutely,hourly,daily,alerts,flags`)
    .then(function (response) {
      let data = response.data, temperature = data.currently.temperature;
      console.log(temperature);
      let summary = data.currently.summary; //LOS TIPOS DE SUMMARY SON: clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
      console.log(summary);
      $('.hero h1').html(`La temperatura es de ${temperature} grados`);
      $('.hero h2').html(`El cielo está ${summary}`);
  })
    .catch(function (error) {
      console.error(error)
  });
  axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=5a7f34f54c25ea35d2c772a1bf4b5535&language=es')
    .then(function (response) {
      let data = response.data, genres = data['genres'], genre, option;
      for (let i = 0; i < selectGenres.length; i++) {
        genres.forEach(element => {
          genre = element.name;
          genreId = element.id;
          option = document.createElement('option');
          option.text = genre;
          option.value = genre;
          option.id = genreId;
          selectGenres[i].appendChild(option);           
        });
      }
  })
    .catch(function (error) {
      console.error(error)
  });

  //PIDO SÓLO EL CLIMA EN ESPAÑOL
  // axios.get(`https://api.darksky.net/forecast/1c84b3466b079157584b54e4079af66a/${crd.latitude},${crd.longitude}?lang=es&exclude=minutely,hourly,daily,alerts,flags`)
  //   .then(function (response) {
  //     let spanishSummary = response.data.currently.summary;
  //     console.log(spanishSummary);
  //   })
  //   .catch(function (error) {
  //     console.error(error)
  // });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function findSelection () {
  console.log('hola')
}

navigator.geolocation.getCurrentPosition(success, error);