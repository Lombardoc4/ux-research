import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { eventTracker } from '../hooks/useClickEvent'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [initEvent, triggerInitEvent] = useState(false);
  const [clickEvent, setClickEvent] = useState(false);
  const [event, setEvent] = useState(false);
  const [scrollEvent, setScrollEvent] = useState('');
  const userSessionStart = useMemo(() => new Date().getTime(), []);
  
  function handleClick(e: React.MouseEvent) {
      // Prevent recording scrolling events
      triggerInitEvent(true);
      setClickEvent(true);
      
      // TrackEvent
      eventTracker({
        tag: `${e.target.dataset.tag}`, 
        type: 'click', 
        time: userSessionStart
      })
      
      // Scroll Into View
      document.getElementById('dashboard')?.scrollIntoView({behavior: "smooth"});
    
  }
  
  function handleScroll(e: React.SyntheticEvent) {
    
    if (e.target?.scrollTop <= window.innerHeight/3) {
      setScrollEvent('header');
    }
    
    if (e.target?.scrollTop > window.innerHeight/3) {
      setScrollEvent('body');
      triggerInitEvent(true);
      
    }
    
    if (e.target?.scrollTop === window.innerHeight) {
      // triggerEvent(true);
      setClickEvent(false);
    }
    
    if (e.target?.scrollTop > window.innerHeight + 50) {
      setScrollEvent('footer')
    }
      
  }
  
  useEffect(() => {
    
    if (initEvent && !clickEvent && scrollEvent.length > 0) {
      eventTracker({
        tag: `dashboard-${scrollEvent}`, 
        type: 'scroll', 
        time: userSessionStart
      });
    }
      
  }, [scrollEvent])
  
  
  return (
    <div id="exp1" onScroll={handleScroll}>
      <Head>
        <title>Playground</title>
        <meta name="description" content="Human Computer Experiment 1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
        <div className={styles.landing}>
          <div className={styles.grid}>
            <h1 className={styles.title}>
              Welcome to&nbsp;Today
            </h1>
            <div 
              onClick={handleClick}
              tabIndex={0}
              className={styles.card + ' action'}
              data-tag='dashboard-button'
            >
              Enter Now
            </div>
          </div>
          <div 
            onClick={handleClick}
            className={styles.description + ' action landing-arrow'}
            data-tag='dashboard-arrow'
            tabIndex={0}
          >
            &darr;
          </div>
        </div>
      
        <main id="dashboard" className={styles.main}>
          <h1 className={styles.title}>Test Complete</h1>
          <p className={styles.description}>Thank you</p>
        </main>

      <footer id="footer" className={styles.footer}>
        <a
          href="https://crislombardo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="https://crislombardo.com/img/alligator.png" alt="Crickey Cris" width={72} height={36} />
          </span>
        </a>
      </footer>
    </div>
  )
}
