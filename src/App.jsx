import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Loader from './loader';
import './index.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Button from 'react-bootstrap/Button';
import WelcomeAlert from './welcomealert';
import { AlertHeading } from 'react-bootstrap';
import { p } from 'framer-motion/client';
import Dropdown from 'react-bootstrap/Dropdown';
// import { Link } from 'react-router-dom';

// ---------------------------
// Projects data (editable)
// ---------------------------
const projects = [
{
id: 'todo',
title: 'To-Do List App',
desc: 'Task manager with add/remove/complete. LocalStorage persistence.',
tech: ['HTML', 'CSS', 'JavaScript'],
image: 'https://www.figma.com/community/resource/b271059c-1968-43e8-8b18-de14637e0398/thumbnail',
github: 'https://github.com/Ayan-Ahmad-90/todo-app',
live: 'https://ayan-ahmad-90.github.io/todo-app/',
},
{
id: 'rps',
title: 'Rock Paper Scissors',
desc: '5-round match with animation & sound effects.',
tech: ['HTML', 'CSS', 'JavaScript'],
image: 'https://img.freepik.com/free-vector/rock-paper-scissors-banner_107791-8387.jpg',
github: 'https://github.com/Ayan-Ahmad-90/Rock-Paper-Scissor-Game',
live: 'https://ayan-ahmad-90.github.io/Rock-Paper-Scissor-Game/',
},
{
id: 'tictactoe',
title: 'Tic-Tac-Toe',
desc: 'Classic game with win/draw detection and restart.',
tech: ['HTML', 'CSS', 'JavaScript'],
image: 'https://images.pond5.com/glowing-neon-line-tic-tac-footage-227417137_iconl.jpeg',
github: 'https://github.com/Ayan-Ahmad-90/TicTacTactics',
live: 'https://ayan-ahmad-90.github.io/TicTacTactics/',
},
{
id: 'guess',
title: 'Guess-the-Number',
desc: 'Interactive number guessing. Firebase save planned.',
tech: ['HTML', 'CSS', 'JavaScript'],
image: 'https://i.pinimg.com/736x/38/b5/d6/38b5d6251f225b5a6c3346131209ab29.jpg',
github: 'https://github.com/Ayan-Ahmad-90/fun-guess-game',
live: 'https://ayan-ahmad-90.github.io/fun-guess-game/',
},
{
id: 'kyara',
title: 'Kyara Beverage Website',
desc: 'Responsive front-end for a beverages company (HTML & CSS).',
tech: ['HTML', 'CSS', 'Responsive Design'],
image: 'https://thumbs.dreamstime.com/b/wave-background-soda-drink-splash-illustration-realistic-motion-ing-beverage-juice-flow-298906118.jpg',
github: 'https://github.com/Ayan-Ahmad-90/kyara-beverages',
live: 'https://ayan-ahmad-90.github.io/kyara-beverages/',
},
{
id: 'currency',
title: 'Currency Converter',
desc: 'Dynamic dropdowns, flags, swap functionality.',
tech: ['HTML', 'CSS', 'JavaScript'],
image: 'https://media.istockphoto.com/id/1319921490/photo/international-business-finance-currency-coins-for-global-financial-exchange-dollar-euro-pound.jpg?s=612x612&w=0&k=20&c=LBw2jAAKNwLBY4H_DOOTb1DqjPFkuYgFKAGZVYTcySE=',
github: 'https://github.com/Ayan-Ahmad-90/currency-converter-1.0',
live: 'https://ayan-ahmad-90.github.io/currency-converter-1.0/',
},
{
id: 'astrobot',
title: 'AstroBot (ISRO Chatbot)',
desc: 'Frontend + FastAPI backend for ISRO-related Q&A and tools.',
tech: ['React', 'FastAPI', 'Java'],
image: 'https://www.shutterstock.com/image-illustration/white-robot-on-blurred-background-260nw-1085030789.jpg',
github: 'https://github.com/Ayan-Ahmad-90/AstroBot-astrogenises',
live: 'https://ayan-ahmad-90.github.io/AstroBot-astrogenises',
},
{
id: 'weather',
title: 'Weather App',
desc: 'Simple weather forecast app with live data.',
tech: ['HTML', 'CSS', 'JavaScript'],
image: 'https://market-resized.envatousercontent.com/videohive.net/files/1616804/Preview_image.jpg?auto=format&q=85&cf_fit=crop&gravity=top&h=8000&w=590&s=53fa24428dedcef59fce81e2bf4f64cd2904030e7a4bba15f85ec61183d6946b',
github: 'https://github.com/Ayan-Ahmad-90/AuroraWeather',
live: 'https://ayan-ahmad-90.github.io/AuroraWeather/',
},
{
  id: 'stock-market-predictor',
  title: 'Stock Market Predictor',
  desc: 'A machine learning based web app to predict stock prices using historical data and technical indicators. Coming Soon.......',
  tech: ['Python', 'TensorFlow', 'Pandas', 'Flask', 'JavaScript', 'HTML', 'CSS'],
  image: 'https://media.istockphoto.com/id/175384956/photo/padlock-on-hundred-dollar-bill.jpg?s=612x612&w=0&k=20&c=OprM1TQuL1fX2Xxpf-HumK3K4_WLEjuFQE3Gckbh0Ck=',
  github: 'https://github.com/yourusername/stock-market-predictor',
  live: 'https://your-live-demo-url.com'
}
];

