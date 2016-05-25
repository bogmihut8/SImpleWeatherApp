/**
 * Created by BogdanM on 16.05.2016.
 */
var myArr, ractive;
var MyRactive = Ractive.extend({
    template: '#infoTemplate'
});
var MyRactive2 = Ractive.extend({
    template: '#infoTemplateRoute'
});

jQuery(".image-top").vegas({
    delay: 10000,
    slides: [
        { src: "/SImpleWeatherApp/assets/images/slide1.jpg" },
        { src: "/SImpleWeatherApp/assets/images/slide2.jpg" },
        { src: "/SImpleWeatherApp/assets/images/slide3.jpg" },
        { src: "/SImpleWeatherApp/assets/images/slide4.jpg" },
        { src: "/SImpleWeatherApp/assets/images/slide5.jpg" }
    ],
    overlay: '/SImpleWeatherApp/assets/overlays/04.png'
});

clearTextbox();
showDirectlyWeatherInfo();
getWeatherRoute();
if(localStorage.getItem("history") !== null) {
    document.getElementById("history").style.display = "block";
    updateHistoryFromLocalstorage();
}



/* Get weather information using openweather api */
function getWeather(){
    var searchedCity = document.getElementById('cityText').value;
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/weather?APPID=55241e2b9ceaf717de252a51518e4f47&q=" + searchedCity + '&units=metric';

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myArr = JSON.parse(xmlhttp.responseText);
            ractive = new MyRactive({
                el: '#infoContainer',
                data: { city: myArr.name + ", " + myArr.sys.country, temperature: myArr.main.temp, info: myArr.weather[0].main, info_description: myArr.weather[0].description, icon: "http://openweathermap.org/img/w/" + myArr.weather[0].icon + ".png"}
            });
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


}



/* Get weather information using openweather api when clicking on select options*/
function getWeatherSelect(){
    var searchedCity = document.getElementById('recentSearches').value;
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.openweathermap.org/data/2.5/weather?APPID=55241e2b9ceaf717de252a51518e4f47&q=" + searchedCity + '&units=metric';

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myArr = JSON.parse(xmlhttp.responseText);
            ractive = new MyRactive({
                el: '#infoContainer',
                data: { city: myArr.name + ", " + myArr.sys.country, temperature: myArr.main.temp, info: myArr.weather[0].main, info_description: myArr.weather[0].description, icon: "http://openweathermap.org/img/w/" + myArr.weather[0].icon + ".png"}
            });
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


};



/* Updates dropdown when searching with the text input */
function updateRecentSearches(){
    var select = document.getElementById('recentSearches');
    var inputValue = document.getElementById('cityText').value;
    var option = document.createElement('option');
    option.text = inputValue;
    option.selected = true;
    option.value = inputValue;
    for(var i = 0; i < select.length; i++)
        if(select.options[i].text === option.text){
            select.remove(i);
        }
    select.add(option, select[0]);
    saveOptionsInLocalstorage(select);
}



/* Updates dropdown when searching with the select */
function updateRecentSearchesOnSelectChange(){
    var select = document.getElementById('recentSearches');
    var inputValue = document.getElementById('recentSearches').value;
    var option = document.createElement('option');
    option.text = inputValue;
    option.selected = true;
    option.value = inputValue;
    for(var i = 0; i < select.length; i++)
        if(select.options[i].text === option.text){
            select.remove(i);
        }
    select.add(option, select[0]);
    saveOptionsInLocalstorage(select);
}



/*FUnctions to call when clicking the search button*/
function onclickFunctions(){
    getWeather();
    updateRecentSearches();
    document.getElementById('infoContainer').style.background = 'rgba(256,256,256,0.4)';
    if(localStorage.getItem("history") !== null) {
        document.getElementById("history").style.display = "block";
    }
}



/*Get weather when having a city as a hash*/
function getWeatherRoute(){
    if(location.hash !== ''){
        document.getElementById('infoContainerRoute').style.background = 'rgba(256,256,256,0.4)';
        var cityName = location.hash.replace('#', '');
        var xmlhttp = new XMLHttpRequest();
        var url = "http://api.openweathermap.org/data/2.5/weather?APPID=55241e2b9ceaf717de252a51518e4f47&q=" + cityName + '&units=metric';

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                myArr = JSON.parse(xmlhttp.responseText);
                ractive = new MyRactive2({
                    el: '#infoContainerRoute',
                    data: { city: myArr.name + ", " + myArr.sys.country, temperature: myArr.main.temp, info: myArr.weather[0].main, info_description: myArr.weather[0].description, hash: true, icon: "http://openweathermap.org/img/w/" + myArr.weather[0].icon + ".png"}
                });
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}




function showDirectlyWeatherInfo(){
    if(location.hash == ''){
        document.getElementById('fields').style.display = 'block';
    }
}



/*Updates dropdown when starting the app from localstorage*/
function updateHistoryFromLocalstorage(){
    var select = document.getElementById('recentSearches');
    var optionHistory = JSON.parse(localStorage['history']);
    for(var i in optionHistory){
        var option = document.createElement('option');
        option.text = optionHistory[i];
        select.add(option);
    }
}

/*Save options in localstorage*/
function saveOptionsInLocalstorage(select){
    var array = [];
    for(var i = 0; i < select.length; i++){
        array.push(select.options[i].text);;
    }
    localStorage['history'] = JSON.stringify(array);
}

function clearTextbox(){
    document.getElementById("cityText").value == '';
}


