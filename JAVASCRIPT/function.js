//function sayMyname(){//function definition
 //console.log("N");
 //console.log("A");
 //console.log("M");
 //console.log("A");
 //console.log("N");  
//}
//sayMyname()//function calling /execution
//sayMyname//function refrence
//function addTwoNumbers(number1,number2){
  // console.log(number1+number2); 
//}
//addTwoNumbers(3,4)
function addTwoNumbers(number1,number2){
 let result=number1+number2
 return result   
}
const result1=addTwoNumbers(3,5)
//console.log("Result",result1);
function loginUser(username){
  return `${username}just loggrd in`  
}
console.log(loginUser("naman"));
if(username===undefined){
console.log("please enter a username");  
}