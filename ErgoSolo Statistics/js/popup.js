function IsNumeric(input)
{
  return (input - 0) == input && input.length > 0;
}

function onLoad() {
  var dataArea = document.getElementById('statistics');
  var language = localStorage["language"];
  var profile = localStorage["profile"];
  var course = localStorage["course"];

  if(!language || !profile || !IsNumeric(profile) || !course) {
    dataArea.setAttribute("class", "statistics_empty");
    dataArea.innerHTML = "Please use <a href='options.html' target='_blank'>options page</a> to set up your ErgoSolo profile.";
  } else {
    var request = "http://nabiraem.ru/profile/user_info.py?auser_id="+profile
                  +"&locale_id="+language
                  +"&option=stat"
                  +"&course="+course;
    sendAjaxRequest( { 'url' : request,
          'callbackSuccess' : function( data, str )
            {
              if (data == "") {
                dataArea.setAttribute("class", "statistics_empty");
                dataArea.innerHTML = "Wrong user ID, please change it on the <a href='options.html' target='_blank'>options page</a>.";
              } else {
                dataArea.setAttribute("class", "statistics");
                dataArea.innerHTML = data;
                var newData = $('#general-stat-inner').html();
                // In case we haven't started course we will not get statistics
                if (newData == undefined) {
                  dataArea.setAttribute("class", "statistics_empty");
                  dataArea.innerHTML = "Selected course was not started, please update your <a href='options.html' target='_blank'>settings</a>.";
                } else {
                  dataArea.innerHTML = newData;
                }
              }
            },
          'callbackError' : function( data, str )
            {
              dataArea.setAttribute("class", "statistics_empty");
              dataArea.innerHTML = "Can't get info from the server. Please try again later.";
            }
    } );
  }
}

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
