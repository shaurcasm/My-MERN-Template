import { DEFAULT_RANGE } from '../constants/misc.js';

const timeManagement = (distance, speed) => {
    if((distance > 0) && (distance < DEFAULT_RANGE)) {
        return Math.round((distance / speed) * 100) / 100;  // Limiting precision to limit decimal calculation errors.
    }
}

export default timeManagement;