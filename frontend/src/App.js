import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Toaster } from 'react-hot-toast';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/auth/Login';


function App() {
  return (
    <Router>
      <div className="App">
        <Toaster 
          position='top-center'
          toastOptions={{
            success: {
              style: {
                background: 'green',
                border: '3px solid black',
              },
            },
            error: {
              style: {
                background: 'red',
                border: '3px solid black',
              },
            },
          }}
          />
        <Header></Header>
  
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<ProductDetails/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>
  
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
