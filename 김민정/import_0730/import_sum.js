import {a,b,sum} from "./export_sum";
console.log(sum(a,b));

import speak from './library.js';
speak();

// import {hello, talk} from './library2.js';

import {hello, talk as tok} from './library2.js';

function talk() {
    console.log('this page talk');
}

hello();
talk();
tok();

// import {hello, talk as tok2} from './library2.js';
// tok2();

// 필요한 함수들만 가져오기

