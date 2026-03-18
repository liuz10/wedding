import Header from './components/Header';
import Hero from './components/Hero';
import CeremonyImage from './components/CeremonyImage';
import GettingThere from './components/GettingThere';
import Details from './components/Details';
import DressCode from './components/DressCode';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CeremonyImage />
        <GettingThere />
        <Details />
        <DressCode />
        <RSVP />
      </main>
      <Footer />
    </>
  );
}
