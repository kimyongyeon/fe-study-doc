const CounterContext = React.createContext({
  counter: 0,
  handlePlus: () => {},
  handleMinus: () => {},
});

const App = () => {
  const [counter, setCounter] = useState(0);

  function handlePlus(e) {
    setCounter(count + 1);
  }
  function handleMinus(e) {
    setCounter(count - 1);
  }

  return (
    <>
      <CounterContext.Provider value={(counter, handleMinus, handlePlus)}>
        <MainCounter />
      </CounterContext.Provider>
    </>
  );
};

// main counter
const MainCounter = () => {
  return (
    <>
      <CounterContext.Consumer>
        {({ counter, handlePlus, handleMinus }) => (
          <>
            <h1>Main counter</h1>
            <p>Main counter : {counter} </p>
            <button onClick={handlePlus}>+</button>
            <button onClick={handleMinus}>-</button>
            <ChildCounter counter={counter} />
          </>
        )}
      </CounterContext.Consumer>
    </>
  );
};

// 2번째 counter
const ChildCounter = (props) => {
  return (
    <>
      <CounterContext.Consumer>
        {({ counter }) => (
          <>
            <h1>Child counter: {counter}</h1>
            <ChildChildCounter counter={counter} />
          </>
        )}
      </CounterContext.Consumer>
    </>
  );
};

// 3번째 counter
const ChildChildCounter = (props) => {
  return (
    <>
      <CounterContext.Consumer>
        {({ counter }) => (
          <>
            <h1>ChildChild counter : {counter}</h1>
            <ChildChildCounter />
          </>
        )}
      </CounterContext.Consumer>
    </>
  );
};
