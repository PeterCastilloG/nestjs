type PORT = string | number;

export interface Configuration {
    app: {
        port: PORT
    }
}

const config: Configuration = {
    app: {
        port: process.env.APP_PORT || 3000
    }
}

export default config