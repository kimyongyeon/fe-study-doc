# useEffect 정리

# 재렌더링마다 코드를 실행

```jsx
useEffect(()=>{ 실행할 코드 });
```

# 컴포넌트 mount시 1회만 실행

```jsx
useEffect(()=> { 실행할 코드 }, []);
```

# useEffect 안의 코드 실행전에 항상 실행

```jsx
useEffect(() => {
	return () => {
		실행할 코드 
	}
});
```

# 컴포넌트 unmount시 1회 실행

```jsx
useEffect(() => {
	return () => {
		실행할 코드 
	}
}, []);
```

# state1이 변경될 때만 실행

```jsx
useEffect(() => {
	실행할 코드 
}, [state1]);
```