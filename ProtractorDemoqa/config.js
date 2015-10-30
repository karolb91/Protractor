// An example configuration file.
exports.config = {
    onPrepare : function() {
        global.dv = browser.driver;
    },

    // Framework to use. Jasmine 2 is recommended.
    framework : 'jasmine2',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs : [ 'demoqa_spec.js' ],

    // Options to be passed to Jasmine.
    jasmineNodeOpts : {
        defaultTimeoutInterval : 80000
    },

    // directConnect: true,

    // FOR CHROME
    capabilities : {
        'browserName' : 'chrome'
    },
    directConnect : true,

// FOR ANDROID
/*
 * capabilities : { //'platform' : 'android', 'browserName' : 'Browser',
 * 'appium-version' : '1.4.0.0', 'platformName' : 'Android', 'platformVersion' :
 * '6.0', 'deviceName' : 'Android Emulator', 'fullReset' : 'true', },
 * seleniumAddress : 'http://127.0.0.1:4723/wd/hub',
 */

};
