async function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    let search
    if (event.target.search) {search = event.target.search.value.toLowerCase()}
    else {
    search = event.target.value.toLowerCase()}; 
    console.log(search);

    const pokeData = await fetchPokemonData(search);
    displayPokemon(pokeData);

}

async function fetchPokemonData(pokemonName){
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    return await response.json()
}

function displayPokemon(pokemonData) {
    const id = Math.floor(Math.random() * 1000);

    // Clear previous search result
    const display = document.getElementById("pokemon-display");
    display.innerHTML = '';

    const html = `
   <div class="card custom-card-background border rounded shadow text-white p-4 mx-auto">
        <div class="d-md-flex">
                 <div class="border rounded center-image">
                <img src="${pokemonData.sprites.other["official-artwork"].front_default}" class="img-fluid" alt="${pokemonData.name}">
            </div>
            <div class="p-4">
                <h5 class="card-title">${pokemonData.name}</h5>
                <div class="p-4">
                    <p class="card-text">Height: ${pokemonData.height} dm</p>
                </div>
                <div class="p-4">
                    <p class="card-text">Weight: ${pokemonData.weight / 10} kg</p>
                </div>
                <div class="p-4">
                    <p class="card-text">Type(s): ${pokemonData.types.map(typeObj => typeObj.type.name).join(', ')}</p>
                </div>
                <div class="p-4">
                    <p class="card-text">Abilities: ${pokemonData.abilities.map(abilityObj => abilityObj.ability.name).join(', ')}</p>
                </div>
                <div class="p-4">
                    <p class="card-text">Moves: ${pokemonData.moves.slice(0, 10).map(moveObj => moveObj.move.name).join(', ')}</p>
                </div>
                <button onclick='addPokemon("${pokemonData.name}")' class="btn btn-outline-info">Add Team Member</button>
            </div>
        </div>
    </div>
    `;

    const card = document.createElement('div');
    card.setAttribute('id', id);
    card.innerHTML = html;

    display.appendChild(card);
}



class PokemonTeam {
    constructor() {
        this.team = [];
    }

    addTeamMember(pokemon) {
        if (this.team.length < 4) {
            this.team.push(pokemon);
            alert(`${pokemon.name} has been added to your team.`);
        } else {
            alert("Your team is full. You can't add more Pokémon.");
        }
    }

    removeTeamMember(pokemonID) {
        this.team = this.team.filter(pokemon => pokemon.id !== pokemonID);
        alert(`${pokemonID} has been removed from your team.`);
    }

    getTeamMember(pokemonName) {
        return this.team.find(pokemon => pokemon.name === pokemonName);
    }

    displayTeam() {
        alert("Your Pokémon Team:");
        this.team.forEach(pokemon => {
            alert(`- ${pokemon.name}`);
        });
    }
}

const myPokemonTeam = new PokemonTeam();

async function handleSubmit(event) {
    event.preventDefault();
    let search;
    if (event.target.search) {
        search = event.target.search.value.toLowerCase();
    } else {
        search = event.target.value.toLowerCase();
    }
    console.log(search);

    const pokeData = await fetchPokemonData(search);
    displayPokemon(pokeData);
}

async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return await response.json();
}


async function addPokemon(pokemonName) {
    const pokeData = await fetchPokemonData(pokemonName);
    const id = Math.floor(Math.random() * 1000);
    const pokemonData = {
        id,
        sprites: pokeData.sprites,
        name: pokeData.name,
        height: pokeData.height,
        weight: pokeData.weight,
        abilities: pokeData.abilities,
        types: pokeData.types,
        moves: pokeData.moves,
    };
    myPokemonTeam.addTeamMember(pokemonData);
    displayTeam();
}

async function removePokemon(pokemonID) {
    myPokemonTeam.removeTeamMember(pokemonID);
    displayTeam();
    console.log(removePokemon)
}

function displayTeam() {
    const teamDisplay = document.getElementById("team-display");
    teamDisplay.innerHTML = ''; // Clear previous display

        // Check if there are team members and add the title dynamically
        if (myPokemonTeam.team.length > 0) {
            const teamTitle = document.createElement('h2');
            teamTitle.classList.add('mt-4', 'team-title'); // Add class
            teamTitle.setAttribute('id', 'team-title'); // Add ID
            teamTitle.textContent = "My Pokémon Team:";
            teamDisplay.appendChild(teamTitle);
        }

    myPokemonTeam.team.forEach(pokemon => {
        const html = `
     <div class="card custom-card-background border rounded shadow text-white p-4 mx-auto" id="${pokemon.id}">
            <div class="d-md-flex">
                 <div class="border rounded center-image">
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="img-fluid" alt="${pokemon.name}">
                </div>
                <div class="p-4">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <div class="p-4">
                        <p class="card-text">Height: ${pokemon.height} dm</p>
                    </div>
                    <div class="p-4">
                        <p class="card-text">Weight: ${pokemon.weight / 10} kg</p>
                    </div>
                    <div class="p-4">
                        <p class="card-text">Type(s): ${pokemon.types.map(typeObj => typeObj.type.name).join(', ')}</p>
                    </div>
                    <div class="p-4">
                        <p class="card-text">Abilities: ${pokemon.abilities.map(abilityObj => abilityObj.ability.name).join(', ')}</p>
                    </div>
                    <div class="p-4">
                        <p class="card-text">Moves: ${pokemon.moves.slice(0, 10).map(moveObj => moveObj.move.name).join(', ')}</p>
                    </div>
                    <button onclick='removePokemon(${pokemon.id})' class="btn btn-outline-danger">Remove</button>
                </div>
            </div>
        </div>
        `;
        const card = document.createElement('div');
        card.innerHTML = html;
        teamDisplay.appendChild(card);
    });
}
