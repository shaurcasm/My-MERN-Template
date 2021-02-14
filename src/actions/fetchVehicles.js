import { FETCH_VEHICLES } from '../constants/actionTypes.js';
import { VEHICLES_API } from '../constants/misc.js';   // Contains the URL to the API
import fetch from 'node-fetch';

export const fetchVehiclesBegin = () => ({
    type: FETCH_VEHICLES.BEGIN
});

export const fetchVehiclesSuccess = vehicleArray => ({
    type: FETCH_VEHICLES.SUCCESS,
    payload: { vehicleArray }
});

export const fetchVehiclesFailure = error => ({
    type: FETCH_VEHICLES.FAILURE,
    payload: { error }
});

export function fetchVehicles() {
    return dispatch => {
        dispatch(fetchVehiclesBegin());

        return fetch(VEHICLES_API)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                json = json.map((obj) => ({ ...obj, selected: [] }))
                dispatch(fetchVehiclesSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchVehiclesFailure(error)));
    }
}

// Handle 4xx and 5xx errors for fetch.
function handleErrors(response) {
    if(!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}