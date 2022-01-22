export const apps = [
    {
        name: "app",
        script: "build/server.js",
        env_production: {
            NODE_ENV: "production"
        },
        instances: 1,
        autorestart: true // THIS is the important part, this will tell PM2 to restart your app if it falls over
    }
]
