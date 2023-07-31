import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NavBar from "./components/NavBar";
import Container from './components/Container';

function App() {
  return (
    <div className="App">
     <Router>
      <NavBar />
      <Container>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/user/profile' element={<Profile />}/>
      </Routes>
      </Container>
     </Router>
    </div>
  );
}

export default App;
