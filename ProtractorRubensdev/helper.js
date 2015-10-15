'use strict';

var Helper = function() {
};

Helper.prototype = Object.create({}, {
    waitForElementPresent : {
        value : function(locator) {
            browser.driver.wait(function() {
                var deferred = protractor.promise.defer();
                dv.isElementPresent(locator).then(function(data) {
                    deferred.fulfill(data);
                });
                return deferred.promise;
            });
        }
    },
    waitForElementVisible : {
        value : function(locator) {
            dv.wait(function() {
                var deferred = protractor.promise.defer();
                dv.isElementPresent(locator).then(function(present) {
                    if (present) {
                        dv.findElement(locator).isDisplayed().then(function(visible) {
                            deferred.fulfill(visible);
                        });
                    }
                    deferred.fulfill(present);
                });
                return deferred.promise;
            });
        }
    }
});

module.exports = Helper;