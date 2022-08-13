// TypeScript 기본 타입

// 1. 원시 타입 (Primitive value)
// 자바스크립트에 있는 원시 타입과 흡사하다.
// 변수명 옆에 타입명을 기재해 주면 된다. 

const 문자바구니:string = 'string'
const 숫자바구니:number = 123
const 논리바구니:bool = true

const 빅인트바구니:bitint = 100n

// 타입 추론이 되게끔 기입한 예제

const 문자바구니 = 'string'
const 숫자바구니 = 123
const 논리바구니 = true

// 2. 객체 타입(Object value)
// 아래와 같이 코드를 작성하게 되면 obj: object 부분이 any와 다를 바가 없는 상황이 된다.
// 조금 더 정확하게 어떤 타입인지 명확하게 얘기할 필요가 있다.
// console.log(str)을 실행 시 어디에 위치한 str 인지 찾지 못하는 에러가 발생한다.

const obj: object = {
	str: 'str',
    num: '123,
	child: {
		str: 'str',
		num: 123
	}
}

// 객체의 싱글 리터럴 방법으로 직접 넣어서 표현한다.
// console.log(obj2.str) 자세하게 묘사하니 출력이 곧바로 되는 것을 알 수 있다.

const obj2: {
	str: 'str',
  num: '123,
	child: {
		str: 'str',
		num: 123
	} = {
		str: 'str',
	  num: '123,
		child: {
			str: 'str',
			num: 123
	}
}

// 3. 함수  타입(Function Type)
// 매개변수 ()를 받는 곳과 반환 return 하는 타입이 꼭 필요하다.

function joyfull(num: number, str: string){
    return num + str
}

joyfull('str', 123)

// number자리에 str이 들어가서 에러 표시가 출력 된다. 반대로 바꿔도 마찬가지다.

function joyfull(num: number, str: string){
    return num + str
}

joyfull(123, 'str')
// number 자리에 number, string자리에 str을 넣으니 에러가 사라지고 정상 작동 한다.

// 4. 배열 타입 (Array Type)
// 배열 타입을 type annotoation 하는 방법 두 가지

// 배열명 : string[], 
// 배열명 : Array<string>
// 두 가지 모두 똑같은 의미이고 표기법만 다르다.

const 문자열배열: string[] = ['str', 'str2', 'str3']
const 문자열배열2: Array<string> = ['str', 'str2', 'str3']
const 숫자배열: Array<number> = [1, 2, 3]
const 논리배열: boolean[] = [false, true, false, true]

// 5. 리터럴 타입(Literal Type)
// 특정 타입이 가질 수 있는 하나의 값을 뜻한다.

let letString = 'Hello' // output : string
const constString = 'Hello' // output : "Hello"

// 위와 같이 코드를 작성하면 let으로 선언한 것은 string이 출력되고 
// const로 선언한 것은 선언한 값 그대로 보이는 차이점이 있었다.
// let은 변수를 넣는 곳으로, 언제든 변할 수 있는 값이라 그렇다. 
// 즉, 재할당이 가능하다는 뜻이다.
// 반대로 const는 변하지 않는 상수가 있기 때문에 값이 그대로 보인다.

// 5. 튜플 타입(Tuple Type)
// 길이가 고정되어 있다.
// 인덱스 타입이 고정되어 있다. 각 요소 하나하나에 타입을 지정할 수 있다.
// 다양한 타입으로 이루어진 배열을 안전하게 관리해준다.
// 배열 타입의 길이를 조절해 준다.

// 개발을 하다 보면 다양한 타입을 배열에 넣게 되는데, 
// 이를 안전하게 사용하기 위한 것이 바로 튜플타입 이다.
// 읽기 전용으로 따로 관리할 수도 있다.

// 5-1. 인덱스타입을 고정하여 배열을 만든 모양
const 문자열배열: string[] = ['a', 'b', 'c']

// 5-2. 인덱스타입 두 가지를 고정하여 만든 모양
const 튜플: [number, string] = [1, 'a']

// 5-3. 인덱스타입, 숫자형 길이는 고정, 
// 문자열은 얼마든지 들어올 수 있는 길이로 고정
const 튜플2: [number, ...string[]] = [0, 'a', 'b'] 
undefined & null
