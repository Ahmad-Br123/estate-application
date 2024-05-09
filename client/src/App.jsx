import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import Profile from './pages/profile';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import About from './pages/about';
import Header from './components/header';
import PrivateRoute from './components/privateRoute';
import CreateListing from './pages/createListing';
import UpdateListing from './pages/updateListing';
import Listing from './pages/listing';
import Search from './pages/search';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<PrivateRoute />} >
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/update-listing/:id' element={<UpdateListing />} />
        <Route path='/listing/:id' element={<Listing />} />

        </Route>
        <Route path='/search' element={<Search />}/>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

