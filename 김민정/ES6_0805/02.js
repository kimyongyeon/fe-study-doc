/**
const -- 재할당 안됨 읽기 전용

*/

const person = {
    name: "Mosh",
    walk: function() {},
    talk() {}
}

person.talk();     // 객체명.메소드명 호출
// person['name'] = 'john'; // [문자열] = 값 할당
person['name'] = '';
// [] 어떤 속성이나 메서드인지 미리 모를 때 대괄호 표기법

const targetMember = 'name'; // targetMember 입력필드
person[targetMember.value] = 'john';

