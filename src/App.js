import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AddMovies from './components/AddMovies';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import MyMovies from './components/MyMovies';
import NoMatch from './components/NoMatch';
import RegisterPage from './components/RegisterPage';
import ShowMovies from './components/ShowMovies';
import Users from './components/Users';

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, SetUsername] = useState("")
  return (
    <div className='App'>
      <nav>
        <Link to="/home">HomePage</Link>
        <Link to="/mymovies">MyMovies</Link>
        <Link to="/adminPage">AdminPage</Link>
        <Link to="/">{isLoggedIn ? <span className='logOut'>{username}&nbsp; <button onClick={() => { setIsLoggedIn(false); SetUsername("") }}>LogOut</button></span> : "LogIn/SignUp"}</Link>
      </nav>
      <Routes>
        <Route path='/' element={<RegisterPage username={username} SetUsername={SetUsername} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}></Route>
        <Route path='/home' element={<HomePage />}></Route>
        <Route path='/mymovies' element={<MyMovies username={username} isLoggedIn={isLoggedIn} />}></Route>
        <Route path='/mymovies/dashboard' element={<ShowMovies username={username} />}></Route>
        <Route path='/mymovies/addMovies' element={<AddMovies isLoggedIn={isLoggedIn} username={username} />}>
          <Route path='/mymovies/addMovies/:id' element={<AddMovies isLoggedIn={isLoggedIn} username={username} />}>
          </Route>
        </Route>
        <Route path='/adminPage' element={<AdminPage isAdmin={isAdmin} setIsAdmin={setIsAdmin} username={username} isLoggedIn={isLoggedIn} />}></Route>
        <Route path='/adminPage/users' element={<Users isAdmin={isAdmin} username={username} isLoggedIn={isLoggedIn} />}></Route>
        <Route path='*' element={<NoMatch />}></Route>
      </Routes>
    </div>
  );
}

export default App;
