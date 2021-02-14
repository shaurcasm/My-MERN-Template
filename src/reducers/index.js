import { combineReducers } from 'redux';    // To make a reducer with sub-reducers.
import planetList from './planetList.js';
import vehicleList from './vehicleList.js';

const rootReducer = combineReducers({
    planetList,
    vehicleList
});

export default rootReducer