import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import toast, { Toaster, ToastBar } from 'react-hot-toast';


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
          </Routes>
        </div>
  
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
