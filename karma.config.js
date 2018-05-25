const realBrowser = String(process.env.BROWSER).match(/^(1|true)$/gi)
const travisLaunchers = {
  chrome_travis: {
    base: 'Chrome',
    flags: ['--no-sandbox']
  }
}

const localBrowsers = realBrowser ? Object.keys(travisLaunchers) : ['Chrome']

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    plugins: [
      'karma-jasmine',
      'karma-typescript',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-spec-reporter'
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: 'src/**/*.ts' },
      { pattern: 'test/**/*.spec.ts' }
    ],
    preprocessors: {
      'src/**/*.ts': ['karma-typescript'],
      'test/**/*.spec.ts': ['karma-typescript']
    },
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json"
    },
    reporters: ['progress', 'kjhtml'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: localBrowsers,
    singleRun: false
  })
}
