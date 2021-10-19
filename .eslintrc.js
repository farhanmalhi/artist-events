module.exports = {
    'globals': {
        'process': true
    },
    'env': {
        'browser': true,
        'node':true,
        'es6':true,
        'es2021': true,
        'jest/globals': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended'
    ],
    'settings': {
        'react': {
            'version': 'detect',                       
        },
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },  
    'plugins': [
        'react',
        'jest'
    ],
    'rules': {
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'no-process-env':0,
        'react/prop-types': 0,
        'indent': [
            'error',
            4
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
    

};
