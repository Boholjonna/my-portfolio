import '../styles/App.css'
import '../styles/Text.css'
import About from './About'
import Project from './Project'


function App() {
  const imageUrl = new URL('../images/msJ.png', import.meta.url).href
  const profileUrl = new URL('../images/nightme.png', import.meta.url).href

  return (
    <div className="App">
      <div className="main-container">
        <div className="about-section">
          <About 
            intro={
              <div>
                <span className="intro-text">Hi I am Jonna Bohol, call me Ms J</span>
              </div>
            }
            logo={imageUrl}
            image={profileUrl}
            title="a Computer Engineer"
            message="I'm an enthusiastic and curious software and web developer with a passion for creating visually appealing, user-friendly websites and applications. I thrive on continuous learning and enjoy transforming ideas into impactful digital experiences. With strong time management and adaptability, I consistently deliver high-quality work on time. I'm driven by innovation and always eager to explore new trends, tools, and technologies to grow and refine my craft."
          />
        </div>
        <div className="project-section">
          <Project />
        </div>
      </div>
    </div>
  );
}

export default App;