// ---------------------------
// Small helper & style/; fallback
// ---------------------------
const fallbackStyles = `
  :root{--accent:#06b6d4;--bg:#0b1220;--card:#071426;--muted:#9aa7b9}
  *{box-sizing:border-box}
  body{margin:0;font-family:Inter,system-ui,Segoe UI,Roboto,Arial;background:linear-gradient(180deg,#071021,#061227);color:#e6eef8}
  a{color:var(--accent)}
`;

function useInjectFallback(){
  useEffect(()=>{
    if(!document.getElementById('portfolio-fallback')){
      const s = document.createElement('style');
      s.id = 'portfolio-fallback';
      s.innerHTML = fallbackStyles;
      document.head.appendChild(s);
    }
  },[]);
}

// ---------------------------
// Navbar component
// ---------------------------
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', maxWidth: 1100, margin: '20px auto' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 52, height: 52, borderRadius: 10, background: 'linear-gradient(135deg,#06b6d4,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>AA</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>AYAN AHMAD</div>
          <div style={{ fontSize: 13, color: '#94a3b8' }}>Web Developer & React Enthusiast . B.tech student</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/" style={{ padding: 8, borderRadius: 8, textDecoration: 'none', color: '#cbd5e1' }}>🏠 Home</Link>
        <Link to="/projects" style={{ padding: 8, borderRadius: 8, textDecoration: 'none', color: '#cbd5e1' }}>💼 Projects</Link>
        <Link to="/about" style={{ padding: 8, borderRadius: 8, textDecoration: 'none', color: '#cbd5e1' }}>👤 About</Link>
        <Link to="/contact" style={{ padding: 8, borderRadius: 8, textDecoration: 'none', color: '#cbd5e1' }}>✉️ Contact</Link>

        <Dropdown show={isOpen} onToggle={handleToggle}>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-icon-toggle"
            style={{ border: 'none', background: 'transparent', padding: 0 }}
            onClick={handleToggle} // Toggle dropdown on click
          >
            <img
              src="https://cdn.iconscout.com/icon/premium/png-512-thumb/three-dots-5035209-4187799.png?f=webp&w=512"
              alt="More options"
              style={{ width: '24px', height: '24px' }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div>
            <Dropdown.Item href="/about" >    
            <img
            src="https://cdn.iconscout.com/icon/free/png-512/free-worker-183-1166149.png?f=webp&w=512"
            alt="about"
            style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            objectFit: "cover",
            }}/></Dropdown.Item><br/>
            <Dropdown.Item href="/projects" >    
            <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/project-12848120-10566512.png?f=webp&w=512"
            alt="Contact Us"
            style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            objectFit: "cover",
            }}/></Dropdown.Item><br/>
            <Dropdown.Item href="/contact" >    
            <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/contact-2468792-2086250.png?f=webp&w=512"
            alt="Contact Us"
            style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            objectFit: "cover",
            }}/></Dropdown.Item><br/>
            <Dropdown.Item href="www.google.com" >    
            <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/log-out-11972142-9787854.png?f=webp&w=512"
            alt="logout"
            style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            objectFit: "cover",
            }}/></Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}

