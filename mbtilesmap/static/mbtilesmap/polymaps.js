if(!org)var org={};if(!org.polymaps)org.polymaps={};
(function(r){function ea(d){var h=d.indexOf(":");return h<0?d:{space:r.ns[d.substring(0,h)],local:d.substring(h+1)}}function R(){for(var d=0;d<R.maps.length;d++)R.maps[d].resize()}function V(d){return 360/Math.PI*Math.atan(Math.exp(d*Math.PI/180))-90}function W(d){return 180/Math.PI*Math.log(Math.tan(Math.PI/4+d*Math.PI/360))}function Z(d,h){if(d.row>h.row){var a=d;d=h;h=a}return{x0:d.column,y0:d.row,x1:h.column,y1:h.row,dx:h.column-d.column,dy:h.row-d.row}}function ba(d,h,a,m,e){a=Math.max(a,Math.floor(h.y0));
m=Math.min(m,Math.ceil(h.y1));if(d.x0==h.x0&&d.y0==h.y0?d.x0+h.dy/d.dy*d.dx<h.x1:d.x1-h.dy/d.dy*d.dx<h.x0){var c=d;d=h;h=c}c=d.dx/d.dy;var g=h.dx/h.dy,k=d.dx>0,t=h.dx<0;for(a=a;a<m;a++){var n=c*Math.max(0,Math.min(d.dy,a+k-d.y0))+d.x0;e(Math.floor(g*Math.max(0,Math.min(h.dy,a+t-h.y0))+h.x0),Math.ceil(n),a)}}function ca(d,h,a,m,e,c){var g=Z(d,h);h=Z(h,a);d=Z(a,d);if(g.dy>h.dy){a=g;g=h;h=a}if(g.dy>d.dy){a=g;g=d;d=a}if(h.dy>d.dy){a=h;h=d;d=a}g.dy&&ba(d,g,m,e,c);h.dy&&ba(d,h,m,e,c)}r.version="2.5.0";
var Y={x:0,y:0};r.ns={svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"};r.id=function(){var d=0;return function(){return++d}}();r.svg=function(d){return document.createElementNS(r.ns.svg,d)};r.transform=function(d,h,a,m,e,c){var g={},k,t,n;if(!arguments.length){d=1;h=e=a=0;m=1;c=0}g.zoomFraction=function(l){if(!arguments.length)return t;t=l;k=Math.floor(t+Math.log(Math.sqrt(d*d+h*h+a*a+m*m))/Math.LN2);n=Math.pow(2,-k);return g};g.apply=function(l){var i=Math.pow(2,-l.zoom),q=
Math.pow(2,l.zoom-k);return{column:(d*l.column*i+a*l.row*i+e)*q,row:(h*l.column*i+m*l.row*i+c)*q,zoom:l.zoom-k}};g.unapply=function(l){var i=Math.pow(2,-l.zoom),q=Math.pow(2,l.zoom+k);return{column:(l.column*i*m-l.row*i*a-e*m+c*a)/(d*m-h*a)*q,row:(l.column*i*h-l.row*i*d-e*h+c*d)/(a*h-m*d)*q,zoom:l.zoom+k}};g.toString=function(){return"matrix("+[d*n,h*n,a*n,m*n].join(" ")+" 0 0)"};return g.zoomFraction(0)};r.cache=function(d,h){function a(i){l--;h&&h(i);delete g[i.key];if(i.next)i.next.prev=i.prev;
else if(t=i.prev)t.next=null;if(i.prev)i.prev.next=i.next;else if(k=i.next)k.prev=null}function m(){for(var i=t;l>n;i=i.prev){if(!i)break;i.lock||a(i)}}var e={},c={},g={},k=null,t=null,n=64,l=0;e.peek=function(i){return g[[i.zoom,i.column,i.row].join("/")]};e.load=function(i,q){var w=[i.zoom,i.column,i.row].join("/"),A=g[w];if(A){if(A.prev){if(A.prev.next=A.next)A.next.prev=A.prev;else t=A.prev;A.prev=null;A.next=k;k=k.prev=A}A.lock=1;return c[w]=A}A={key:w,column:i.column,row:i.row,zoom:i.zoom,next:k,
prev:null,lock:1};d.call(null,A,q);c[w]=g[w]=A;if(k)k.prev=A;else t=A;k=A;l++;return A};e.unload=function(i){if(!(i in c))return false;var q=c[i];q.lock=0;delete c[i];q.request&&q.request.abort(false)&&a(q);return q};e.locks=function(){return c};e.size=function(i){if(!arguments.length)return n;n=i;m();return e};e.flush=function(){m();return e};e.clear=function(){for(var i in g){var q=g[i];q.request&&q.request.abort(false);h&&h(g[i]);if(q.lock){q.lock=0;q.element.parentNode.removeChild(q.element)}}c=
{};g={};k=t=null;l=0;return e};return e};r.url=function(d){function h(e){var c=e.zoom<0?1:1<<e.zoom,g=e.column;if(m){g=e.column%c;if(g<0)g+=c}else if(g<0||g>=c)return null;return d.replace(/{(.)}/g,function(k,t){switch(t){case "S":return a[(Math.abs(e.zoom)+e.row+g)%a.length];case "Z":return e.zoom;case "X":return g;case "Y":return e.row;case "B":var n=r.map.coordinateLocation({row:e.row,column:g,zoom:e.zoom}),l=r.map.coordinateLocation({row:e.row+1,column:g+1,zoom:e.zoom}),i=Math.ceil(Math.log(e.zoom)/
Math.LN2);return l.lat.toFixed(i)+","+n.lon.toFixed(i)+","+n.lat.toFixed(i)+","+l.lon.toFixed(i)}return t})}var a=[],m=true;h.template=function(e){if(!arguments.length)return d;d=e;return h};h.hosts=function(e){if(!arguments.length)return a;a=e;return h};h.repeat=function(e){if(!arguments.length)return m;m=e;return h};return h};r.dispatch=function(d){var h={};d.on=function(a,m){for(var e=h[a]||(h[a]=[]),c=0;c<e.length;c++)if(e[c].handler==m)return d;e.push({handler:m,on:true});return d};d.off=function(a,
m){var e=h[a];if(e)for(var c=0;c<e.length;c++){var g=e[c];if(g.handler==m){g.on=false;e.splice(c,1);break}}return d};return function(a){var m=h[a.type];if(m){m=m.slice();for(var e=0;e<m.length;e++){var c=m[e];c.on&&c.handler.call(d,a)}}}};r.queue=function(){function d(){if(!(e>=c||!m.length)){e++;m.pop()()}}function h(g){for(var k=0;k<m.length;k++)if(m[k]==g){m.splice(k,1);return true}return false}function a(g,k,t){function n(){l=new XMLHttpRequest;t&&l.overrideMimeType(t);l.open("GET",g,true);l.onreadystatechange=
function(){if(l.readyState==4){e--;l.status<300&&k(l);d()}};l.send(null)}var l;m.push(n);d();return{abort:function(i){if(h(n))return true;if(i&&l){l.abort();return true}return false}}}var m=[],e=0,c=6;return{text:function(g,k,t){return a(g,function(n){n.responseText&&k(n.responseText)},t)},xml:function(g,k){return a(g,function(t){t.responseXML&&k(t.responseXML)},"application/xml")},json:function(g,k){return a(g,function(t){t.responseText&&k(JSON.parse(t.responseText))},"application/json")},image:function(g,
k,t){function n(){l=document.createElement("img");l.onerror=function(){e--;d()};l.onload=function(){e--;t(l);d()};l.src=k;g.setAttributeNS(r.ns.xlink,"href",k)}var l;m.push(n);d();return{abort:function(i){if(h(n))return true;if(i&&l){l.src="about:";return true}return false}}}}}();r.map=function(){function d(){if(q)if(n<q[0])n=q[0];else if(n>q[1])n=q[1];l=n-(n=Math.round(n));i=Math.pow(2,l)}function h(){if(o){var f=45/Math.pow(2,n+l-3),u=Math.max(Math.abs(C*g.x+A*g.y),Math.abs(B*g.x+E*g.y)),s=V(K-
u*f/k.y);u=V(j+u*f/k.y);t.lat=Math.max(s,Math.min(u,t.lat));s=Math.max(Math.abs(C*g.y+A*g.x),Math.abs(B*g.y+E*g.x));t.lon=Math.max(o[0].lon-s*f/k.x,Math.min(o[1].lon+s*f/k.x,t.lon))}}var a={},m,e,c=Y,g=Y,k={x:256,y:256},t={lat:37.76487,lon:-122.41948},n=12,l=0,i=1,q=[1,18],w=0,A=1,C=0,E=1,B=0,K=-180,j=180,o=[{lat:V(K),lon:-Infinity},{lat:V(j),lon:Infinity}];a.locationCoordinate=function(f){f=r.map.locationCoordinate(f);var u=Math.pow(2,n);f.column*=u;f.row*=u;f.zoom+=n;return f};a.coordinateLocation=
r.map.coordinateLocation;a.coordinatePoint=function(f,u){var s=Math.pow(2,n-u.zoom),z=Math.pow(2,n-f.zoom),v=(u.column*s-f.column*z)*k.x*i;s=(u.row*s-f.row*z)*k.y*i;return{x:g.x+A*v-C*s,y:g.y+C*v+A*s}};a.pointCoordinate=function(f,u){var s=Math.pow(2,n-f.zoom),z=(u.x-g.x)/i,v=(u.y-g.y)/i;return{column:f.column*s+(E*z-B*v)/k.x,row:f.row*s+(B*z+E*v)/k.y,zoom:n}};a.locationPoint=function(f){var u=Math.pow(2,n+l-3)/45,s=(f.lon-t.lon)*u*k.x;f=(W(t.lat)-W(f.lat))*u*k.y;return{x:g.x+A*s-C*f,y:g.y+C*s+A*
f}};a.pointLocation=function(f){var u=45/Math.pow(2,n+l-3),s=(f.x-g.x)*u;f=(f.y-g.y)*u;return{lon:t.lon+(E*s-B*f)/k.x,lat:V(W(t.lat)-(B*s+E*f)/k.y)}};var x=r.svg("rect");x.setAttribute("visibility","hidden");x.setAttribute("pointer-events","all");a.container=function(f){if(!arguments.length)return m;m=f;m.setAttribute("class","map");m.appendChild(x);return a.resize()};a.focusableParent=function(){for(var f=m;f;f=f.parentNode)if(f.tabIndex>=0)return f;return window};a.mouse=function(f){var u=(m.ownerSVGElement||
m).createSVGPoint();if($<0&&(window.scrollX||window.scrollY)){var s=document.body.appendChild(r.svg("svg"));s.style.position="absolute";s.style.top=s.style.left="0px";var z=s.getScreenCTM();$=!(z.f||z.e);document.body.removeChild(s)}if($){u.x=f.pageX;u.y=f.pageY}else{u.x=f.clientX;u.y=f.clientY}return u.matrixTransform(m.getScreenCTM().inverse())};a.size=function(f){if(!arguments.length)return c;e=f;return a.resize()};a.resize=function(){if(e){c=e;R.remove(a)}else{x.setAttribute("width","100%");x.setAttribute("height",
"100%");b=x.getBBox();c={x:b.width,y:b.height};R.add(a)}x.setAttribute("width",c.x);x.setAttribute("height",c.y);g={x:c.x/2,y:c.y/2};h();a.dispatch({type:"resize"});return a};a.tileSize=function(f){if(!arguments.length)return k;k=f;a.dispatch({type:"move"});return a};a.center=function(f){if(!arguments.length)return t;t=f;h();a.dispatch({type:"move"});return a};a.panBy=function(f){var u=45/Math.pow(2,n+l-3),s=f.x*u;f=f.y*u;return a.center({lon:t.lon+(B*f-E*s)/k.x,lat:V(W(t.lat)+(B*s+E*f)/k.y)})};a.centerRange=
function(f){if(!arguments.length)return o;if(o=f){K=o[0].lat>-90?W(o[0].lat):-Infinity;j=o[0].lat<90?W(o[1].lat):Infinity}else{K=-Infinity;j=Infinity}h();a.dispatch({type:"move"});return a};a.zoom=function(f){if(!arguments.length)return n+l;n=f;d();return a.center(t)};a.zoomBy=function(f,u,s){if(arguments.length<2)return a.zoom(n+l+f);if(arguments.length<3)s=a.pointLocation(u);n=n+l+f;d();var z=a.locationPoint(s);return a.panBy({x:u.x-z.x,y:u.y-z.y})};a.zoomRange=function(f){if(!arguments.length)return q;
q=f;return a.zoom(n+l)};a.extent=function(f){if(!arguments.length)return[a.pointLocation({x:0,y:c.y}),a.pointLocation({x:c.x,y:0})];var u=a.locationPoint(f[0]),s=a.locationPoint(f[1]),z=Math.max((s.x-u.x)/c.x,(u.y-s.y)/c.y);u=a.pointLocation({x:(u.x+s.x)/2,y:(u.y+s.y)/2});n=n+l-Math.log(z)/Math.LN2;d();return a.center(u)};a.angle=function(f){if(!arguments.length)return w;w=f;A=Math.cos(w);C=Math.sin(w);E=Math.cos(-w);B=Math.sin(-w);h();a.dispatch({type:"move"});return a};a.add=function(f){f.map(a);
return a};a.remove=function(f){f.map(null);return a};a.dispatch=r.dispatch(a);return a};R.maps=[];R.add=function(d){for(var h=0;h<R.maps.length;h++)if(R.maps[h]==d)return;R.maps.push(d)};R.remove=function(d){for(var h=0;h<R.maps.length;h++)if(R.maps[h]==d){R.maps.splice(h,1);return}};window.addEventListener("resize",R,false);window.addEventListener("load",R,false);r.map.locationCoordinate=function(d){var h=1/360;return{column:(d.lon+180)*h,row:(180-W(d.lat))*h,zoom:0}};r.map.coordinateLocation=function(d){var h=
45/Math.pow(2,d.zoom-3);return{lon:h*d.column-180,lat:V(180-h*d.row)}};var $=/WebKit/.test(navigator.userAgent)?-1:0;r.layer=function(d,h){function a(B){for(var K=C[0].nextSibling;A<B;A++){q.insertBefore(C[-4],K);q.insertBefore(C[2],K);q.insertBefore(C[1],K);for(var j=C[-4],o=-4;o<2;)C[o]=C[++o];C[o]=j}}function m(B){for(var K=C[0].nextSibling;A>B;A--){q.insertBefore(C[-1],K);q.insertBefore(C[2],C[-4]);for(var j=C[2],o=2;o>-4;)C[o]=C[--o];C[o]=j}}function e(){function B(N){var H=N.zoom,T=H<0?1:1<<
H,U=N.column%T,y=N.row;if(U<0)U+=T;return{locationPoint:function(D){D=r.map.locationCoordinate(D);var G=Math.pow(2,H-D.zoom);return{x:s.x*(G*D.column-U),y:s.y*(G*D.row-y)}}}}function K(N,H,T){var U=I.zoom,y=2-S,D=4+S;for(N=N;N<H;N++){var G=g.load({column:N,row:T,zoom:U},B);if(!G.ready&&!(G.key in O)){G.proxyRefs={};for(var J,M,P,Q=1;Q<=y;Q++){M=true;for(var X=0,da=1<<Q;X<=da;X++)for(var aa=0;aa<=da;aa++)if((P=g.peek(J={column:(N<<Q)+aa,row:(T<<Q)+X,zoom:U+Q}))&&P.ready){O[P.key]=g.load(J);P.proxyCount++;
G.proxyRefs[P.key]=P}else M=false;if(M)break}if(!M)for(Q=1;Q<=D;Q++)if((P=g.peek(J={column:N>>Q,row:T>>Q,zoom:U-Q}))&&P.ready){O[P.key]=g.load(J);P.proxyCount++;G.proxyRefs[P.key]=P;break}}O[G.key]=G}}var j=c.map(),o=j.zoom(),x=o-(o=Math.round(o)),f=j.size(),u=j.angle(),s=j.tileSize(),z=j.locationCoordinate(j.center());if(A!=o){if(A<o)a(o);else if(A>o)m(o);else A=o;for(var v=-4;v<=2;v++){var L=C[v];L.setAttribute("class","zoom"+(v<0?"":"+")+v+" zoom"+(o+v));L.setAttribute("transform","scale("+Math.pow(2,
-v)+")")}}q.setAttribute("transform","translate("+f.x/2+","+f.y/2+")"+(u?"rotate("+u/Math.PI*180+")":"")+(x?"scale("+Math.pow(2,x)+")":"")+(w?w.zoomFraction(x):""));var I=j.pointCoordinate(z,Y);v=j.pointCoordinate(z,{x:f.x,y:0});o=j.pointCoordinate(z,f);j=j.pointCoordinate(z,{x:0,y:f.y});if(!x&&!u&&!w){z.column=(Math.round(s.x*z.column)+(f.x&1)/2)/s.x;z.row=(Math.round(s.y*z.row)+(f.y&1)/2)/s.y}if(w){I=w.unapply(I);v=w.unapply(v);o=w.unapply(o);j=w.unapply(j);z=w.unapply(z)}var S=n?n(I.zoom)-I.zoom:
0;if(S){f=Math.pow(2,S);I.column*=f;I.row*=f;v.column*=f;v.row*=f;o.column*=f;o.row*=f;j.column*=f;j.row*=f;I.zoom=v.zoom=o.zoom=j.zoom+=S}x=g.locks();var O={};for(var F in x)x[F].proxyCount=0;if(t&&S>-5&&S<3){u=I.zoom<0?1:1<<I.zoom;if(k){ca(I,v,o,0,u,K);ca(o,j,I,0,u,K)}else{f=Math.floor((I.column+o.column)/2);u=Math.max(0,Math.min(u-1,Math.floor((v.row+j.row)/2)));v=Math.min(4,I.zoom);f=f>>v<<v;u=u>>v<<v;K(f,f+1,u)}}for(F in O){v=O[F];f=Math.pow(2,v.level=v.zoom-z.zoom);v.element.setAttribute("transform",
"translate("+(v.x=s.x*(v.column-z.column*f))+","+(v.y=s.y*(v.row-z.row*f))+")")}for(F in x)if(!(F in O)){v=g.unload(F);v.element.parentNode.removeChild(v.element);delete v.proxyRefs}for(F in O){v=O[F];if(v.element.parentNode!=C[v.level]){C[v.level].appendChild(v.element);c.show&&c.show(v)}}g.flush();c.dispatch({type:"move"})}var c={},g=c.cache=r.cache(d,h).size(512),k=true,t=true,n,l,i,q=r.svg("g"),w,A,C={};q.setAttribute("class","layer");for(var E=-4;E<=-1;E++)C[E]=q.appendChild(r.svg("g"));for(E=
2;E>=1;E--)C[E]=q.appendChild(r.svg("g"));C[0]=q.appendChild(r.svg("g"));c.map=function(B){if(!arguments.length)return i;if(i){if(i==B){q.parentNode.appendChild(q);return c}i.off("move",e).off("resize",e);q.parentNode.removeChild(q)}if(i=B){i.container().appendChild(q);c.init&&c.init(q);i.on("move",e).on("resize",e);e()}return c};c.container=function(){return q};c.levels=function(){return C};c.id=function(B){if(!arguments.length)return l;l=B;q.setAttribute("id",B);return c};c.visible=function(B){if(!arguments.length)return t;
(t=B)?q.removeAttribute("visibility"):q.setAttribute("visibility","hidden");i&&e();return c};c.transform=function(B){if(!arguments.length)return w;w=B;i&&e();return c};c.zoom=function(B){if(!arguments.length)return n;n=typeof B=="function"||B==null?B:function(){return B};i&&e();return c};c.tile=function(B){if(!arguments.length)return k;k=B;i&&e();return c};c.reload=function(){g.clear();i&&e();return c};c.dispatch=r.dispatch(c);c.on("load",function(B){if(B.tile.proxyRefs){for(var K in B.tile.proxyRefs){var j=
B.tile.proxyRefs[K];--j.proxyCount<=0&&g.unload(K)&&j.element.parentNode.removeChild(j.element)}delete B.tile.proxyRefs}});return c};r.image=function(){var d=r.layer(function(a){var m=a.element=r.svg("image"),e=d.map().tileSize();m.setAttribute("preserveAspectRatio","none");m.setAttribute("width",e.x);m.setAttribute("height",e.y);if(typeof h=="function"){m.setAttribute("opacity",0);e=h(a);if(e!=null)a.request=r.queue.image(m,e,function(c){delete a.request;a.ready=true;a.img=c;m.removeAttribute("opacity");
d.dispatch({type:"load",tile:a})});else{a.ready=true;d.dispatch({type:"load",tile:a})}}else{a.ready=true;h!=null&&m.setAttributeNS(r.ns.xlink,"href",h);d.dispatch({type:"load",tile:a})}},function(a){a.request&&a.request.abort(true)}),h;d.url=function(a){if(!arguments.length)return h;h=typeof a=="string"&&/{.}/.test(a)?r.url(a):a;return d.reload()};return d};r.geoJson=function(d){function h(j){var o={lat:0,lon:0};return function(x){o.lat=x[1];o.lon=x[0];var f=j(o);x.x=f.x;x.y=f.y;return f}}function a(j,
o){return j&&j.type in C&&C[j.type](j,o)}function m(j,o,x){return j.type in E&&E[j.type](j,o,x)}function e(){var j=c.map().zoom(),o=c.cache.locks(),x,f,u,s,z,v,L;if(w=="fixed")for(x in o){if((f=o[x]).scale!=j){L="scale("+Math.pow(2,f.zoom-j)+")";s=-1;for(z=(u=f.features).length;++s<z;)m((v=u[s]).data.geometry,v.element,L);f.scale=j}}else for(x in o){s=-1;for(z=(u=(f=o[x]).features).length;++s<z;)m((v=u[s]).data.geometry,v.element,"");delete f.scale}}var c=r.layer(function(j,o){function x(u){var s=
[];if(u.next)j.request=d(u.next.href,x);switch(u.type){case "FeatureCollection":for(var z=0;z<u.features.length;z++){var v=u.features[z],L=a(v.geometry,o);L&&s.push({element:f.appendChild(L),data:v})}break;case "Feature":(L=a(u.geometry,o))&&s.push({element:f.appendChild(L),data:u});break;default:(L=a(u,o))&&s.push({element:f.appendChild(L),data:{type:"Feature",geometry:u}});break}j.ready=true;s.push.apply(j.features,s);c.dispatch({type:"load",tile:j,features:s})}var f=j.element=r.svg("g");j.features=
[];o=h(o(j).locationPoint);if(k!=null)j.request=d(typeof k=="function"?k(j):k,x);else x({type:"FeatureCollection",features:A||[]})},function(j){j.request&&j.request.abort(true)}),g=c.container(),k,t=true,n="org.polymaps."+r.id(),l="url(#"+n+")",i=g.insertBefore(r.svg("clipPath"),g.firstChild),q=i.appendChild(r.svg("rect")),w="auto",A;g.setAttribute("fill-rule","evenodd");i.setAttribute("id",n);if(!arguments.length)d=r.queue.json;var C={Point:function(j,o){var x=o(j.coordinates),f=r.svg("circle");
f.setAttribute("r",4.5);f.setAttribute("transform","translate("+x.x+","+x.y+")");return f},MultiPoint:function(j,o){for(var x=r.svg("g"),f=j.coordinates,u,s,z=-1,v=f.length;++z<v;){s=x.appendChild(r.svg("circle"));s.setAttribute("r",4.5);s.setAttribute("transform","translate("+(u=o(f[z])).x+","+u.y+")")}return x},LineString:function(j,o){for(var x=r.svg("path"),f=["M"],u=j.coordinates,s,z=-1,v=u.length;++z<v;)f.push((s=o(u[z])).x,",",s.y,"L");f.pop();if(f.length){x.setAttribute("d",f.join(""));return x}},
MultiLineString:function(j,o){for(var x=r.svg("path"),f=[],u=j.coordinates,s,z=-1,v,L=u.length,I;++z<L;){s=u[z];v=-1;I=s.length;for(f.push("M");++v<I;)f.push((p=o(s[v])).x,",",p.y,"L");f.pop()}if(f.length){x.setAttribute("d",f.join(""));return x}},Polygon:function(j,o){for(var x=r.svg("path"),f=[],u=j.coordinates,s,z=-1,v,L=u.length,I;++z<L;){s=u[z];v=-1;I=s.length-1;for(f.push("M");++v<I;)f.push((p=o(s[v])).x,",",p.y,"L");f[f.length-1]="Z"}if(f.length){x.setAttribute("d",f.join(""));return x}},MultiPolygon:function(j,
o){for(var x=r.svg("path"),f=[],u=j.coordinates,s,z,v=-1,L,I,S=u.length,O,F;++v<S;){s=u[v];L=-1;for(O=s.length;++L<O;){z=s[L];I=-1;F=z.length-1;for(f.push("M");++I<F;)f.push((p=o(z[I])).x,",",p.y,"L");f[f.length-1]="Z"}}if(f.length){x.setAttribute("d",f.join(""));return x}},GeometryCollection:function(j,o){for(var x=r.svg("g"),f=-1,u=j.geometries,s=u.length,z;++f<s;)(z=a(u[f],o))&&x.appendChild(z);return x}},E={Point:function(j,o,x){j=j.coordinates;o.setAttribute("transform","translate("+j.x+","+
j.y+")"+x)},MultiPoint:function(j,o,x){j=j.coordinates;var f=-1,u=s.length;o=o.firstChild;for(var s;++f<u;){s=j[f];o.setAttribute("transform","translate("+s.x+","+s.y+")"+x);o=o.nextSibling}}};c.url=function(j){if(!arguments.length)return k;k=typeof j=="string"&&/{.}/.test(j)?r.url(j):j;if(k!=null)A=null;typeof k=="string"&&c.tile(false);return c.reload()};c.features=function(j){if(!arguments.length)return A;if(A=j){k=null;c.tile(false)}return c.reload()};c.clip=function(j){if(!arguments.length)return t;
t&&g.removeChild(i);if(t=j)g.insertBefore(i,g.firstChild);var o=c.cache.locks();for(var x in o)t?o[x].element.setAttribute("clip-path",l):o[x].element.removeAttribute("clip-path");return c};var B=c.tile;c.tile=function(j){arguments.length&&!j&&c.clip(j);return B.apply(c,arguments)};var K=c.map;c.map=function(j){if(j&&q){var o=j.tileSize();q.setAttribute("width",o.x);q.setAttribute("height",o.y)}return K.apply(c,arguments)};c.scale=function(j){if(!arguments.length)return w;(w=j)?c.on("move",e):c.off("move",
e);c.map()&&e();return c};c.show=function(j){t?j.element.setAttribute("clip-path",l):j.element.removeAttribute("clip-path");c.dispatch({type:"show",tile:j,features:j.features});return c};c.reshow=function(){var j=c.cache.locks();for(var o in j)c.show(j[o]);return c};return c};r.dblclick=function(){function d(c){var g=m.zoom();g=c.shiftKey?Math.ceil(g)-g-1:1-g+Math.floor(g);a==="mouse"?m.zoomBy(g,m.mouse(c)):m.zoomBy(g)}var h={},a="mouse",m,e;h.zoom=function(c){if(!arguments.length)return a;a=c;return h};
h.map=function(c){if(!arguments.length)return m;if(m){e.removeEventListener("dblclick",d,false);e=null}if(m=c){e=m.container();e.addEventListener("dblclick",d,false)}return h};return h};r.drag=function(){function d(g){if(!g.shiftKey){c={x:g.clientX,y:g.clientY};m.focusableParent().focus();g.preventDefault();document.body.style.setProperty("cursor","move",null)}}function h(g){if(c){m.panBy({x:g.clientX-c.x,y:g.clientY-c.y});c.x=g.clientX;c.y=g.clientY}}var a={},m,e,c;a.map=function(g){if(!arguments.length)return m;
if(m){e.removeEventListener("mousedown",d,false);e=null}if(m=g){e=m.container();e.addEventListener("mousedown",d,false)}return a};window.addEventListener("mousemove",h,false);window.addEventListener("mouseup",function(g){if(c){h(g);c=null;document.body.style.removeProperty("cursor")}},false);return a};r.wheel=function(){function d(){g=null}function h(i){var q=i.wheelDelta||-i.detail,w;if(q)if(e){try{l.scrollTop=1E3;l.dispatchEvent(i);q=1E3-l.scrollTop}catch(A){}q*=0.0050}else{w=Date.now();if(w-m>
200){q=q>0?+1:-1;m=w}else q=0}if(q)switch(c){case "mouse":w=k.mouse(i);g||(g=k.pointLocation(w));k.off("move",d).zoomBy(q,w,g).on("move",d);break;case "location":k.zoomBy(q,k.locationPoint(g),g);break;default:k.zoomBy(q);break}i.preventDefault();return false}var a={},m=0,e=true,c="mouse",g,k,t,n=document.createElement("div"),l=document.createElement("div");l.style.visibility="hidden";l.style.top="0px";l.style.height="0px";l.style.width="0px";l.style.overflowY="scroll";n.style.height="2000px";l.appendChild(n);
document.body.appendChild(l);a.smooth=function(i){if(!arguments.length)return e;e=i;return a};a.zoom=function(i,q){if(!arguments.length)return c;c=i;g=q;if(k)c=="mouse"?k.on("move",d):k.off("move",d);return a};a.map=function(i){if(!arguments.length)return k;if(k){t.removeEventListener("mousemove",d,false);t.removeEventListener("mousewheel",h,false);t.removeEventListener("MozMousePixelScroll",h,false);t=null;k.off("move",d)}if(k=i){c=="mouse"&&k.on("move",d);t=k.container();t.addEventListener("mousemove",
d,false);t.addEventListener("mousewheel",h,false);t.addEventListener("MozMousePixelScroll",h,false)}return a};return a};r.arrow=function(){function d(w){if(!(w.ctrlKey||w.altKey||w.metaKey)){var A=Date.now(),C=0,E=0;switch(w.keyCode){case 37:if(!c.left){g=A;c.left=1;c.right||(C=l)}break;case 39:if(!c.right){g=A;c.right=1;c.left||(C=-l)}break;case 38:if(!c.up){g=A;c.up=1;c.down||(E=l)}break;case 40:if(!c.down){g=A;c.down=1;c.up||(E=-l)}break;default:return}if(C||E)i.panBy({x:C,y:E});if(!k&&c.left|
c.right|c.up|c.down)k=setInterval(m,n);w.preventDefault()}}function h(w){g=Date.now();switch(w.keyCode){case 37:c.left=0;break;case 39:c.right=0;break;case 38:c.up=0;break;case 40:c.down=0;break;default:return}if(k&&!(c.left|c.right|c.up|c.down))k=clearInterval(k);w.preventDefault()}function a(w){switch(w.charCode){case 45:case 95:i.zoom(Math.ceil(i.zoom())-1);break;case 43:case 61:i.zoom(Math.floor(i.zoom())+1);break;default:return}w.preventDefault()}function m(){if(i)if(!(Date.now()<g+t)){var w=
(c.left-c.right)*l,A=(c.up-c.down)*l;if(w||A)i.panBy({x:w,y:A})}}var e={},c={left:0,right:0,up:0,down:0},g=0,k,t=250,n=50,l=16,i,q;e.map=function(w){if(!arguments.length)return i;if(i){q.removeEventListener("keypress",a,false);q.removeEventListener("keydown",d,false);q.removeEventListener("keyup",h,false);q=null}if(i=w){q=i.focusableParent();q.addEventListener("keypress",a,false);q.addEventListener("keydown",d,false);q.addEventListener("keyup",h,false)}return e};e.speed=function(w){if(!arguments.length)return l;
l=w;return e};return e};r.hash=function(){function d(){var k=g(e);if(m!==k)location.replace(m=k)}function h(){if(location.hash!==m)if(c(e,(m=location.hash).substring(1)))d()}var a={},m,e,c=function(k,t){var n=t.split("/").map(Number);if(n.length<3||n.some(isNaN))return true;else{var l=k.size();k.zoomBy(n[0]-k.zoom(),{x:l.x/2,y:l.y/2},{lat:Math.min(89.99999999,Math.max(-89.99999999,n[1])),lon:n[2]})}},g=function(k){var t=k.center();k=k.zoom();var n=Math.max(0,Math.ceil(Math.log(k)/Math.LN2));return"#"+
k.toFixed(2)+"/"+t.lat.toFixed(n)+"/"+t.lon.toFixed(n)};a.map=function(k){if(!arguments.length)return e;if(e){e.off("move",d);window.removeEventListener("hashchange",h,false)}if(e=k){e.on("move",d);window.addEventListener("hashchange",h,false);location.hash?h():d()}return a};a.parser=function(k){if(!arguments.length)return c;c=k;return a};a.formatter=function(k){if(!arguments.length)return g;g=k;return a};return a};r.touch=function(){function d(n){var l=-1,i=n.touches.length,q=Date.now();if(i==1&&
q-c<300){var w=a.zoom();a.zoomBy(1-w+Math.floor(w),a.mouse(n.touches[0]));n.preventDefault()}c=q;g=a.zoom();for(k=a.angle();++l<i;){q=n.touches[l];t[q.identifier]=a.pointLocation(a.mouse(q))}}var h={},a,m,e=false,c=0,g,k,t={};window.addEventListener("touchmove",function(n){switch(n.touches.length){case 1:var l=n.touches[0];a.zoomBy(0,a.mouse(l),t[l.identifier]);n.preventDefault();break;case 2:l=n.touches[0];var i=n.touches[1],q=a.mouse(l),w=a.mouse(i);q={x:(q.x+w.x)/2,y:(q.y+w.y)/2};l=r.map.locationCoordinate(t[l.identifier]);
i=r.map.locationCoordinate(t[i.identifier]);i=r.map.coordinateLocation({row:(l.row+i.row)/2,column:(l.column+i.column)/2,zoom:0});a.zoomBy(Math.log(n.scale)/Math.LN2+g-a.zoom(),q,i);e&&a.angle(n.rotation/180*Math.PI+k);n.preventDefault();break}},false);h.rotate=function(n){if(!arguments.length)return e;e=n;return h};h.map=function(n){if(!arguments.length)return a;if(a){m.removeEventListener("touchstart",d,false);m=null}if(a=n){m=a.container();m.addEventListener("touchstart",d,false)}return h};return h};
r.interact=function(){var d={},h=r.drag(),a=r.wheel(),m=r.dblclick(),e=r.touch(),c=r.arrow();d.map=function(g){h.map(g);a.map(g);m.map(g);e.map(g);c.map(g);return d};return d};r.compass=function(){function d(y){B.setAttribute("class","compass active");I||(I=setInterval(h,u));S&&H.panBy(S);x=Date.now();return l(y)}function h(){S&&Date.now()>x+f&&H.panBy(S)}function a(y){if(y.shiftKey){F={x0:H.mouse(y)};H.focusableParent().focus();return l(y)}}function m(y){if(F){F.x1=H.mouse(y);N.setAttribute("x",
Math.min(F.x0.x,F.x1.x));N.setAttribute("y",Math.min(F.x0.y,F.x1.y));N.setAttribute("width",Math.abs(F.x0.x-F.x1.x));N.setAttribute("height",Math.abs(F.x0.y-F.x1.y));N.removeAttribute("display")}}function e(){B.setAttribute("class","compass");if(F){if(F.x1){H.extent([H.pointLocation({x:Math.min(F.x0.x,F.x1.x),y:Math.max(F.x0.y,F.x1.y)}),H.pointLocation({x:Math.max(F.x0.x,F.x1.x),y:Math.min(F.x0.y,F.x1.y)})]);N.setAttribute("display","none")}F=null}if(I){clearInterval(I);I=0}}function c(y){return function(){y?
this.setAttribute("class","active"):this.removeAttribute("class");S=y}}function g(y){return function(D){B.setAttribute("class","compass active");var G=H.zoom();H.zoom(y<0?Math.ceil(G)-1:Math.floor(G)+1);return l(D)}}function k(y){return function(D){H.zoom(y);return l(D)}}function t(){this.setAttribute("class","active")}function n(){this.removeAttribute("class")}function l(y){y.stopPropagation();y.preventDefault();return false}function i(y){var D=Math.SQRT1_2*j,G=j*0.7,J=j*0.2,M=r.svg("g"),P=M.appendChild(r.svg("path")),
Q=M.appendChild(r.svg("path"));P.setAttribute("class","direction");P.setAttribute("pointer-events","all");P.setAttribute("d","M0,0L"+D+","+D+"A"+j+","+j+" 0 0,1 "+-D+","+D+"Z");Q.setAttribute("class","chevron");Q.setAttribute("d","M"+J+","+(G-J)+"L0,"+G+" "+-J+","+(G-J));Q.setAttribute("pointer-events","none");M.addEventListener("mousedown",d,false);M.addEventListener("mouseover",c(y),false);M.addEventListener("mouseout",c(null),false);M.addEventListener("dblclick",l,false);return M}function q(y){var D=
j*0.4,G=D/2,J=r.svg("g"),M=J.appendChild(r.svg("path")),P=J.appendChild(r.svg("path")),Q=J.appendChild(r.svg("path")),X=J.appendChild(r.svg("path"));M.setAttribute("class","back");M.setAttribute("d","M"+-D+",0V"+-D+"A"+D+","+D+" 0 1,1 "+D+","+-D+"V0Z");P.setAttribute("class","direction");P.setAttribute("d",M.getAttribute("d"));Q.setAttribute("class","chevron");Q.setAttribute("d","M"+-G+","+-D+"H"+G+(y>0?"M0,"+(-D-G)+"V"+-G:""));X.setAttribute("class","fore");X.setAttribute("fill","none");X.setAttribute("d",
M.getAttribute("d"));J.addEventListener("mousedown",g(y),false);J.addEventListener("mouseover",t,false);J.addEventListener("mouseout",n,false);J.addEventListener("dblclick",l,false);return J}function w(y){var D=j*0.2,G=j*0.4,J=r.svg("g"),M=J.appendChild(r.svg("rect")),P=J.appendChild(r.svg("path"));M.setAttribute("pointer-events","all");M.setAttribute("fill","none");M.setAttribute("x",-G);M.setAttribute("y",-0.75*G);M.setAttribute("width",2*G);M.setAttribute("height",1.5*G);P.setAttribute("class",
"chevron");P.setAttribute("d","M"+-D+",0H"+D);J.addEventListener("mousedown",k(y),false);J.addEventListener("dblclick",l,false);return J}function A(){var y=j+6,D=y,G=H.size();switch(s){case "top-left":break;case "top-right":y=G.x-y;break;case "bottom-left":D=G.y-D;break;case "bottom-right":y=G.x-y;D=G.y-D;break}B.setAttribute("transform","translate("+y+","+D+")");N.setAttribute("transform","translate("+-y+","+-D+")");for(var J in K)J==H.zoom()?K[J].setAttribute("class","active"):K[J].removeAttribute("class")}
function C(){for(;B.lastChild;)B.removeChild(B.lastChild);B.appendChild(N);if(L!="none"){O=B.appendChild(r.svg("g"));O.setAttribute("class","pan");var y=O.appendChild(r.svg("circle"));y.setAttribute("class","back");y.setAttribute("r",j);O.appendChild(i({x:0,y:-o})).setAttribute("transform","rotate(0)");O.appendChild(i({x:o,y:0})).setAttribute("transform","rotate(90)");O.appendChild(i({x:0,y:o})).setAttribute("transform","rotate(180)");O.appendChild(i({x:-o,y:0})).setAttribute("transform","rotate(270)");
y=O.appendChild(r.svg("circle"));y.setAttribute("fill","none");y.setAttribute("class","fore");y.setAttribute("r",j)}else O=null;if(z!="none"){v=B.appendChild(r.svg("g"));v.setAttribute("class","zoom");y=-0.5;if(z=="big"){K={};var D=H.zoomRange()[0];for(y=0;D<=H.zoomRange()[1];D++,y++)(K[D]=v.appendChild(w(D))).setAttribute("transform","translate(0,"+-(y+0.75)*j*0.4+")")}D=L=="none"?0.4:2;v.setAttribute("transform","translate(0,"+j*(/^top-/.test(s)?D+(y+0.5)*0.4:-D)+")");v.appendChild(q(+1)).setAttribute("transform",
"translate(0,"+-(y+0.5)*j*0.4+")");v.appendChild(q(-1)).setAttribute("transform","scale(-1)")}else v=null;A()}var E={},B=r.svg("g"),K={},j=30,o=16,x=0,f=250,u=50,s="top-left",z="small",v,L="small",I,S,O,F,N=r.svg("rect"),H,T,U;B.setAttribute("class","compass");N.setAttribute("class","back fore");N.setAttribute("pointer-events","none");N.setAttribute("display","none");E.radius=function(y){if(!arguments.length)return j;j=y;H&&C();return E};E.speed=function(y){if(!arguments.length)return j;o=y;return E};
E.position=function(y){if(!arguments.length)return s;s=y;H&&C();return E};E.pan=function(y){if(!arguments.length)return L;L=y;H&&C();return E};E.zoom=function(y){if(!arguments.length)return z;z=y;H&&C();return E};E.map=function(y){if(!arguments.length)return H;if(H){T.removeEventListener("mousedown",a,false);T.removeChild(B);T=null;U.removeEventListener("mousemove",m,false);U.removeEventListener("mouseup",e,false);U=null;H.off("move",A).off("resize",A)}if(H=y){T=H.container();T.appendChild(B);T.addEventListener("mousedown",
a,false);U=T.ownerDocument.defaultView;U.addEventListener("mousemove",m,false);U.addEventListener("mouseup",e,false);H.on("move",A).on("resize",A);C()}return E};return E};r.grid=function(){function d(){var e=m.firstChild,c=a.size(),g=a.pointLocation(Y);a.pointLocation(c);var k=Math.pow(2,4-Math.round(a.zoom()));g.lat=Math.floor(g.lat/k)*k;g.lon=Math.ceil(g.lon/k)*k;for(var t;(t=a.locationPoint(g).x)<=c.x;g.lon+=k){e||(e=m.appendChild(r.svg("line")));e.setAttribute("x1",t);e.setAttribute("x2",t);e.setAttribute("y1",
0);e.setAttribute("y2",c.y);e=e.nextSibling}for(;(t=a.locationPoint(g).y)<=c.y;g.lat-=k){e||(e=m.appendChild(r.svg("line")));e.setAttribute("y1",t);e.setAttribute("y2",t);e.setAttribute("x1",0);e.setAttribute("x2",c.x);e=e.nextSibling}for(;e;){c=e.nextSibling;m.removeChild(e);e=c}}var h={},a,m=r.svg("g");m.setAttribute("class","grid");h.map=function(e){if(!arguments.length)return a;if(a){m.parentNode.removeChild(m);a.off("move",d).off("resize",d)}if(a=e){a.on("move",d).on("resize",d);a.container().appendChild(m);
a.dispatch({type:"move"})}return h};return h};r.stylist=function(){function d(e){var c=e.features.length,g=h.length,k=a.length,t,n,l,i,q,w;for(q=0;q<c;++q)if(n=(t=e.features[q]).element){t=t.data;for(w=0;w<g;++w){i=(l=h[w]).value;if(typeof i==="function")i=i.call(null,t);i==null?l.name.local?n.removeAttributeNS(l.name.space,l.name.local):n.removeAttribute(l.name):l.name.local?n.setAttributeNS(l.name.space,l.name.local,i):n.setAttribute(l.name,i)}for(w=0;w<k;++w){i=(l=a[w]).value;if(typeof i==="function")i=
i.call(null,t);i==null?n.style.removeProperty(l.name):n.style.setProperty(l.name,i,l.priority)}if(i=m){if(typeof i==="function")i=i.call(null,t);for(;n.lastChild;)n.removeChild(n.lastChild);i!=null&&n.appendChild(r.svg("title")).appendChild(document.createTextNode(i))}}}var h=[],a=[],m;d.attr=function(e,c){h.push({name:ea(e),value:c});return d};d.style=function(e,c,g){a.push({name:e,value:c,priority:arguments.length<3?null:g});return d};d.title=function(e){m=e;return d};return d}})(org.polymaps);
