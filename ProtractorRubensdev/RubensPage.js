var Helper = require('./helper.js');
var helper = new Helper();
var startButtons = {
    first : by.xpath('//*[@id="appTitle"]/a'),
    second : by.xpath('//*[@id="card2"]/div/a'),
    third : by.xpath('//*[@id="card3"]/div/a')
};
var addButton = by.id("addTaskButton");
var submitButton = by.id("submitButton");
var textFieldOfTask = by.name('newTask');
var tasks = by.repeater("task in tasks");
var filterBar = by.xpath('//*[@id="filters"]');

var getFilter = function(order) {
    var path = '//*[@id="filters"]/li[' + order + ']';
    return {
        locator : by.xpath(path),
        link : {
            locator : by.xpath(path + "//a")
        },
        getText : function() {
            return dv.findElement(this.link.locator).getText();
        }
    }
}

var RubensPage = function() {
};

RubensPage.prototype = Object.create({}, {
    open : {
        value : function() {
            dv.get('http://rubensdev.com/todo-app/#/firstrun');
            helper.waitForElementPresent(startButtons.first);
            dv.findElement(startButtons.first).click();
            helper.waitForElementPresent(startButtons.second);
            dv.findElement(startButtons.second).click();
            helper.waitForElementPresent(startButtons.third);
            dv.findElement(startButtons.third).click();
            helper.waitForElementPresent(addButton);
        }
    },
    addTask : {
        value : function(text) {
            dv.findElement(addButton).click();
            helper.waitForElementVisible(textFieldOfTask);
            dv.findElement(textFieldOfTask).sendKeys(text);
            dv.findElement(submitButton).click();
        }
    },
    getTaskList : {
        value : function() {
            return element.all(tasks);
        }
    },
    getTasksCount : {
        value : function() {
            return element.all(tasks).count();
        }
    },
    getFilterButtons : {
        value : function() {
            return {
                all : getFilter(1),
                active : getFilter(2),
                completed : getFilter(3)
            }
        }
    },
    allTasks : {
        value : function() {
            helper.waitForElementVisible(this.getFilterButtons().all.locator);
            dv.findElement(this.getFilterButtons().all.locator).click();
        }
    },
    activeTasks : {
        value : function() {
            helper.waitForElementVisible(this.getFilterButtons().avtive.locator);
            dv.findElement(this.getFilterButtons().avtive.locator).click();
        }
    },
    completedTasks : {
        value : function() {
            helper.waitForElementVisible(this.getFilterButtons().completed.locator);
            dv.findElement(this.getFilterButtons().completed.locator).click();
        }
    },
    checkAll : {
        value : function() {
            element.all(by.css(".taskView > input")).then(function(checkBoxes) {
                for ( var i in checkBoxes) {
                    checkBoxes[i].click();
                }
            });

        }
    }
});

module.exports = RubensPage;