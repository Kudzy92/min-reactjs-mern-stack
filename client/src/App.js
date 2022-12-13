import './App.css';
import TabNavigation from './components/TabNavigation';
import SectionHeading from './components/SectionHeading';
import Footer from './components/Footer';
function App() {
  return (
    <main className="App">
      <div className="container">
        <SectionHeading />
      <TabNavigation />
      
      </div>
      <Footer />
    </main>
  );
}

export default App;

