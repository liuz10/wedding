import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CeremonyImage from './components/CeremonyImage';
import GettingThere from './components/GettingThere';
import Details from './components/Details';
import DressCode from './components/DressCode';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import AccessGate from './components/AccessGate';

const LOCKED_TITLE = 'Just a good time';
const UNLOCKED_TITLE = 'You are invited!';

function InvitationContent() {
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

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    document.title = isUnlocked ? UNLOCKED_TITLE : LOCKED_TITLE;
  }, [isUnlocked]);

  return (
    <>
      <AccessGate isUnlocked={isUnlocked} onUnlock={() => setIsUnlocked(true)} />
      {isUnlocked && <InvitationContent />}
    </>
  );
}
