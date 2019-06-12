---
layout: post
title: Angular Universal 적용
date: 2019-06-13 11:00:00 +0900
category: 서버
tags: javascript, Angular, ssr
---

## 요구사항
구글은 돈이 많기 때문에 SPA로 놔둬도 javascript를 돌려서 검색해 가는데,
한국에서 제일 중요한 naver는 그렇지 못하기 때문에 SSR(Server Side Rendering)이 필요했습니다.

혹시나 SPA와 SSR를 모를 분들을 위해 간단히 설명해 보자면
SPA는 사이트에 접속하는 순간 HTML, JS, CSS 덩어리 를 브라우저에 한번에 던져주고
유저가 페이지를 이동하거나 할 때 새로 로딩없이 이미 가지고 있는 덩어리(HTML, JS, CSS)에서 javascript를 이용해 교체해 주는 방식이지요.

문제가 뭐냐면, 검색엔진이 어떤 페이지로 접근하더라도 index.html만을 바라보게 되어 
홈페이지 전체가 1페이지 로 이루어졌다고 판단하는 것이죠. (이것이 바로 Single Page Application이라고 부르는 이유)  
SSR은 SPA와 달리 특정 페이지로 접근하면 기존 PHP나 JSP와 같은 방법으로 server단에서 그 페이지를 rendering(= 데이터가 담긴 html 작성)
하는 것을 의미하는데
SPA의 SSR은 Rendering된 HTML을 브라우저로 던져주는 동시에 기존 SPA와 같은 덩어리도 던져줘서 
그 다음에 액션은 리로딩 없이 SPA의 장점을 취할 수 있게 해주는 전략 입니다.


## Angular Universal
Angular 가 좋은 점은 필요한 기능을 거의 자체적으로 지원해 준다는 점 같습니다.
그래서 SSR 역시 자체 제공하는 Angular Universal을 적용하면 됩니다.

적용하는 자세한 법은 아래의 링크 등을 참조하면 되는데  
[https://angular.io/guide/universal](https://angular.io/guide/universal)  
[https://github.com/Angular-RU/angular-universal-starter](https://github.com/Angular-RU/angular-universal-starter)  
기본적으로 node.js를 기반으로 설명하고 있으니 node를 쓰고 있다면 좀 더 편할 것 같네요.

이런 서비스를 통해 잘 적용이 되었나 확인하면 됩니다.  
[https://technicalseo.com/tools/fetch-render](https://technicalseo.com/tools/fetch-render)  
처음에 셋팅을 잘못해서 한참 검색에 안올랐거든요.

짜잔 이렇게 네이버 검색에도 나오네요!!  
![네이버검색 예제]({{site.baseurl}}/assets/img/naver_seo.png)


## 하지만 네이버는
블로그 검색이 제일 상단에 나온다는 사실...  
블로그 마케팅을 하세요~~
