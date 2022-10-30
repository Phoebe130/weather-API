//宣告變數
const container = document.querySelector('.container')
const btn = document.querySelector('.btn')
const north = ['臺北市','新北市','基隆市','桃園市','新竹市','桃園市','新竹縣','宜蘭縣']
const center = ['苗栗縣','臺中市','彰化縣','南投縣','雲林縣']
const south = ['嘉義市','嘉義縣','臺南市','高雄市','屏東縣','澎湖縣']
const east = ['花蓮縣','臺東縣']
const island = ['金門縣','連江縣']

//step1.fetch>>至MDN複製貼上 step2.('網址')更改為氣象局資料庫來源網站
fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-AA300EC1-31BA-465E-B669-6CA2C320A195')
  .then(function(response) {
    //  console.log(response);
      return response.json();
  })
  .then(function(weather) {
      console.log(weather);
        //console.log(weather.records.location[11].weatherElement[1].time[0].parameter.parameterName);

        //將weather.records.location 以allLocation 取代
        var allLocation = weather.records.location
        allLocation.forEach(element => { 
            let city = element.locationName
            let date = element.weatherElement[4].time[1].startTime
            date = date.replace(' 18:00:00', '')
            date = date.replace(' 00:00:00', '')
            date = date.replace(' 06:00:00', '')
            date = date.replace(' 12:00:00', '')
            let minTemp = element.weatherElement[2].time[1].parameter.parameterName
            let maxTemp = element.weatherElement[4].time[1].parameter.parameterName
            let feel = element.weatherElement[3].time[0].parameter.parameterName
            let rain = element.weatherElement[1].time[0].parameter.parameterName

    
    let img_path
    if(rain < 25 ){
        img_path = './img/sunny.gif'
    }else if(rain <= 50){
        img_path = './img/mostlysunny.gif'
    }else if(rain < 50){
        img_path = './img/rain.gif'
    }else{
        img_path = './img/storm.gif'
    }
    container.innerHTML +=`
    <div class="citycard" data-city="${city}">
        <img src="${img_path}" alt="">            
        <div class="maintext">
            <div class="city-name">${city}</div>
            <div class="c-temp">${date}</div>
            <div class="c-temp">${minTemp}~${maxTemp}°C</div>
            <div class="apparent-temp">舒適度:${feel}</div>
            <div class="rainny">降雨機率:${rain}%</div>
        </div>
    </div>
    `   
    });
});

// 把所有縣市印出來, 然後把不想看到的加上display:none  -> 

function filter1(areas){
    var allcity = document.querySelectorAll('.citycard')

    //將所有城市一筆一筆叫出來
    allcity.forEach(city =>{
        //如果條件是all(全部), 就直接給block
        if (areas == 'all'){
            city.style.display = 'block'
        }else{
            //先假設所有城市都不顯示
            city.style.display = 'none'
            areas.forEach(area=>{
                //將條件拿出來比較, 如果條件中的任何一個縣市有符合就加上block顯示出來
                if (city.dataset.city == area){
                    city.style.display = 'block'
                }
            })
        }
        
    });


}

// 根據按下的按鈕選定條件, 只將符合條件的縣市做出卡片 
//function filter2(areas){


//}

