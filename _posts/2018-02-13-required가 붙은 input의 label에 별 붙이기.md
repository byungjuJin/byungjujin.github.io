---
layout: post
title: required가 붙은 input의 label에 별 붙이기
date: 2018-02-25 21:00:00 +0900
tags: css
---

## 요구사항
html에서 form을 작성할 때 아래와 같은 양식을 흔히 쓰게 된다.
{% highlight ruby %}
<form>
  <div>
    <label>Name</label>
    <input type="text" name="name" required>
  </div>
</form>
{% endhighlight %}
이때 input 박스의 required 여부에 따라 자동으로 Label인 Name옆에 \*을 붙이면 좋을 것 같다.
일부 CSS 프레임워크에는 지원되고 있는 사항이지만
순수 css로만 이루어진 [bulma](https://bulma.io/)를 쓰면서 아쉬운 점이었다.

## css는 parent selector가 없다?
얼핏 생각하면 required input가 존재하는 엘레멘트의 상위 엘레멘트의 하위 label ㅡㅡ 의 끝에
붉은 색 \*을 붙여주면 될 것 같은데
css에는 parent selector 가 없기 때문에 이같은 것은 불가능 하다.

따라서 귀찮지만 아래의 3가지 방법 중 하나를 택해야 한다.
이후의 예제들에서는 공통적으로 :after 선택자를 사용하여 * 추가를 자동으로 해보겠다.

## 몇가지 선택들
1. HTML에 개별적으로 추가
input 항목이 한두개라면 다행이지만 여러개 라면 귀찮아 진다.

* HTML
{% highlight ruby %}
<div>
    <label>Name<span color="red">*</span></label></label>
    <input type="text"/>
</div>
{% endhighlight %}

2. label에 클래스 추가
직접 label에 클래스 혹은 태그를 붙여준다.
required는 input에만 쓰고 싶은데, label에도 붙여야 하는 추가 수고가 든다.

* HTML
{% highlight ruby %}
<div>
    <label required>Name:</label>
    <input type="text"/>
</div>
{% endhighlight %}

* CSS
{% highlight ruby %}
label[required]:after {content: "*"; color: red}
{% endhighlight %}

3. 상위 태그에 class를 이용해 그룹으로 묶어준다.
이 역시 class를 추가하여 그룹을 묶어야 하는 수고가 들고, 어찌보면 1번보다도 억지 스럽다.

* HTML
{% highlight ruby %}
<div class="required-group">
    <label>Name:</label>
    <input type="text"/>
</div>
{% endhighlight %}

* CSS
{% highlight ruby %}
.required-group label:after {content: "*"; color: red}
{% endhighlight %}

4. id와 for를 이용한 다른 접근법
아이디어는 좋은데, 더더욱 귀찮다.
* HTML
{% highlight ruby %}
<div class="pair">
    <input id="name" type="text" required/>
    <label for="name">Name:</label>
</div>
{% endhighlight %}

* CSS
{% highlight ruby %}
div.pair { width: 240px; }
div.pair input {
    float: right;
}
input[required] + label:after {content: "*"; color: red}
{% endhighlight %}

5. js를 사용한다.
처음 원했던 html의 모양을 유지할 수 있다.
하지만 js를 얻었다.

* HTML
{% highlight ruby %}
<div>
  <label>Name:</label>
  <input type="text" name="name" required>
</div>
{% endhighlight %}

* CSS
{% highlight ruby %}
.req-asterisk:after {content: "*"; color: red}
{% endhighlight %}

* JS
{% highlight ruby %}
var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    if(inputs[i].required){
    inputs[i].parentNode.children[0].className += " req-asterisk";
  }    
}
{% endhighlight %}

## 결론
input이 매우 많지 않으면 1번과 같이 수작업으로 넣는 것이 좋겠다...?

## 추가로 Angular Way
required태그를 Angular의 디렉티브 선택지로 활용하여 처리하는 귀여운 방법
https://stackoverflow.com/questions/42360949/edit-form-field-labels-in-angular-2
