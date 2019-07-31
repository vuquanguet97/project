import React from 'react';
import './Background.css';
import bg1 from '../assets/background1.png';
import bg2 from '../assets/background2.png';
import bg3 from '../assets/background3.png';
import bg4 from '../assets/background4.png';
import bg5 from '../assets/background5.png';
import bg6 from '../assets/background6.png';
function Background(){
    return(
        <div>
        <div className="set">
            <div><img src={bg1} alt=""/></div>
            <div><img src={bg2} alt=""/></div>
            <div><img src={bg3} alt=""/></div>
            <div><img src={bg4} alt=""/></div>
            <div><img src={bg5} alt=""/></div>
            <div><img src={bg6} alt=""/></div>
            <div><img src={bg1} alt=""/></div>
        </div>
        <div className="set set2">
            <div><img src={bg1} alt=""/></div>
            <div><img src={bg2} alt=""/></div>
            <div><img src={bg3} alt=""/></div>
            <div><img src={bg5} alt=""/></div>
            <div><img src={bg4} alt=""/></div>
            <div><img src={bg6} alt=""/></div>
            <div><img src={bg1} alt=""/></div>
        </div>
        <div className="set set3">
            <div><img src={bg1} alt=""/></div>
            <div><img src={bg2} alt=""/></div>
            <div><img src={bg3} alt=""/></div>
            <div><img src={bg4} alt=""/></div>
            <div><img src={bg4} alt=""/></div>
            <div><img src={bg1} alt=""/></div>
            <div><img src={bg6} alt=""/></div>
        </div>
        </div>
    );
}
export default Background;