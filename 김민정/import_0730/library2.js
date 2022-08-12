// export function hello() {
//     console.log('hello');
// }

// export function talk() {
//     console.log('안녕');
// }

function hello() {
    console.log('hello');
}

function talk() {
    console.log('안녕');
}

export {hello, talk} // {say:say, talk:talk}

// export {hello, talk as tok2} // {say:say, talk:talk}

// 실제 연산 내용 함수들 라이브러리 내보내기