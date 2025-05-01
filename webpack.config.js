// https://gist.github.com/anthonny/54bf484b3633d934dfe17d036c9f8b58

const webpack = require("@nativescript/webpack");
const dotenv = require("dotenv");
module.exports = (env) => {
	webpack.init(env);

	dotenv.config()
    const isUppercase = key => key.toUpperCase() === key;
    const envKeys = Object.keys(env);
    let dotEnvValues = envKeys
        .filter(isUppercase)
        .reduce((memo, key) => {
            return {...memo, [key]: JSON.stringify(env[key])};
        }, {})

    const dotEnvkeys = Object.keys(process.env);
    dotEnvValues = dotEnvkeys
        .filter(isUppercase)
        .reduce((memo, key) => {
            if (memo[key]) {
                return memo;
            }

            return {...memo, [key]: dotEnvValues[key] || JSON.stringify(process.env[key])};
        }, {...dotEnvValues})

		// console.log(dotEnvValues);

		webpack.chainWebpack(config => {
			config.plugin('DefinePlugin').tap(args => {
			  Object.assign(args[0], dotEnvValues)
		
			  return args
			})
		  })

	return webpack.resolveConfig();
};