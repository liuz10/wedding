import { useEffect, useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import GettingThere from './components/GettingThere';
import OurStory from './components/OurStory';
import Details from './components/Details';
import DressCode from './components/DressCode';
import BookingInstructions from './components/BookingInstructions';
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
        <BookingInstructions />
        <GettingThere />
        <DressCode />
        <Details />
        <OurStory />
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
    if (isUnlocked) {
      // Reset scroll and zoom when entering the site
      window.scrollTo(0, 0);
      const vp = document.querySelector('meta[name="viewport"]');
      if (vp) {
        vp.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    }
  }, [isUnlocked]);

  return (
    <LanguageProvider>
      <AccessGate isUnlocked={isUnlocked} onUnlock={() => setIsUnlocked(true)} />
      {isUnlocked && <InvitationContent />}
    </LanguageProvider>
  );
}
