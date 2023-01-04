function greet() {
  //콜백지옥을 벗어날 수 있는 promise 방법
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 3000); //3초 뒤에 실행
  });
}

//차례대로 실행됨
greet()
  .then((res) => {
    console.log(res);
    return res.length; //console.log가 없으면 return 생략 가능함
  })
  .then((res) => console.log(res));

console.log("end");
