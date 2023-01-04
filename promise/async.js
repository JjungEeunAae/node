function greet() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 3000); //3초 뒤에 실행
  });
}

//차례대로 실행됨
//async 안에서만 await 실행이 가능함
//비동기 안에서는 동기로 바꿀 수 있음
async function callgreet() {
  var result = await greet();
  console.log(result);
  console.log(result.length);
}

callgreet(); //non-블록킹(비동기)
console.log("end");
