key = "6fe16c293b97e77b1af943f5cae8a90e"
const card = document.getElementById('card')
const form = document.getElementById('mainForm')

const getData = async (city) => {
    console.log(city)
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`)
    const data = await result.json()
    const name = data.name + ", " + data.sys.country
    const temp = Math.round(data.main.temp)
    const high = Math.round(data.main.temp_max)
    const low = Math.round(data.main.temp_min)
    const realfeal = Math.round(data.main.feels_like)
    const wind = Math.round(data.wind.speed)
    const imgsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    const desc = sentenceCase(data.weather[0].description)
    card.style.backgroundImage = `url('./img/${getbackimg(data.weather[0].icon)}')`
    if (data.weather[0].icon.slice(-1) == 'd'){
        card.style.color = 'black'
    }else{
        card.style.color = 'white'
    }
    console.log(data)
    card.innerHTML = `
        <div id="header">
            <h1>${name}</h1>
            <img src="${imgsrc}" alt="" />
            <h2>${temp}°</h2>
            <p>${desc}</p>
        </div>
        <div id="info">
            <h2>Other info</h2>
            <p id="high">High: ${high}°</p>
            <p id="low" >Low: ${low}°</p>
            <p id="rf"  >Real Feel: ${realfeal}°</p>
            <p id="wind">Wind: ${wind} mph</p>
        </div>
    `
}
getData("Chicago")

form.addEventListener('submit', function(e){
    e.preventDefault()
    const city = form.querySelector('#value')
    getData(city.value)
})


// stole from geeks for geeks cause im lazy https://www.geeksforgeeks.org/convert-string-to-title-case-in-javascript/
function sentenceCase (str) {
    if ((str===null) || (str===''))
        return false;
    else
    str = str.toString();
     
    return str.replace(/\w\S*/g,
    function(txt){return txt.charAt(0).toUpperCase() +
        txt.substr(1).toLowerCase();});
    }

    
function getbackimg(icon){
    let num = ''
    num = icon.replace(icon.slice(-1), '')
    num = parseInt(num)
    if (icon.slice(-1) === 'd'){
        //day
        if (num == 1){
            //clear day
            return "wallpaperhunt_Minimal_Nature_Landscape_82_1.jpg"
        }
        else if(num == 2 || num == 3 || num == 4){
            //cloudy day
            return "wallpaperhunt_Minimal_Nature_Landscape_82_1.jpg"
        }
        else if (num == 9 || num == 10 || num == 11){
            //rainy day
            return "e9b5f002e928f03e6eb828d26c00e634.jpg"
        }
        else if (num == 13){
            //snowy day
            return "20a44df32c5000ed82c68a2ebf644df7.jpg"
        }
        else{
            //mist
            return "ecd2596c672adcc609620742082122fe.jpg"
        }
    }else{
         //night
        if (num == 1){
            //clear night
            return "l9pgfhc5xry51.jpg"
        }
        else if(num == 2 || num == 3 || num == 4){
            //cloudy night
            return "l9pgfhc5xry51.jpg"
        }
        else if (num == 9 || num == 10 || num == 11){
            //rainy night
            return "26b625a7b2af7889da33008415de14d9.jpg"
        }
        else if (num == 13){
            //snowy night
            return "c0be80e4295c2cf8bf294b4373353e39.jpg"
        }
        else{
            //mist
            return "ecd2596c672adcc609620742082122fe.jpg"
        }
    }
}