// ---------------------------
// Home / Hero
// ---------------------------
function Home() {
  const navigate = useNavigate();

  const downloadResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>
            Hi, I'm <span style={{ color: "#06b6d4" }}>Ayan</span> — I build web
            projects.
          </h1>
          <p style={{ color: "#94a3b8" }}>
            Frontend & small full-stack projects. Learning React, FastAPI and
            more.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Button
              className="btn-primary"
              onClick={() => navigate("/projects")}
              style={{
                background: "#06b6d4",
                border: "none",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              See Projects
            </Button>
            <Button
  variant="success"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "8px",
  }}
>
  <a
    href="https://github.com/Ayan-Ahmad-90"
    target="_blank"
    rel="noreferrer"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "#06b6d4",
      textDecoration: "none",
    }}
  >
    <img
      src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
      alt="GitHub"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
    GitHub
  </a>
</Button>
<Button
  variant="success"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "8px",
  }}
>
  <a
    href="https://www.linkedin.com/in/ayan-ahmad3829"
    target="_blank"
    rel="noreferrer"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "#06b6d4",
      textDecoration: "none",
    }}
  >
    <img
      src="https://static.vecteezy.com/system/resources/previews/018/910/721/non_2x/linkedin-logo-linkedin-symbol-linkedin-icon-free-free-vector.jpg"
      alt="Linkedin"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
    Linkedin
  </a>
</Button>
  <Button
  variant="success"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "8px",
  }}
>
  <a
    href="https://www.instagram.com/ayan_ahmad782/?__pwa=1"
    target="_blank"
    rel="noreferrer"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "#06b6d4",
      textDecoration: "none",
    }}
  >
    <img
      src="https://img.freepik.com/premium-vector/instagram-vector-logo-icon-social-media-logotype_901408-392.jpg?semt=ais_hybrid&w=740&q=80"
      alt="Instagram"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
        />
        Instagram
        </a>
        </Button>
          </div>
        </div>

        <div style={{ width: 320 }}>
          <div
            style={{
              padding: 12,
              background: "linear-gradient(180deg,#061428,#081226)",
              borderRadius: 12,
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>⚡ Quick Info</h3>
            <div style={{ color: "#94a3b8" }}>
              🎓 B.Tech 2nd year · DSMNRU · Lucknow
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              {[
                "🌐 HTML",
                "🎨 CSS",
                "⚡ JavaScript",
                "⚛️ React (learning)",
                "🐍 Python",
              ].map((s) => (
                <div
                  key={s}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "6px 8px",
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10 }}>
              <button
                onClick={downloadResume}
                className="btn-ghost"
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.02)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                📄 Download Resume
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <section style={{ marginTop: 28 }}>
        <h2>Featured Projects</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 14,
            marginTop: 12,
          }}
        >
          {projects.slice(0, 4).map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.03 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <ProjectCardCompact p={p} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}


