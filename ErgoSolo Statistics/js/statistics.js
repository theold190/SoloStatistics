function sendAjaxRequest(d)
{
  var e=d.type;
  if(e==null){e="GET"}
  var b=d.url;
  var m=d.parameters;
  var h=d.dataType;
  if(h==null){h="html"}
  var l=d.callbackSuccess;
  if(l==null){l=function(p,q,o){}}
  var g=d.callbackError;
  if(g==null){g=function(o,q,p){}}
  var f=d.asynchronous;
  if(f==null){f=true}
  var k=d.contentType;
  if(k==null){k="application/x-www-form-urlencoded"}
  var c=d.headers;
  if(c==null){c={}}
  var n=d.keepalive;
  var j=null;
  if(n){j=function(o){o.setRequestHeader("Connection","Keep-Alive")}}
  var a=d.secure;
  var d=a&&m?{p:Tea.encrypt($.param(m),uniqueId)}:m;
  jQuery.ajax({type:e,url:b,data:d,dataType:h,contentType:k,async:f,headers:c,success:l,error:g,beforeSend:j,cache:false})
}
