console.log('Ch 01');
{
    /* ...[1,2,3]은 [1,2,3]을 개별 요소로 분리한다.(-> 1, 2, 3) */
    console.log(...[1, 2, 3]);

    /* 문자열은 이터러블이다. */
    console.log(...'Hello');

    /* Map과 Set은 이터러블이다. */
    console.log(...new Map([['a','1'],['b','2']]));
    console.log(...new Set([1, 2, 3]));

    /* 이터러블이 아닌 일반 객체는 스프레드 문법의 대산이 될 수 없다. */
    // console.log(...{ a: 1, b: 2}); // TypeError: Found non-callable @@iterator

    /*  */
}

console.log('');
console.log('Ch 02');
{
    /* 스프레드 문법의 결과는 값이 아니다.  */
    // const list = ...[1, 2, 3]; // SyntaxError: Unexpected token '...'
}

console.log('');
console.log('Ch 03');
{
    const arr = [1, 2, 3];

    /* 배열 arr의 요소 중에서 최대값을 구하기 위해 Math.max를 사용했다. */
    const max = Math.max(arr); // NaN
    console.log(max);
}

console.log('');
console.log('Ch 04');
{
    console.log(Math.max(1));
    console.log(Math.max(1, 2));
    console.log(Math.max(1, 2, 3));
    console.log(Math.max());

    /* Math.max 메서드에 숫자가 아닌 배열을 인수로 전달하면 최대값을 구할 수 없으므로 NaN을 반환 */
    console.log(Math.max([1, 2, 3]));
}

console.log('');
console.log('Ch 05');
{
    var arr = [1,2,3];
    /*  apply 함수의 2번째 인수(배열)는 apply 함수가 호출하는 함수의 인수 목록이다.
        따라서 배열이 펼쳐져서 인수로 전달되는 효과가 있다. */
    var max = Math.max.apply(null,arr);
    console.log(max);

    /*
    * 스프레드 문법을 사용하여 배열 arr을 1, 2, 3으로 펼쳐서 Math.max에 전달한다.
    * Math.max(...[1,2,3])은 Math.max(1, 2, 3)과 같다.
    */
    const max1 = Math.max(...arr);
    console.log(max1);

    /* Rest 파라미터는 인수들의 목록을 배열로 전달 받는다. */
    function foo(...rest){
        console.log(rest);
    }

    /*
    * 스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만든다.
    * [1,2,3] -> 1,2,3
    * */
    foo(...[1, 2, 3]);
}

console.log('');
console.log('Ch 06');
{
    /* ES5 */
    var arr = [1,2].concat([3,4]);
    console.log('ES5 : ' +arr);

    /* ES6 */
    arr = [...[1,2],...[3,4]];
    console.log('ES6 : ' + arr);
}

console.log('');
console.log('Ch 07');
{
    /* ES5 */
    var arr1 = [1, 4];
    var arr2 = [2, 3];

    /*
    * 세 번째 인수 arr2를 해체하여 전달해야 한다.
    * 그렇지 않으면 arr1에 arr2 배열 자체가 추가된다.
    */
    arr1.splice(1,0,arr2)

    /* 기대하는 결과 = [1,2,3,4] */
    console.log(arr1);
}

console.log('');
console.log('Ch 08');
{
    /* ES5 */
    var arr1 = [1, 4];
    var arr2 = [2, 3];

    /*
    * apply 메서드의 2번째 인수(배열)는 apply 메서드가 호출한 splice 메서드의 인수 목록이다.
    * apply 메서드의 2번째 인수 [1, 0].cancat(arr2)는 [1, 0, 2, 3]으로 평가 된다.
    * 따라서 splice메서드에 apply 메서드의 2번째 인수 [1, 0, 2, 3]이 해체되어 전달된다.
    * arr1[1]부터 0개의 요소를 제거하고 그 자리(arr1[1])에 새로운 요소 (2, 3)을 삽입한다.
    */
    Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));
    console.log(arr1);
}

console.log('');
console.log('Ch 09');
{
    /* ES6 */
    var arr1 = [1, 4];
    var arr2 = [2, 3];

    arr1.splice(1,0 , ...arr2);
    console.log(arr1);
}

console.log('');
console.log('Ch 10');
{
    /* ES5 */
    var es5Origin = [1, 2];
    var rs5Copy = es5Origin.slice();

    console.log(rs5Copy);
    console.log(rs5Copy === es5Origin); // false

    /* ES5 */
    var es6Origin = [1, 2];
    var rs6Copy = [...es6Origin];

    console.log(rs6Copy);
    console.log(rs6Copy === es6Origin);

    /* 이때 원본 배열의 각 요소를 얕은 복사하여 새로운 복사본을 생성한다. 이는 slice도 마찬가지이다. */
}

console.log('');
console.log('Ch 11');
{
    /* ES5 */
   function sum(){
       /* 이터러블이면서 유사 배열 객체인 arguments를 배열로 반환 */
       var args = Array.prototype.slice.call(arguments);

       return args.reduce(function (pre, cur){
           return pre + cur;
       }, 0);
   }

    console.log(sum(1,2,3));

   /* 이터러블이 아닌 유사 뱌열 객체 */
    const arrayLike = {
        0: 1,
        1: 2,
        2: 3,
        length: 3
    };

    const arr = Array.prototype.slice.call(arrayLike); // [1,2,3]
    console.log(Array.isArray(arr));

    /* 스프레트 문법을 사용 */
    function es6Sum(){
        /* 이터러블이면서 유사 배열 객체인 arguments를 배열로 변환 */
        return [...arguments].reduce((pre,cur) => pre + cur, 0);
    }

    console.log(es6Sum(1,2,3));

    /* Rest 파라미터 args는 함수에 전달된 인수들의 목록을 배열로 전달받는다. */
    const sum2 = (...args) => args.reduce((pre,cur) => pre + cur, 0);

    console.log(sum2(1,2,3));

    /* 단 이터러블이 아닌 유사 배열 객체는 스프레드 문법 대상이 될 수 없다. */
    const arrayLike1 = {
        0: 1,
        1: 2,
        2: 3,
        length: 3
    };

    // const arr4 = [...arrayLike1]; // TypeError: arrayLike1 is not iterable

    /* 이터러블이 아닌 유사 배열 객체를 배열로 변경하여면 ES6에서 도입된 Array.form 메서드를 사용한다. */
    Array.from(arrayLike1); // -> [1,2,3]
    console.log(Array.from(arrayLike1));

}

console.log('');
console.log('Ch 12');
{
    /* 스프레드 프로퍼티 */
    /* 객체 복사(얕은 복사) */
    const obj = { x:1 , y:2}
    const copy = { ...obj };
    console.log(copy); // { x:1 , y:2}
    console.log(obj === copy); // false

    /* 객체 병합 */
    const merged = { x:1 , y:2, ...{ a: 3, b: 4} };
    console.log(merged);

    /* 객체 병합, 프로퍼티가 중복되는 경우 뒤에 위치한 프로퍼티가 우선권을 갖는다. */
    const merged1 = Object.assign({},{ x:1 , y:2}, { y: 10, z: 3} );
    console.log(merged1);

    /* 특정 프로퍼티 변경 */
    const changed = Object.assign({},{ x:1 , y:2}, { y: 100} );
    console.log(merged1);

    /* 특정 프로퍼티 변경 */
    const added = Object.assign({},{ x:1 , y:2}, { z: 0} );
    console.log(added);
}