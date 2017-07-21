var development = {
    host: "https://oz-dev.crewlogix.com",
    port: "13000",
    path: "https://oz-dev.crewlogix.com:13000",
    apiKey : "objective@crewlogix",
    sendGridApiKEY : "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",
    publicPath: "http://localhost:3000",
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        db: 'objective_zero'
    },
    baseURL : "localhost:3000"
};

var production = {
    host: "localhost",
    port: "3000",
    path: "localhost:3000"
}
 
module.exports = function() {

    switch (process.env.NODE_ENV) {
        case 'development':
            return development;
            break;
        case 'production':
            return production;
            break;
        default:
            return development;
    }

};
