# react slot

# 합성 vs 상속

React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것이 좋다. 

## 상속?(Inheritance)

상속은 상위 클래스에 중복 로직을 구현해 두고 이를 물려받아 코드를 재사용하는 방법이다. is-a관계

**요리사클래스와 사람클래스가 있을때,** 

**요리사는 사람이므로… 이러한 관계를 Is-a 관계라고 한다.** 

```java
public class Person {

    public void walk() {
        System.out.println("걷는다");
    }

    public void talk() {
        System.out.println("말한다");
    }
}

public class Chef extends Person {
    
}

Person person = new Chef();

person.walk();
person.talk();
```

## 합성?(Composition)

합성은 중복되는 로직을 갖는 객체를 구현하고, 이 객체를 주입받아 중복 로직을 호출함으로써 퍼블릭 인터페이스를 재사용하는 방법이다. has-a관계 

**요리사가 음식의 가격을 계산해야 하는 상황이라고 하자.**

**요리사는 자신이 만든 음식들을 가지고 있으므로 이러한 관계를 Has-a 관계라고 한다.** 

```java
public class Chef {

    private List<Food> foodList;
    
    public Chef(List<Food> foodList) {
        this.foodList = foodList;
    }

    public int calculatePrice() {
        return foodList.stream()
            .mapToInt(v -> v.getPrice())
            .sum();
	}
}
```

합성을 이용하면 객체의 내부는 공개되지 않고 인터페이스를 통해 코드를 재사용하기 때문에 구현에 대한 의존성을 인터페이스에 대한 의존성으로 변경하여 결합도를 낮출 수 있기 때문이다. 

## 상속의 단점 및 한계점

- 캡슐화가 깨지고 결합도가 높아짐
- 유연성 및 확장성이 떨어짐
- 다중 상속에  의한 문제가 발생할 수 있음
- 클래스 폭팔 문제가 발생할 수 있음

### 캡슐화가 깨지고 결합도가 높아짐

```java
@RequiredArgsConstructor
public abstract class Food {

    private final int price;

    public int calculatePrice() {
        return price;
    }
}

public class Steak extends Food {

    public Steak(final int price) {
        super(price);
    }
}

public class Steak extends Food {

    public Steak(final int price) {
        super(price);
    }

    protected int discountAmount() {
        return 10000;
    }
}

// SteakWithSaladSet 세트 메뉴는 할인 금액을 위해 구체 클래스인 Steak 클래스에 의존하고 있다.
public class SteakWithSaladSet extends Steak {

    public SteakWithSaladSet(final int price) {
        super(price);
    }

    @Override
    public int calculatePrice() {
        // 원래 금액 - 스테이크를 주문한 경우 할인받을 금액
        return super.calculatePrice() - super.discountAmount();
    }
}
```

- 애플리케이션이 실행되는 시점이 아닌 컴파일 시점에 SteakWithSaladSet가 Steak라는 구체 클래스(구현)에 의존하는 것을 컴파일 타임 의존성이라고 부른다.
- 다형성을 사용할 수 없다. ⇒ 객체지향적이지 못하다.
- 해당 메소드의 이름이 변경되면 자식 클래스의 메소드도 변경해주어야 한다.
- 부모 클래스의 내부 구조를 알고 있어야 한다. 왜냐하면 부모 클래스를 기반으로 자식 클래스의 코드를 구현 해야 하기 때문이다.
- 자식 클래스에서 super를 이용해 부모 클래스의 메소드를 호출하는 상황이라면 **부모 클래스의 구현은 자식 클래스에게 노출되어 캡슐화가 약해지고, 자식 클래스와 부모 클래스는 강하게 결합** 된다. ⇒ 부모 클래스를 변경할 때 자식 클래스도 함께 변경될 가능성이 높아진다.

### 유연성 및 확장성이 떨어짐

부모 클래스와 자식 클래스가 강하게 결합되므로 유연성과 확장성이 상당히 떨어진다.

