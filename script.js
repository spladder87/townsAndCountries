let navBar = document.getElementById('navbarCollapse');

var visitedTowns = [];

function readJson(url) {
    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        navBar.innerHTML += navBar.innerHTML = `<ul class="nav navbar-nav">
                                                                <li class="nav-item dropdown">
                                                                <a id="${data[i].id}" onClick="getTowns(this.id)" class="nav-link dropdown-toggle" data-toggle="dropdown">${data[i].countryname}</a>
                                                                <div id="div${data[i].id}" div class="dropdown-menu"></div>
                                                                </li>
                                                                </ul>`;
                    }
                    let navUl = document.getElementById('visitedNavlink');
                    navUl.innerHTML += `<ul class="nav navbar-nav">
                                        <li class="nav-item">
                                        <a id="visitedPlaces" onClick="visitedTownView()" class="nav-link">Besökta städer</a>
                                        </li>
                                        </ul>`;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}


function getTowns(id) {
    let towns = document.getElementById("div" + id);

    fetch("json/stad.json").then(function (response) {
        return response.json();
    }).then(function (json) {
        // do a bunch of stuff
        towns.innerHTML = "";
        for (let i = 0; i < json.length; i++) {
            if (json[i].countryid == id) {
                towns.innerHTML += towns.innerHTML = `<a id="${json[i].id}" onClick="setView(this.id)" class="dropdown-item">${json[i].stadname}</a>`;
            }
        }
    })

}

function setView(viewID) {
    let townView = document.getElementById("townView");
    fetch("json/stad.json").then(function (response) {
        return response.json();
    }).then(function (json) {
        // do a bunch of stuff
        townView.innerHTML = "";
        for (let i = 0; i < json.length; i++) {
            if (json[i].id == viewID) {
                townView.innerHTML += townView.innerHTML = `<button type="button" class="btn btn-success" onClick="setVisitedTown(${json[i].id})">Besökt</button>
                                                            <h2>${json[i].stadname}</h2>
                                                            <p>Population = ${json[i].population}</p>`;
            }
        }
    })
}

function setVisitedTown(townID) {
    visitedTowns.push(JSON.stringify(townID));
    localStorage.setItem('townVisited', JSON.stringify(visitedTowns));
}

function visitedTownView() {
    var townView = document.getElementById('townView');
    var peopleTotal = 0;
    var storedString = localStorage.getItem('townVisited');
    visitedTowns = JSON.parse(storedString);
    visitedTowns = [...new Set(visitedTowns)];

    fetch("json/stad.json").then(function (response) {
        return response.json();
    }).then(function (json) {
        // do a bunch of stuff
        townView.innerHTML = `<h2>Besökta Städer</h2>
                              <p id="peopleTotal"></p>
                              <ul id="visitedTownUl"></ul>
                              <button type="button" class="btn btn-success" onClick="localStorage.clear(),visitedTownView()">Rensa localstorage</button>`;
        var visitedLi = document.getElementById('visitedTownUl');
        
        for (let i = 0; i < json.length; i++) {
            for (let x = 0; x < visitedTowns.length; x++) {
                if (json[i].id == visitedTowns[x]) {
                    console.log(json[i].population);
                    peopleTotal += json[i].population;
                    visitedLi.innerHTML += visitedLi.innerHTML = `<li>${json[i].stadname}</li>`;
                }
            }

        }
        document.getElementById('peopleTotal').innerHTML = `Antal människor du träffat = ${peopleTotal}`;
    })
}

readJson("json/land.json");

