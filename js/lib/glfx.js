/*
 * glfx.js
 * http://evanw.github.com/glfx.js/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */
var fx=function(){function n(b,c,d){return Math.max(b,Math.min(c,d))}function v(b){return{_:b,loadContentsOf:function(c){this._.loadContentsOf(c)},destroy:function(){this._.destroy()}}}function B(b){return v(r.fromElement(b))}function C(b,c){var d=a.getExtension("OES_texture_float")?a.FLOAT:a.UNSIGNED_BYTE;this._.texture&&this._.texture.destroy();this._.spareTexture&&this._.spareTexture.destroy();this.width=b;this.height=c;this._.texture=new r(b,c,a.RGBA,d);this._.spareTexture=new r(b,c,a.RGBA,d);
this._.extraTexture=this._.extraTexture||new r(0,0,a.RGBA,d);this._.flippedShader=this._.flippedShader||new l(null,"uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}");this._.isInitialized=true}function D(b,c,d){if(!this._.isInitialized||b._.width!=this.width||b._.height!=this.height)C.call(this,c?c:b._.width,d?d:b._.height);b._.use();this._.texture.drawTo(function(){l.getDefaultShader().drawRect()});
return this}function E(){this._.texture.use();this._.flippedShader.uniforms({texSize:[this._.texture.width,this._.texture.height]}).drawRect();return this}function m(b,c,d,e){(d||this._.texture).use();this._.spareTexture.drawTo(function(){b.uniforms(c).drawRect()});this._.spareTexture.swapWith(e||this._.texture)}function F(b){b.parentNode.insertBefore(this,b);b.parentNode.removeChild(b);return this}function G(){var b=new r(this._.texture.width,this._.texture.height,a.RGBA,a.UNSIGNED_BYTE);this._.texture.use();
b.drawTo(function(){l.getDefaultShader().drawRect()});return v(b)}function H(){var b=this._.texture.width,c=this._.texture.height,d=new Uint8Array(b*c*4);this._.texture.drawTo(function(){a.readPixels(0,0,b,c,a.RGBA,a.UNSIGNED_BYTE,d)});return d}function I(b){var c=this._.texture.width,d=this._.texture.height,e=new Uint8Array(c*d*4);this._.texture.drawTo(function(){a.readPixels(0,0,c,d,a.RGBA,a.UNSIGNED_BYTE,e)});var f=document.createElement("canvas"),g=f.getContext("2d");f.width=c;f.height=d;for(var h=
g.createImageData(c,d),i=0;i<e.length;i++)h.data[i]=e[i];g.putImageData(h,0,0);return f.toDataURL(b)}function k(b){return function(){a=this._.gl;return b.apply(this,arguments)}}function w(b,c,d,e,f,g,h,i){var j=d-f,o=e-g,p=h-f,x=i-g;f=b-d+f-h;g=c-e+g-i;var y=j*x-p*o;p=(f*x-p*g)/y;j=(j*g-f*o)/y;return[d-b+p*d,e-c+p*e,p,h-b+j*h,i-c+j*i,j,b,c,1]}function z(b){var c=b[0],d=b[1],e=b[2],f=b[3],g=b[4],h=b[5],i=b[6],j=b[7];b=b[8];var o=c*g*b-c*h*j-d*f*b+d*h*i+e*f*j-e*g*i;return[(g*b-h*j)/o,(e*j-d*b)/o,(d*
h-e*g)/o,(h*i-f*b)/o,(c*b-e*i)/o,(e*f-c*h)/o,(f*j-g*i)/o,(d*i-c*j)/o,(c*g-d*f)/o]}function J(b,c){return[b[0]*c[0]+b[1]*c[3]+b[2]*c[6],b[0]*c[1]+b[1]*c[4]+b[2]*c[7],b[0]*c[2]+b[1]*c[5]+b[2]*c[8],b[3]*c[0]+b[4]*c[3]+b[5]*c[6],b[3]*c[1]+b[4]*c[4]+b[5]*c[7],b[3]*c[2]+b[4]*c[5]+b[5]*c[8],b[6]*c[0]+b[7]*c[3]+b[8]*c[6],b[6]*c[1]+b[7]*c[4]+b[8]*c[7],b[6]*c[2]+b[7]*c[5]+b[8]*c[8]]}function A(b){var c=b.length;this.xa=[];this.ya=[];this.u=[];this.y2=[];b.sort(function(g,h){return g[0]-h[0]});for(var d=0;d<
c;d++){this.xa.push(b[d][0]);this.ya.push(b[d][1])}this.u[0]=0;this.y2[0]=0;for(d=1;d<c-1;++d){b=this.xa[d+1]-this.xa[d-1];var e=(this.xa[d]-this.xa[d-1])/b,f=e*this.y2[d-1]+2;this.y2[d]=(e-1)/f;this.u[d]=(6*((this.ya[d+1]-this.ya[d])/(this.xa[d+1]-this.xa[d])-(this.ya[d]-this.ya[d-1])/(this.xa[d]-this.xa[d-1]))/b-e*this.u[d-1])/f}this.y2[c-1]=0;for(d=c-2;d>=0;--d)this.y2[d]=this.y2[d]*this.y2[d+1]+this.u[d]}function t(b,c){return new l(null,b+"uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;"+
c+"gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor.a*=max(0.0,1.0-length(coord-clampedCoord));}}")}function K(b,c){a.brightnessContrast=a.brightnessContrast||new l(null,"uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.rgb+=brightness;if(contrast>0.0){color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;}else{color.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;}gl_FragColor=color;}");
m.call(this,a.brightnessContrast,{brightness:n(-1,b,1),contrast:n(-1,c,1)});return this}function s(b){b=new A(b);for(var c=[],d=0;d<256;d++)c.push(n(0,Math.floor(b.interpolate(d/255)*256),255));return c}function L(b,c,d){b=s(b);if(arguments.length==1)c=d=b;else{c=s(c);d=s(d)}for(var e=[],f=0;f<256;f++)e.splice(e.length,0,b[f],c[f],d[f],255);this._.extraTexture.initFromBytes(256,1,e);this._.extraTexture.use(1);a.curves=a.curves||new l(null,"uniform sampler2D texture;uniform sampler2D map;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.r=texture2D(map,vec2(color.r)).r;color.g=texture2D(map,vec2(color.g)).g;color.b=texture2D(map,vec2(color.b)).b;gl_FragColor=color;}");
a.curves.textures({map:1});m.call(this,a.curves,{});return this}function M(b){a.denoise=a.denoise||new l(null,"uniform sampler2D texture;uniform float exponent;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec4 center=texture2D(texture,texCoord);vec4 color=vec4(0.0);float total=0.0;for(float x=-4.0;x<=4.0;x+=1.0){for(float y=-4.0;y<=4.0;y+=1.0){vec4 sample=texture2D(texture,texCoord+vec2(x,y)/texSize);float weight=1.0-abs(dot(sample.rgb-center.rgb,vec3(0.25)));weight=pow(weight,exponent);color+=sample*weight;total+=weight;}}gl_FragColor=color/total;}");
for(var c=0;c<2;c++)m.call(this,a.denoise,{exponent:Math.max(0,b),texSize:[this.width,this.height]});return this}function N(b,c){a.hueSaturation=a.hueSaturation||new l(null,"uniform sampler2D texture;uniform float hue;uniform float saturation;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float angle=hue*3.14159265;float s=sin(angle),c=cos(angle);vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;float len=length(color.rgb);color.rgb=vec3(dot(color.rgb,weights.xyz),dot(color.rgb,weights.zxy),dot(color.rgb,weights.yzx));float average=(color.r+color.g+color.b)/3.0;if(saturation>0.0){color.rgb+=(average-color.rgb)*(1.0-1.0/(1.001-saturation));}else{color.rgb+=(average-color.rgb)*(-saturation);}gl_FragColor=color;}");
m.call(this,a.hueSaturation,{hue:n(-1,b,1),saturation:n(-1,c,1)});return this}function O(b){a.noise=a.noise||new l(null,"uniform sampler2D texture;uniform float amount;varying vec2 texCoord;float rand(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}void main(){vec4 color=texture2D(texture,texCoord);float diff=(rand(texCoord)-0.5)*amount;color.r+=diff;color.g+=diff;color.b+=diff;gl_FragColor=color;}");
m.call(this,a.noise,{amount:n(0,b,1)});return this}function P(b){a.sepia=a.sepia||new l(null,"uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float r=color.r;float g=color.g;float b=color.b;color.r=min(1.0,(r*(1.0-(0.607*amount)))+(g*(0.769*amount))+(b*(0.189*amount)));color.g=min(1.0,(r*0.349*amount)+(g*(1.0-(0.314*amount)))+(b*0.168*amount));color.b=min(1.0,(r*0.272*amount)+(g*0.534*amount)+(b*(1.0-(0.869*amount))));gl_FragColor=color;}");
m.call(this,a.sepia,{amount:n(0,b,1)});return this}function Q(b,c){a.unsharpMask=a.unsharpMask||new l(null,"uniform sampler2D blurredTexture;uniform sampler2D originalTexture;uniform float strength;uniform float threshold;varying vec2 texCoord;void main(){vec4 blurred=texture2D(blurredTexture,texCoord);vec4 original=texture2D(originalTexture,texCoord);gl_FragColor=mix(blurred,original,1.0+strength);}");
this._.extraTexture.ensureFormat(this._.texture);this._.texture.use();this._.extraTexture.drawTo(function(){l.getDefaultShader().drawRect()});this._.extraTexture.use(1);this.triangleBlur(b);a.unsharpMask.textures({originalTexture:1});m.call(this,a.unsharpMask,{strength:c});this._.extraTexture.unuse(1);return this}function R(b){a.vibrance=a.vibrance||new l(null,"uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;float mx=max(color.r,max(color.g,color.b));float amt=(mx-average)*(-amount*3.0);color.rgb=mix(color.rgb,vec3(mx),amt);gl_FragColor=color;}");
m.call(this,a.vibrance,{amount:n(-1,b,1)});return this}function S(b,c){a.vignette=a.vignette||new l(null,"uniform sampler2D texture;uniform float size;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float dist=distance(texCoord,vec2(0.5,0.5));color.rgb*=smoothstep(0.8,size*0.799,dist*(amount+size));gl_FragColor=color;}");
m.call(this,a.vignette,{size:n(0,b,1),amount:n(0,c,1)});return this}function T(b,c,d){a.lensBlurPrePass=a.lensBlurPrePass||new l(null,"uniform sampler2D texture;uniform float power;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color=pow(color,vec4(power));gl_FragColor=vec4(color);}");var e="uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 delta0;uniform vec2 delta1;uniform float power;varying vec2 texCoord;"+
q+"vec4 sample(vec2 delta){float offset=random(vec3(delta,151.7182),0.0);vec4 color=vec4(0.0);float total=0.0;for(float t=0.0;t<=30.0;t++){float percent=(t+offset)/30.0;color+=texture2D(texture0,texCoord+delta*percent);total+=1.0;}return color/total;}";
a.lensBlur0=a.lensBlur0||new l(null,e+"void main(){gl_FragColor=sample(delta0);}");a.lensBlur1=a.lensBlur1||new l(null,e+"void main(){gl_FragColor=(sample(delta0)+sample(delta1))*0.5;}");a.lensBlur2=a.lensBlur2||(new l(null,e+"void main(){vec4 color=(sample(delta0)+2.0*texture2D(texture1,texCoord))/3.0;gl_FragColor=pow(color,vec4(power));}")).textures({texture1:1});e=
[];for(var f=0;f<3;f++){var g=d+f*Math.PI*2/3;e.push([b*Math.sin(g)/this.width,b*Math.cos(g)/this.height])}b=Math.pow(10,n(-1,c,1));m.call(this,a.lensBlurPrePass,{power:b});this._.extraTexture.ensureFormat(this._.texture);m.call(this,a.lensBlur0,{delta0:e[0]},this._.texture,this._.extraTexture);m.call(this,a.lensBlur1,{delta0:e[1],delta1:e[2]},this._.extraTexture,this._.extraTexture);m.call(this,a.lensBlur0,{delta0:e[1]});this._.extraTexture.use(1);m.call(this,a.lensBlur2,{power:1/b,delta0:e[2]});
return this}function U(b,c,d,e,f,g){a.tiltShift=a.tiltShift||new l(null,"uniform sampler2D texture;uniform float blurRadius;uniform float gradientRadius;uniform vec2 start;uniform vec2 end;uniform vec2 delta;uniform vec2 texSize;varying vec2 texCoord;"+q+"void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);vec2 normal=normalize(vec2(start.y-end.y,end.x-start.x));float radius=smoothstep(0.0,1.0,abs(dot(texCoord*texSize-start,normal))/gradientRadius)*blurRadius;for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);color+=texture2D(texture,texCoord+delta/texSize*percent*radius)*weight;total+=weight;}gl_FragColor=color/total;}");
var h=d-b,i=e-c,j=Math.sqrt(h*h+i*i);m.call(this,a.tiltShift,{blurRadius:f,gradientRadius:g,start:[b,c],end:[d,e],delta:[h/j,i/j],texSize:[this.width,this.height]});m.call(this,a.tiltShift,{blurRadius:f,gradientRadius:g,start:[b,c],end:[d,e],delta:[-i/j,h/j],texSize:[this.width,this.height]});return this}function V(b){a.triangleBlur=a.triangleBlur||new l(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;"+q+"void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);color+=texture2D(texture,texCoord+delta*percent)*weight;total+=weight;}gl_FragColor=color/total;}");
m.call(this,a.triangleBlur,{delta:[b/this.width,0]});m.call(this,a.triangleBlur,{delta:[0,b/this.height]});return this}function W(b,c,d){a.zoomBlur=a.zoomBlur||new l(null,"uniform sampler2D texture;uniform vec2 center;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;"+q+"void main(){vec4 color=vec4(0.0);float total=0.0;vec2 toCenter=center-texCoord*texSize;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);color+=texture2D(texture,texCoord+toCenter*percent*strength/texSize)*weight;total+=weight;}gl_FragColor=color/total;}");
m.call(this,a.zoomBlur,{center:[b,c],strength:d,texSize:[this.width,this.height]});return this}function X(b,c,d,e){a.colorHalftone=a.colorHalftone||new l(null,"uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(float angle){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);vec3 cmy=1.0-color.rgb;float k=min(cmy.x,min(cmy.y,cmy.z));cmy=(cmy-k)/(1.0-k);cmy=clamp(cmy*10.0-3.0+vec3(pattern(angle+0.26179),pattern(angle+1.30899),pattern(angle)),0.0,1.0);k=clamp(k*10.0-5.0+pattern(angle+0.78539),0.0,1.0);gl_FragColor=vec4(1.0-cmy-k,color.a);}");
m.call(this,a.colorHalftone,{center:[b,c],angle:d,scale:Math.PI/e,texSize:[this.width,this.height]});return this}function Y(b,c,d,e){a.dotScreen=a.dotScreen||new l(null,"uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;gl_FragColor=vec4(vec3(average*10.0-5.0+pattern()),color.a);}");
m.call(this,a.dotScreen,{center:[b,c],angle:d,scale:Math.PI/e,texSize:[this.width,this.height]});return this}function Z(b){a.edgeWork1=a.edgeWork1||new l(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;"+q+"void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec3 sample=texture2D(texture,texCoord+delta*percent).rgb;float average=(sample.r+sample.g+sample.b)/3.0;color.x+=average*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=average*weight;total.y+=weight;}}gl_FragColor=vec4(color/total,0.0,1.0);}");
a.edgeWork2=a.edgeWork2||new l(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;"+q+"void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec2 sample=texture2D(texture,texCoord+delta*percent).xy;color.x+=sample.x*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=sample.y*weight;total.y+=weight;}}float c=clamp(10000.0*(color.y/total.y-color.x/total.x)+0.5,0.0,1.0);gl_FragColor=vec4(c,c,c,1.0);}");
m.call(this,a.edgeWork1,{delta:[b/this.width,0]});m.call(this,a.edgeWork2,{delta:[0,b/this.height]});return this}function $(b,c,d){a.hexagonalPixelate=a.hexagonalPixelate||new l(null,"uniform sampler2D texture;uniform vec2 center;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 tex=(texCoord*texSize-center)/scale;tex.y/=0.866025404;tex.x-=tex.y*0.5;vec2 a;if(tex.x+tex.y-floor(tex.x)-floor(tex.y)<1.0)a=vec2(floor(tex.x),floor(tex.y));else a=vec2(ceil(tex.x),ceil(tex.y));vec2 b=vec2(ceil(tex.x),floor(tex.y));vec2 c=vec2(floor(tex.x),ceil(tex.y));vec3 TEX=vec3(tex.x,tex.y,1.0-tex.x-tex.y);vec3 A=vec3(a.x,a.y,1.0-a.x-a.y);vec3 B=vec3(b.x,b.y,1.0-b.x-b.y);vec3 C=vec3(c.x,c.y,1.0-c.x-c.y);float alen=length(TEX-A);float blen=length(TEX-B);float clen=length(TEX-C);vec2 choice;if(alen<blen){if(alen<clen)choice=a;else choice=c;}else{if(blen<clen)choice=b;else choice=c;}choice.x+=choice.y*0.5;choice.y*=0.866025404;choice*=scale/texSize;gl_FragColor=texture2D(texture,choice+center/texSize);}");
m.call(this,a.hexagonalPixelate,{center:[b,c],scale:d,texSize:[this.width,this.height]});return this}function aa(b){a.ink=a.ink||new l(null,"uniform sampler2D texture;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 dx=vec2(1.0/texSize.x,0.0);vec2 dy=vec2(0.0,1.0/texSize.y);vec4 color=texture2D(texture,texCoord);float bigTotal=0.0;float smallTotal=0.0;vec3 bigAverage=vec3(0.0);vec3 smallAverage=vec3(0.0);for(float x=-2.0;x<=2.0;x+=1.0){for(float y=-2.0;y<=2.0;y+=1.0){vec3 sample=texture2D(texture,texCoord+dx*x+dy*y).rgb;bigAverage+=sample;bigTotal+=1.0;if(abs(x)+abs(y)<2.0){smallAverage+=sample;smallTotal+=1.0;}}}vec3 edge=max(vec3(0.0),bigAverage/bigTotal-smallAverage/smallTotal);gl_FragColor=vec4(color.rgb-dot(edge,edge)*strength*100000.0,color.a);}");
m.call(this,a.ink,{strength:b*b*b*b*b,texSize:[this.width,this.height]});return this}function ba(b,c,d,e){a.bulgePinch=a.bulgePinch||t("uniform float radius;uniform float strength;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;");
m.call(this,a.bulgePinch,{radius:d,strength:n(-1,e,1),center:[b,c],texSize:[this.width,this.height]});return this}function ca(b,c,d){a.matrixWarp=a.matrixWarp||t("uniform mat3 matrix;uniform bool useTextureSpace;","if(useTextureSpace)coord=coord/texSize*2.0-1.0;vec3 warp=matrix*vec3(coord,1.0);coord=warp.xy/warp.z;if(useTextureSpace)coord=(coord*0.5+0.5)*texSize;");b=Array.prototype.concat.apply([],b);if(b.length==
4)b=[b[0],b[1],0,b[2],b[3],0,0,0,1];else if(b.length!=9)throw"can only warp with 2x2 or 3x3 matrix";m.call(this,a.matrixWarp,{matrix:c?z(b):b,texSize:[this.width,this.height],useTextureSpace:d|0});return this}function da(b,c){var d=w.apply(null,c),e=w.apply(null,b);return this.matrixWarp(J(z(d),e))}function ea(b,c,d,e){a.swirl=a.swirl||t("uniform float radius;uniform float angle;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=(radius-distance)/radius;float theta=percent*percent*angle;float s=sin(theta);float c=cos(theta);coord=vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);}coord+=center;");
m.call(this,a.swirl,{radius:d,center:[b,c],angle:e,texSize:[this.width,this.height]});return this}var u={},a;u.canvas=function(){var b=document.createElement("canvas");try{a=b.getContext("experimental-webgl",{premultipliedAlpha:false})}catch(c){a=null}if(!a)throw"This browser does not support WebGL";b._={gl:a,isInitialized:false,texture:null,spareTexture:null,flippedShader:null};b.texture=k(B);b.draw=k(D);b.update=k(E);b.replace=k(F);b.contents=k(G);b.getPixelArray=k(H);b.toDataURL=k(I);b.brightnessContrast=
k(K);b.hexagonalPixelate=k($);b.hueSaturation=k(N);b.colorHalftone=k(X);b.triangleBlur=k(V);b.unsharpMask=k(Q);b.perspective=k(da);b.matrixWarp=k(ca);b.bulgePinch=k(ba);b.tiltShift=k(U);b.dotScreen=k(Y);b.edgeWork=k(Z);b.lensBlur=k(T);b.zoomBlur=k(W);b.noise=k(O);b.denoise=k(M);b.curves=k(L);b.swirl=k(ea);b.ink=k(aa);b.vignette=k(S);b.vibrance=k(R);b.sepia=k(P);return b};u.splineInterpolate=s;var l=function(){function b(f,g){var h=a.createShader(f);a.shaderSource(h,g);a.compileShader(h);if(!a.getShaderParameter(h,
a.COMPILE_STATUS))throw"compile error: "+a.getShaderInfoLog(h);return h}function c(f,g){this.texCoordAttribute=this.vertexAttribute=null;this.program=a.createProgram();f=f||d;g=g||e;g="precision highp float;"+g;a.attachShader(this.program,b(a.VERTEX_SHADER,f));a.attachShader(this.program,b(a.FRAGMENT_SHADER,g));a.linkProgram(this.program);if(!a.getProgramParameter(this.program,a.LINK_STATUS))throw"link error: "+a.getProgramInfoLog(this.program);}var d="attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}",
e="uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";c.prototype.destroy=function(){a.deleteProgram(this.program);this.program=null};c.prototype.uniforms=function(f){a.useProgram(this.program);for(var g in f)if(f.hasOwnProperty(g)){var h=a.getUniformLocation(this.program,g);if(h!==null){var i=f[g];if(Object.prototype.toString.call(i)=="[object Array]")switch(i.length){case 1:a.uniform1fv(h,new Float32Array(i));break;
case 2:a.uniform2fv(h,new Float32Array(i));break;case 3:a.uniform3fv(h,new Float32Array(i));break;case 4:a.uniform4fv(h,new Float32Array(i));break;case 9:a.uniformMatrix3fv(h,false,new Float32Array(i));break;case 16:a.uniformMatrix4fv(h,false,new Float32Array(i));break;default:throw"dont't know how to load uniform \""+g+'" of length '+i.length;}else if(Object.prototype.toString.call(i)=="[object Number]")a.uniform1f(h,i);else throw'attempted to set uniform "'+g+'" to invalid value '+(i||"undefined").toString();
}}return this};c.prototype.textures=function(f){a.useProgram(this.program);for(var g in f)f.hasOwnProperty(g)&&a.uniform1i(a.getUniformLocation(this.program,g),f[g]);return this};c.prototype.drawRect=function(f,g,h,i){var j=a.getParameter(a.VIEWPORT);g=g!==void 0?(g-j[1])/j[3]:0;f=f!==void 0?(f-j[0])/j[2]:0;h=h!==void 0?(h-j[0])/j[2]:1;i=i!==void 0?(i-j[1])/j[3]:1;if(a.vertexBuffer==null)a.vertexBuffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,a.vertexBuffer);a.bufferData(a.ARRAY_BUFFER,new Float32Array([f,
g,f,i,h,g,h,i]),a.STATIC_DRAW);if(a.texCoordBuffer==null){a.texCoordBuffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,a.texCoordBuffer);a.bufferData(a.ARRAY_BUFFER,new Float32Array([0,0,0,1,1,0,1,1]),a.STATIC_DRAW)}if(this.vertexAttribute==null){this.vertexAttribute=a.getAttribLocation(this.program,"vertex");a.enableVertexAttribArray(this.vertexAttribute)}if(this.texCoordAttribute==null){this.texCoordAttribute=a.getAttribLocation(this.program,"_texCoord");a.enableVertexAttribArray(this.texCoordAttribute)}a.useProgram(this.program);
a.bindBuffer(a.ARRAY_BUFFER,a.vertexBuffer);a.vertexAttribPointer(this.vertexAttribute,2,a.FLOAT,false,0,0);a.bindBuffer(a.ARRAY_BUFFER,a.texCoordBuffer);a.vertexAttribPointer(this.texCoordAttribute,2,a.FLOAT,false,0,0);a.drawArrays(a.TRIANGLE_STRIP,0,4)};c.getDefaultShader=function(){a.defaultShader=a.defaultShader||new c;return a.defaultShader};return c}();A.prototype.interpolate=function(b){for(var c=0,d=this.ya.length-1;d-c>1;){var e=d+c>>1;if(this.xa[e]>b)d=e;else c=e}e=this.xa[d]-this.xa[c];
var f=(this.xa[d]-b)/e;b=(b-this.xa[c])/e;return f*this.ya[c]+b*this.ya[d]+((f*f*f-f)*this.y2[c]+(b*b*b-b)*this.y2[d])*e*e/6};var r=function(){function b(e,f,g,h){this.id=a.createTexture();this.width=e;this.height=f;this.format=g;this.type=h;a.bindTexture(a.TEXTURE_2D,this.id);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,
a.CLAMP_TO_EDGE);e&&f&&a.texImage2D(a.TEXTURE_2D,0,this.format,e,f,0,this.format,this.type,null)}function c(e){if(d==null)d=document.createElement("canvas");d.width=e.width;d.height=e.height;e=d.getContext("2d");e.clearRect(0,0,d.width,d.height);return e}b.fromElement=function(e){var f=new b(0,0,a.RGBA,a.UNSIGNED_BYTE);f.loadContentsOf(e);return f};b.prototype.loadContentsOf=function(e){this.width=e.width||e.videoWidth;this.height=e.height||e.videoHeight;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,
0,this.format,this.format,this.type,e)};b.prototype.initFromBytes=function(e,f,g){this.width=e;this.height=f;this.format=a.RGBA;this.type=a.UNSIGNED_BYTE;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,e,f,0,a.RGBA,this.type,new Uint8Array(g))};b.prototype.destroy=function(){a.deleteTexture(this.id);this.id=null};b.prototype.use=function(e){a.activeTexture(a.TEXTURE0+(e||0));a.bindTexture(a.TEXTURE_2D,this.id)};b.prototype.unuse=function(e){a.activeTexture(a.TEXTURE0+(e||0));
a.bindTexture(a.TEXTURE_2D,null)};b.prototype.ensureFormat=function(e,f,g,h){if(arguments.length==1){var i=arguments[0];e=i.width;f=i.height;g=i.format;h=i.type}if(e!=this.width||f!=this.height||g!=this.format||h!=this.type){this.width=e;this.height=f;this.format=g;this.type=h;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,0,this.format,e,f,0,this.format,this.type,null)}};b.prototype.drawTo=function(e){a.framebuffer=a.framebuffer||a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,
a.framebuffer);a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.id,0);a.viewport(0,0,this.width,this.height);e();a.bindFramebuffer(a.FRAMEBUFFER,null)};var d=null;b.prototype.fillUsingCanvas=function(e){e(c(this));this.format=a.RGBA;this.type=a.UNSIGNED_BYTE;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,d);return this};b.prototype.toImage=function(e){this.use();l.getDefaultShader().drawRect();var f=this.width*this.height*4,
g=new Uint8Array(f),h=c(this),i=h.createImageData(this.width,this.height);a.readPixels(0,0,this.width,this.height,a.RGBA,a.UNSIGNED_BYTE,g);for(var j=0;j<f;j++)i.data[j]=g[j];h.putImageData(i,0,0);e.src=d.toDataURL()};b.prototype.swapWith=function(e){var f;f=e.id;e.id=this.id;this.id=f;f=e.width;e.width=this.width;this.width=f;f=e.height;e.height=this.height;this.height=f;f=e.format;e.format=this.format;this.format=f};return b}(),q="float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}";
return u}();