클래스에 음식의 개수를 나타내는 count 변수와 getFoodCount메소드를 추가해 보자. 

```java
@RequiredArgsConstructor
public abstract class Food {

    private final int price;
    private final int count;

    public int calculatePrice() {
        return price;
    }

    public int getFoodCount() {
        return count;
    }
}
```

문제는 이러한 변경사항이 자식 클래스까지 전파된다는 것이다. 우리는 당장 Steak클래스와 SteakWithSaladSet 클래스의 생성자에 count파라미터를 받도록 추가해줘야 한다. 

```java
public class Steak extends Food {

    public Steak(final int price, final int count) {
        super(price, count);
    }

    protected int discountAmount() {
        return 10000;
    }
}

public class SteakWithSaladSet extends Steak {

    public SteakWithSaladSet(final int price, final int count) {
        super(price, count);
    }

    @Override
    public int calculatePrice() {
        // 원래 금액 - 스테이크가 포함된 세트메뉴인 경우 할인받을 금액
        return super.calculatePrice() - super.discountAmount();
    }
}
```

자식 클래스 뿐만 아니라 자식 클래스가 선언되어 객체를 생성하는 부분들 역시 모두 수정해줘야 한다.

```java
// count 파라미터 없이 생성된 객체를 모두 수정해야 함
// Food food = new SteakWithSaladSet(15000);
Food food = new SteakWithSaladSet(15000, 2);
```

이렇듯 상속으로 구현하면 변경에 대한 범위가 상당히 커지므로 유연성과 확장성이 떨어지는 것을 확인할 수 있다. 위의 예제에서는 다행히 추가되는 부모 클래스의 메소드를 이용하면 되었지만 만약 자식 클래스와 메소드의 구현이 달라져야 하는 상황이라면 변경의 포인트가 자식 클래스들 만큼 추가되는 것이다. 

### 다중상속에 의한 문제가 발생할 수 있음

자바에서는 다중 상속을 허용하지 않는다. 그렇기 때문에 상속이 필요한 해당 클래스가 다른 클래스를 이미 상속중이라면 문제가 발생할 수 있다. 다중 상속과 관련된 문제를 피하기 위해서라도 상속의 사용을 지양해야 한다. 

### 클래스 폭발 문제가 발생할 수 있음

상속을 남용하게 되면 필요 이상으로 많은 수의 클래스를 추가해야 하는 클래스 폭발 문제가 발생할 수 있다. 

만약 새로운 요구사항이 생겨 Steak와 Salad 그리고 Pasta로 구성된 세트 메뉴를 추가해야 하는 상황이라고 하자. 그러면 우리는 이를 해결하기 위해 다음과 같은 SteakWithSaladSetAndPasta 클래스를 또 추구해야 할 것이다. 

```java
public class SteakWithSaladSetAndPasta extends SteakWithSaladSet {
     ...
}
```

그리고 새로운 메뉴가 또 개발된다면 계속해서 해당 클래스를 추가해야 할 것이고 지나치게 많은 클래스가 생겨야 하는 클래스 폭발 문제가 발생할 수 있다. 

클래스 폭발 문제는 **자식 클래스가 부모 클래스의 구현과 강하게 결합되도록 강요하는 상속의 근본적인 한계 때문에 발생**한다. 컴파일 타임에 결정된 자식 클래스와 부모 클래스 사이의 관계는 변경될 수 없기 때문에 **자식 클래스와 부모 클래스의 다양한 조합이 필요한 상황에서 유일한 해결 방법은 조합의 수 만큼 새로운 클래스를 추가하는 것** 뿐이다. 

클래스 폭발 문제는 새로운 기능을 추가할 때뿐만 아니라 기능을 수정할 때에도 동일하게 발생한다. 

따라서 여러 기능을 조합해야 하는 설계에 상속을 이용하면 모든 조합 가능한 경우 별로 클래스를 추가해야 한다. 그러므로 이러한 문제를 방지하기 위해서라도 상속보다는 합성을 이용해야 한다. 

