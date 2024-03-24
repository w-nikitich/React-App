import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import TaskComponent from './components/TaskComponent';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
		    <Routes>
			    <Route path="/" element={<Main/>} />
		    </Routes>
	    </BrowserRouter>
      {/* <Main/> */}
    </div>
  );
}

export default App;
