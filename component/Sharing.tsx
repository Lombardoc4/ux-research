import React, { useRef, useState } from "react";
import { eventTracker } from "../hooks/useClickEvent";


export function Sharing({copy, userSessionStart}: {copy: string, userSessionStart: number}) {
    const [clicked, setClicked] = useState(false)
    const copyEl = useRef<HTMLDivElement>(null);

    function handleClick(e: React.SyntheticEvent) {
        navigator.clipboard.writeText(copy);
        setClicked(true);

        // console.log('e',  e)
        eventTracker({
            tag: `sharing-${copy}`,
            type: 'click',
            time: userSessionStart
        })

        // Turn off in five seconds
        setTimeout(() => {
            setClicked(false);
            if (copyEl.current){
                copyEl.current.blur();
                const dashboard = document.getElementById('dashboard');
                if (dashboard)
                    dashboard.click();
            }
        }, 5000)
    }

    return (
        <div style={{position: 'relative'}}>
            <div ref={copyEl} tabIndex={0} className={"action sharing " + (clicked ? 'active' : '')} onClick={handleClick}>
                <svg style={{height: '1.25rem', width: 'auto', marginRight: '0.75rem', color: 'inherit'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M320 64h-49.61C262.1 27.48 230.7 0 192 0S121 27.48 113.6 64H64C28.65 64 0 92.66 0 128v320c0 35.34 28.65 64 64 64h256c35.35 0 64-28.66 64-64V128C384 92.66 355.3 64 320 64zM192 48c13.23 0 24 10.77 24 24S205.2 96 192 96S168 85.23 168 72S178.8 48 192 48zM336 448c0 8.82-7.178 16-16 16H64c-8.822 0-16-7.18-16-16V128c0-8.82 7.178-16 16-16h18.26C80.93 117.1 80 122.4 80 128v16C80 152.8 87.16 160 96 160h192c8.836 0 16-7.164 16-16V128c0-5.559-.9316-10.86-2.264-16H320c8.822 0 16 7.18 16 16V448z"/>
                </svg>
                {' '}
                {copy}
            </div>
        {
            <svg className={!clicked ? 'hidden' : ''} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '105%', width: '1.5rem', fill: '#0070f3'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
        }
        </div>
    )
}