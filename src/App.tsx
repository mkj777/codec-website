import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

type ScenePanel = {
  id: string
  title: string
  subtitle: string
  tag: string
}

const panels: ScenePanel[] = [
  {
    id: 'enter',
    title: 'Enter the Library',
    subtitle: 'A living hub where every game glows, shifts, and responds to you.',
    tag: 'Neon gate',
  },
  {
    id: 'orbit',
    title: 'Control Your Universe',
    subtitle: 'Pin, launch, and glide through worlds in a holographic control room.',
    tag: 'Orbital UI',
  },
  {
    id: 'flow',
    title: 'Cinematic Flow',
    subtitle: 'GSAP timelines choreograph panels like a trailer reveal.',
    tag: 'Scroll-choreography',
  },
]

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const panelRefs = useRef<HTMLDivElement[]>([])

  const setPanelRef = (el: HTMLDivElement | null) => {
    if (el && !panelRefs.current.includes(el)) {
      panelRefs.current.push(el)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // WebGL scene building the abstract hero object
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog('#05060a', 6, 16)

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#7af5ff'),
      emissive: new THREE.Color('#1b4fff'),
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.55,
      transmission: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    })

    const coreGeometry = new THREE.SphereGeometry(2.2, 92, 92)
    const core = new THREE.Mesh(coreGeometry, mainMaterial)
    scene.add(core)

    const ringGroup = new THREE.Group()
    const ringGeometry = new THREE.TorusGeometry(2.8, 0.04, 10, 260)
    for (let i = 0; i < 6; i += 1) {
      const ring = new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? '#7af5ff' : '#bc7bff',
          wireframe: true,
          transparent: true,
          opacity: 0.26,
          blending: THREE.AdditiveBlending,
        }),
      )
      const scale = 0.8 + i * 0.16
      ring.scale.setScalar(scale)
      ring.rotation.x = Math.random() * Math.PI
      ring.rotation.y = Math.random() * Math.PI
      ringGroup.add(ring)
    }
    scene.add(ringGroup)

    const spiralPoints: THREE.Vector3[] = []
    for (let i = 0; i < 240; i += 1) {
      const t = (i / 240) * Math.PI * 6
      const radius = 1.1 + i * 0.006
      const x = Math.cos(t) * radius
      const y = (i - 120) * 0.028
      const z = Math.sin(t) * radius
      spiralPoints.push(new THREE.Vector3(x, y, z))
    }
    const spiralGeometry = new THREE.BufferGeometry().setFromPoints(spiralPoints)
    const spiral = new THREE.Line(
      spiralGeometry,
      new THREE.LineBasicMaterial({
        color: '#8ff9ff',
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      }),
    )
    scene.add(spiral)

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreGeometry, 15),
      new THREE.LineBasicMaterial({ color: '#bc7bff', transparent: true, opacity: 0.45 }),
    )
    scene.add(wire)

    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshBasicMaterial({
        color: '#7b92ff',
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    halo.position.z = -2.5
    halo.rotation.x = -0.4
    scene.add(halo)

    // Soft round particle texture
    const particleTexture = (() => {
      const size = 64
      const draw = document.createElement('canvas')
      draw.width = size
      draw.height = size
      const ctx = draw.getContext('2d')
      if (!ctx) return null
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      gradient.addColorStop(0, 'rgba(255,255,255,0.9)')
      gradient.addColorStop(0.45, 'rgba(255,255,255,0.6)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.fill()
      const texture = new THREE.CanvasTexture(draw)
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    })()

    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 600
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 5 + Math.random() * 6
      const angle = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 6
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        size: 0.12,
        color: '#92f4ff',
        transparent: true,
        opacity: 0.85,
        map: particleTexture ?? undefined,
        alphaMap: particleTexture ?? undefined,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    scene.add(particles)

    const light = new THREE.PointLight('#b5f6ff', 12, 20)
    light.position.set(3, 3, 5)
    scene.add(light)
    scene.add(new THREE.AmbientLight('#4c5ad6', 2.5))

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const w = width || window.innerWidth
      const h = height || window.innerHeight
      const aspect = w / h
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }

    resize()
    window.addEventListener('resize', resize)

    let frameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()
      core.rotation.x += 0.003
      core.rotation.y += 0.004
      wire.rotation.copy(core.rotation)
      particles.rotation.y += 0.0008
      ringGroup.rotation.y = elapsed * 0.2
      ringGroup.rotation.x = Math.sin(elapsed * 0.25) * 0.25
      spiral.rotation.y = elapsed * 0.35
      spiral.rotation.x = Math.sin(elapsed * 0.18) * 0.18
      halo.rotation.z = elapsed * 0.08
      const haloMaterial = halo.material as THREE.MeshBasicMaterial
      haloMaterial.opacity = 0.12 + Math.sin(elapsed * 0.9) * 0.03
      camera.position.x = Math.sin(elapsed * 0.12) * 0.3
      camera.position.y = Math.sin(elapsed * 0.18) * 0.25
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      coreGeometry.dispose()
      mainMaterial.dispose()
      particlesGeometry.dispose()
      particleTexture?.dispose()
      ringGeometry.dispose()
      spiralGeometry.dispose()
      halo.geometry.dispose()
      ;(halo.material as THREE.Material).dispose()
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    if (!heroRef.current) return

    gsap.fromTo(
      heroRef.current.querySelectorAll('.hero__eyebrow, .hero__title, .hero__subtitle, .hero__actions'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out' },
    )

    panelRefs.current.forEach((panel) => {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 60, rotateX: -6 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        },
      )
    })

    ScrollTrigger.refresh()
  }, [])

  return (
    <div className="page">
      <header className="nav">
        <div className="nav__logo">Codec</div>
        <nav className="nav__links">
          <a href="#hero">Home</a>
          <a href="#trailer">Trailer</a>
          <a className="ghost" href="#download">Download</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="hero" ref={heroRef}>
          <div className="hero__canvas-wrap">
            <canvas ref={canvasRef} className="hero__canvas" />
            <div className="hero__gradient" />
            <div className="hero__halo" />
            <div className="hero__grid" />
            <div className="hero__scanlines" />
          </div>

          <div className="hero__content">
            <p className="hero__eyebrow">Windows Game Library</p>
            <h1 className="hero__title">Codec</h1>
            <p className="hero__subtitle">
              Futuristic hub for every world you own. Built like a cinematic control room.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary">Download fuer Windows</button>
              <button className="btn btn--ghost">Mehr erfahren</button>
            </div>
            <div className="hero__chips">
              <span className="chip">3D WebGL Hero</span>
              <span className="chip">GSAP Scrollflow</span>
              <span className="chip">Neon Glass UI</span>
            </div>
          </div>
        </section>

        <section className="panel-grid" id="trailer">
          {panels.map((panel) => (
            <div key={panel.id} className="panel" ref={setPanelRef}>
              <div className="panel__tag">{panel.tag}</div>
              <h2 className="panel__title">{panel.title}</h2>
              <p className="panel__subtitle">{panel.subtitle}</p>
              <div className="panel__orb" />
              <div className="panel__glow" />
            </div>
          ))}
        </section>

        <section className="showcase" id="download">
          <div className="showcase__left" ref={setPanelRef}>
            <p className="eyebrow">Cinematic Scroll</p>
            <h3>Scroll like a trailer.</h3>
            <p>Soft parallax, layered blur, and light that follows your pointer.</p>
            <div className="cta-row">
              <button className="btn btn--primary">Download fuer Windows</button>
              <button className="btn btn--ghost">Watch Trailer</button>
            </div>
          </div>
          <div className="showcase__right" ref={setPanelRef}>
            <div className="mockup">
              <div className="mockup__glass">
                <span>Codec HUD</span>
                <p>Layered hologram panels that react to GSAP timelines.</p>
              </div>
              <div className="mockup__grid">
                <div className="mockup__tile" />
                <div className="mockup__tile" />
                <div className="mockup__tile" />
                <div className="mockup__tile" />
              </div>
              <div className="mockup__pulse" />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Codec - 2025</span>
        <div className="footer__links">
          <a href="#">Twitter</a>
          <a href="#">Discord</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  )
}

export default App
