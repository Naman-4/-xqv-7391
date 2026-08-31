function calculateCartPrice(...num1){//...works as rest and working as to store element in array.
    return num1
}
//console.log(calculateCartPrice(200,400,500));
const  user={
  username:"naman",
  price :199
}
function handleObject(anyobject){
    console.log(`username is ${anyobject.username}and price is${
        anyobject.price}`);
}
handleObject(user)