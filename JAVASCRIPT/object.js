//singleton object constructor se banta hai
//object literals
const mySym=Symbol("key1")
const JsUser={
    name:"Naman",
    [mySym]:"mykey1",
    age:18,
    location:"Bihar",
    email:"naman@google.com",
    isLoggedIn:false,
    lastLoginDays:["Monday","saturday"]
};
console.log(JsUser.name);
console.log(JsUser["name"]);
console.log(JsUser[mySym]);
JsUser.email="naman@chatgpt.com"
//Object.freeze(JsUser)
JsUser.email="naman@microsoft.com"
console.log(JsUser);
JsUser.greeting=function(){
   console.log("Hello JsUser");   
}
console.log(JsUser.greeting);//function ka refrence back hua hai
console.log(JsUser.greeting());




