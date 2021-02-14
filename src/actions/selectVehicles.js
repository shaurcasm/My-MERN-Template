import { SELECT_VEHICLE } from '../constants/actionTypes.js';

// Vehicle List
export const addVehicle = vehicleName => ({
    type: SELECT_VEHICLE.ADD,
    vehicleName
});

// Function(arg1, arg2): arg1 -> New Vehicle; arg2 -> Previous Vehicle
export const replaceVehicle = (newVehicleName, previousVehicleName) => ({
    type: SELECT_VEHICLE.REPLACE,
    newVehicleName,
    previousVehicleName
});

export const resetVehicleList = () => ({
    type: SELECT_VEHICLE.RESET
});