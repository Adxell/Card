

const getNumberRandom=(min, max)=>{
    return Math.floor(Math.random()*(max-min))+min;
}


document.addEventListener('DOMContentLoaded', ()=>{
    const number = getNumberRandom(1, 151);
    fetchData(number);
})
const fetchData=async(id)=>{
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data= await res.json();
        console.log(data)
        const pokemon = {
          img: data.sprites.other.dream_world.front_default,
          name: data.name,
          hp: data.stats[0].base_stat,
          exp: data.base_experience,
          attack: data.stats[1].base_stat,
          special: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
        };
        drawCard(pokemon);
    }catch(e){
        console.log(e)
    }
}


const drawCard =(pokemon)=>{
    const flex = document.querySelector('.flex')
    const template = document.querySelector("#template-card").content;
    const clone=template.cloneNode(true)
    const fragment=document.createDocumentFragment()
    clone.querySelector(".card-body-img").setAttribute('src', pokemon.img);
    clone.querySelector(".card-body-title").innerHTML = `${pokemon.name}
                    <span>${pokemon.hp} hp</span>`;
    clone.querySelector(".card-body-text").textContent=pokemon.exp + ' Exp';
    clone.querySelectorAll(".card-footer-social h3")[0].textContent=pokemon.attack;
    clone.querySelectorAll(".card-footer-social h3")[1].textContent=pokemon.special;
    clone.querySelectorAll(".card-footer-social h3")[2].textContent=pokemon.speed;
    fragment.appendChild(clone);

    flex.appendChild(fragment)
}