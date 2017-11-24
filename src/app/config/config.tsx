import * as _merge from 'lodash/merge';

// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
// There is also a special built-in environment variable called NODE_ENV. You can
// read it from process.env.NODE_ENV. When you run npm start, it is always equal
// to 'development', when you run npm test it is always equal to 'test', and when
// you run npm run build to make a production bundle, it is always equal to
// 'production'. You cannot override NODE_ENV manually. This prevents developers
// from accidentally deploying a slow development build to production.
const ENV = process.env.NODE_ENV || 'production';

export const IS_PRODUCTION = /production/.test(ENV);

export interface EnvironmentConfig {
    appCode?: string;
    api?: {
        url?: string;
    };
    css?: {
        B?: (name) => string;
    };
}

// production chapeme ako default
const production: EnvironmentConfig = {
    appCode: 'app',

    css: {
        // "B" from "BEM"
        B: (name) => `app${name}`,
    },

};

// dev dedi z production
const development: EnvironmentConfig = _merge({}, production, {
    //
});


//
const environments = { development, production };
export const config: EnvironmentConfig = environments[ENV];


