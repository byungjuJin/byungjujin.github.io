---
layout: post
title: Javascript 자식창에서 부모창으로 데이터 전달하기
date: 2018-03-23 11:00:00 +0900
category: javascript
tags: javascript, Angular
---

## 요구사항
window.open 명령을 통해 팝업창(자식창)을 띄운 경우 부모창으로 데이터를 전달하고 싶다.
{% highlight ruby %}
var childWindow = window.open("http://havebeard.com");
{% endhighlight %}



## 4가지 방법들


### localStorage를 통해 전달
동일한 도메인에 있는 경우 브라우저의 localStorage(혹은 cookie)에 저장하고  
부모창에서 이 localStorage을 읽어 쓴다.

별 문제 없지만 불필요하게 외부 소싱을 쓰는 것같은 느낌이 든다.



### 부모창에 변수 전달
window.opener가 부모창을 부르기 때문에 아래와 같이 변수의 value를 셋팅해 주는 것이 가능하다.

- 자식창
{% highlight ruby %}
window.opener.document.getElementById("fromInput").value = 'hallow';
{% endhighlight %}

- 부모창
{% highlight ruby %}
<input type="text" id="fromInput">
{% endhighlight %}

단순히 부모창에 노출해 주는 것이면 이것으로 되겠지만  
값을 가져다가 다른 액션을 하고자 하면  
자식창에서 언제 데이터를 전달해주는지 부모창에서 알 수 없기 때문에 복잡해 진다.



### postMessage 사용
postMessage를 사용하면 다른 창으로 메시지를 전달해 줄 수 있다.
단, 부모창에서 addEventListener를 추가하여 message를 대기한다.
- 자식창
{% highlight ruby %}
window.opener.postMessage('hallow', "http://havebeard.com");
/* 두번째 파라메터 "http://havebeard.com"는 해킹방지를 위해. "*"을 쓰면 target체크 안함.  */
{% endhighlight %}

- 부모창
{% highlight ruby %}
window.addEventListener('message', function(event) {
    if(event.srcElement.location.href==window.location.href){
        /* 전달받은 event.data 를 가지고 원하는 추가 액션 수행 */
    }
});
{% endhighlight %}



### function 호출
자식창에서 부모창의 fuction을 호출한다.  
function을 호출하는 것이기 때문에 데이터의 흐름과 로직을 깔끔하게 할 수 있는 것 같다.

- 자식창
{% highlight ruby %}
window.opener.somFunc('hallow');
{% endhighlight %}

- 부모창
{% highlight ruby %}
somFunc(data) {
    alert(data);
}
{% endhighlight %}



 ### Angular를 사용한다면 외부의 호출을 받기위해 아래의 작업을 해 주어야 한다.
자식창에서 부른 window에 선언된 somFunc()이 없기 때문에 선언 및 
외부 호출을 감지하기 위한 NgZone 사용이 필요하다.
typings.d.ts 파일
{% highlight ruby %}
interface Window { somFunc(): any; }
{% endhighlight %}  

부모component 파일
{% highlight ruby %}
constructor(private ngZone: NgZone) {
}  
ngOnInit() {
    window.somFunc = this.somFunc.bind(this);
}  
ngOnDestroy() {
    window.somFunc = null;
}  
somFunc(data) {
    this.ngZone.run(() => this.privateFunc(data));
}
privateFunc(data) {
    alert(data);
}
{% endhighlight %}
