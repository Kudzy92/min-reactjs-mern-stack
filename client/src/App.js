import './App.css';

import Content from './components/Content';
import Loader from './components/Loader'
import { useState } from 'react'

function App() {
  const [isPageLoading, setIsPageLoading]=useState(true);
  const content= !isPageLoading ? <Content /> : <Loader />;
  //var content=<Content />;
  setTimeout(()=>{
    setIsPageLoading(false);
    }, 3000);
    //clearTimeout(timer);
  return (
    <main className="App">
      {content}
    </main>
  );
}

export default App;

