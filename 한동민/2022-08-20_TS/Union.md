# 유니언과 교차 타입

# ****유니언 타입 (Union Types)****

```tsx
function padLeft(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // "Hello world"를 반환합니다.
```

위 코드는 

- padding의 type을 확인하여 number라면 해당 number+1만큼 공백 + value 값을 리턴
- padding의 type을 확인하여 string라면 2개의 string을 합친 후 값을 리턴
- 둘다 아니라면 Error가 남
- 해당 코드의 문제는 padding이 any타입으로 되어있다는 것 즉 TypeScript가 Num 이나 Str 이 아니여도 괜찮다고 판단을 함. (컴파일 단게는 통과 → 런타임 단계 오류)

```jsx
function padLeft(value: string, padding: string | number) {
  // ...
}
```

## 1. ****공통 필드를 갖는 유니언 (Unions with Common Fields)****

```tsx
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// 두 개의 잠재적인 타입 중 하나에서만 사용할 수 있습니다.
pet.swim();
```

- 해당 코드에서 유추가 가능한 것은 Bird | Fish 가 공통된 메서드들을 전부 가지고 있다.
- 실제로는 Bird | Fish 가 다른 메서드를 가지고 있기에 문제가 됨 
( 즉 공통 필드를 가지고 있지 않음)

## 2. ****유니언 구별하기 (Discriminating Unions)****

유니언을 사용하는 데 있어서 일반적인 기술은 리터럴 타입을 갖는 단일 필드를 사용하는 것

```tsx
type NetworkLoadingState = {
  state: "loading";
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;
```

- 현재 state 필드가 NetworkState  안에 모든 타입에 공통으로 존재함으로 존재 여부를 체크하지 않고도 접근이 가능
- 리터럴 타입으로서 state를 갖고 있다면, state
의 값은 대응하는 동일한 문자열과 대조되고 TypeScript는 현재 어떤 타입이 사용되고 있는지 알 수 있음

```tsx
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

function networkStatus(state: NetworkState): string {
  // 현재 TypeScript는 셋 중 어떤 것이
  // state가 될 수 있는 잠재적인 타입인지 알 수 없습니다.

  // 모든 타입에 공유되지 않는 프로퍼티에 접근하려는 시도는
  // 오류를 발생시킵니다.
  state.code;

  // state에 swtich문을 사용하여, TypeScript는 코드 흐름을 분석하면서
  // 유니언 타입을 좁혀나갈 수 있습니다.
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // 여기서 타입은 NetworkFailedState일 것이며,
      // 따라서 `code` 필드에 접근할 수 있습니다.
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}
```

# ****교차 타입 (Intersection Types)****

- 교차 타입은 유니언 타입과 밀접한 관련이 있지만 사용 방법이 매우 다릅니다.
- 교차 타입은 여러 타입을 하나로 결합 합니다.
→ 기존 타입을 합쳐 필요한 기능을 모두 가진 단일 타입을 얻을 수 있습니다.

```tsx
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// 이 인터페이스들은
// 하나의 에러 핸들링과 자체 데이터로 구성됩니다.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
```

보충 자료 : [https://developer-talk.tistory.com/357](https://developer-talk.tistory.com/357)