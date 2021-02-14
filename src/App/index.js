// Core SPA.

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Switch,
    Route,
    Link,
    Redirect,
    useLocation
} from "react-router-dom";
import fakeComponent from './components';
import { resetPlanetList } from '../actions/selectPlanets.js';
import { resetVehicleList } from '../actions/selectVehicles.js';
import './style.scss';

const App = () => {
    const [needPrologue, setNeedPrologue] = useState(true);
    let dispatch = useDispatch();
    let location = useLocation();

    const handleReset = () => {
        if(location.pathname === '/') {
            dispatch(resetPlanetList());
            dispatch(resetVehicleList());
        }
    }

    useEffect(() => {
        let path = location.pathname;
        if(path === '/result' || path === '/read') {
            setNeedPrologue(false);
        }
        else setNeedPrologue(true);
    }, [location.pathname])

    return(
        <div className='app-container'>
            <header>
                <h1>FINDING FALCONE</h1>
                <nav id='navigation'>
                    <ul id='nav-list'>
                        <li className='nav-link'>
                            <Link to='/reset' onClick={handleReset}>Reset</Link>
                        </li>
                        <li className='nav-link'>
                            <Link to='/read'>Read Lore</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="prologue-container">
                <div id='prologue'>
                    <h2>Game of Chance</h2>
                    { needPrologue &&
                        <>
                            <p>Choose 4 Planets from the 6 given; and vehicles to get there.</p>
                            <p>Be careful! The vehicles are limited by their <span>Range</span> and <span>Quantity</span></p>
                        </>
                    }
                </div>
                <div id='fractal-container'>
                    <img src="/images/background/fractal.png" alt="Black Hole" id='blackhole' />
                </div>
            </div>
            <div id='main-container'>
                <Switch>
                    <Route exact path='/'>
                        <fakeComponent />
                    </Route>
                    <Route path='/reset'>
                        <Redirect to='/' />
                    </Route>
                    <Route path='/read'>
                        <fakeComponent />
                    </Route>
                    <Route path='/result' component={fakeComponent} />
                </Switch>
            </div>
            <footer id='footer'>
                Copyright © Lorem Ipsum 2020. Original Blackhole Image by <a href="https://pixabay.com/users/insspirito-1851261/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1280110">Garik Barseghyan</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1280110">Pixabay</a>.
            </footer>
        </div>
    );
}

export default App