// ---------------------------
// Projects list & detail
// ---------------------------
function Projects(){
  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'0 20px'}}>
      <h2>Projects Album</h2>
      <p style={{color:'#94a3b8'}}>Click a project to view details, GitHub or Live demo.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:14,marginTop:12}}>
        {projects.map(p=> (
          <motion.div key={p.id} whileHover={{y:-6}} style={{background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10,cursor:'pointer'}}>
            <Link to={`/projects/${p.id}`} style={{textDecoration:'none',color:'inherit'}}>
              <ProjectCard p={p} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail(){
  const { pid } = useParams();
  const p = projects.find(x=>x.id===pid);
  if(!p) return <div style={{maxWidth:1100,margin:'20px auto',padding:'0 20px'}}>Project not found.</div>;
  return (
    <div style={{maxWidth:900,margin:'20px auto',padding:'0 20px'}}>
      <motion.div initial={{opacity:0}} animate={{opacity:1}}>
        <img src={p.image} alt={p.title} style={{width:'100%',height:360,objectFit:'cover',borderRadius:10}} onError={(e)=>e.target.src='https://via.placeholder.com/900x360?text=Project+Image'} />
        <h2 style={{marginTop:12}}>{p.title}</h2>
        <div style={{color:'#94a3b8'}}>{p.tech.join(' • ')}</div>
        <p style={{marginTop:8}}>{p.desc}</p>
        <div style={{display:'flex',gap:10,marginTop:10}}>
          <a href={p.github} target="_blank" rel="noreferrer" style={{padding:8,background:'#0b1222',borderRadius:8,textDecoration:'none'}}>View on GitHub</a>
          <a href={p.live} target="_blank" rel="noreferrer" style={{padding:8,background:'#0b1222',borderRadius:8,textDecoration:'none'}}>Live Demo</a>
        </div>
      </motion.div>
    </div>
  );
}

// ---------------------------
// Compact card for Featured
// ---------------------------
function ProjectCardCompact({p}){
  return (
    <div>
      <img src={p.image} alt={p.title} style={{width:'100%',height:140,objectFit:'cover',borderRadius:8}} onError={(e)=>e.target.src='https://via.placeholder.com/600x360?text=Project+Image'} />
      <h3 style={{margin:'8px 0 6px 0'}}>{p.title}</h3>
      <div style={{fontSize:13,color:'#94a3b8'}}>{p.tech.join(', ')}</div>
    </div>
  );
}

function ProjectCard({p}){
  return (
    <div>
      <img src={p.image} alt={p.title} style={{width:'100%',height:160,objectFit:'cover',borderRadius:8}} onError={(e)=>e.target.src='https://via.placeholder.com/600x360?text=Project+Image'} />
      <h3 style={{margin:'8px 0 6px 0'}}>{p.title}</h3>
      <div style={{fontSize:13,color:'#94a3b8'}}>{p.tech.join(' • ')}</div>
      <p style={{fontSize:13,color:'#9fb0c5'}}>{p.desc}</p>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <a href={p.github} target="_blank" rel="noreferrer" style={{padding:'6px 8px',borderRadius:8,background:'rgba(255,255,255,0.03)',textDecoration:'none'}}>GitHub</a>
        <a href={p.live} target="_blank" rel="noreferrer" style={{padding:'6px 8px',borderRadius:8,background:'rgba(255,255,255,0.03)',textDecoration:'none'}}>Live</a>
      </div>
    </div>
  );
}

// ---------------------------
// About page
// ---------------------------
function About(){
  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'0 20px'}}>
      <h2>About Me</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:18}}>
        <div>
          <p>Hi, I'm Ayan Ahmad! I'm currently pursuing a Bachelor of Technology in Computer Science & Engineering from DSMNRU, Lucknow.</p>
          <p>🚀 Driven by Curiosity. Powered by Code. I'm a passionate tech learner with a strong interest in web development, frontend technologies, and problem-solving. I thrive in collaborative environments like hackathons where innovation and creativity meet real-world challenges.</p>
          <p>I believe in continuous learning, and I’m always eager to explore new tools, frameworks, and technologies that enhance user experience and bring ideas to life.</p>
          <h3>💡 My Vision:</h3>
          <p>To become a skilled web developer who builds modern, responsive, and impactful digital products for users across the globe.</p>
          <h3>🛠️ Tech Stack & Skills:</h3>
          <ul>
            <li>Languages: Python, C, C++, Java, HTML, CSS, JavaScript</li>
            <li>Frameworks: React.js</li>
            <li>Expertise: Frontend Development, Web Development, DSA (Data Structures & Algorithms)</li>
          </ul>
          <h3>🧠 Core Values:</h3>
          <ul>
            <li>Hardworking</li>
            <li>Honest</li>
            <li>Positive Attitude</li>
            <li>Growth Mindset</li>
          </ul>
          <h3>🌍 Languages I Speak:</h3>
          <p>Hindi, English</p>
          <p>📬 Let’s connect and grow together in the world of tech!</p>
        </div>

        <div>
          <div style={{padding:12,background:'linear-gradient(180deg,#061428,#081226)',borderRadius:12}}>
            <h3>Contact</h3>
            <p style={{color:'#94a3b8',margin:0}}>Email: chaudharyayan100@gmail.com</p>
            <p style={{color:'#94a3b8',marginTop:6}}>Phone: 8791898194</p>
            <div style={{marginTop:8,display:'flex',gap:8}}>
              <a href="https://github.com/Ayan-Ahmad-90" target="_blank" rel="noreferrer" style={{textDecoration:'none'}}>GitHub</a>
              <a href="https://www.linkedin.com/in/ayan-ahmad3829" target="_blank" rel="noreferrer" style={{textDecoration:'none'}}>LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ---------------------------
