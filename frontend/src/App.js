import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import NavBar from './components/NavBar'
import Container from "./components/Container"
import { UserProvider } from './context/UserContext'
import AddPet from './pages/AddPet'
import PetDetails from "./pages/PetDetails"
import MyAdoptions from "./pages/MyAdoptions"

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider> 
          <NavBar />
          <Container>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/user/profile" element={<Profile />} />
              <Route exact path="/pet/create" element={<AddPet />} />
              <Route exact path="/pet/myadoptions" element={<MyAdoptions />} />
              <Route exact path="/pet/:id" element={<PetDetails />} />
            </Routes>
          </Container>
        </UserProvider>
      </Router>
    </div>
  );
}
export default App;
