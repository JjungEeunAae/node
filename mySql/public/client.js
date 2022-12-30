/** @format */

//전체조회
const url = "/customers";
//전체조회 함수
selectAll();
//등록버튼에 이벤트를 지정하는 함수
insert();
//삭제버튼에 이벤트를 지정하는 함수
customerDelete();
//수정버튼에 이벤트를 지정하는 함수
customerPut();

//!전체조회
function selectAll() {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      //list 클리어
      list.innerHTML = "";
      for (let i = 0; i < res.length; i++) {
        const tr = `
            <tr data-id="${res[i].id}">
            <td><input type="checkbox" /></td>
            <td>${res[i].id}</td>
            <td>${res[i].name}</td>
            <td>${res[i].email}</td>
            <td>${res[i].phone}</td>
            <td>${res[i].address}</td>
            <td>
              <button id="delbtn">삭제</button>
              <button id="btnsel">조회</button>
            </td>
          </tr>`;
        list.innerHTML += tr;
      }
    });
}

//!등록
function insert() {
  //추가 버튼을 클릭하면
  addbtn.addEventListener("click", () => {
    let data = {
      name: username.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      //제이슨 구조의 스트링으로 보내준다
      body: JSON.stringify(data),
    })
      //모든 통신은 스트링
      //스트링을 제이슨으로 받아서 정보를 전달
      .then((res) => res.json())
      .then((res) => {
        selectAll();
      });
    clear();
  });
}

//!수정
function customerPut() {
  updAdd.addEventListener("click", () => {
    let data = {
      // id: userid.value, -> router를 통해 id 값을 읽기 때문에 필요없음
      name: username.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
    };
    console.log(data);
    fetch(`${url}/${userid.value}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.results == true) {
          alert("수정완료");
          selectAll();
        } else {
          alert("수정실패");
        }
        //selectAll();
      })
      .catch(() => {
        alert("수정실패입니다");
      });
    clear();
  });
}

//!삭제
function customerDelete() {
  //삭제버튼 이벤트
  list.addEventListener("click", (ev) => {
    //단건조회
    if (ev.target.id == "btnsel") {
      let id = ev.target.closest("tr").getAttribute("data-id");
      //기본이 get이라서 안적어도 됨
      fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then((res) => {
          userid.value = res.id;
          username.value = res.name;
          email.value = res.email;
          phone.value = res.phone;
          address.value = res.address;
        }); //customers/id
    } else if (ev.target.id == "delbtn") {
      //삭제
      let id = ev.target.closest("tr").getAttribute("data-id");
      fetch(`${url}/${id}`, { method: "delete" }).then(() => selectAll());
    }
  });
}

//!입력 후 클리어
function clear() {
  username.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
}
