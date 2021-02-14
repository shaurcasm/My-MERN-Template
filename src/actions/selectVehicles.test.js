import { addVehicle, replaceVehicle, resetVehicleList } from './selectvehicles.js';
import { SELECT_VEHICLE } from '../constants/actionTypes.js';

describe('Testing Actions that Select Vehicles', () => {

    var vehicleUn = 'Skateboard';
    var vehicleDeux = 'Snowboard';

    test('Send Action to Add Vehicle', () => {

        expect(addVehicle(vehicleUn)).toStrictEqual({ type: SELECT_VEHICLE.ADD, vehicleName: vehicleUn });
        expect(addVehicle(vehicleDeux)).toStrictEqual({ type: SELECT_VEHICLE.ADD, vehicleName: vehicleDeux });
    });

    test('Send Action to Replace Existing vehicle with New One', () => {

        expect(replaceVehicle(vehicleUn, vehicleDeux)).toStrictEqual({ type: SELECT_VEHICLE.REPLACE, newVehicleName: vehicleUn, previousVehicleName: vehicleDeux });
        expect(replaceVehicle(vehicleDeux, vehicleUn)).toStrictEqual({ type: SELECT_VEHICLE.REPLACE, newVehicleName: vehicleDeux, previousVehicleName: vehicleUn });
    });

    test('Send Action to Reset vehicle state', () => {

        expect(resetVehicleList()).toStrictEqual({ type: SELECT_VEHICLE.RESET });
    });
});