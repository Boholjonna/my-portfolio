import '../styles/App.css'
import '../styles/Text.css'
import About from './About'
import msJ from '../images/msJ.png';
import nightme from '../images/nightme.png';

function App() {
  const imageUrl = new URL('../images/msJ.png', import.meta.url).href
  const profileUrl = new URL('../images/nightme.png', import.meta.url).href

  return (
    <div className="App">
      <About 
        intro={
          <div>
            <span className="intro-text">Hi I am Jonna Bohol, call me Ms J</span>
          </div>
        }
        logo={imageUrl}
        image={profileUrl}
        title={
          <span className="title-text">a Computer Engineer</span>
        }
        message="I'm an enthusiastic and curious software and web developer with a passion for creating visually appealing, user-friendly websites and applications. I thrive on continuous learning and enjoy transforming ideas into impactful digital experiences. With strong time management and adaptability, I consistently deliver high-quality work on time. I'm driven by innovation and always eager to explore new trends, tools, and technologies to grow and refine my craft."
      />
    </div>
  );
}

export default App;
