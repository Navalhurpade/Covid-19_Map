function fetchData() {
  fetch("https://corona.lmao.ninja/v2/countries",  {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
  }})
    .then((responce) => responce.json())
    .then((data) => {
      data.map((country) => {
        const card = `<div class="card">
        <img class="card-img-top flag" src=${country.countryInfo.flag} alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title title">${country.country}</h5>
        <h6 class="card-subtitle mb-2 ">Cases per Millon</h6>
        <p class="card-text">${country.casesPerOneMillion}</p>
        </div>
      </div>`;

        const pieChart = ` 
      <div>
      <canvas class="pieChart" style="max-width: 500px;"></canvas>
    </div>`;

        let longitude = country.countryInfo.long;
        let latitude = country.countryInfo.lat;

        let color = picColor(country.casesPerOneMillion);
        
        //Creating new Markers for Each Country !
        new mapboxgl.Marker({
          color: color,
        })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setHTML(card))
          .addTo(map)
      })
    })
    .catch((err) => {
      throw new Error(err.message);
    });
}

function picColor(cases) {
  let red = 80;
  let green = 0;

  if (cases <= 500) (red = 0), (green = 200);
  else if (cases <= 800) (red = 30), (green = 170);
  else if (cases <= 1000) (red = 60), (green = 140);
  else if (cases <= 3000) (red = 100), (green = 110);
  else if (cases <= 6000) (red = 150), (green = 90);
  else if (cases <= 8000) (red = 190), (green = 70);
  else if (cases <= 10000) (red = 240), (green = 45);
  else if (cases <= 12000) (red = 280), (green = 25);
  else if (cases <= 14000) (red = 310), (green = 20);
  else if (cases <= 18000) (red = 330), (green = 10);
  else if (cases > 18000) (red = 370), (green = 6);
  else if (cases <= 20000) (red = 400), (green = 0);

  return `rgb(${red},  ${green},0)`;
}

fetchData();





//pie Chart

// function waitForPieChart() {
//   var poops = setInterval(function () {
//     if (document.getElementsByClassName("pieChart")) {
//       // clearInterval(poops)
//       console.log("chart loded !");
//       pieChart();
//     }
//   }, 100)
// }

// document.getElementsByClassName("pieChart").ready(function() {
//   var ctx = document.getElementsByClassName("pieChart")
//   new Chart(ctx, {
//       type: 'pie',
//       data: {
//           labels: ["Spring", "Summer", "Fall", "Winter"],
//           datasets: [{
//               data: [1200, 1700, 800, 200],
//               backgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(100, 255, 0, 0.5)", "rgba(200, 50, 255, 0.5)", "rgba(0, 100, 255, 0.5)"]
//           }]
//       },
//       options: {
//           title: {
//               display: true,
//               text: 'Weather'
//           }
//       }
//   });
// });

// waitForPieChart()