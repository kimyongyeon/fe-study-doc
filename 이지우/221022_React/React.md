# 리액트 생명주기 메서드

모든 컴포넌트는 여러 종류의 생명주기 메서드를 가지고, 우리는 컴포넌트를 만들 때 이것을 오버라이딩해서 특정 시점에 특정 코드가 실행되도록 설정할 수 있다.

## 마운트

컴포넌트의 인스턴스가 생성되어서 DOM에 삽입될 때, 즉 컴포넌트가 마운트될 때 아래 함수가 순서대로 호출이 된다.

1. **constructor()**
2. static getDerivedStateFromProps()
3. **render()**
4. **componentDidMount()**

## 업데이트

props 또는 state가 변경되면 갱신이 발생하는데, 아래 메서드들은 컴포넌트가 다시 렌더링될 때 순서대로 호출이 된다.

1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. **render()**
4. getSnapshotBeforeUpdate()
5. **componentDidUpdate()**

## 마운트 해제

아래 메서드는 컴포넌트가 DOM 상에서 제거될 때 호출된다.

1. **componentWillUnmount()**

# 생명주기 메서드가 Hook에 어떻게 대응할까?

- render : 함수 컴포넌트 본체 자체이다.
- constructor : 함수 컴포넌트는 constructor 가 필요하지 않다. useState 호출로서 state를 초기화할 수 있다.
- componentDidMount, componentDidUpdate, componentWillUnmount : userEffect는 이 세 개의 생명주기 메서드를 표현할 수 있다.

> useEffect Hook을 componentDidMount와 componentDidUpdate, componentWillUnmount가 합쳐진 것으로 생각해도 좋다!

```javascript
useEffect(() => {
  // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
  return () => {}; // componentWillUnmount 역할
}, [imgCoord]);
// 빈 배열이면 componentDidMount와 동일
// 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행
```

**useEffect에서 componentDidMount는 하기 싫을 때 패턴**을 알기위해서는 먼저 useRef Hook에 대해 알아야 한다.

## useRef

### ref(reference)란?

DOM 요소에 접근해서 여러가지 작업을 할 때 우리는 HTML에 id를 붙인다.
이렇게 HTML에 id를 붙이는 것 처럼, 리액트에서도 DOM에 접근하기 위해 ref를 사용한다.

즉, ref는 우리가 작성한 컴포넌트의 부분을 선택할 수 있는 일종의 `document.getElementByID()` 같은 방법이다. (React에서 state만으로 해결이 불가능한, DOM 을 직접 건드려야 하는 작업을 할 때 사용한다.)

### useRef Hook으로 ref를 달기

함수형 컴포넌트에선 useRef를 사용해서 ref를 달 수 있다.

useRef Hook은 DOM ref만을 위한것이 아니다. ref 객체는 마치 클래스의 인스턴스 변수처럼 사용할 수 있다.

🤔 state와 무엇이 다른가? state도 인스턴스 변수같이 쓰는 것 아닌지?<br>
💡 state는 변경되면 랜더링이 다시 일어난다. 그럴 필요가 (랜더링이 일어날 필요가) 없는 값인 경우에 ref를 사용하면 된다.

## useEffect에서 componentDidMount는 하기 싫을 때 패턴

```javascript
const mounted = useRef(false);
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    // 실행될 내용
  }
}, ["바뀌는 값"]); // componentDidUpdate만, componentDidMount는 안 함
```
