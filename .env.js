const variables = {
    development: {
        googleApiKey: 'AIzaSyBSzwQIIfKUTHnoPMlWiH8VcWHuq7qFvW0'
    },
    production: {
        googleApiKey: 'AIzaSyBSzwQIIfKUTHnoPMlWiH8VcWHuq7qFvW0'
    }
};

const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development; // return this if in development mode
    }
    return variables.production; // otherwise, return this
};

export default getEnvVariables;