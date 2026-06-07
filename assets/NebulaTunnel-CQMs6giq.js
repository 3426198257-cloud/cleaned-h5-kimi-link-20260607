import{r as o,j as g}from"./index-CGMunQbH.js";import{S as y,O as R,W as C,a as I,V as E,P as S,M as U}from"./three.module-D1YwtV8-.js";const T=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,V=`
uniform float iTime;
uniform float opacity;
uniform float scrollSpeed;
uniform float tunnelIntensity;
uniform float distortionAmount;
uniform float mouseInfluence;
uniform vec2 uResolution;
varying vec2 vUv;

#define PI 3.14159265359
#define TAU 6.28318530718

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float f = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 6; i++) {
    f += amp * noise(p * freq);
    amp *= 0.5;
    freq *= 2.0;
  }
  return f;
}

vec2 glitchPattern(vec2 uv, float t) {
  float rnd = hash(vec2(floor(t * 7.0), floor(uv.y * 15.0)));
  float shift = step(0.85, rnd) * (hash(vec2(floor(t * 7.0), 0.0)) - 0.5) * 0.15;
  return vec2(uv.x + shift, uv.y);
}

void main() {
  float t = iTime * scrollSpeed;
  vec2 uv = vUv;

  // Center-based distortion
  uv.x -= 0.5;
  uv.x *= 1.0 + pow(abs(uv.y - 0.5), 2.0) * 0.5;
  uv.x += 0.5;

  // Mouse distortion
  vec2 distortedUV = glitchPattern(uv, iTime);
  distortedUV.x += mouseInfluence * 0.08;
  distortedUV.x += sin(distortedUV.y * PI) * distortionAmount * 0.1;

  // Polar coordinates
  vec2 center = vec2(0.5, 0.5);
  vec2 dir = distortedUV - center;
  float angle = atan(dir.y, dir.x);
  float radius = length(dir);

  // Nebula and star field
  float nebula = fbm(vec2(angle * 3.0 + t * 0.3, radius * 4.0 - t * 0.4));
  nebula = smoothstep(0.3, 0.7, nebula);
  float starField = pow(hash(floor(distortedUV * 200.0) / 200.0 + t), 20.0);

  // Brand colors
  vec3 color1 = vec3(0.0, 0.04, 0.15);
  vec3 color2 = vec3(0.0, 0.9, 1.0);
  vec3 color3 = vec3(1.0, 0.62, 0.0);

  vec3 nebulaColor = mix(color1, color2, nebula);
  nebulaColor = mix(nebulaColor, color3, smoothstep(0.5, 0.8, radius) * nebula);
  nebulaColor += starField * 0.8;

  // Radial glow
  float glow = exp(-radius * radius * 8.0) * tunnelIntensity;
  nebulaColor += color2 * glow * 0.5;
  nebulaColor += color3 * glow * 0.3;

  // Vignette
  float vignette = smoothstep(0.0, 0.7, 1.0 - radius);
  nebulaColor *= vignette;

  // Flicker
  float flicker = 0.95 + 0.05 * sin(iTime * 13.0);
  nebulaColor *= flicker;

  gl_FragColor = vec4(nebulaColor * opacity, 1.0);
}
`;function z({scrollProgress:l,mouseRef:i}){const s=o.useRef(null),m=o.useRef(null),h=o.useRef(null),u=o.useRef(0),p=o.useRef(Date.now());return o.useEffect(()=>{const n=s.current;if(!n)return;const c=new y,w=new R(-1,1,1,-1,0,1),e=new C({antialias:!1,alpha:!1});e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setSize(window.innerWidth,window.innerHeight),e.domElement.style.width="100%",e.domElement.style.height="100%",e.domElement.style.display="block",n.appendChild(e.domElement),m.current=e;const t={iTime:{value:0},opacity:{value:.15},scrollSpeed:{value:.15},tunnelIntensity:{value:.8},distortionAmount:{value:0},mouseInfluence:{value:0},uResolution:{value:new E(window.innerWidth,window.innerHeight)}},r=new I({vertexShader:T,fragmentShader:V,uniforms:t,transparent:!1});h.current=r;const d=new S(2,2),x=new U(d,r);c.add(x);const f=()=>{e.setSize(window.innerWidth,window.innerHeight),t.uResolution.value.set(window.innerWidth,window.innerHeight)};window.addEventListener("resize",f);function v(){u.current=requestAnimationFrame(v);const b=(Date.now()-p.current)/1e3;t.iTime.value=b,t.mouseInfluence.value+=(i.current.normalizedX*.3-t.mouseInfluence.value)*.05,t.distortionAmount.value+=(Math.abs(i.current.normalizedY)*.5-t.distortionAmount.value)*.05;const a=Math.min(l.current*3,1);t.opacity.value=.15+a*.25,t.tunnelIntensity.value=.8+a*.4,t.scrollSpeed.value=.15+a*.1,e.render(c,w)}return v(),()=>{cancelAnimationFrame(u.current),window.removeEventListener("resize",f),e.dispose(),d.dispose(),r.dispose(),n.contains(e.domElement)&&n.removeChild(e.domElement)}},[i,l]),g.jsx("div",{"code-path":"src/sections/NebulaTunnel.tsx:201:5",ref:s,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:1}})}export{z as default};
