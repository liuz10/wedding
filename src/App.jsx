import Header from './components/Header';
import Hero from './components/Hero';
import Details from './components/Details';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Details />
        <RSVP />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
