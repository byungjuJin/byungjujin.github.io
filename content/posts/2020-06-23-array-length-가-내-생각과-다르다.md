---
template: post
title: array.length 가 내 생각과 다르다
slug: array.length 가 내 생각과 다르다
draft: false
date: 2020-01-30T00:41:00.000Z
description: javascript에서 사용하는 array.length 가 예상과 다르게 동작할 때가 있어 정리해 봅니다
category: javascript
tags:
  - javascript
---
# 내가 만든 array의 length가 왜 안 맞지??

javascript에서 array에 .length를 붙여 길이를 구하고자 할때 예상과 달리 동작할 가 있고\
이로 인해 의도치 않은 동작을 발생시킬 수 있는 위험이 있어 기록해 봅니다.



# [](https://github.com/byungjuJin/byungjujin.github.io/blob/temp/_posts/2020-01-30-array.length%20%EA%B0%80%20%EB%8B%A4%EB%A5%B4%EB%8B%A4.md#length-%EC%9D%98-%ED%95%A8%EC%A0%95)length 의 함정

보통의 경우 .length 를 통해 길이값을 구합니다.

```
const uu = "crying";
console.log(uu.length); // 결과값 6

const alist = ['a', 'b', 'c'];
console.log(alist.length); // 결과값 3
```

string 값이건 array건 상상한데로 나오죠?

그런데 함정이 숨어 있습니다.

```
const blist = [];
blist[1] = 'a';
blist[2] = 'b';
blist[3] = 'c';
console.log(blist.length);
```

결과값이 몇이 나와야 할까요? 3개의 값이 들어갔으니 3 아닌가요?

![expect nothing](/media/expect.jpg "expect nothing")

**4가 나옵니다.**

blist를 뜯어서 다시 살펴보면 \[ , 'a', 'b', 'c'] 와 같습니다.\
blist\[0] 을 정의하지 않았으나 빈값(undefined)으로 남아있고\
\[0], \[1], \[2], \[3] 이니 이 길이값 4를 뽑아주게 됩니다.\
다시 말해 마지막 item 인덱스값 3+1이 나오죠.

그런데 보통은 모르고 지나치기 쉽상입니다. 예를 들어

```
let leng = 0;
blist.forEach(
  i => leng+=1
);
console.log(leng);
```

이와 같이 undefined 를 자동으로 제외시켜주는 forEach를 사용하면 예상처럼 3을 뽑아주거든요.

이 경우 쉽게 상식적으로 생각하는 length를 뽑는 방법은 이와 같습니다.

```
const expect = Object.keys(blist).length;
console.log(expect);
```

또 한가지 재미있는 경우를 볼까요?

```
const c = [];
c.foo = 'fo';
c.bar = 'ba';
```

이때 c.length와 Object.keys(c).length 의 값은 뭘까요?



# 나와 다른 [](https://github.com/byungjuJin/byungjujin.github.io/blob/temp/_posts/2020-01-30-array.length%20%EA%B0%80%20%EB%8B%A4%EB%A5%B4%EB%8B%A4.md#javascript%EC%9D%98-%EC%83%81%EC%8B%9D)javascript의 상식

javascript에는 우리가 기대하지 않는 결과가 가끔 튀어 나오게 됩니다.\
유명한 Date()의 getMonth() 처럼요.

사람마다 상식이나 기대하는 바가 다른 것 처럼 어떤 것은 조금씩 다른 경우가 있으니\
기억해 두었다가 실수 하는 일이 없어야 겠습니다.

"마트가서 우유 2개 사오고 달걀 있으면 6개 사와!!"

적어도 동일하게는 작동은 해 주잖아요~