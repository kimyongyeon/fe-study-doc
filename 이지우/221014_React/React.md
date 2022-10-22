# JSX란?

`const element = <h1>Hello, world!</h1>;`

JSX(JavaScript eXtension)으로 작성된 코드들은 빌드될 때 Babel이 JavaScript 코드로 변환시켜준다. JSX는 아래와 같이 React 엘리먼트를 생성한다.

```javascript
// 변환 전
const element = <h1>Hello, world!</h1>;

// 변환 후
const element = React.createElement("h1", null, "Hello, world!");
```

JSX는 HTML보다는 JavaScript에 가깝기 때문에, HTML 어트리뷰트 이름 대신 카멜케이스 명명 규칙을 사용한다. 예를들면 HTML에서는 class라 썼지만 class는 JSX에선 JavaScript 예약어라 사용할 수 없고, className이라고 해줘야한다.

🤔 그럼 `React.createElement` 함수는 뭐를 반환할까? <br>
💡 객체를 생성한다. 즉, JSX는 HTML을 만드는게 아니고 JavaScript 객체를 생성한다. React는 이 JavaScript 객체를 읽어서 DOM을 구성하고 최신 상태로 유지한다.

```javascript
// 변환 전
const element = <h1 className="greeting">Hello, world!</h1>;

// 변환 후
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);

// React.createElement는 아래같은 객체를 생성한다
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: "Hello, world!",
  },
};
```

# Element

> 엘리먼트는 React 앱의 가장 작은 단위이다.

_컴포넌트와 혼동할 수 있는데, 엘리먼트는 컴포넌트의 구성요소이다._

# Components와 Props

> 개념적으로 컴포넌트는 JavaScript 함수와 유사하다<br>
> “props”라는 속성을 나타내는 데이터 값을 입력 받아, React 엘리먼트를 반환하는 함수이다.

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <Welcome name="Sara" />;
root.render(element);
```

1. `<Welcome name="Sara" />` 엘리먼트로 root.render()를 호출한다.
2. React는 `{name: 'Sara'}`를 props로 하여 Welcome 컴포넌트를 호출한다.
   - 컴포넌트는 `props`라는 속성을 나타내는 데이터 값을 입력 받아, **React 엘리먼트를 반환하는 함수이다.**
3. Welcome 컴포넌트는 `<h1>Hello, Sara</h1>` 엘리먼트를 반환한다.
4. React DOM은 `<h1>Hello, Sara</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트한다.

모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다.

## 순수함수란?

함수가 인풋만을 사용하여 아웃풋을 계산하고 반환하는 함수

```javascript
// Not pure
const name = "Mike";
function greet() {
  console.log(`Hi, I'm ${name}`);
}

// Pure
function greet(name) {
  return `Hi, I'm ${name}`;
}
```

즉, 반드시 리액트 엘리먼트를 `return` 해야하고 인풋인 props만을 사용해서 `return` 한다.

## Props를 넘기는 방법들

```javascript
function App() {
  return <Counter a={1} b={2} c={3} d={4} initialValue={0} />;
}
```

이런식으로 넘기던 것을

```javascript
function App() {
  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    initialValue: 0,
  };
  return <Counter {...counterProps} />;
}
```

이렇게 구조분해 할당해서 넘길 수 있다.

```javascript
function Counter(props) {
  const [count, setCount] = useState(props.initialValue);
  return <>{/* 중략 */}</>;
}
```

받을 때도 위와 같이 쓰던 것을

```javascript
function Counter({ initialValue }) {
  const [count, setCount] = useState(initialValue);
  return <>{/* 중략 */}</>;
}
```

이렇게 쓸 수 있다.

Props로는 무엇이든 넘길 수 있는데 심지어 Component도 넘길 수 있다!

```javascript
function Container({ children }) {
  return (
    <div style={{ margin: 20, padding: 20, border: "1px solid black" }}>
      {children}
    </div>
  );
}

export default Container;
```

이렇게 컴포넌트를 감쌀 상위 컴포넌트를 하나 만들어서 `children` 을 넘겨받아 배치한다.

```javascript
function App() {
  return (
    <Container>
      <Counter />
    </Container>
  );
}
```

이런식으로 넘겨주면 된다. 즉, 자식으로 전달된 컴포넌트가 `children` 이라는 props로 전달되게 된다.

# Props vs State

> 특정 시점에 변화하는 값은 prop가 아닌 state가 되어야 한다

props(properties)는 부모 컴포넌트로부터 수신되는 값이고 수신 받은 컴포넌트안에서는 불변하는 값이다.

즉, 부모가 변경해서 넘겨줄 수는 있지만, 수신받은 컴포넌트가 스스로 바꾸지는 못하는 값이다. 예를 들면 어떤 사용자 이벤트에 의해서 바뀔 수 있는 값이 아니다.
(_props는 컴포넌트에 데이터를 보내기위한 통로에 지나지 않는다_ 라고 이해하면 조금 쉽다.)

반면 state는 컴포넌트가 mount될 때 초기값으로 셋팅된 후로 시간이 지나며 바뀌는 값이다. (대부분 사용자 이벤트에 의해 변경된다.)

1. 부모로부터 props를 통해 전달되나요? -> **그러면 state가 아닙니다.**
2. 시간이 지나도 변화가 없나요? -> **그러면 state가 아닙니다.**
3. 컴포넌트 안의 다른 state나 props 를 가지고 계산이 가능한가요? -> **그러면 state가 아닙니다.**

# State

`const [count, setCount] = useState(0);`

`useState(0)` 는 초기값이 0인 state와, state를 set 할 수 있는 함수를 배열로 반환한다. 이것을 구조분해 할당을 통해서 변수로 받는다.

state는 반드시 setter를 통해서 setting 해야하는데, state가 변하면 컴포넌트는 다시 랜더링된다. (즉, 함수가 다시 호출되는데, 실제로 콘솔을 찍어서 확인해볼 수 있다.)

## 어떤 컴포넌트가 State를 가져야 할까?

1. state를 기반으로 렌더링하는 모든 컴포넌트를 찾는다.
2. 계층 구조 내 state가 있어야 하는 모든 컴포넌트들의 상위에 존재하는 하나의 공통 컴포넌트를 찾는다.
3. 이 공통 컴포넌트가 state를 가져야한다.

🤔 적절한 컴포넌트를 찾지 못했다면? <br>
💡 상위에 state를 소유하는 컴포넌트를 하나 만들어준다.
