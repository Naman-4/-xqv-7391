//for of
const arr=[1,2,3,4,5]
for (const num of arr) {
    console.log(num);   
}
//Maps
const map=new Map()
map.set('IN',"India")
map.set('USA',"United States of America")
map.set('Fr',"France")
console.log(map);
//order matter krta hai aur no duplicate value in the map.
for (key  of map) {
 console.log(key);//aisa krne pr array ke jaise ho jata hai  
}
for ([key ,value] of map) {
 console.log(key,':-',value);  
}
