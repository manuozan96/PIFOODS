import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing'
import Home from './components/Home'
import Form from './components/Form';
import Detail from './components/Detail';
import Favorites from './components/Favorites';


function App() {
  return (
    <div className="App">

      <Route exact path='/' component={Landing}/>
      <Route path='/home' component={Home}/>
      <Route path='/create-recipes' component={Form}/>
      <Route path='/detail/:id' component={Detail}/>
      <Route path='/favorites' component={Favorites}/>
    </div>
  );
}

export default App;
