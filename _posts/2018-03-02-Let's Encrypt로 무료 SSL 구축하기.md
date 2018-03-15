---
layout: post
title: Let's Encrypt로 무료 SSL 구축하기
date: 2018-03-02 21:00:00 +0900
tags: [https, ssl]
categories: 서버
---

![https와 안전함]({{site.baseurl}}/assets/img/https_safe.png)

## 요구사항
웹사이트들을 돌아다녀 보면 어떤 사이트들은 안전함 이라고 나오고  
어떤 사이트들은 안전하지 않음 이라고 나온다.  
당연히도 안전한 사이트가 사용자에게 신뢰를 주지 않을까?  
실제의 보안 여부와 상관없이라도.



## Let's Encrypt
사이트에 SSL(HTTPS) 적용을 통해 안전한 사이트로 거듭날 수 있다.  
>웹호스팅을 통해 홈페이지를 운영하는 경우 아래의 내용은 적용이 불가능하다. 다만 외부 서비스를 통해 HTTP를 HTTPS로 리다이렉트 해주는 식으로 우회하는 방법이 있는데, 다음 [링크](https://jsdev.kr/t/https-cloudflare-flexible-ssl/1973)를 읽어보기를 추천한다.   
구글링해보면 알겠지만 여러 회사의 후원으로 운영되는 Let's Encrypt 를 통해  
쉬우면서도 무료로 SSL 적용이 가능하다.



### ht<i></i>tp://letsencrypt.org

일단 [letsencrypt 홈피](https://letsencrypt.org "letsencrypt") 에 가보자.  
[Get Started](https://letsencrypt.org/getting-started/)를 눌러 이동해 보면  
영어가 잔뜩 나와 당황할 지 모르지만 핵심 내용은 아래 한줄이 전부이다.  
We recommend that most people with shell access use the [Certbot](https://certbot.eff.org) ACME client.



### ht<i></i>tp://certbot.eff.org


사실 1번의 내용은 읽을 필요가 없지만 혹시나 하는 분들이 있을까 하여 써 보았다.  
본격적으로 certbot 의 홈페이지로 이동하면 Software(웹서버)는 뭘 쓰는지?  
System(서버OS)은 뭘 쓰는지? 고르게 되어 있다.  
대부분이 쓰는 Apache혹은 Nginx. Ubuntu혹은 Centos와 같은 Unix서버를 지원하니 자신의 서버에 맞추어 고르자.  
  
그럼 다음 페이지로 자동으로 넘어가는데, Install 부분과 Get Started 부분 까지 설치 명령어만 실행하면 끝!



### nginx 혹은 apache conf설정 변경

선택한 웹서버 혹은 OS마다 다를 순 있지만, 비슷하게 셋팅을 하면 된다.  
설치시 certonly옵션을 넣지 않는다면 nginx.conf 혹은 httpd.conf(apache의 경우) 값까지도 자동으로 추가해 주었다.  

내 도메인이 example.com라 가정하고 예를 들어보겠다.  

- nginx
기존에 80포트로 기본 설정되어 있다면 지워준다.  
{% highlight ruby %}
server{
    ...
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;
    ...
}
{% endhighlight %}

443 (https)포트를 기본으로 설정한다.  
(아래 예제는 example.com도 ww<i></i>w.example.com로 라우팅 되도록 하였다)
managed by Certbot이라는 주석은 Certbot이 자동으로 삽입해 주었다.
{% highlight ruby %}
    server {
        listen 443;
        server_name www&#46;example.com;

        ssl on;
        ssl_certificate /etc/letsencrypt/live/example.<i></i>com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/example.<i></i>com/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
        ...
        }
{% endhighlight %}

80 (http)포트로 들어온 요청은 443포트로 돌려준다.
{% highlight ruby %}
    server {
        listen 80;
        server_name example.com www.<i></i>example.<i></i>com;
        return 301 https<i></i>://www.<i></i>$server_name$request_uri;
    }
{% endhighlight %}

service nginx restart 명령어로 nginx를 리스타트 한다.<br>
크롬 등으로 확인했을때 주소창 옆에 안전함이라고 뜨면 성공!

- Apache
{% highlight ruby %}
<VirtualHost *:80>
        ServerName example.com
        DocumentRoot /var/www/html
        
        Redirect permanent / ht<i></i>tps://example.com/
</VirtualHost>

<VirtualHost *:443>
        ServerName example.<i></i>com
        DocumentRoot /var/www/html
        
        ...
        
        SSLEngine On
        SSLCertificateFile /etc/letsencrypt/live/example.<i></i>com/cert.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/example.<i></i>com/privkey.pem
        SSLCertificateChainFile /etc/letsencrypt/live/example.<i></i>com/chain.pem
  
        RequestHeader append "X-Forwarded-Proto" "https"
        RequestHeader set "X-Forwarded-Ssl" "on"
</VirtualHost>

{% endhighlight %}



## 인증서 갱신

무료이기 때문에 인증서의 유효기간이 90일(3개월)으로 짧고 그 기간 이전에 renewal이 필요하다.  
날짜가 얼마 안남았을 때에만 실제 갱신을 수행하고 기간이 남았다면 skip하도록 되어 있기때문에  
1, 2달 마다 갱신을 실행하도록 cron job을 생성하면 갱신날짜를 못 맞추는 불상사가 난다.  
따라서 매일 혹은 격일 정도 수행되도록 하자.  

crontab -e 를 실행하고, 간단히 아래와 같이 추가하면 된다.  
(아래의 예제 매일 3am에 실행)

{% highlight ruby %}
0 3 * * * certbot renew
{% endhighlight %}

리뉴얼 전, 후에 nginx 재기동이라던지 추가 작업이 필요하면 --pre-hook, --post-hook 옵션을 사용자면 된다.

{% highlight ruby %}
certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start"
{% endhighlight %}



## 적용하자

공짜로 SSL인증을 쓰게 해주는 Let's Encrypt에 감사한 마음을 가지며  
어렵지 않은 내용이기에 내 사이트에도 https를 적용하도록 하자.
