const person = {
    name: "Mosh",
    walk() {
       console.log(this); 
       // 현재 개체에 대한 참조 반환 Function: walk
    }
}

person.walk(); // { name: 'Mosh', walk: [Function: walk] }

const walk = person.walk;
console.log(walk); // [Function: walk]
// walk() { console.log(this); }

walk(); // undefined
// 함수를 독립실행형 개체로 호출하거나 개체 외부에서 호출하면
// 브라우져에서 창 객체인 전역 개체를 반환 windows
// 엄격모드에 익숙하지 않은경우 기본적으로 코드를 보다 보호적으로 실행하는 모드로 잠재적인 문제 방지
// 특정 구현에서는 창 객체에 대한 참조를 얻는 대신 --> undefined




