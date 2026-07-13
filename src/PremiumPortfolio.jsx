import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './PremiumPortfolio.css';

const PremiumPortfolio = ({ projects, timeline, onBack }) => {
  const threejsRef = useRef(null);
  const shaderRef = useRef(null);
  
  // Set up mouse interaction for cards
  useEffect(() => {
    const cards = document.querySelectorAll('.glass-card');
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };
    cards.forEach(card => card.addEventListener('mousemove', handleMouseMove));
    return () => cards.forEach(card => card.removeEventListener('mousemove', handleMouseMove));
  }, [projects, timeline]);

  // Set up observer for animations
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.premium-section-content, .glass-card').forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects, timeline]);

  // WebGL Aurora Shader Background
  useEffect(() => {
    const canvas = shaderRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;
    
    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;
    vec3 bg = vec3(0.02, 0.03, 0.09);
    
    float t = u_time * 0.2;
    vec3 blue = vec3(0.23, 0.51, 0.96);
    vec3 purple = vec3(0.55, 0.36, 0.96);
    vec3 cyan = vec3(0.02, 0.71, 0.83);
    
    float n1 = sin(uv.x * 3.0 + t) * 0.5 + 0.5;
    float n2 = sin(uv.y * 2.0 - t * 1.5) * 0.5 + 0.5;
    
    vec3 aurora = mix(blue, purple, n1);
    aurora = mix(aurora, cyan, n2 * 0.5);
    
    float mask = pow(1.0 - distance(uv, vec2(0.5)), 3.0);
    vec3 finalColor = mix(bg, aurora, mask * 0.4);
    
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += noise * 0.02;
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;

    function cs(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    
    const prog = gl.createProgram();
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    
    let animationFrameId;
    function render(t) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  // ThreeJS Tech Cube Animation
  useEffect(() => {
    const container = threejsRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x3B82F6, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshPhongMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
      emissive: 0x1a2a4a
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const sphereGroup = new THREE.Group();
    const iconColors = [0x3B82F6, 0x8B5CF6, 0x06B6D4, 0x22C55E];
    for (let i = 0; i < 6; i++) {
      const sGeom = new THREE.SphereGeometry(0.2, 32, 32);
      const sMat = new THREE.MeshPhongMaterial({ color: iconColors[i % 4] });
      const sphere = new THREE.Mesh(sGeom, sMat);
      sphere.position.set(
        Math.cos(i * 1.5) * 2.5,
        Math.sin(i * 1.5) * 2.5,
        Math.sin(i * 3.0) * 1.0
      );
      sphereGroup.add(sphere);
    }
    scene.add(sphereGroup);

    camera.position.z = 6;

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      sphereGroup.rotation.z += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="premium-body selection:bg-[#adc6ff] selection:text-[#002e6a]">
      {/* Background Aurora Shader */}
      <div className="aurora-container">
        <div className="absolute inset-0 w-full h-full opacity-60">
          <canvas ref={shaderRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
        </div>
      </div>

      {/* Navigation */}
      <header className="fixed top-4 left-4 right-4 rounded-full bg-[#10131a]/30 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(173,198,255,0.1)] flex justify-between items-center px-6 py-3 max-w-md mx-auto z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <span className="material-symbols-outlined text-[#adc6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back</span>
          <span className="font-['Space_Grotesk'] text-[24px] leading-[1.3] font-bold tracking-tighter text-[#adc6ff]">JK.DEV</span>
        </div>
        <button className="material-symbols-outlined text-[#c2c6d6] hover:bg-white/5 transition-all p-2 rounded-full active:scale-95">dark_mode</button>
      </header>

      {/* Bottom Nav */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center z-50 w-fit mx-auto gap-4 bg-[#10131a]/20 backdrop-blur-2xl border border-white/10 rounded-full px-4 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] md:hidden">
        <a className="flex items-center justify-center bg-[#4d8eff]/80 text-[#00285d] rounded-full p-3 shadow-[0_0_15px_rgba(77,142,255,0.4)] active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined">grid_view</span>
        </a>
        <a className="flex items-center justify-center text-[#c2c6d6]/60 p-3 hover:text-[#adc6ff] transition-colors" href="#about">
          <span className="material-symbols-outlined">person</span>
        </a>
        <a className="flex items-center justify-center text-[#c2c6d6]/60 p-3 hover:text-[#adc6ff] transition-colors" href="#tech">
          <span className="material-symbols-outlined">code</span>
        </a>
        <a className="flex items-center justify-center text-[#c2c6d6]/60 p-3 hover:text-[#adc6ff] transition-colors" href="#contact">
          <span className="material-symbols-outlined">mail</span>
        </a>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col pt-32 pb-24 px-6 md:px-12 premium-section-content">
          <div className="flex-1 flex flex-col items-center text-center">
            <h1 className="font-['Space_Grotesk'] text-[64px] leading-tight text-white mb-6 font-bold tracking-[-0.04em]">
              Building <span className="text-[#adc6ff]">Digital</span> Experiences
            </h1>
            <p className="font-['Inter'] text-[18px] leading-[1.6] text-[#c2c6d6] max-w-sm mb-10 opacity-80">
              Laravel Developer & UI/UX Designer crafting high-performance, cinematic web applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="glow-button bg-[#4d8eff] text-[#00285d] px-8 py-4 rounded-full font-['JetBrains_Mono'] text-[12px] font-bold tracking-[0.1em] uppercase">VIEW PROJECTS</button>
              <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-['JetBrains_Mono'] text-[12px] font-bold tracking-[0.1em] uppercase hover:bg-white/10 transition-all">RESUME</button>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] md:h-[600px] mt-8 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 w-full h-full" style={{ display: 'block' }}>
              <div ref={threejsRef} style={{ width: '100%', height: '100%' }}></div>
            </div>
          </div>
          
          <div className="flex justify-center gap-8 mt-12 opacity-50">
            <a className="hover:text-[#adc6ff] transition-colors" href="#"><span className="material-symbols-outlined text-[24px]">public</span></a>
            <a className="hover:text-[#adc6ff] transition-colors" href="#"><span className="material-symbols-outlined text-[24px]">alternate_email</span></a>
            <a className="hover:text-[#adc6ff] transition-colors" href="#"><span className="material-symbols-outlined text-[24px]">terminal</span></a>
          </div>
        </section>

        {/* About Bento Grid */}
        <section className="px-6 py-24 premium-section-content" id="about">
          <h2 className="font-['Space_Grotesk'] text-[32px] leading-[1.3] font-semibold text-[#adc6ff] mb-12 flex items-center gap-3">
            <span className="material-symbols-outlined">person_pin</span> About Me
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="col-span-2 row-span-2 glass-card h-[300px]">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="Developer portrait" />
            </div>
            <div className="col-span-2 glass-card p-8 flex flex-col justify-center">
              <p className="font-['Inter'] text-[18px] leading-relaxed text-[#e1e2ec]">
                I specialize in building robust backends with Laravel and crafting pixel-perfect interfaces that prioritize user flow and high-end aesthetics.
              </p>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <span className="font-['Space_Grotesk'] text-[#adc6ff] text-[32px] font-bold mb-1">3+</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#c2c6d6] tracking-[0.1em] uppercase">YEARS EXP</span>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <span className="font-['Space_Grotesk'] text-[#4cd7f6] text-[32px] font-bold mb-1">{projects.length}+</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#c2c6d6] tracking-[0.1em] uppercase">PROJECTS</span>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <span className="font-['Space_Grotesk'] text-[#d0bcff] text-[32px] font-bold mb-1">25+</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#c2c6d6] tracking-[0.1em] uppercase">CLIENTS</span>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-[#adc6ff] mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
              <span className="font-['Space_Grotesk'] text-white text-[32px] font-bold mb-1">999+</span>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="px-6 py-24 bg-[#0b0e15]/30 premium-section-content" id="tech">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-['Space_Grotesk'] text-[32px] font-semibold text-white mb-4">Mastered Ecosystem</h2>
              <p className="font-['Inter'] text-[16px] text-[#c2c6d6]">My core toolset for building modern digital products.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-6 flex flex-col items-center gap-3 group hover:border-[#adc6ff]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#adc6ff]/10 flex items-center justify-center text-[#adc6ff] group-hover:shadow-[0_0_15px_rgba(173,198,255,0.3)] transition-all">
                  <span className="material-symbols-outlined text-3xl">developer_board</span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] uppercase text-white">Laravel</span>
              </div>
              <div className="glass-card p-6 flex flex-col items-center gap-3 group hover:border-[#4cd7f6]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#4cd7f6]/10 flex items-center justify-center text-[#4cd7f6] group-hover:shadow-[0_0_15px_rgba(76,215,246,0.3)] transition-all">
                  <span className="material-symbols-outlined text-3xl">data_object</span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] uppercase text-white">React.js</span>
              </div>
              <div className="glass-card p-6 flex flex-col items-center gap-3 group hover:border-[#d0bcff]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#d0bcff]/10 flex items-center justify-center text-[#d0bcff] group-hover:shadow-[0_0_15px_rgba(208,188,255,0.3)] transition-all">
                  <span className="material-symbols-outlined text-3xl">cloud</span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] uppercase text-white">AWS/Cloud</span>
              </div>
              <div className="glass-card p-6 flex flex-col items-center gap-3 group hover:border-[#adc6ff]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#adc6ff]/10 flex items-center justify-center text-[#adc6ff] group-hover:shadow-[0_0_15px_rgba(173,198,255,0.3)] transition-all">
                  <span className="material-symbols-outlined text-3xl">token</span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] uppercase text-white">Next.js</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Showcase using Live Data */}
        <section className="py-24 overflow-hidden premium-section-content">
          <div className="px-6 mb-12 flex justify-between items-end">
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#adc6ff] tracking-widest uppercase">Portfolio</span>
              <h2 className="font-['Space_Grotesk'] text-[32px] font-semibold text-white">Featured Works</h2>
            </div>
            <button className="material-symbols-outlined text-[#adc6ff] p-2 border border-[#adc6ff]/20 rounded-full hover:bg-[#adc6ff]/10 transition-colors">arrow_forward</button>
          </div>
          <div className="flex gap-6 overflow-x-auto px-6 no-scrollbar snap-x pb-8">
            {projects.slice(0, 5).map((project, idx) => (
              <div key={idx} className="min-w-[320px] md:min-w-[450px] snap-center glass-card group cursor-pointer" onClick={() => window.open(project.github || project.live, '_blank')}>
                <div className="h-64 w-full relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1555099962-4199c345e5dd" alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="flex gap-2 mb-4">
                    {project.tech.slice(0, 2).map((t, i) => (
                      <span key={i} className={`bg-[#adc6ff]/10 text-[#adc6ff] text-[10px] font-['JetBrains_Mono'] px-3 py-1 rounded-full border border-[#adc6ff]/20`}>{t.toUpperCase()}</span>
                    ))}
                  </div>
                  <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold text-white mb-2">{project.title}</h3>
                  <p className="font-['Inter'] text-[14px] text-[#c2c6d6] mb-6 line-clamp-2">{project.desc}</p>
                  <button className="flex items-center gap-2 text-[#adc6ff] font-['JetBrains_Mono'] text-[12px] group-hover:gap-4 transition-all tracking-[0.1em]">
                    LIVE DEMO <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline / Experience using Live Data */}
        <section className="px-6 py-24 relative overflow-hidden premium-section-content">
          <h2 className="font-['Space_Grotesk'] text-[32px] font-semibold text-white mb-16">Journey</h2>
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#adc6ff] via-[#d0bcff] to-transparent"></div>
            {timeline.map((item, idx) => (
              <div key={idx} className="mb-16 relative">
                <div className={`absolute -left-[37px] top-1 w-4 h-4 rounded-full border-4 border-[#10131a] ${idx % 2 === 0 ? 'bg-[#adc6ff] shadow-[0_0_10px_rgba(173,198,255,0.8)]' : 'bg-[#d0bcff]'}`}></div>
                <span className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.1em] mb-2 block ${idx % 2 === 0 ? 'text-[#adc6ff]' : 'text-[#d0bcff]'}`}>{item.year}</span>
                <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold text-white">{item.role}</h3>
                <p className="font-['Inter'] text-[16px] text-[#c2c6d6] mt-2">{item.company} — {item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="px-6 py-24 premium-section-content">
          <h2 className="font-['Space_Grotesk'] text-[32px] font-semibold text-white text-center mb-16">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-8 flex flex-col gap-4 group">
              <span className="material-symbols-outlined text-4xl text-[#adc6ff]">layers</span>
              <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold text-white">Custom Laravel Dev</h3>
              <p className="font-['Inter'] text-[14px] text-[#c2c6d6]">Highly secure, scalable, and modular backend architectures built for longevity.</p>
            </div>
            <div className="glass-card p-8 flex flex-col gap-4">
              <span className="material-symbols-outlined text-4xl text-[#4cd7f6]">draw</span>
              <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold text-white">Premium UI/UX</h3>
              <p className="font-['Inter'] text-[14px] text-[#c2c6d6]">Experience-first design focused on aesthetics, conversions, and high-end feel.</p>
            </div>
            <div className="glass-card p-8 flex flex-col gap-4">
              <span className="material-symbols-outlined text-4xl text-[#d0bcff]">cloud_sync</span>
              <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold text-white">Cloud Architecture</h3>
              <p className="font-['Inter'] text-[14px] text-[#c2c6d6]">Reliable AWS and Docker deployments ensuring 99.9% uptime for your product.</p>
            </div>
            <div className="glass-card p-8 flex flex-col gap-4">
              <span className="material-symbols-outlined text-4xl text-[#adc6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold text-white">AI Integration</h3>
              <p className="font-['Inter'] text-[14px] text-[#c2c6d6]">Automating workflows and adding intelligence with custom LLM implementations.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 py-24 premium-section-content" id="contact">
          <div className="glass-card p-8 md:p-12 relative">
            <div className="mb-10">
              <h2 className="font-['Space_Grotesk'] text-[48px] font-bold tracking-tight text-white mb-2">Let's build something.</h2>
              <p className="font-['Inter'] text-[16px] text-[#c2c6d6]">Open for elite project collaborations and senior roles.</p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-['JetBrains_Mono'] text-[10px] tracking-widest text-[#c2c6d6] ml-2">NAME</label>
                  <input className="w-full bg-[#0b0e15]/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-1 focus:ring-[#adc6ff] focus:border-[#adc6ff] outline-none transition-all placeholder:text-white/20" placeholder="John Doe" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="font-['JetBrains_Mono'] text-[10px] tracking-widest text-[#c2c6d6] ml-2">EMAIL</label>
                  <input className="w-full bg-[#0b0e15]/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-1 focus:ring-[#adc6ff] focus:border-[#adc6ff] outline-none transition-all placeholder:text-white/20" placeholder="john@company.com" type="email"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-['JetBrains_Mono'] text-[10px] tracking-widest text-[#c2c6d6] ml-2">MESSAGE</label>
                <textarea className="w-full bg-[#0b0e15]/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-1 focus:ring-[#adc6ff] focus:border-[#adc6ff] outline-none transition-all placeholder:text-white/20" placeholder="Describe your vision..." rows="4"></textarea>
              </div>
              <button className="glow-button w-full bg-[#4d8eff] text-[#00285d] font-['JetBrains_Mono'] text-[12px] font-bold py-5 rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-3 tracking-[0.1em]">
                SEND MESSAGE <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/5 flex flex-col items-center text-center premium-section-content">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-[#adc6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            <span className="font-['Space_Grotesk'] text-[32px] font-bold text-[#adc6ff]">JK</span>
          </div>
          <p className="font-['JetBrains_Mono'] text-[10px] text-[#c2c6d6] opacity-50 uppercase tracking-[0.1em]">
            © 2024 JAYDEEP KHUNT. ALL RIGHTS RESERVED. <br/>
            DESIGNED & DEVELOPED WITH PASSION.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default PremiumPortfolio;
