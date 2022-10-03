import './App.css';
import { UseState } from "./components/UseState";
// import { ClassState } from "./components/ClassState";
import { UseReducer } from './components/UseReducer';

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <UseReducer name="Use Reducer" />
    </div>
  );
}

export default App;
