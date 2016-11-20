#cms-front-mobile



apache转发规则

```conf
RewriteEngine on
RewriteRule ^/api/(.+?)$ http://cms.babamaiche.com/api/$1 [P]
RewriteCond %{REQUEST_URI} !^.*(.css|.js|.gif|.png|.bmp|.jpg|.jpeg|.html|.ttf|.svg|.eot|.woff)$
RewriteRule ^(.*)$ /index.html [p]
```

Nginx
```

```

