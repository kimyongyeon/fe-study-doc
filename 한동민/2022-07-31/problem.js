var list = [];
let item = {};

var user = [
    {
        firstName: '김',
        middleName: '하',
        lastName: '나'
    },
    {
        firstName: '한',
        middleName: '두',
        lastName: '리'
    },
    {
        firstName: '박',
        middleName: '삼',
        lastName: '이'
    },
    {
        firstName: '오',
        middleName: '나',
        lastName: '라'
    }];

console.log('============ UserList ============');
console.log(user)

console.log('============ For ============');

// 새로운 배열 리스트에 중간 이름만 '소'로 바꾸어 저장하는 로직
for(let i = 0; i < user.length; i++){
    item.firstName = user[i].firstName;
    item.middleName = '소';

    item.lastName = user[i].lastName;
    console.log(item);
    list.push(item);
}

// 현재 list에 데이터는 어떻게 저장이 되어있을까? & 로직 설명
console.log('============ resultList ============');
console.log(list);
