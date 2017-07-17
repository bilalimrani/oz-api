var development = {
    host: "132.148.129.180",
    port: "13000",
    path: "132.148.129.180:13000",
    apiKey : "objective@crewlogix",
    sendGridApiKEY : "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",
    publicPath: "http://localhost:3000",
    db: {
        host: 'localhost',
        user: 'objective_zero',
        password: 'objectivezero',
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
