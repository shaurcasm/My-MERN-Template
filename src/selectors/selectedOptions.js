import { createSelector } from 'reselect';

const planets = state => state.planetList.planetArray
const vehicles = state => state.vehicleList.vehicleArray

const selectedOptions = createSelector(
    planets,
    vehicles,
    (planetArray, vehicleArray) => ({
        'planet_names': planetArray.filter(planet => planet.selected === true).reduce((selected, planet) => {
            selected.push(planet.name);
            return selected
        }, []),
        'vehicle_names': (() => {
            let tempArray = [];
            vehicleArray.forEach(vehicle => {
                for(let index = 0; index < vehicle.selected.length; index++) {
                    tempArray.push(vehicle.name);
                }
            });
            return tempArray;
        })()
    })
);

export default selectedOptions;