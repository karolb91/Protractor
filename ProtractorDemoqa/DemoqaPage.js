"use strict";

var Helper = require('./helper.js');
var helper = new Helper();

var tab = 1;

var menu = by.xpath('//*[@id="secondary"]');
var homeTitle = by.className('entry-title');
var regBtn = by.xpath('//*[@id="menu-item-374"]');
var regItems = {
    name: {
        firstName: by.xpath('//*[@id="name_3_firstname"]'),
        lastName: by.xpath('//*[@id="name_3_lastname"]')
    },
    statusRadio: by.xpath('//*[@id="pie_register"]/li[2]/div/div/input[1]'),
    hobbyRadio: by.xpath('//*[@id="pie_register"]/li[3]/div/div[1]/input[1]'),
    countrySel: by.xpath('//*[@id="dropdown_7"]'),
    dateMonth: by.xpath('//*[@id="mm_date_8"]'),
    dateDay: by.xpath('//*[@id="dd_date_8"]'),
    dateYear: by.xpath('//*[@id="yy_date_8"]'),
    phone: by.xpath('//*[@id="phone_9"]'),
    username: by.xpath('//*[@id="username"]'),
    email: by.xpath('//*[@id="email_1"]'),
    password: by.xpath('//*[@id="password_2"]'),
    repassword: by.xpath('//*[@id="confirm_password_password_2"]'),
    regSubmit: by.xpath('//*[@id="pie_register"]/li[14]/div/input'),
    regSuccessTitle: by.xpath('//*[@id="post-49"]/div/p')
};
var aboutUs = by.xpath('//*[@id="menu-item-158"]/a');
var aboutUsText = by.xpath('//*[@id="post-156"]/div/p');

var draggable = by.xpath('//*[@id="menu-item-140"]/a');
var draggableItems = {
    container: by.xpath('//*[@id="tabs-1"]/div'),
    insideBox: by.xpath('//*[@id="draggable"]')
};

var tabs = by.xpath('//*[@id="menu-item-98"]/a');
var tabsItems = {
    tab1: by.xpath('//*[@id="ui-id-1"]'),
    tab2: by.xpath('//*[@id="ui-id-2"]'),
    tab3: by.xpath('//*[@id="ui-id-3"]'),
}

function getContainerLocator (nr) {
    return by.xpath('//*[@id="tabs-' + nr + '"]/p[1]');
}

var DemoqaPage = function () {
};

DemoqaPage.prototype = Object.create({}, {
    open: {
        value: function () {
            dv.get('http://demoqa.com/');
            helper.waitForElementPresent(menu);
        }
    },
    getTitle: {
        value: function () {
            return element(homeTitle).getText();
        }
    },
    goRegistration: {
        value: function () {
            element(regBtn).click();
            helper.waitForElementPresent(regItems.name.firstName);
        }
    },
    goAboutUs: {
        value: function () {
            element(aboutUs).click();
            helper.waitForElementPresent(aboutUsText);
            return element(aboutUsText).getText();
        }
    },
    goDraggable: {
        value: function () {
            element(draggable).click();
            helper.waitForElementPresent(draggableItems.container);
        }
    },
    goTabs: {
        value: function () {
            element(tabs).click();
            helper.waitForElementPresent(tabsItems.tab1);
        }
    },
    changeTab: {
        value: function (number) {
            switch (number) {
            case 1:
                tab = number;
                element(tabsItems.tab1).click();
                break;
            case 2:
                tab = number;
                element(tabsItems.tab2).click();
                break;
            case 3:
                tab = number;
                element(tabsItems.tab3).click();
                break;

            default:
                sys.error('Out of bound');
                break;
            }
        }
    },
    getTabText: {
        value: function () {
            return element(getContainerLocator(tab)).getText();
        }
    },
    dragAndDropBox: {
        value: function (x, y) {
            var div = element(draggableItems.insideBox);
            browser.actions().mouseMove(div.getWebElement(), {
                x: 0,
                y: 0
            }).mouseDown().mouseMove(div.getWebElement(), {
                x: x,
                y: y
            }).mouseUp().perform();
        }
    },
    getPositionOfDragBox: {
        value: function () {
            var div = element(draggableItems.insideBox);
            return findPos(div);
        }
    },
    fillRegData: {
        value: function (regData) {
            element(regItems.name.firstName).sendKeys(regData.firstName);
            element(regItems.name.lastName).sendKeys(regData.lastName);

            element(regItems.statusRadio).click();
            element(regItems.hobbyRadio).click();

            element(regItems.countrySel).sendKeys(regData.countrySel);
            element(regItems.dateMonth).sendKeys(regData.dateMonth);
            element(regItems.dateDay).sendKeys(regData.dateDay);
            element(regItems.dateYear).sendKeys(regData.dateYear);
            element(regItems.phone).sendKeys(regData.phone);
            element(regItems.username).sendKeys(regData.username);
            element(regItems.email).sendKeys(regData.email);
            element(regItems.password).sendKeys(regData.password);
            element(regItems.repassword).sendKeys(regData.password);
        }
    },
    submitRegistration: {
        value: function () {
            element(regItems.regSubmit).click();
            helper.waitForElementPresent(regItems.regSuccessTitle);
            return element(regItems.regSuccessTitle).getText();
        }
    }
});

function findPos (obj) {
    var curleft = 0, curtop = 0;

    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [ curleft, curtop ];
    }
}

module.exports = DemoqaPage;