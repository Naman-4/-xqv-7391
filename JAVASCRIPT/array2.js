const marvel_heros=["thor","Ironman","spiderman"]
const dc_heros=["superman","flash","batman"]
marvel_heros.push(dc_heros)
console.log(marvel_heros);
console.log(marvel_heros[3][1]);
console.log(marvel_heros);
//concat
const allHero=[...marvel_heros,...dc_heros]
console.log(allHero);
//flat()
Array.isArray("Naman")
Array.from("Naman")
console.log(Array.isArray("Naman"));
console.log(Array.from("Naman"));
console.log(Array.from({name:"Naman"}));//interesting 


  

