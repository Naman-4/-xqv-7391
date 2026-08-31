//hosting method function declaration se pahle fn access nhi kr sakte hai
//hosting method const abc=function one(){}
const user ={
    username:"naman",
    price:999,
    welcomeMessage:function(){
//console.log(`${this.username} , welcome to website`);
//console.log(this);
    }
}
//user.welcomeMessage()
//user.username="Jaya"
//user.welcomeMessage()
//console.log(this);
function chai(){
    let username="naman"
 //console.log(this.username);
}
chai()
//Arrow Function:
const tea=()=>{
 let username="naman"
 console.log(this);  
}
//tea()
const addTwo=(num1,num2)=> num1+num2
//console.log(addTwo(3,4));
const addThree=() => ({username:"naman"})
console.log(addThree());

