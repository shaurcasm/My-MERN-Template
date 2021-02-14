import reducer from './planetList';
import { FETCH_PLANETS, SELECT_PLANET } from '../constants/actionTypes.js';
import { OFFLINE_PLANETS } from '../constants/nouns.js';

describe('planetList Reducer', () => {

    describe('Fetching:', () => {
        
        test('Should return that Fetching has begun', () => {

            expect(
                reducer(undefined, {
                    type: FETCH_PLANETS.BEGIN
                })
            ).toEqual({
                planetArray: OFFLINE_PLANETS,
                loading: true,
                error: null
            });
        });

        test('Should return that Fetching has Succeeded', () => {

            expect(
                reducer(undefined, {
                    type: FETCH_PLANETS.SUCCESS,
                    payload: { planetArray: ['Mercury', 'Venus', 'Earth'] }
                })
            ).toEqual({
                planetArray: ['Mercury', 'Venus', 'Earth'],
                loading: false,
                error: null
            });

            expect(
                reducer(undefined, {
                    type: FETCH_PLANETS.SUCCESS,
                    payload: { planetArray: ['Mars', 'Jupiter', 'Saturn'] }
                })
            ).toEqual({
                planetArray: ['Mars', 'Jupiter', 'Saturn'],
                loading: false,
                error: null
            });
        });

        test('Should return that Fetching has Failed', () => {

            expect(
                reducer(undefined, {
                    type: FETCH_PLANETS.FAILURE,
                    payload: { error: 'This is a simulation.' }
                })
            ).toEqual({
                planetArray: OFFLINE_PLANETS,
                loading: false,
                error: 'This is a simulation.'
            });

            expect(
                reducer(undefined, {
                    type: FETCH_PLANETS.FAILURE,
                    payload: { error: 'Choose the red pill.' }
                })
            ).toEqual({
                planetArray: OFFLINE_PLANETS,
                loading: false,
                error: 'Choose the red pill.'
            });
        });
    });

    describe('Selection:', () => {
            
        test('Should return initial state', () => {

            expect(reducer(undefined, {})).toEqual({
                planetArray: OFFLINE_PLANETS,
                loading: false,
                error: null
            })
        });

        test('Should handle Add action', () => {

            expect(
                reducer({
                    planetArray: [
                        { name: 'Mercury', selected: false },
                        { name: 'Venus', selected: false },
                        { name: 'Earth', selected: false }
                    ]
                },
                {
                    type: SELECT_PLANET.ADD,
                    planetName: 'Earth'
                })
            ).toEqual({
                planetArray: [
                    { name: 'Mercury', selected: false },
                    { name: 'Venus', selected: false },
                    { name: 'Earth', selected: true }
                ]
            });

            expect(
                reducer({
                    planetArray: [
                        { name: 'Mercury', selected: false },
                        { name: 'Venus', selected: false },
                        { name: 'Earth', selected: true }
                    ]
                },
                {
                    type: SELECT_PLANET.ADD,
                    planetName: 'Venus'
                })
            ).toEqual({
                planetArray: [
                    { name: 'Mercury', selected: false },
                    { name: 'Venus', selected: true },
                    { name: 'Earth', selected: true }
                ]
            });

            expect(
                reducer({
                    planetArray: [
                        { name: 'Mercury', selected: false },
                        { name: 'Venus', selected: true },
                        { name: 'Earth', selected: false }
                    ]
                },
                {
                    type: SELECT_PLANET.ADD,
                    planetName: 'Venus'
                })
            ).toEqual({
                planetArray: [
                    { name: 'Mercury', selected: false },
                    { name: 'Venus', selected: true },
                    { name: 'Earth', selected: false }
                ]
            });
        });

        test('Should Handle Replace Action', () => {

            expect(
                reducer({
                    planetArray: [
                        { name: 'Mercury', selected: true },
                        { name: 'Venus', selected: false },
                        { name: 'Earth', selected: false }
                    ]
                },
                {
                    type: SELECT_PLANET.REPLACE,
                    newPlanetName: 'Earth',
                    previousPlanetName: 'Mercury'
                })
            ).toEqual({
                planetArray: [
                    { name: 'Mercury', selected: false },
                    { name: 'Venus', selected: false },
                    { name: 'Earth', selected: true }
                ]
            });

            expect(
                reducer({
                    planetArray: [
                        { name: 'Mercury', selected: true },
                        { name: 'Venus', selected: false },
                        { name: 'Earth', selected: true }
                    ]
                },
                {
                    type: SELECT_PLANET.REPLACE,
                    newPlanetName: 'Venus',
                    previousPlanetName: 'Earth'
                })
            ).toEqual({
                planetArray: [
                    { name: 'Mercury', selected: true },
                    { name: 'Venus', selected: true },
                    { name: 'Earth', selected: false }
                ]
            });

            expect(
                reducer({
                    planetArray: [
                        { name: 'Mercury', selected: false },
                        { name: 'Venus', selected: true },
                        { name: 'Earth', selected: false }
                    ]
                },
                {
                    type: SELECT_PLANET.REPLACE,
                    newPlanetName: 'Venus',
                    previousPlanetName: 'Mercury'
                })
            ).toEqual({
                planetArray: [
                    { name: 'Mercury', selected: false },
                    { name: 'Venus', selected: true },
                    { name: 'Earth', selected: false }
                ]
            });
        });

        test('Should handle Reset Action', () => {

            expect(
                reducer({
                    planetArray: [
                        { name: 'Mercury', selected: true },
                        { name: 'Venus', selected: false },
                        { name: 'Earth', selected: false }
                    ]
                },
                {
                    type: SELECT_PLANET.RESET,
                })
            ).toEqual({
                planetArray: [
                    { name: 'Mercury', selected: false },
                    { name: 'Venus', selected: false },
                    { name: 'Earth', selected: false }
                ]
            });

            expect(
                reducer({
                    planetArray: [
                        { name: 'Mercury', selected: true },
                        { name: 'Venus', selected: true },
                        { name: 'Earth', selected: true }
                    ]
                },
                {
                    type: SELECT_PLANET.RESET,
                })
            ).toEqual({
                planetArray: [
                    { name: 'Mercury', selected: false },
                    { name: 'Venus', selected: false },
                    { name: 'Earth', selected: false }
                ]
            });
        });
    });
});