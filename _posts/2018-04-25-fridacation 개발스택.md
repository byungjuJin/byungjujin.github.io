---
layout: post
title: fridacation 개발스택
date: 2018-04-25 21:30:00 +0900
tags: fridacation
---

## fridacation dev stack
서버 : www.iwinv.co.kr 클라우드 가상 서버  
OS : ubuntu 16.04(64bit)  
web server : nginx  
Frontend : Angular 5.x  
backend : nodeJS 9.x (with Typescript)  
DB : MySql 5.7  
mail : postfix, dovecot  
ssl : Let's Encrypt  
분석 : google analytics  


### 서버 : www.iwinv.co.kr 클라우드 가상 서버  
돈버는 거 없이 쓰는 입장이니 싼거를 찾아야 했습니다.  
유명하기로는 aws가 있겠으나  
한국에는 lightsail도 런칭 안했고 회사에서 써 본 경험으로는
오류가 발생해서 문의 티켓 발행해도 걍 점검 있었다 정도의 안내만 받았었습니다.  
일단 다양한 기능을 쓸 여지는 당분간 없었기 때문에 제외.  
클리앙인가? 커뮤니티에서 www.iwinv.co.kr 언급해서 알게 된 것 같은데  
새벽에 장애가 있어서 문의해도 10분 내로 전화를 주더라고요.  
아주 만족했습니다. 국내 업체라 이런 건 좋은 것 같습니다.  
기존에 스마일서브라는 IDC를 오랫동안 운영해 온 업체에서 하는 거라고도 하고  
믿을만 한 것 같아서 여기로 골랐습니다.  
가상서버 중에 제일 싼게 vCore.v1 이라고 2000원 짜리를 택했는데  
빌드할때 자원이 부족한 거 빼고는 문제가 없어 (사이트에 손님이 없어)  
만족합니다.  
다만 지금은 저 tier는 신규가입에서 사라졌네요.  
다음에 여유가 좀 생기면 공부삼아 aws로 해볼 생각입니다.  

### OS : ubuntu  
centos나 Fedora 등등도 고를 수 있던데  
stackoverflow 등등 해서 예제로 나온 것들이 ubuntu기반이 많길래  
ubuntu로 골라봤습니다.  
딱히 시스템 단을 잘 알지 못하기 때문에  
ubuntu의 장단점에 대해 쓰긴 어렵네요.

### web server : nginx  
![nginx](https://cdn-1.wp.nginx.com/wp-content/themes/nginx-theme/assets/img/logo.svg?s=200)  
회사에서는 Apache만 써 봤는데  
Apache보다 nginx가 더 빠르다고 하고 점유율이라던가 여러가지로 문제될 것이 없기 때문에  
nginx를 택했습니다. 기본적인 config는 구글링으로 쉽게 해결할 수 있고 (오히려 쉬운듯?)  
대새라고 하니 써보는 것이 좋은 것 같았습니다.  

### FrontEnd : Angular  
![Angular](https://angular.io/assets/images/logos/angular/angular.svg?s=200)  
React, Angular, Vue 중 골라야 하는 건데  
이에 대한 의견은 인터넷에 너무 너무 너무 많습니다.  
대중성으로는 React > Angular > Vue 이고  
출시일로는 React < Angular < Vue 이죠  
(보통 늦게 출시한 언어가 약점을 보강했을터이니)  
한가지 언어가 딱 좋다고 말하긴 불가능합니다.  
저는 Angular를 선택했는데, 그 이유는 회사에서 써 봐서.  
집에서 혼자 해야하는데 할일도 잔뜩인데, 언제 또 배우나요? ㅎㅎ  
(회사에서 돈주고 새로운거 시키면 감사하겠습니다만)  
그럼에도 불구하고 Angular는  
Typescript를 통한 IDE의 많은 지원, Cli를 비롯해 온갖것을 탑재해 추가 라이브러리 선택을 많이 생각할 필요가 없음,  
등등 많은 장점이 있습니다. (반대로 그것이 단점이라고 말할 수도 있습니다만)  
단점은 높은 러닝커브 라고 하는데, 지금 vue 등을 배우고 추가 라이브러리를 고르고 하는 것보단  
기존에 어느정도 알고 있는 언어로 진행하는 것이 빠를 것 같아 골랐습니다.  
Angular는 Google에서 만들어서 키워가다보니 개발자들의 반감을 사서 평가절하 되는 것 같습니다.  
다음에는 낮은 러닝커브로 유명한 vue도 써보고 싶네요.  


### BackEnd : Node.js  
![Node.js](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png?s=200)  
많은 한국 회사들이 그렇듯 저도 java를 주로 써왔습니다.  
그런데 가끔은 문법이 왜 이렇게 복잡할까? 하는 의구심이 많이 들었고  
| List<String> list = new ArrayList<String>(); 에서 왜 <Sting>을 두번 쓸까? 했는데  
| 이번 Java10에서는 드디어 var list = new ArrayList<String>();과 같이 똑똑해 졌네요.  
nodeJs가 핫하다고도 하고 살짝은 써 보았기 때문에 선택하였습니다.  
Angular를 쓰며 Typescript가 편하였기 때문에 node에도 typescript를 적용하였습니다.  
(js로 트랜스파일링이 필요없는 ts-node란 것도 있습니다)  
실제로 빠른 개발이 가능한 것 같아 마음에 듭니다.  
아 framework는 역시 예제가 많은 express 입니다.


### DB : MySql 5.7  
![MySql](https://pbs.twimg.com/profile_images/1240079072/logo-mysql-170x170_400x400.png?s=200)  
예전에 유행했던 MEAN (MongoDB, Express, Angular, Node)도 있고  
MongoDB를 쓰는 것이 자연스러울 것 같은데  
MySql로 충분/가능하고 익숙해서 DB는 기존 사용했던 MySql을 택하였습니다.  
익숙하여 별 문제없으니 만족합니다.


### mail : postfix, dovecot
검색하니 발신은 postfix, 수신은 dovecot 을 사용하는 것이 정석 처럼 되어 있어  
별 고민없이 셋팅 하였습니다.


### ssl : Let's Encrypt
![Let's Encrypt](https://letsencrypt.org/images/letsencrypt-logo-horizontal.svg?s=200)  
이것도 검색하니 무료의 정석이어서..  
HTTPS를 적용하지 않으셨다면 쉬우니 얼른 하시길  


### 분석 : google analytics  
이것도 무료로 쓰려면 당연히 고르는 것 아닌가요? ㅎㅎ  


### 앞으로 하고 싶은것  
docker : 개념이 쌈빡해서 써보고 싶은데, 아직 바빠서 이건 시도해 보지 못했습니다.  
추후에 docker + 배포 자동화를 해보려고 합니다.  


### 마무리  
최신 기술들은 셋팅도 점점 쉬워지고, 점점 1인 개발에 도움을 주는 것 같습니다.  
이러다 언젠가는 개발자가 필요없어지는 때가 금방 올 수도 있겠다는  
긴장감도 살짝 들지만, 좋은 것 같네요.  
인터넷에 보면 Python을 해야하나? Vue를 해야하나? 등의 의견은 많이 있는데  
이 사이트는 어떤 stack을 선택했나 하는 내용은 많이 없는 것 같아  
한번 써 보았습니다.  
