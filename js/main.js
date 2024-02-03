function dropDown() {
  document.getElementById("mydropDown").classList.toggle("show");
  weather()
}

async function weather() {
 

  try {
 
    const element = await readDatas();
    for (let i = 0; i < element.length; i++) {
      const elementG = element[i];
      const lat = elementG[0];
      const lon = elementG[1];
      const city = elementG[2];
      const country = elementG[3];

      let div = document.getElementById("mydropDown");
      let a = document.createElement("a");
      a.innerText = city + "," + country;
      div.appendChild(a);
      a.addEventListener('click',(lat,lon)=>{
        div.classList.remove('show');
        const mybutt =document.querySelector('.mybutt');
        mybutt.innerHTML= city + "," + country+`  <i class="fa-solid fa-caret-down"></i>`;
        getWeather(lat,lon)});
      }
  } catch (error) {
    console.log(error);
  }
}
async function readCSV(csvFilePath) {
  try {
    const texts = await fetch(csvFilePath);
    const text = await texts.text();
    const rows = text.split("\n");
    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(",");
      data.push(columns);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function readDatas() {
  const csvFilePath = "city_coordinates.csv";
  const csv_data = await readCSV(csvFilePath);
  const resultArray = [];

  for (let i = 0; i < csv_data.length; i++) {
    const element = csv_data[i]; //4
    // console.log(lat,lon,city,country);
    resultArray.push(element);
  }
  return resultArray;
}

async function getWeather(lat,lon) {
  const showResult = document.getElementById("showResult");
  showResult.innerHTML='';
  const request = new Request(
    `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`,
    {
      method: "GET",
    }
  );
  const response = await fetch(request);
  const data = await response.json();
     //console.log('Success',data);
 const dataSeries = data.dataseries;
 let  rowsDiv =  document.createElement('div');
 rowsDiv.classList.add('p-1','mx-auto','row');
for (let i = 0; i < dataSeries.length; i++) {
const date = dataSeries[i].date;
const weather = dataSeries[i].weather;
const tempMax = dataSeries[i].temp2m.max;
const tempMin = dataSeries[i].temp2m.min;
const wind = dataSeries[i].wind10m_max;

 //console.log(date,weather,tempMax,tempMin,wind)


 let colDiv = document.createElement('div');
  colDiv.classList.add('g-2','col-lg-4','col-md-3');
 

 colDiv.innerHTML=` <p> Date : ${date}</p>
                 <img src="./images/${weather}.png">
                 <p> Weather condition :${weather}</p>
                 <p> Maximum Temperature : ${tempMax}</p>
                 <p> Minimum Temperature : ${tempMin}</p>
                 <p> Wind Speed:  ${wind}</p>`
rowsDiv.appendChild(colDiv);
 showResult.appendChild(rowsDiv);
 
}
}
