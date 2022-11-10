import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { eventTracker } from '../hooks/useClickEvent'
import styles from '../styles/Home.module.css'

import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';
import { Sharing } from '../component/Sharing'
Amplify.configure(awsExports);


export default function Home() {
  const [initEvent, triggerInitEvent] = useState(false);
  const [clickEvent, setClickEvent] = useState(false);
  const [scrollEvent, setScrollEvent] = useState('');
  const userSessionStart = useMemo(() => new Date().getTime(), []);


  function handleClick(e: React.SyntheticEvent<HTMLDivElement>) {
      // Prevent recording scrolling events
      triggerInitEvent(true);
      setClickEvent(true);

      // TrackEvent
      eventTracker({
        tag: `${e.currentTarget.dataset.tag}`,
        type: 'click',
        time: userSessionStart
      })

      if (e.currentTarget.dataset.href) {
        window.open(e.currentTarget.dataset.href, "_self")
      }

      // Scroll Into View
      document.getElementById('dashboard')?.scrollIntoView({behavior: "smooth"});

  }

  function handleScroll(e: React.SyntheticEvent<HTMLDivElement>) {

    if (e.currentTarget.scrollTop <= window.innerHeight/3) {
      setScrollEvent('header');
    }

    if (e.currentTarget.scrollTop > window.innerHeight/3) {
      setScrollEvent('body');
      triggerInitEvent(true);

    }

    if (e.currentTarget.scrollTop === window.innerHeight) {
      // triggerEvent(true);
      setClickEvent(false);
    }

    if (e.currentTarget.scrollTop > window.innerHeight + 50) {
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
            className={styles.description2 + ' action landing-arrow'}
            data-tag='dashboard-arrow'
            tabIndex={0}
          >
            &darr;
          </div>
        </div>

        <main id="dashboard" className={styles.main}>
            <h1 className={styles.title}>Test Complete</h1>
          <p className={styles.description1}>Support research by sharing with 3 people </p>
            <Sharing copy='lom13.com' userSessionStart={userSessionStart}/>

      {/* <footer id="footer" className={styles.footer}> */}
          <div
            onClick={handleClick}
            className={styles.footer +  ' action'}
            data-tag='dashboard-crislombardo.com'
            data-href="https://crislombardo.com"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="https://crislombardo.com/img/alligator.png" alt="Crickey Cris" width={72} height={36} />
            </span>
          </div>
        </main>

      {/* </footer> */}
    </div>
  )
}
