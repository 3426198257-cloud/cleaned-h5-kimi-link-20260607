import{r as n,j as e}from"./index-CGMunQbH.js";import{S as R,b as k,W as P,G as B,e as G,C as l,a as D,V as z,M as W,B as L,c as T,f as H,A as _,d as I}from"./three.module-D1YwtV8-.js";const V=`
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,U=`
uniform float uTime;
uniform vec3 uColorBlack;
uniform vec3 uColorWhite;
uniform vec3 uColorCyan;
uniform vec3 uColorAmber;
uniform vec2 uMouse;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  // Light direction from mouse
  vec3 lightDir = normalize(vec3(uMouse.x * 3.0, uMouse.y * 3.0, 2.0));
  
  float lightDot = max(dot(lightDir, vNormal), 0.0);
  
  // Base colors
  vec3 colorCyan = mix(uColorBlack, uColorCyan, smoothstep(0.0, 0.1, lightDot));
  vec3 colorAmber = mix(uColorBlack, uColorAmber, smoothstep(0.0, 0.5, lightDot));
  
  vec3 finalColor = mix(colorCyan, colorAmber, smoothstep(0.0, 1.0, lightDot));
  
  // Glitch flicker based on light
  float redGlitch = step(0.95, fract(uTime * 20.0)) * lightDot;
  float greenGlitch = step(0.97, fract(uTime * 15.0)) * lightDot;
  float blueGlitch = step(0.93, fract(uTime * 25.0)) * lightDot;
  
  finalColor.r += uColorAmber.r * redGlitch * 0.3;
  finalColor.g += uColorCyan.g * greenGlitch * 0.3;
  finalColor.b += uColorCyan.b * blueGlitch * 0.3;
  
  // Specular highlight
  float specular = pow(lightDot, 8.0);
  finalColor = mix(finalColor, uColorWhite, specular * 0.5);
  
  // Ambient base
  finalColor += uColorBlack * 0.15;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;function J({isActive:d}){const u=n.useRef(null),N=n.useRef(null),g=n.useRef(0),E=n.useRef(Date.now()),m=n.useRef({x:0,y:0}),[w,A]=n.useState({x:0,y:0});return n.useEffect(()=>{if(!d||!u.current)return;const h=u.current,x=new R,r=new k(60,window.innerWidth/window.innerHeight,.1,100);r.position.z=6;const o=new P({antialias:!0,alpha:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(window.innerWidth,window.innerHeight),o.setClearColor(0,0),h.appendChild(o.domElement),N.current=o;const a=new B,F=new G(.8,.8,.3),i={uTime:{value:0},uColorBlack:{value:new l("#020B26")},uColorWhite:{value:new l("#FFFFFF")},uColorCyan:{value:new l("#00E5FF")},uColorAmber:{value:new l("#FF9E00")},uMouse:{value:new z(0,0)}},p=new D({vertexShader:V,fragmentShader:U,uniforms:i});[[-3,1],[-2.2,1],[-1.4,1],[-2.2,.2],[-2.2,-.6],[-3,-1.4],[-2.2,-1.4],[-1.4,-1.4],[-3,.2],[-1.4,.2],[-.4,1],[.4,1],[1.2,1],[-.4,.2],[.4,.2],[1.2,.2],[-.4,-.6],[.4,-.6],[1.2,-.6],[-.4,-1.4],[.4,-1.4],[1.2,-1.4],[2.2,1],[3,1],[3.8,1],[2.2,.2],[3,.2],[3.8,.2],[2.2,-.6],[3,-.6],[3.8,-.6],[2.2,-1.4],[3,-1.4],[3.8,-1.4],[-3,-2.6],[-2.2,-2.6],[-1.4,-2.6],[-2.2,-3.4],[-3,-4.2],[-1.4,-4.2]].forEach(([t,f])=>{const s=new W(F,p.clone());s.material=p,s.position.set(t,f,0),a.add(s)}),x.add(a);const v=new L,b=500,c=new Float32Array(b*3);for(let t=0;t<b;t++)c[t*3]=(Math.random()-.5)*20,c[t*3+1]=(Math.random()-.5)*15,c[t*3+2]=(Math.random()-.5)*10-5;v.setAttribute("position",new T(c,3));const C=new H({color:58879,size:.03,transparent:!0,opacity:.6,blending:_}),y=new I(v,C);x.add(y);const S=t=>{const f=t.clientX/window.innerWidth*2-1,s=-(t.clientY/window.innerHeight)*2+1;m.current={x:f,y:s},A({x:t.clientX,y:t.clientY})};window.addEventListener("mousemove",S);const j=()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",j);function M(){g.current=requestAnimationFrame(M);const t=(Date.now()-E.current)/1e3;i.uTime.value=t,i.uMouse.value.x+=(m.current.x-i.uMouse.value.x)*.05,i.uMouse.value.y+=(m.current.y-i.uMouse.value.y)*.05,a.rotation.y=Math.sin(t*.2)*.1,a.rotation.x=Math.cos(t*.15)*.05,y.rotation.y=t*.02,o.render(x,r)}return M(),()=>{cancelAnimationFrame(g.current),window.removeEventListener("mousemove",S),window.removeEventListener("resize",j),o.dispose(),F.dispose(),v.dispose(),p.dispose(),C.dispose(),h.contains(o.domElement)&&h.removeChild(o.domElement)}},[d]),d?e.jsxs("div",{"code-path":"src/sections/FinalSection.tsx:213:5",ref:u,className:"relative w-full",style:{height:"100vh",zIndex:10},children:[e.jsx("div",{"code-path":"src/sections/FinalSection.tsx:219:7",className:"absolute inset-0 bg-cover bg-center",style:{backgroundImage:"url(./images/final-bg.jpg)"},children:e.jsx("div",{"code-path":"src/sections/FinalSection.tsx:223:9",className:"absolute inset-0 bg-[#020B26]/60"})}),e.jsx("div",{"code-path":"src/sections/FinalSection.tsx:227:7",className:"absolute inset-0"}),e.jsx("div",{"code-path":"src/sections/FinalSection.tsx:230:7",className:"fixed pointer-events-none z-50 hidden md:block",style:{left:w.x-150,top:w.y-150,width:300,height:300,background:"radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)",borderRadius:"50%",transition:"left 0.1s ease-out, top 0.1s ease-out"}}),e.jsx("div",{"code-path":"src/sections/FinalSection.tsx:244:7",className:"absolute inset-0 flex flex-col items-center justify-end pb-[15%] pointer-events-none",children:e.jsxs("div",{"code-path":"src/sections/FinalSection.tsx:246:9",className:"text-center max-w-2xl mx-4",children:[e.jsxs("div",{"code-path":"src/sections/FinalSection.tsx:247:11",className:"flex items-center justify-center gap-3 mb-6",children:[e.jsx("div",{"code-path":"src/sections/FinalSection.tsx:248:13",className:"w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF9E00] flex items-center justify-center",children:e.jsx("span",{"code-path":"src/sections/FinalSection.tsx:249:15",className:"text-white font-bold text-lg",children:"A"})}),e.jsx("span",{"code-path":"src/sections/FinalSection.tsx:251:13",className:"font-orbitron text-2xl text-white font-bold",children:"阿里云"})]}),e.jsxs("h2",{"code-path":"src/sections/FinalSection.tsx:254:11",className:"text-4xl md:text-6xl font-bold mb-4",children:[e.jsx("span",{"code-path":"src/sections/FinalSection.tsx:255:13",className:"text-gradient-cyan glow-cyan",children:"让想象"}),e.jsx("span",{"code-path":"src/sections/FinalSection.tsx:256:13",className:"text-gradient-amber glow-amber",children:"，触手可及"})]}),e.jsx("p",{"code-path":"src/sections/FinalSection.tsx:259:11",className:"text-white/60 text-lg mb-2",children:"千问大模型 — AI时代的操作系统"}),e.jsx("p",{"code-path":"src/sections/FinalSection.tsx:262:11",className:"text-white/40 text-sm mb-8",children:"助力千行百业的AI应用创新实现"}),e.jsxs("a",{"code-path":"src/sections/FinalSection.tsx:266:11",href:"https://www.aliyun.com/product/tongyi",target:"_blank",rel:"noopener noreferrer",className:`pointer-events-auto inline-flex items-center gap-2 px-8 py-3.5 rounded-full
              bg-gradient-to-r from-[#00E5FF]/20 to-[#FF9E00]/20
              border border-[#00E5FF]/40 text-white font-medium
              hover:from-[#00E5FF]/30 hover:to-[#FF9E00]/30
              hover:border-[#00E5FF] hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]
              transition-all duration-500`,children:[e.jsx("span",{"code-path":"src/sections/FinalSection.tsx:277:13",children:"了解千问大模型"}),e.jsx("svg",{"code-path":"src/sections/FinalSection.tsx:278:13",className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{"code-path":"src/sections/FinalSection.tsx:279:15",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M14 5l7 7m0 0l-7 7m7-7H3"})})]})]})}),e.jsx("div",{"code-path":"src/sections/FinalSection.tsx:286:7",className:"absolute bottom-6 left-0 right-0 text-center",children:e.jsx("p",{"code-path":"src/sections/FinalSection.tsx:287:9",className:"text-white/20 text-xs",children:"第18届全国大学生广告艺术大赛 · 阿里云命题作品"})})]}):null}export{J as default};
