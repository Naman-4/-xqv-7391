const myArr=[0,1,2,3,4,5]
console.log(myArr[2]);
const myArr2= new Array (1,2,3,4,5)  
console.log(myArr[2]);
// Array method
myArr.push(6)
console.log(myArr);
myArr.unshift(9)
console.log(myArr);
console.log(myArr.includes(9));
console.log(myArr.indexOf(3));
console.log(myArr);
//slice,spice
console.log("A",myArr);
const myn1=myArr.slice(1,3)
console.log(myn1);
console.log("B",myArr);
//slice me last bala print nhi hota hai
//splice me original bala array manipulate hota hai 


