import { addPlanet, replacePlanet, resetPlanetList } from './selectPlanets.js';
import { SELECT_PLANET } from '../constants/actionTypes.js';

describe('Testing Actions that Select Planets', () => {

    var planetUn = 'Mars';
    var planetDeux = 'Venus';

    test('Send Action to Add Planet', () => {

        expect(addPlanet(planetUn)).toStrictEqual({ type: SELECT_PLANET.ADD, planetName: planetUn });
        expect(addPlanet(planetDeux)).toStrictEqual({ type: SELECT_PLANET.ADD, planetName: planetDeux });
    });

    test('Send Action to Replace Existing Planet with New One', () => {

        expect(replacePlanet(planetUn, planetDeux)).toStrictEqual({ type: SELECT_PLANET.REPLACE, newPlanetName: planetUn, previousPlanetName: planetDeux });
        expect(replacePlanet(planetDeux, planetUn)).toStrictEqual({ type: SELECT_PLANET.REPLACE, newPlanetName: planetDeux, previousPlanetName: planetUn });
    });

    test('Send Action to Reset Planet state', () => {

        expect(resetPlanetList()).toStrictEqual({ type: SELECT_PLANET.RESET });
    });
});