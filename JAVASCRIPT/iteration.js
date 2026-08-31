for (let index = 0; index < 10; index++) {
    const element = index;
    console.log(element);
}
//break and continue 
for (let index = 1; index <=20; index++) {
    const element = index;
    if(index==5){
      console.log('Detected 5');
      break;
  
    }
    console.log(element);
}
let index=0;
while (index<=10) {
    console.log(`value of index is${index}`);
    index=index+2 
}