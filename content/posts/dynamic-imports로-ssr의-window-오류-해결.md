---
template: post
title: dynamic imports로 SSR의 window 오류 해결
date: 2021-02-19T05:07:40.611Z
description: es6 의 dynamic import 적용
category: javascript
tags:
  - import
  - tui.editor
  - ssr
---
## window is not defined
Angular Universal (Server Side Rendering) 을 사용하다보니 가끔 의도치 않은 오류가 발생합니다.

그 중 하나가 외부 라이브러리에서 window 객체를 사용할때 

window is not defined 오류가 나는 것 입니다.

이것은 어찌보면 당연합니다. 왜냐하면 서버(=node) 에서는 화면(DOM)이 없기 때문에 window 를 제거해 놓았기 때문이죠.

해결 방법은 [domino](https://github.com/fgnass/domino) 와 같은 별도의 DOM제공자를 이용하는 방법도 있지만, es6 이상에서 제공하는 [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)를 이용한 간단하고 효율적인 방법도 있습니다.
  
  
## dynamic imports 
dynamic imports는 우선 초기로딩 시 첫화면에서 쓰이지 않는 불필요한 스크립트를 로딩하지 않고 있다가, 필요한 페이지에 들어가면 그제서야 로딩하는 lazy loading 을 할 수 있도록 해주는 장점이 있어서 쓰이고 있습니다.

다만 일반적(es5 이하)인 Javascript(브라우저)에는 지원이 되지 않기 때문에 es6, webpack 등을 추가로 이용하여야 합니다. 이제는 Typescript 가 대세가 된 마당에 아직 써보지 않으신 분들은 typescript와 webpack 등을 이용해 다음세대의 js를 접하시면 좋을 것 같습니다.

## 적용
사용중 문제가 되었던 라이브러리는 [tui editor](https://github.com/nhn/tui.editor)로 SSR을 지원하지 않는다 합니다.
그런줄 모르고 import Editor from '@toast-ui/editor'; 을 사용하여 import를 해 놓았더니 런타임시 오류가 발생하였습니다.

```javascript
import Editor from '@toast-ui/editor';
...
initEditor() {
   this.editor = await new Editor({
        el: this.toast.nativeElement,
        height: 'auto',
        initialValue: this.initialValue,
   });
}
```

대신 아래와 같이 변경해 주면 됩니다.
```javascript
async initEditor() {
   const tuiEditor = await import('@toast-ui/editor');
   this.editor = await new tuiEditor.default({
      el: this.toast.nativeElement,
      height: 'auto',
      initialValue: this.initialValue,
   });
}
```

참고로 react 진영의 Next.js 에서는 아래 링크를 참조하 브라우저에서만 import 되게 할 수 있다고 합니다.
[with-no-ssr](https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr)

위와 동일한 최종적 Angular의 코드는 아래와 같습니다.
isBrowser() 체크로 한번 감싸주면 첫페이지에서 사용되더라도 브라우저에서만 실행되니 문제없습니다. [isBrowser참조](https://ksrae.github.io/angular/universal-platform/)
```javascript
async initEditor() {
   if (isBrowser()) {
      const tuiEditor = await import('@toast-ui/editor');
      this.editor = await new tuiEditor.default({
         el: this.toast.nativeElement,
         height: 'auto',
         initialValue: this.initialValue,
      });
   }
}
```

## SPA과 SSR
SEO를 위해 SPA를 가지고 다시 SSR을 하다보니 억지로 방법을 계속 만들어내야 하는 것 아닌가 하는 생각이 들지만, svelte 라던지 prerendering(scully)라던 새로운 방식이 유행이 되기 전까지는 개념을 잘 알고 접근해 사용자에게 잘 전달하는 방법을 찾아내서 적용해야겠습니다.
Javascript 의 유행은 꽤나 빨리 변화하는 것 같으니까요.