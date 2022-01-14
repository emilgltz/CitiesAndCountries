'use strict';

let obj = 
{
    Country: [],
    City: [],
    VisitedCities: [],
    Citizens: 0
}

console.log(obj.VisitedCities);


fetch('./land.json')
.then(resp => resp.json())
.then(data => land(data))

function land(data){
    for (let index = 0; index < data.length; index++) {
         const element = data[index];
         obj.Country.unshift(element);
    }
    menu();
}

fetch('./stad.json')
.then(resp => resp.json())
.then(data => stad(data))

function stad(data){
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        obj.City.push(element);
    }
}

function menu() {

    let Towns = [];
    let CountryName = "";
    let CountryID = "";

    for (let index = 0; index < obj.Country.length; index++) {
        const land = obj.Country[index];
        CountryID = land.id;
        CountryName = land.countryname;
        document.getElementById('CountryMenu').innerHTML += `<li ><button id="`+CountryID+`">`+CountryName+`</button></li>`;    
    }
     
    document.getElementById('VisitedCitiesMenu').innerHTML += `<li><button id="visited">Besökta Städer</button></li>`;

   
    document.getElementById('footer').innerHTML = "";
    document.getElementById('MenuContent').innerHTML = `<h2>Välj ett valfritt land i menyn ovanför.<br />Tryck på besökt-knappen för att lägga till i "besökta städer".<br /> Du kan radera besökta städer genom att klicka på "rensa" </h2>`;

    let visaStäder = document.getElementById('visited');
    visaStäder.addEventListener('click', function() {
        
        document.getElementById('CityDetalis').innerHTML = "";
        document.getElementById('footer').innerHTML = "";

        
        document.getElementById('MenuContent').innerHTML =`<div id="VisitedCities"><ul></ul></div>`;
        document.getElementById('VisitedCities').insertAdjacentHTML('beforebegin', `<h2>Du har besökt följande städer</h2>`)
       
         
        for (let index = 0; index < obj.VisitedCities.length; index++) {
            const element = obj.VisitedCities[index];
            
            
            let ThisCity = obj.City.find(a => a.id == element);

            
            obj.Citizens += ThisCity.population;
            
            
            document.getElementById('VisitedCities').innerHTML += `<li>`+ThisCity.stadname+`</li>`; 
        }
        
        console.log(obj.Citizens);

       
        document.getElementById('VisitedCities').insertAdjacentHTML('afterend', `<h2>Du har stött på<br /> `+obj.Citizens+`<br />människor på dina besök!</h2>`);
        
       
        obj.Citizens = 0;

        
        document.getElementById('footer').innerHTML = `<li ><button id="rensa">Rensa</button></li>`;
        let DeleteCity = document.getElementById('rensa');
        DeleteCity.addEventListener('click', function() {

            
            localStorage.clear();
            obj.VisitedCities = [];

            
            document.getElementById('MenuContent').innerHTML = "";
            document.getElementById('footer').innerHTML = "";

            
            document.getElementById('MenuContent').innerHTML = `<h2>Dina besökta städer är nu rensade!</h2>`
        });
    });
    
    let CountryMenu = document.getElementById('CountryMenu');
    CountryMenu.addEventListener('click', function(event) {
        
        
        document.getElementById('MenuContent').innerHTML = "";
        document.getElementById('CityDetalis').innerHTML ="";
        document.getElementById('footer').innerHTML = "";

        
        CountryID = event.target.id;

        
        let ThisCountry = obj.Country.find(a => a.id == CountryID);
        CountryName = ThisCountry.countryname;  
                
        
        Towns = obj.City.filter(a => a.countryid == CountryID); 
                
        
        for (let index = 0; index < Towns.length; index++) {
            const stad = Towns[index];
            let CityID = stad.id;
            let CityName = stad.stadname;
            
            
            document.getElementById('MenuContent').innerHTML += `<li><button id="`+CityID+`">`+CityName+`</button></li>`; 
        }

        
        let CityMenu = document.getElementById('MenuContent');
        CityMenu.addEventListener('click', function(event) {
                
            
            let CityID = event.target.id;
         
            const stad = Towns.find(a => a.id == CityID);
            let cityname = stad.stadname;
            let Citizens = stad.population; 

            document.getElementById('CityDetalis').innerHTML = `<div id="stad"><p>`+cityname+` är en stad i `+CountryName+` här bor `+Citizens+` Invånare.</p></div><div class="flex-container"><button id="spara">Besökt</button></div>`;

            const save = document.getElementById('spara');
            save.addEventListener('click', function() {
                
                obj.VisitedCities.push(CityID);
                
                localStorage.setItem("id", JSON.stringify(obj.VisitedCities));

               
                
            });
        });
    });
}