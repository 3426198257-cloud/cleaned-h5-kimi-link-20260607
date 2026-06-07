import{r as t,j as e}from"./index-CGMunQbH.js";import{S as U,b as Z,W as ee,B as te,c as p,C as D,a as se,A as ne,d as ae}from"./three.module-D1YwtV8-.js";const re=`
attribute float aScale;
attribute vec3 aVelocity;
attribute float aLife;
attribute float aRandom;

uniform float uTime;
uniform float uProgress;

varying float vLife;
varying float vAlpha;

void main() {
  vec3 pos = position;
  
  // Explosion effect based on progress
  float explodeProgress = smoothstep(0.0, 0.5, uProgress);
  pos += aVelocity * explodeProgress * 8.0;
  
  // Rotation during explosion
  float angle = uTime * 0.5 * aRandom;
  mat3 rotY = mat3(
    cos(angle), 0.0, sin(angle),
    0.0, 1.0, 0.0,
    -sin(angle), 0.0, cos(angle)
  );
  pos = rotY * pos;
  
  // Fade out after explosion
  vLife = 1.0 - smoothstep(0.3, 1.0, uProgress);
  vAlpha = aLife * (1.0 - smoothstep(0.0, 0.4, uProgress) * 0.8);
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aScale * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`,oe=`
uniform vec3 uColor1;
uniform vec3 uColor2;

varying float vLife;
varying float vAlpha;

void main() {
  // Circular particle shape
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  
  // Soft glow edge
  float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
  alpha *= vAlpha;
  
  // Color mixing
  vec3 color = mix(uColor1, uColor2, 1.0 - vLife);
  color += (1.0 - vLife) * 0.3;
  
  gl_FragColor = vec4(color, alpha * 0.8);
}
`,q=[{label:"赛博敦煌",image:{src:"/images/cyber-dunhuang.jpg",title:"赛博敦煌",description:"千年壁画遇见AI，飞天在数字空间中重生"}},{label:"未来农场",image:{src:"/images/future-farm.jpg",title:"未来农场",description:"垂直农业与生物科技，让城市成为森林"}},{label:"深海光城",image:{src:"/images/nebula-bg.jpg",title:"深海光城",description:"海底万米，AI建造的发光城市"}}],S=["正在调用视觉生成模型...","色彩平衡已校准...","语义理解完成...","概念渲染中...","万相绘境 · 生成完毕"];function le({isActive:T}){const W=t.useRef(null),E=t.useRef(null),I=t.useRef(0),Q=t.useRef(Date.now()),N=t.useRef(null),o=t.useRef(null),[$,L]=t.useState(null),[g,y]=t.useState(!1),[u,k]=t.useState(null),[J,f]=t.useState(""),[v,w]=t.useState(0),[x,A]=t.useState(0),m=t.useRef(0),h=t.useRef(!1);t.useEffect(()=>{if(!T||!W.current){o.current&&(o.current(),o.current=null);return}if(E.current)return;const n=W.current,a=new U,b=new Z(60,window.innerWidth/window.innerHeight,.1,100);b.position.z=5;const r=new ee({antialias:!0,alpha:!0});r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setSize(window.innerWidth,window.innerHeight),r.setClearColor(0,0),n.appendChild(r.domElement),E.current=r;const c=3e3,F=new Float32Array(c*3),_=new Float32Array(c),C=new Float32Array(c*3),z=new Float32Array(c),B=new Float32Array(c);for(let s=0;s<c;s++){const l=Math.random()*Math.PI*2,d=Math.acos(2*Math.random()-1),M=1.5+Math.random()*.5;F[s*3]=M*Math.sin(d)*Math.cos(l),F[s*3+1]=M*Math.sin(d)*Math.sin(l),F[s*3+2]=M*Math.cos(d),C[s*3]=Math.sin(d)*Math.cos(l),C[s*3+1]=Math.sin(d)*Math.sin(l),C[s*3+2]=Math.cos(d),_[s]=Math.random()*4+2,z[s]=Math.random(),B[s]=Math.random()}const i=new te;i.setAttribute("position",new p(F,3)),i.setAttribute("aScale",new p(_,1)),i.setAttribute("aVelocity",new p(C,3)),i.setAttribute("aLife",new p(z,1)),i.setAttribute("aRandom",new p(B,1));const j={uTime:{value:0},uProgress:{value:0},uColor1:{value:new D("#00E5FF")},uColor2:{value:new D("#FF9E00")}},P=new se({vertexShader:re,fragmentShader:oe,uniforms:j,transparent:!0,blending:ne,depthWrite:!1});N.current=P;const R=new ae(i,P);a.add(R);let V=0,H=0;const G=s=>{V=(s.clientX/window.innerWidth-.5)*2,H=(s.clientY/window.innerHeight-.5)*2};window.addEventListener("mousemove",G);const Y=()=>{b.aspect=window.innerWidth/window.innerHeight,b.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",Y);function X(){I.current=requestAnimationFrame(X);const s=(Date.now()-Q.current)/1e3;j.uTime.value=s;const l=m.current;j.uProgress.value+=(l-j.uProgress.value)*.03,R.rotation.y=s*.1+V*.3,R.rotation.x=H*.2,r.render(a,b)}return X(),o.current=()=>{cancelAnimationFrame(I.current),window.removeEventListener("mousemove",G),window.removeEventListener("resize",Y),r.dispose(),i.dispose(),P.dispose(),n.contains(r.domElement)&&n.removeChild(r.domElement),E.current=null},()=>{o.current&&(o.current(),o.current=null)}},[T]),t.useEffect(()=>{if(!g||x>=S.length)return;const n=S[x];if(v<=n.length){const a=setTimeout(()=>{f(n.slice(0,v)),w(v+1)},50);return()=>clearTimeout(a)}else{const a=setTimeout(()=>{A(x+1),w(0),x+1<S.length&&f("")},400);return()=>clearTimeout(a)}},[g,v,x]);const K=t.useCallback(n=>{if(h.current)return;h.current=!0,L(n),y(!1),f(""),w(0),A(0),m.current=0;const a=setInterval(()=>{m.current+=.015,m.current>=1&&(clearInterval(a),setTimeout(()=>{k(q[n].image),y(!0),h.current=!1},300))},16)},[]),O=t.useCallback(()=>{m.current=0,L(null),y(!1),k(null),f(""),w(0),A(0),h.current=!1,N.current&&(N.current.uniforms.uProgress.value=0)},[]);return e.jsx("div",{"code-path":"src/sections/WanxiangCanvas.tsx:320:5",ref:W,className:"relative w-full h-full",children:e.jsxs("div",{"code-path":"src/sections/WanxiangCanvas.tsx:325:7",className:"absolute inset-0 flex flex-col items-center justify-center pointer-events-none",children:[e.jsxs("div",{"code-path":"src/sections/WanxiangCanvas.tsx:327:9",className:"absolute top-[8%] text-center",children:[e.jsx("h2",{"code-path":"src/sections/WanxiangCanvas.tsx:328:11",className:"font-orbitron text-2xl md:text-4xl font-bold text-gradient-amber glow-amber tracking-widest mb-2",children:"WANXIANG CANVAS"}),e.jsx("p",{"code-path":"src/sections/WanxiangCanvas.tsx:331:11",className:"text-[#FF9E00]/60 text-sm md:text-base tracking-[0.2em]",children:"万相绘境 · AI创想生成器"})]}),!g&&e.jsxs("div",{"code-path":"src/sections/WanxiangCanvas.tsx:338:11",className:"pointer-events-auto bg-[#020B26]/80 backdrop-blur-xl border border-[#00E5FF]/20 rounded-2xl p-6 md:p-8 max-w-lg mx-4",children:[e.jsxs("div",{"code-path":"src/sections/WanxiangCanvas.tsx:339:13",className:"flex items-start gap-3 mb-4",children:[e.jsx("div",{"code-path":"src/sections/WanxiangCanvas.tsx:340:15",className:"w-8 h-8 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#0088AA] flex items-center justify-center flex-shrink-0",children:e.jsx("span",{"code-path":"src/sections/WanxiangCanvas.tsx:341:17",className:"text-white text-xs font-bold",children:"Q"})}),e.jsxs("div",{"code-path":"src/sections/WanxiangCanvas.tsx:343:15",children:[e.jsx("p",{"code-path":"src/sections/WanxiangCanvas.tsx:344:17",className:"text-[#00E5FF] text-sm font-medium mb-1",children:"千问"}),e.jsx("p",{"code-path":"src/sections/WanxiangCanvas.tsx:345:17",className:"text-white/80 text-sm",children:"输入你的创想，让万相赋予它形态"})]})]}),e.jsx("div",{"code-path":"src/sections/WanxiangCanvas.tsx:351:13",className:"flex flex-wrap gap-3",children:q.map((n,a)=>e.jsx("button",{"code-path":"src/sections/WanxiangCanvas.tsx:353:17",onClick:()=>K(a),disabled:h.current,className:`
                    px-5 py-2.5 rounded-full border text-sm font-medium
                    transition-all duration-300
                    ${$===a?"bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)]":"border-[#00E5FF]/30 text-[#00E5FF]/70 hover:border-[#00E5FF] hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"}
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `,children:n.label},n.label))}),e.jsxs("div",{"code-path":"src/sections/WanxiangCanvas.tsx:372:13",className:"mt-4 flex items-center gap-2 text-white/40 text-xs",children:[e.jsx("span",{"code-path":"src/sections/WanxiangCanvas.tsx:373:15",className:"inline-block w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"}),e.jsx("span",{"code-path":"src/sections/WanxiangCanvas.tsx:374:15",children:"万相视觉模型已就绪"})]})]}),g&&u&&e.jsxs("div",{"code-path":"src/sections/WanxiangCanvas.tsx:381:11",className:"pointer-events-auto flex flex-col items-center max-w-2xl mx-4",children:[e.jsxs("div",{"code-path":"src/sections/WanxiangCanvas.tsx:382:13",className:"relative rounded-2xl overflow-hidden border border-[#00E5FF]/30 shadow-[0_0_60px_rgba(0,229,255,0.15)]",children:[e.jsx("img",{"code-path":"src/sections/WanxiangCanvas.tsx:383:15",src:u.src,alt:u.title,className:"w-full max-h-[50vh] object-cover"}),e.jsx("div",{"code-path":"src/sections/WanxiangCanvas.tsx:388:15",className:"absolute inset-0 bg-gradient-to-t from-[#020B26]/80 via-transparent to-transparent"}),e.jsxs("div",{"code-path":"src/sections/WanxiangCanvas.tsx:389:15",className:"absolute bottom-0 left-0 right-0 p-6",children:[e.jsx("h3",{"code-path":"src/sections/WanxiangCanvas.tsx:390:17",className:"text-2xl font-bold text-white mb-1",children:u.title}),e.jsx("p",{"code-path":"src/sections/WanxiangCanvas.tsx:391:17",className:"text-white/70 text-sm",children:u.description})]})]}),e.jsx("div",{"code-path":"src/sections/WanxiangCanvas.tsx:395:13",className:"mt-4 text-left w-full",children:e.jsxs("p",{"code-path":"src/sections/WanxiangCanvas.tsx:396:15",className:"text-[#00E5FF]/80 text-sm font-mono",children:[J,e.jsx("span",{"code-path":"src/sections/WanxiangCanvas.tsx:398:17",className:"inline-block w-0.5 h-4 bg-[#00E5FF] ml-0.5 animate-pulse"})]})}),e.jsx("button",{"code-path":"src/sections/WanxiangCanvas.tsx:402:13",onClick:O,className:`mt-6 px-6 py-2.5 rounded-full border border-[#FF9E00]/40 text-[#FF9E00] text-sm
                hover:bg-[#FF9E00]/10 hover:border-[#FF9E00] transition-all duration-300`,children:"再次创作"})]})]})})}export{le as default};
