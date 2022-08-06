// Binding this

const person = {
    name: "Mosh",
    walk() {
       console.log(this); 
    }
}

person.walk(); // { name: 'Mosh', walk: [Function: walk] }

const walk = person.walk;
walk(); // undifined

// 객체 외부의 독립형 함수로 함수를 호출할 때
// 기본적으로 전역 개체에 대한 참조를 반환한다 -- window
// 이창개체이고 엄격모드?면 -- undifined 반환

// undifined 반환 문제를 해결하려면
// javascript에서 모든 함수는 객체이므로
// .bind 메서드를 사용하여 함수를 객체에 바인딩 할수있다.
// person.walk.bind(thisArg:any...);
// person.walk.bind(this의 객체를 전달하면 this값이 결정);

// walk메서드에 새 인스턴스(person객체)를 반환하고
// this에 person객체를 가리키도록 설정
const walk2 = person.walk2.bind(person);
walk2(); 
// walk2() 호출시 person 객체를 반환
// webAPI -> this 다름