## 합성을 사용하기

합성을 이용하면 구현을 효과적으로 캡슐화 할 수 있다. 

**의존하는 객체를 교체하는 것이 비교적 쉬우므로 설계가 유연**해 진다. ⇒ **상속은 클래스를 통해 강하게 결합되지만 합성은 메세지를 통해 느슨하게 결합되기 때문**이다. 

```java
@RequiredArgsConstructor
public abstract class Food {

    private final int price;
    private final Food next;

    public int calculatePrice() {
        return next == null
            ? price
            : price + next.calculatePrice();
    }
}

public class Steak extends Food {

    public Steak(final int price, final Food next) {
        super(price, next);
    }

    @Override
    public int calculatePrice() {
        return next == null
            ? price
            : price - 10000 + next.calculatePrice();
    }
}

public class Salad extends Food {

    public Salad(final int price, final Food next) {
        super(price, next);
    }
}

Food setMenu = new Steak(20000, new Salad(15000));
int price = setMenu.calculatePrice();

public abstract class Food {

    ... 
    
    public int getFoodCount() {
        return next == null
            ? 1
            : 1 + next.getFoodCount();
    }
}

```

합성 구조에서 달라진 점은 가격을 계산하기 위해 더이상 클래스의 구현(Steak클래스의 discountAmount)에 의존하지 않는다. 우리는 해당 기능을 구현하기 위해서 구체 클래스에 어떠한 구현이 있는지 살펴볼 필요 없이 그저 calcuatePrice()를 호출하면 된다. 

이제 새로운 요구사항이 생겨, 세트 메뉴가 갖는 음식의 개수를 세어야 하는 상황이라고 하자. 우리는 이번에도 다음 음식인 **Food 클래스의 next객체가 존재하는지 메세지를 보내어 파악을** 해야 한다. 이를 해결하기 위해 추상화된 클래스에 Food에 getFoodCount()를 이용해 내부를 구현하고, 다음 Food가 존재할 경우 동일하게 getFoodCount()를 호출하여 메소드를 재사용하도록 구현할 수 있다. 

합성에 의존하는 개발은 추가적인 세트 메뉴를 개발한다고 하여도 새로운 클래스를 추가할 필요가 없다.

이렇듯 컴파일 시점에 코드 레벨에서 어느 클래스의 코드에 의존하는지 알 수 있었던 컴파일 의존성과 달리 현재 Food 객체에서 또 다른 Food 객체인 next에 의존하면서 컴파일 타임에 어떠한 구체 클래스에 의존하지 않고 추상화에 의존하는 것이 런타임 의존성이다. 

컴파일 의존성에 속박되지 않고 다양한 방식의 런타임 의존성을 구성하여 추상화에 의존할 수 있다는 것은 합성의 가장 커다란 장점이다. 

물론 컴파일 타임 의존성과 런타임 의존성과 거리가 멀수록 설계의 복잡도가 상승하여 코드를 이해하기 어려워지지만, 유지보수를 위해서는 반드시 필요하다. 

## 학습목표

React를 처음 접한 개발자들이 종종 상속으로 인해 부딪히는 몇 가지 문제들과 합성을 통해 이러한 문제를 해결하는 방법을 살펴보자.

## 컴포넌트에서 다른 컴포넌트를 담기

이러한 컴포넌트에서는 특수한 children prop을 사용하여 자식 엘리먼트를 출력에 그대로 전달하는 것이 좋다.

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

흔하진 않지만 종종 컴포넌트에 여러 개의 구멍 이 필요할 수도 있다. 이런 경우에는 children 대신 자신만의 고유한 방식을 적용할 수도 있다.

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

<Contacts /> <Chat /> 같은 React 엘리먼트는 단지 객체이기 때문에 다른 데이터처럼 prop으로 전달할 수 있다. 이러한 접근은 다른 라이브러리의 슬롯(slots)과 비슷해보이지만 React에서 prop으로 전달할 수 있는 것에는 제한이 없다.