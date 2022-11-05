# Next.js

React + Express.js + React-Router-Dom + Server Side Rendering
Express.js + React-Router-Dom을 그대로 사용한다는 것이 아니라 이것들이 제공하는 기능성들을 내제화하고 있다.

# 라우팅

| URL                    | Next.js Folder      |
| ---------------------- | ------------------- |
| http://a.com/          | /pages/index.js     |
| http://a.com/sub/      | /pages/sub/index.js |
| http://a.com/sub/about | /pages/sub/about.js |
| http://a.com/sub/1     | /pages/sub/[id].js  |
| http://a.com/sub/2     | /pages/sub/[id].js  |

## 동적 URL

요청이 `/sub/1` 로 들어왔는데 `/pages/sub/1/index.js` 나 `/pages/sub/1.js` 가 없고 `/pages/sub/[id].js`가 있다면 이 파일이 동적 URL을 서비스해주게 된다.

그럼 해당 파라미터를 어떻게 애플리케이션으로 끌고 들어올까?
그때는 useRouter 훅을 사용해서 router를 받아서 뽑아낼 수 있다.

```javascript
import { useRouter } from "next/router";
export default function About() {
  const router = useRouter();
  const id = router.query.id;
  return (
    <>
      <div>Parameter id : {id}</div>
    </>
  );
}
```

🤔 잠깐, 왜 a 태그의 href 를 사용않고 Link 컴포넌트를 사용하는 것일까?<br>
💡 Link 태그는 브라우저의 주소만 바꿀 뿐 페이지 자체를 새로고침 하지는 않는다. 반면, a 태그는 브라우저의 주소를 이동해서 페이지 자체를 새로고침한다. 페이지를 새로고침 하면 현재 렌더링 되어있는 컴포넌트가 모두 날라가고 새로 컴포넌트를 렌더링하게 되는데, 이러면 state들이 모두 날라가게 된다.

# API Route

Next.js의 중요한 특징 중 하나는 Client Side 기술과 Server Side 기술을 모두 가지고 있는 올인원 솔루션 이라는 것이다. 여기서 Server Side 기술을 API Route라 한다.

기본적으로 생성이 된 `api` 폴더의 `hello.js` 를 들어가보면

```javascript
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
```

express.js 같이 작성되어있다.

- [react-router의 Link와 a 태그](https://firsteast.tistory.com/136)
