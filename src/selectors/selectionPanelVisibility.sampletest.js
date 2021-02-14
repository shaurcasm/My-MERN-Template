import selector from './selectionPanelVisibility';
import * as selectPlanet from '../actions/selectPlanets.js';
import rootReducer from '../reducers/index';

function addPlanet(state, planet) {

    return rootReducer(state, selectPlanet.addPlanet(planet));
}

describe('Panel Visibility Selector', () => {

    test('When No Planet is Selected', () => {

        var expectedVisibility = {
            second: 'none',
            third: 'none',
            fourth: 'none',
            submitButton: false
        };
        var state = rootReducer(undefined, { type: null })
        expect(selector(state)).toEqual(expectedVisibility);
    });

    test('When One Planet is Selected', () => {

        var expectedVisibility = {
            second: 'flex',
            third: 'none',
            fourth: 'none',
            submitButton: false
        };
        var state = addPlanet(undefined, 'Donlon');
        expect(selector(state)).toEqual(expectedVisibility);
    });

    test('When Two Planets are Selected', () => {

        var expectedVisibility = {
            second: 'flex',
            third: 'flex',
            fourth: 'none',
            submitButton: false
        };
        var state = addPlanet(undefined, 'Donlon');
        state = addPlanet(state, 'Enchai');
        expect(selector(state)).toEqual(expectedVisibility);
    });

    test('When Three Planets are Selected', () => {

        var expectedVisibility = {
            second: 'flex',
            third: 'flex',
            fourth: 'flex',
            submitButton: false
        };
        var state = addPlanet(undefined, 'Donlon');
        state = addPlanet(state, 'Enchai');
        state = addPlanet(state, 'Jebing');
        expect(selector(state)).toEqual(expectedVisibility);
    });

    test('When Four Planets are Selected', () => {

        var expectedVisibility = {
            second: 'flex',
            third: 'flex',
            fourth: 'flex',
            submitButton: true
        };
        var state = addPlanet(undefined, 'Donlon');
        state = addPlanet(state, 'Enchai');
        state = addPlanet(state, 'Jebing');
        state = addPlanet(state, 'Sapir');
        expect(selector(state)).toEqual(expectedVisibility);
    });

    test('Reset', () => {

        var expectedVisibility = {
            second: 'flex',
            third: 'flex',
            fourth: 'flex',
            submitButton: true
        };
        var state = addPlanet(undefined, 'Donlon');
        state = addPlanet(state, 'Enchai');
        state = addPlanet(state, 'Jebing');
        state = addPlanet(state, 'Sapir');
        expect(selector(state)).toEqual(expectedVisibility);

        expectedVisibility = {
            second: 'none',
            third: 'none',
            fourth: 'none',
            submitButton: false
        };
        state = rootReducer(state, selectPlanet.resetPlanetList());
        expect(selector(state)).toEqual(expectedVisibility);
    });

    test('Default/Error case: When Five Planets are Selected', () => {

        var expectedVisibility = {
            second: 'none',
            third: 'none',
            fourth: 'none',
            submitButton: false
        };
        var state = addPlanet(undefined, 'Donlon');
        state = addPlanet(state, 'Enchai');
        state = addPlanet(state, 'Jebing');
        state = addPlanet(state, 'Sapir');
        state = addPlanet(state, 'Lerbin');
        expect(selector(state)).toEqual(expectedVisibility);
    });
 });