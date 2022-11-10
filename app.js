const root = document.getElementById('root');
const mujer = document.getElementById('mujer');
const hombre = document.getElementById('hombre');
const todosGenero = document.getElementById('todos-genero');
const alien = document.getElementById('alien');
const humano = document.getElementById('humano');
const todosEspecie = document.getElementById('todos-especie');
const loader = document.getElementById('contenedor-espera');

const paginaActual = document.querySelector('#pagina-actual');
const totalPaginas = document.querySelector('#total-paginas');
const firstPage = document.querySelector('#first-page');
const nextPage = document.querySelector('#next-page');
const previusPage = document.querySelector('#previus-page');
const lastPage = document.querySelector('#last-page');

let pagina = 1;
let total = 0;

const getData = async() => {
    loader.classList.remove('esconder')
    root.classList.add('esconder')
    const url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;
    const resp = await fetch(url)
    const json = await resp.json()
    printData(json.results)
    total = json.info.pages
    paginaActual.innerHTML = pagina
    totalPaginas.innerHTML = total
    data = json
    updatePagination();
    setTimeout(() => {
        loader.classList.add('esconder')
        root.classList.remove('esconder')
    },1000)
    return json
}

let data = [];

const printData  = json => {
    const arr = json;
    let card = '';
    arr.forEach(personaje => {
        const {name, gender, species, status, origin, location, image} = personaje;
        card +=  `<div class="col s12 m6 l3">
                    <div class="card">
                        <div class="card-image">
                            <img src="${image}">
                            <span class="card-title black-text">${name}</span>
                        </div>
                        <div class="card-content">
                            <p>Name: ${name}</p>
                            <p>Genero: ${gender}</p>
                            <p>Origin: ${origin.name}</p>
                            <p>Species: ${species}</p>
                            <p>Status: ${status}</p>
                            <p>Location: ${location.name}</p>
                        </div>
                        <div class="card-action">
                            <a href="#">Ver más...</a>
                        </div>
                    </div>
                </div>`
    });
    root.innerHTML= card;
}

mujer.addEventListener('click', (e) => {
    const female = data.results.filter(personaje => personaje.gender === 'Female');
    printData(female)
})
hombre.addEventListener('click', (e) => {
    const male  = data.results.filter(personaje => personaje.gender === 'Male');
    printData(male)
})

todosGenero.addEventListener('click', (e) => {
    const todos  = data.results
    printData(todos)
})

alien.addEventListener('click', (e) => {
    const alien = data.results.filter(personaje => personaje.species === 'Alien');
    printData(alien)
})

humano.addEventListener('click', (e) => {
    const humano  = data.results.filter(personaje => personaje.species === 'Human');
    printData(humano)
})

todosEspecie.addEventListener('click', (e) => {
    const todos  = data.results
    printData(todos)
})


const pagination =  async (promesa) => {
    const result = await promesa
    nextPage.addEventListener('click', () => {
        pagina += 1;
        getData()
    })
    previusPage.addEventListener('click', () => {
        pagina -= 1;
        getData()
    })
    firstPage.addEventListener('click', () => {
        if (pagina >= 2){
            pagina = 1
            getData()
        }
    })
    lastPage.addEventListener('click', () => {
        if (pagina <= result.info.pages){
            pagina = result.info.pages
            getData()
        }
    })
}

const updatePagination = () =>{
    if(pagina <= 1){
        previusPage.disabled = true;
        firstPage.disabled = true;
    }else {
        previusPage.disabled = false;
        firstPage.disabled = false;
    }
    if(pagina == total){
        nextPage.disabled = true;
        lastPage.disabled = true;
    }else {
        nextPage.disabled = false;
        lastPage.disabled = false;
    }
}




































$( document ).ready(function(){
    $(".dropdown-trigger").dropdown();
    pagination(getData());
  })