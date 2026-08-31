const myNumbers=[1,2,3,4,5,6,7,8,9,10]
const newNums=myNumbers.map((num)=>num+10)
console.log(newNums);
//chaining 
const myNums=[1,2,3];
const myTotal=myNums.reduce(function(acc,currval){
 return acc+currval   
},0)
console.log(myTotal);
const myTotal=myNums.reduce((acc,curr)=>acc+curr,0)
console.log(myTotal);
// Difference between map(), filter(), and reduce()
//Method	Returns	Purpose
//map()	New array	Change every element
//filter()	New array	Keep only matching elements
//reduce()	Single value	Combine all elements