// Contact page with EmailJS
// ---------------------------
function Contact(){
  const formRef = React.useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e)=>{
    e.preventDefault();
    setStatus('Sending...');
    emailjs.sendForm('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID', formRef.current, 'YOUR_USER_ID')
      .then((result)=>{
        setStatus('Message sent — thank you!');
      },(error)=>{
        setStatus('Sending failed — try again later');
      });
  };

  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'0 20px'}}>
      <h2>Contact Me</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:18}}>
        <div>
          <form ref={formRef} onSubmit={sendEmail} style={{display:'grid',gap:8}}>
            <input name="name" placeholder="Your name" required style={{padding:8,borderRadius:8,border:'none',background:'rgba(255,255,255,0.02)'}} />
            <input name="email" type="email" placeholder="Your email" required style={{padding:8,borderRadius:8,border:'none',background:'rgba(255,255,255,0.02)'}} />
            <textarea name="message" placeholder="Message" required rows={6} style={{padding:8,borderRadius:8,border:'none',background:'rgba(255,255,255,0.02)'}} />
            <button type="submit" style={{padding:10,borderRadius:8,background:'#06b6d4',border:'none',cursor:'pointer'}}>Send Message</button>
            <div style={{color:'#94a3b8'}}>{status}</div>
          </form>
        </div>

        <div>
          <div style={{padding:12,background:'linear-gradient(180deg,#061428,#081226)',borderRadius:12}}>
            <h3>Other ways</h3>
            <p style={{color:'#94a3b8'}}>Email: chaudharyayan100@gmail.com</p>
            <p style={{color:'#94a3b8'}}>LinkedIn: /ayan-ahmad3829</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// App root
// ---------------------------
export default function MainApp() {
  useInjectFallback();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <WelcomeAlert />
      <Router>
      <div style={{ minHeight: "100vh" }}>
        <Navbar />

        <main style={{ paddingBottom: 40 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:pid" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer
          style={{
            textAlign: "center",
            padding: "18px",
            color: "#94a3b8",
          }}
        >
          Built with ❤️ by Ayan_Ahmad · React Portfolio Demo
        </footer>
      </div>
    </Router>
  </>
);
}

