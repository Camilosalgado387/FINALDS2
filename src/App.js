
import './App.css';
import Pp from './components/Pp'
import AdduserForm from './components/AdduserForm'
import UpdateUserForm from './components/UpdateUserForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Pp/>}/>
      <Route path='/Add' element={<AdduserForm/>}/>
      <Route path='/Modify' element={<UpdateUserForm/>}/>
    </Routes>
  
  
  </BrowserRouter>
  
  
  ;
}

export default App;
