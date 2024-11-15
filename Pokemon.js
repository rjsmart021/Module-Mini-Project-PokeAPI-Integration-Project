const ISOK = 200;

function getJSONAsync(url) {
    var request = new XMLHttpRequest();

    request.onload = function() {
        if (request.status === ISOK) {
            var data = request.responseText;
            var jsObject = JSON.parse(data);

            var pokeID = document.getElementById('PokeID').value;

            // Update the input fields and image with the retrieved data
            document.getElementById('PokeNumber').value = jsObject.pokemon[pokeID - 1].num;
            document.getElementById('Name').value = jsObject.pokemon[pokeID - 1].name;
            document.getElementById('Height').value = jsObject.pokemon[pokeID - 1].height;
            document.getElementById('Weight').value = jsObject.pokemon[pokeID - 1].weight;
            document.getElementById('picture').src = jsObject.pokemon[pokeID - 1].img;
        }
    };

    request.open("GET", url, true);
    request.send();
}

function getDataAsync() {
    var tempURL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
    getJSONAsync(tempURL);
}

function getPreviousJSONAsync(url) {
    var request = new XMLHttpRequest();

    request.onload = function() {
        if (request.status === ISOK) {
            var data = request.responseText;
            var jsObject = JSON.parse(data);

            var pokeID = document.getElementById('PokeID').value;
            pokeID = parseInt(pokeID);

            if (pokeID >= 1 && pokeID <= 151) {
                pokeID = pokeID - 1;

                // Update the input fields and image with the previous Pokemon's data
                document.getElementById('PokeID').value = jsObject.pokemon[pokeID - 1].id;
                document.getElementById('PokeNumber').value = jsObject.pokemon[pokeID - 1].num;
                document.getElementById('Name').value = jsObject.pokemon[pokeID - 1].name;
                document.getElementById('Height').value = jsObject.pokemon[pokeID - 1].height;
                document.getElementById('Weight').value = jsObject.pokemon[pokeID - 1].weight;
                document.getElementById('picture').src = jsObject.pokemon[pokeID - 1].img;
            }
        }
    };

    request.open("GET", url, true);
    request.send();
}

function previousButton(url) {
    var previousURL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
    getPreviousJSONAsync(previousURL);
}

function getNextJSONAsync(url) {
    var request = new XMLHttpRequest();

    request.onload = function() {
        if (request.status === ISOK) {
            var data = request.responseText;
            var jsObject = JSON.parse(data);

            var pokeID = document.getElementById('PokeID').value;
            pokeID = parseInt(pokeID);

            if (pokeID >= 1 && pokeID <= 151) {
                pokeID = pokeID + 1;

                // Update the input fields and image with the next Pokemon's data
                document.getElementById('PokeID').value = jsObject.pokemon[pokeID - 1].id;
                document.getElementById('Name').value = jsObject.pokemon[pokeID - 1].name;
                document.getElementById('Height').value = jsObject.pokemon[pokeID - 1].height;
                document.getElementById('Weight').value = jsObject.pokemon[pokeID - 1].weight;
                document.getElementById('picture').src = jsObject.pokemon[pokeID - 1].img;
            }
        }
    };

    request.open("GET", url, true);
    request.send();
}

function nextButton(url) {
    var nextURL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
    getNextJSONAsync(nextURL);
}
