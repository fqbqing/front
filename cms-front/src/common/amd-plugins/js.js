/*eslint-disable*/
define("js",{load:function(e,a,n){function t(){var e=d.readyState;("undefined"==typeof e||/^(loaded|complete)$/.test(e))&&(d.onload=d.onreadystatechange=null,d=null,n(!0))}var d=document.createElement("script");d.src=a.toUrl(e),d.async=!0,d.readyState?d.onreadystatechange=t:d.onload=t;var o=document.getElementsByTagName("head")[0]||document.body;o.appendChild(d)&&(o=null)}});
/*eslint-enable*/
