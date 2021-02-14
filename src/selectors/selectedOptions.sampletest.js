import selector from './selectedOptions';
import * as selectPlanet from '../actions/selectPlanets.js';
import * as selectVehicle from '../actions/selectVehicles.js';
import rootReducer from '../reducers/index';

function addPlanet(state, planet) {
    
    return rootReducer(state, selectPlanet.addPlanet(planet));
}

function replacePlanet(state, newPlanet, oldPlanet) {

    return rootReducer(state, selectPlanet.replacePlanet(newPlanet, oldPlanet));
}

function addVehicle(state, vehicle) {
    return rootReducer(state, selectVehicle.addVehicle(vehicle));
}

function replaceVehicle(state, newVehicle, oldVehicle) {

    return rootReducer(state, selectVehicle.replaceVehicle(newVehicle, oldVehicle));
}

describe('Options Selector', () => {

    test('No Options selected', () => {

        var expectedOptions = {
            'planet_names': [],
            'vehicle_names': []
        };
        var state = rootReducer(undefined, { type: null })
        expect(selector(state)).toEqual(expectedOptions);
    });

    describe('Adding Planets', () => {

        test('One Planet; One Vehicle selected', () => {

            var expectedOptions = {
                'planet_names': ['Donlon'],
                'vehicle_names': ['Space pod']
            };
            var state = addPlanet(undefined, 'Donlon');
            state = addVehicle(state, 'Space pod');
            expect(selector(state)).toEqual(expectedOptions);
        });

        test('Two Planets; Two Vehicles selected', () => {

            var expectedOptions = {
                'planet_names': ['Donlon', 'Enchai'],
                'vehicle_names': ['Space pod', 'Space rocket']
            };
            var state = addPlanet(undefined, 'Donlon');
            state = addPlanet(state, 'Enchai');
            state = addVehicle(state, 'Space pod');
            state = addVehicle(state, 'Space rocket');
            expect(selector(state)).toEqual(expectedOptions);
        });

        test('Three Planets; Three Vehicles selected', () => {

            var expectedOptions = {
                'planet_names': ['Donlon', 'Enchai', 'Jebing'],
                'vehicle_names': ['Space pod', 'Space pod', 'Space rocket']
            };
            var state = addPlanet(undefined, 'Donlon');
            state = addPlanet(state, 'Enchai');
            state = addPlanet(state, 'Jebing');
            state = addVehicle(state, 'Space pod');
            state = addVehicle(state, 'Space pod');
            state = addVehicle(state, 'Space rocket');
            expect(selector(state)).toEqual(expectedOptions);
        });

        test('Four Planets; Four Vehicles selected', () => {

            var expectedOptions = {
                'planet_names': ['Donlon', 'Enchai', 'Jebing', 'Sapir'],
                'vehicle_names': ['Space pod', 'Space pod', 'Space rocket', 'Space shuttle']
            };
            var state = addPlanet(undefined, 'Donlon');
            state = addPlanet(state, 'Enchai');
            state = addPlanet(state, 'Jebing');
            state = addPlanet(state, 'Sapir');
            state = addVehicle(state, 'Space pod');
            state = addVehicle(state, 'Space pod');
            state = addVehicle(state, 'Space rocket');
            state = addVehicle(state, 'Space shuttle');
            expect(selector(state)).toEqual(expectedOptions);
        });
    });

    describe('Replacing Planets and Vehicles', () => {

        test('Replacing a planet', () => {

            var expectedOptions = {
                'planet_names': ['Donlon'],
                'vehicle_names': ['Space pod']
            };
            var state = addPlanet(undefined, 'Donlon');
            state = addVehicle(state, 'Space pod');
            expect(selector(state)).toEqual(expectedOptions);

            expectedOptions = {
                'planet_names': ['Enchai'],
                'vehicle_names': ['Space pod']
            };
            state = replacePlanet(state, 'Enchai', 'Donlon');
            expect(selector(state)).toEqual(expectedOptions);
        });

        test('Replacing a vehicle', () => {

            var expectedOptions = {
                'planet_names': ['Donlon'],
                'vehicle_names': ['Space pod']
            };
            var state = addPlanet(undefined, 'Donlon');
            state = addVehicle(state, 'Space pod');
            expect(selector(state)).toEqual(expectedOptions);

            expectedOptions = {
                'planet_names': ['Donlon'],
                'vehicle_names': ['Space rocket']
            };
            state = replaceVehicle(state, 'Space rocket', 'Space pod');
            expect(selector(state)).toEqual(expectedOptions);
        });
    });

    test('Reset', () => {

        var expectedOptions = {
            'planet_names': ['Donlon'],
            'vehicle_names': ['Space pod']
        };
        var state = addPlanet(undefined, 'Donlon');
        state = addVehicle(state, 'Space pod');
        expect(selector(state)).toEqual(expectedOptions);

        expectedOptions = {
            'planet_names': [],
            'vehicle_names': []
        };
        state = rootReducer(state, selectPlanet.resetPlanetList());
        state = rootReducer(state, selectVehicle.resetVehicleList());
        expect(selector(state)).toEqual(expectedOptions);
    })
});