
import '../styles/App.css'
import Hello from './About'

function App() {

  const person = {
    name: 'Jonna',
    message: 'Hi there',
    code: '1234',
  };
    

  
  return (
    <div className="App">
      <Hello message={person.message} name={person.name} code={person.code} />
    </div>
  );
}

export default App;
