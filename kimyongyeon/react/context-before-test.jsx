// main counter
const MainCounter = () => {
  const [counter, setCounter] = useState(0);

  function handlePlus(e) {
    setCounter(count + 1);
  }
  function handleMinus(e) {
    setCounter(count - 1);
  }

  return (
    <>
      <h1>Main counter</h1>
      <p>Main counter : {counter} </p>
      <button onClick={handlePlus}>+</button>
      <button onClick={handleMinus}>-</button>
      <ChildCounter counter={counter} />
    </>
  );
};

// 2번째 counter
const ChildCounter = (props) => {
  return (
    <>
      <h1>Child counter: {props.counter}</h1>
      <ChildChildCounter counter={props.counter} />
    </>
  );
};

// 3번째 counter
const ChildChildCounter = (props) => {
  return (
    <>
      <h1>ChildChild counter : {props.counter}</h1>
      <ChildChildCounter />
    </>
  );
};
