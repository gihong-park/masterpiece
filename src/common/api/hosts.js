import { Platform } from 'react-native';

const ENV = {
    production: 'production',
    development: 'developement',
};

const getHost = () => {
    if (CurrentProcess === ENV.production) {
        return 'http://35.196.138.205';
    } else {
        if (Platform.OS === 'ios') {
            return 'http://localhost:3000';
        } else {
            return 'http://10.0.2.2:3000';
        }
    }
};

const set = env => {
    CurrentProcess = env;
    CurrentHost = getHost();
    return { CurrentProcess, CurrentHost };
};
const setToProduction = () => {
    return set(ENV.production);
};
const setToDevelopment = () => {
    return set(ENV.development);
};

let CurrentProcess = ENV.development;
let CurrentHost = getHost();

export { CurrentProcess, CurrentHost, setToProduction, setToDevelopment };
