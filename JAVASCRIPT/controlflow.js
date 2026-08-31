//const score=200
//if(score>100){
  // const power ="fly"
   //console.log(`user power :${power}`);  
//}
//const balance =1000
//if (balance>500) console.log("test");
const userLoggedIn=true
const debitCard=true
if(userLoggedIn&&debitCard){
    console.log("Allow to buy course");
}
//switch
//falsy value: false,0,-0,bigint0n,"" ,null,undefined,NAN
//truthy: "0",'false'," ",[],{}, function(){}
//if(userEmail.length===0){
 //console.log("Array is empty ");
//}
// false==0==>true
//false ==''==>true
//0==''==>true
//Nullish coalescing operator(??):null undefined
let val1;
val1=5??10
val1=null??10
val1=undefined??15
val1=null??10??20
console.log(val1);


