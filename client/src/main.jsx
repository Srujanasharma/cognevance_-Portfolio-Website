import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  profile, projects, skills, internships, education, certifications, achievements,
} from './data/portfolio';
import './styles.css';

const emptyForm = { name: '', email: '', subject: '', message: '' };
const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ message: '', error: false });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('.animate-in');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus({ message: '', error: false });
    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Could not send your message.');
      setForm(emptyForm);
      setStatus({ message: 'Thanks for reaching out. Your message has been sent.', error: false });
    } catch (error) {
      setStatus({
        message: error.message || 'Could not send your message. Please try again later.',
        error: true,
      });
    } finally {
      setSending(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div>
      <div className="noise" aria-hidden="true" />
      <header className="nav">
        <a className="brand" href="#home" aria-label="Srujana Sharma home">SS<span>.</span></a>
        <button className="menu" type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen} aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? '×' : '☰'}
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'open' : ''} aria-label="Main navigation">
          {[
            ['home', 'Home'], ['about', 'About'], ['skills', 'Skills'],
            ['experience', 'Experience'], ['projects', 'Project'], ['education', 'Education'],
            ['achievements', 'Highlights'], ['contact', 'Contact'],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">Get in touch ↗</a>
      </header>

      <main id="home">
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Srujana Sharma · Data Science</p>
            <h1>Curious about data.<br /><em>Driven by impact.</em></h1>
            <p className="lead">{profile.tagline}</p>
            <div className="actions">
              <a className="btn primary" href="#projects">Explore my work <span>↗</span></a>
              <a className="btn ghost" href={`mailto:${profile.email}`}>Contact me <span>↗</span></a>
            </div>
            <a className="github-link" href={profile.github} target="_blank" rel="noreferrer">
              <span aria-hidden="true">↗</span> GitHub profile
            </a>
            <a className="github-link" href={profile.repository} target="_blank" rel="noreferrer">
              <span aria-hidden="true">↗</span> View this site’s source
            </a>
            <div className="mini-stats" aria-label="Academic highlights">
              <div><b>{profile.cgpa}</b><span>B.Tech CGPA</span></div>
              <div><b>{profile.graduation}</b><span>Graduation</span></div>
              <div><b>100+</b><span>LeetCode problems</span></div>
            </div>
          </div>
          <div className="hero-art" aria-label="Data science themed illustration">
            <div className="orb" />
            <div className="code-card">
              <div className="dots" aria-hidden="true">● ● ●</div>
              <pre>{`srujana = {
  "focus": ["Data", "Cloud"],
  "learn": ["Python", "AWS"],
  "mindset": "Learn. Build. Improve."
}`}</pre>
            </div>
            <div className="float-tag">DATA ANALYTICS <b>↗</b></div>
            <div className="float-tag second">AWS CLOUD <b>↗</b></div>
          </div>
        </section>

        <section id="about" className="section wrap animate-in">
          <div className="section-head"><span>01</span><h2>About me</h2></div>
          <div className="about-grid">
            <div>
              <p className="big-copy">I’m <strong>{profile.name}</strong>, a Data Science student at Mohan Babu University with an interest in data engineering, analytics, and cloud technologies.</p>
              <p>I’m building my foundation in programming, data preparation, visualization, and cloud services. Through internship learning and project work, I’m developing practical skills and learning how technology can help solve real-world problems.</p>
              <p>I value continuous learning, thoughtful problem-solving, and collaborating with a team to turn ideas into useful outcomes.</p>
            </div>
            <aside className="profile-card">
              <span>Currently studying</span>
              <h3>B.Tech · Data Science</h3>
              <p>{profile.education}</p>
              <hr />
              <span>Based in</span>
              <h3>{profile.location}</h3>
              <a href={`mailto:${profile.email}`}>Email Srujana ↗</a>
            </aside>
          </div>
        </section>

        <section id="skills" className="section alt animate-in">
          <div className="wrap">
            <div className="section-head"><span>02</span><h2>Skills &amp; toolkit</h2></div>
            <div className="skill-grid">
              {['Programming', 'Web', 'Database', 'Cloud', 'Analytics', 'Tools'].map((group) => (
                <div className="skill-group" key={group}>
                  <h3>{group}</h3>
                  <div className="chips">
                    {skills.filter((skill) => skill[1] === group).map(([name]) => <span key={name}>{name}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section wrap animate-in">
          <div className="section-head"><span>03</span><h2>Internship experience</h2></div>
          <div className="experience-list">
            {internships.map((item) => (
              <article className="experience-item" key={item.title}>
                <div className="experience-date">{item.period}</div>
                <div className="experience-content">
                  <span className="project-type">{item.organization}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="chips">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section alt animate-in">
          <div className="wrap">
            <div className="section-head"><span>04</span><h2>Selected project</h2></div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className="project" key={project.title}>
                  <div className="project-num">0{index + 1}</div>
                  <div>
                    <span className="project-type">{project.type} · {project.period}</span>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <small>{project.stack}</small>
                    <a href={project.link}>{project.linkLabel} ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section wrap animate-in">
          <div className="section-head"><span>05</span><h2>Education</h2></div>
          <div className="education-list">
            {education.map((item) => (
              <article className="education-item" key={item.qualification}>
                <div><h3>{item.qualification}</h3><p>{item.institution}</p></div>
                <div className="education-meta"><span>{item.period}</span><strong>{item.result}</strong></div>
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="section alt animate-in">
          <div className="wrap">
            <div className="section-head"><span>06</span><h2>Certifications &amp; highlights</h2></div>
            <div className="highlights-grid">
              <article className="highlight-card">
                <span className="project-type">Certifications</span>
                <h3>Continuous learning</h3>
                <ul>{certifications.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="note">Specific certificate titles were not listed in the resume.</p>
              </article>
              <article className="highlight-card">
                <span className="project-type">Achievements</span>
                <h3>Practice in action</h3>
                <ul>{achievements.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </div>
            <div className="activity-strip">
              <div><span className="project-type">Co-curricular</span><p>Coding contests, technical events, and regular DSA practice.</p></div>
              <div><span className="project-type">Extra-curricular</span><p>College workshops, technical seminars, team discussions, and collaborative learning.</p></div>
              <div><span className="project-type">Interests</span><p>Listening to music, reading books, and exploring new technologies.</p></div>
            </div>
          </div>
        </section>

        <section className="quote animate-in">
          <div className="wrap">
            <p>“Keep learning, stay curious, and use data to make better decisions.”</p>
            <span>— {profile.name}</span>
          </div>
        </section>

        <section id="contact" className="section wrap animate-in">
          <div className="section-head"><span>07</span><h2>Let’s connect.</h2></div>
          <div className="contact-grid">
            <div>
              <p className="big-copy">Interested in data, analytics, cloud technologies, or a collaboration? I’d be happy to connect.</p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}><span className="icon" aria-hidden="true">✉</span>{profile.email}</a>
                <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}><span className="icon" aria-hidden="true">☎</span>{profile.phone}</a>
                <a href={profile.github} target="_blank" rel="noreferrer"><span className="icon" aria-hidden="true">GH</span>github.com/Srujanasharma</a>
              </div>
            </div>
            <form onSubmit={submit}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" autoComplete="name" maxLength="80" required value={form.name} onChange={updateField} />
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" maxLength="160" required value={form.email} onChange={updateField} />
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" maxLength="160" required value={form.subject} onChange={updateField} />
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" maxLength="3000" required value={form.message} onChange={updateField} />
              <button className="btn primary" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send message ↗'}
              </button>
              <p className={`status${status.error ? ' error' : ''}`} role="status" aria-live="polite">{status.message}</p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub profile ↗</a>
          <a href={profile.repository} target="_blank" rel="noreferrer">View source ↗</a>
          <span>Data · Analytics · Cloud</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
