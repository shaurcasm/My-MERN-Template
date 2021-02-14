import reducer from './vehicleList';
import { FETCH_VEHICLES, SELECT_VEHICLE } from '../constants/actionTypes.js';
import { OFFLINE_VEHICLES } from '../constants/nouns.js';

describe('vehicleList Reducer', () => {

    describe('Fetching:', () => {
        
        test('Should return that Fetching has begun', () => {

            expect(
                reducer(undefined, {
                    type: FETCH_VEHICLES.BEGIN
                })
            ).toEqual({
                vehicleArray: OFFLINE_VEHICLES,
                initialVehicleArray: OFFLINE_VEHICLES,
                loading: true,
                error: null
            });
        });

        test('Should return that Fetching has Succeeded', () => {

            expect(
                reducer(undefined, {
                    type: FETCH_VEHICLES.SUCCESS,
                    payload: { vehicleArray: ['Millenium Falcon', 'Starship', 'Normandy'] }
                })
            ).toEqual({
                vehicleArray: ['Millenium Falcon', 'Starship', 'Normandy'],
                initialVehicleArray: ['Millenium Falcon', 'Starship', 'Normandy'],
                loading: false,
                error: null
            });

            expect(
                reducer(undefined, {
                    type: FETCH_VEHICLES.SUCCESS,
                    payload: { vehicleArray: ['Dreadnaught', 'Esperia Talon', 'Mercury Star Runner'] }
                })
            ).toEqual({
                vehicleArray: ['Dreadnaught', 'Esperia Talon', 'Mercury Star Runner'],
                initialVehicleArray: ['Dreadnaught', 'Esperia Talon', 'Mercury Star Runner'],
                loading: false,
                error: null
            });
        });

        test('Should return that Fetching has Failed', () => {

            expect(
                reducer(undefined, {
                    type: FETCH_VEHICLES.FAILURE,
                    payload: { error: 'This is a simulation.' }
                })
            ).toEqual({
                vehicleArray: OFFLINE_VEHICLES,
                initialVehicleArray: OFFLINE_VEHICLES,
                loading: false,
                error: 'This is a simulation.'
            });

            expect(
                reducer(undefined, {
                    type: FETCH_VEHICLES.FAILURE,
                    payload: { error: 'Choose the red pill.' }
                })
            ).toEqual({
                vehicleArray: OFFLINE_VEHICLES,
                initialVehicleArray: OFFLINE_VEHICLES,
                loading: false,
                error: 'Choose the red pill.'
            });
        });
    });

    describe('Selection:', () => {
            
        test('Should return initial state', () => {

            expect(reducer(undefined, {})).toEqual({
                vehicleArray: OFFLINE_VEHICLES,
                initialVehicleArray: OFFLINE_VEHICLES,
                loading: false,
                error: null
            })
        });

        test('Should handle Add action', () => {

            expect(
                reducer({
                    vehicleArray: [
                        { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                        { name: 'Starship', selected: [], 'total_no': 3 },
                        { name: 'Normandy', selected: [], 'total_no': 3 }
                    ]
                },
                {
                    type: SELECT_VEHICLE.ADD,
                    vehicleName: 'Millenium Falcon'
                })
            ).toEqual({
                vehicleArray: [
                    { name: 'Millenium Falcon', selected: [true], 'total_no': 2 },
                    { name: 'Starship', selected: [], 'total_no': 3 },
                    { name: 'Normandy', selected: [], 'total_no': 3 }
                ]
            });

            expect(
                reducer({
                    vehicleArray: [
                        { name: 'Millenium Falcon', selected: [true], 'total_no': 2 },
                        { name: 'Starship', selected: [], 'total_no': 3 },
                        { name: 'Normandy', selected: [], 'total_no': 3 }
                    ]
                },
                {
                    type: SELECT_VEHICLE.ADD,
                    vehicleName: 'Starship'
                })
            ).toEqual({
                vehicleArray: [
                    { name: 'Millenium Falcon', selected: [true], 'total_no': 2 },
                    { name: 'Starship', selected: [true], 'total_no': 2 },
                    { name: 'Normandy', selected: [], 'total_no': 3 }
                ]
            });

            expect(
                reducer({
                    vehicleArray: [
                        { name: 'Millenium Falcon', selected: [true], 'total_no': 2 },
                        { name: 'Starship', selected: [], 'total_no': 3 },
                        { name: 'Normandy', selected: [true], 'total_no': 2 }
                    ]
                },
                {
                    type: SELECT_VEHICLE.ADD,
                    vehicleName: 'Normandy'
                })
            ).toEqual({
                vehicleArray: [
                    { name: 'Millenium Falcon', selected: [true], 'total_no': 2 },
                    { name: 'Starship', selected: [], 'total_no': 3 },
                    { name: 'Normandy', selected: [true, true], 'total_no': 1 }
                ]
            });
        });

        test('Should Handle Replace Action', () => {

            expect(
                reducer({
                    vehicleArray: [
                        { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                        { name: 'Starship', selected: [], 'total_no': 3 },
                        { name: 'Normandy', selected: [true], 'total_no': 2 }
                    ],
                    initialVehicleArray: [
                        { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                        { name: 'Starship', selected: [], 'total_no': 3 },
                        { name: 'Normandy', selected: [], 'total_no': 3 }
                    ]
                },
                {
                    type: SELECT_VEHICLE.REPLACE,
                    newVehicleName: 'Millenium Falcon',
                    previousVehicleName: 'Normandy'
                })
            ).toEqual({
                vehicleArray: [
                    { name: 'Millenium Falcon', selected: [true], 'total_no': 2 },
                    { name: 'Starship', selected: [], 'total_no': 3 },
                    { name: 'Normandy', selected: [], 'total_no': 3 }
                ],
                initialVehicleArray: [
                    { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                    { name: 'Starship', selected: [], 'total_no': 3 },
                    { name: 'Normandy', selected: [], 'total_no': 3 }
                ]
            });

            expect(
                reducer({
                    vehicleArray: [
                        { name: 'Millenium Falcon', selected: [true], 'total_no': 2 },
                        { name: 'Starship', selected: [true], 'total_no': 2 },
                        { name: 'Normandy', selected: [], 'total_no': 3 }
                    ],
                    initialVehicleArray: [
                        { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                        { name: 'Starship', selected: [], 'total_no': 3 },
                        { name: 'Normandy', selected: [], 'total_no': 3 }
                    ]
                },
                {
                    type: SELECT_VEHICLE.REPLACE,
                    newVehicleName: 'Starship',
                    previousVehicleName: 'Millenium Falcon'
                })
            ).toEqual({
                vehicleArray: [
                    { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                    { name: 'Starship', selected: [true, true], 'total_no': 1 },
                    { name: 'Normandy', selected: [], 'total_no': 3 }
                ],
                initialVehicleArray: [
                    { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                    { name: 'Starship', selected: [], 'total_no': 3 },
                    { name: 'Normandy', selected: [], 'total_no': 3 }
                ]
            });

            expect(
                reducer({
                    vehicleArray: [
                        { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                        { name: 'Starship', selected: [], 'total_no': 3 },
                        { name: 'Normandy', selected: [true], 'total_no': 2 }
                    ],
                    initialVehicleArray: [
                        { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                        { name: 'Starship', selected: [], 'total_no': 3 },
                        { name: 'Normandy', selected: [], 'total_no': 3 }
                    ]
                },
                {
                    type: SELECT_VEHICLE.REPLACE,
                    newVehicleName: 'Normandy',
                    previousVehicleName: 'Millenium Falcon'
                })
            ).toEqual({
                vehicleArray: [
                    { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                    { name: 'Starship', selected: [], 'total_no': 3 },
                    { name: 'Normandy', selected: [true, true], 'total_no': 1 } // Not wasting more time on test-proofing an inconsequential test. Atleast, the previousSelection doesn't outOfBound.
                ],
                initialVehicleArray: [
                    { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                    { name: 'Starship', selected: [], 'total_no': 3 },
                    { name: 'Normandy', selected: [], 'total_no': 3 }
                ]
            });
        });

        test('Should handle Reset Action', () => {

            expect(
                reducer({
                    vehicleArray: [
                        { name: 'Millenium Falcon', selected: [true, true], 'total_no': 1 },
                        { name: 'Starship', selected: [true], 'total_no': 2 },
                        { name: 'Normandy', selected: [true, true, true], 'total_no': 0 }
                    ],
                    initialVehicleArray: [
                        { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                        { name: 'Starship', selected: [], 'total_no': 3 },
                        { name: 'Normandy', selected: [], 'total_no': 3 }
                    ]
                },
                {
                    type: SELECT_VEHICLE.RESET,
                })
            ).toEqual({
                vehicleArray: [
                    { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                    { name: 'Starship', selected: [], 'total_no': 3 },
                    { name: 'Normandy', selected: [], 'total_no': 3 }
                ],
                initialVehicleArray: [
                    { name: 'Millenium Falcon', selected: [], 'total_no': 3 },
                    { name: 'Starship', selected: [], 'total_no': 3 },
                    { name: 'Normandy', selected: [], 'total_no': 3 }
                ]
            });
        });
    });
})