let navBar = document.getElementById('navbarCollapse');

function readJson(url) {
    // http://localhost:8080
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
                    parseMenu(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}



function parseMenu(jsonObj) {
    console.log(jsonObj);
    for (let i = 0; i < jsonObj.length; i++) {
        console.log(i);
        navBar.innerHTML += navBar.innerHTML = `<ul class="nav navbar-nav">
                  <li class="nav-item dropdown">
                  <a href="#${jsonObj[i].countryname}" id="${jsonObj[i].id}" onClick="getTowns(this.id)" class="nav-link dropdown-toggle" data-toggle="dropdown">${jsonObj[i].countryname}</a><div id="div${jsonObj[i].id}" div class="dropdown-menu" onClick="alert(this.id)"></div></li></ul>`;
                //   console.log(i);
                //   let stad = document.getElementByClassName("dropdown-menu");
                //   stad.innerHTML += stad.innerHTML = `<a href="#" class="dropdown-item">Inbox</a>`;
                //   console.log(i);
                //   fetch("json/stad.json").then(function(response) {
                //     return response.json();
                //   }).then(function(json) {
                //     // do a bunch of stuff
                //   }
    }
}

//parseMenu();

function getTowns (id){
    console.log(id);
    let towns = document.getElementById("div"+id);
    console.log(towns);
    towns.innerHTML = "hej";
    //get
    //id.append = '<div class="dropdown-menu">Hej</div>';
//<div class="dropdown-menu"></div>
}
readJson("json/land.json");








{/* <ul class="nav navbar-nav">
<li class="nav-item dropdown">
    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Messages</a>
    <div class="dropdown-menu">
        <a href="#" class="dropdown-item">Inbox</a>
        <a href="#" class="dropdown-item">Drafts</a>
        <a href="#" class="dropdown-item">Sent Items</a>
        <div class="dropdown-divider"></div>
        <a href="#"class="dropdown-item">Trash</a>
    </div>
</li>
</ul>

<ul class="nav navbar-nav ml-auto">
<li class="nav-item">
    <a href="#" class="nav-link">Visited places</a>
</li>
</ul>
 */}
