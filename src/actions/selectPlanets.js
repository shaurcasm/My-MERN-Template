import { SELECT_PLANET } from '../constants/actionTypes.js';

// Planet List
export const addPlanet = planetName => ({
    type: SELECT_PLANET.ADD,
    planetName
});

// Function(arg1, arg2): arg1 -> New Planet; arg2 -> Previous Planet
export const replacePlanet = (newPlanetName, previousPlanetName) => ({
    type: SELECT_PLANET.REPLACE,
    newPlanetName,
    previousPlanetName
});

export const resetPlanetList = () => ({
    type: SELECT_PLANET.RESET
});