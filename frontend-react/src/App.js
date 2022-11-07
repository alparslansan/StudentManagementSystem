import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar.js';
import Student from './components/Student.js';


function App() {
  return (
    <div className="App">
      <Appbar/>
      <Student/>
    </div>
  );
}

export default App;
