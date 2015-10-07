var todoList = require('./tasks.json');

describe('rubensdev homepage', function() {
    var EC = protractor.ExpectedConditions;
    browser.get('http://rubensdev.com/todo-app/#/firstrun');

    var elem1 = element(by.xpath('//*[@id="appTitle"]/a'));
    var waitElem1 = EC.visibilityOf(elem1);
    browser.wait(waitElem1, 4000);
    elem1.click();

    var elem2 = element(by.xpath('//*[@id="card2"]/div/a'));
    var waitElem2 = EC.visibilityOf(elem2);
    browser.wait(waitElem2, 4000);
    elem2.click();

    var elem3 = element(by.xpath('//*[@id="card3"]/div/a'));
    var waitElem3 = EC.visibilityOf(elem3);
    browser.wait(waitElem3, 4000);
    elem3.click();

    describe('todo list', function() {
        var waitBtn;
        var addBtn;
        addBtn = $("#addTaskButton");
        waitBtn = EC.presenceOf(addBtn);
        var taskList;

        beforeEach(function() {
            taskList = element.all(by.repeater('task in tasks'));
        });

        it('should add a task', function() {
            browser.wait(waitBtn, 3000);
            addBtn.click();
            dv.sleep(500);
            element(by.name('newTask')).sendKeys('First Task');
            dv.sleep(500);
            element(by.id('submitButton')).click();
            dv.sleep(500);
            taskList = element.all(by.repeater('task in tasks'));
            expect(taskList.count()).toEqual(1);
        });

        it('should add another task', function() {
            addBtn.click();
            dv.sleep(500);
            element(by.name('newTask')).sendKeys('Second Task');
            dv.sleep(500);
            element(by.id('submitButton')).click();
            dv.sleep(500);
            taskList = element.all(by.repeater('task in tasks'));
            expect(taskList.count()).toEqual(2);
        });

        it('completed tasks list should be empty', function() {
            dv.sleep(500);
            element(by.xpath('//*[@id="filters"]/li[3]/a')).click();
            dv.sleep(500);
            taskList = element.all(by.repeater('task in tasks'));
            dv.sleep(500);
            expect(taskList.count()).toEqual(0);
        });

        it('checkbox test', function() {
            element(by.css('#filters > li:nth-child(1) > a')).click();
            dv.sleep(500);
            element.all(by.css(".taskCheck")).each(function(elem) {
                elem.click();
            });
            dv.sleep(500);
            element(by.xpath('//*[@id="filters"]/li[3]/a')).click();
            dv.sleep(500);
            taskList = element.all(by.repeater('task in tasks'));
            dv.sleep(500);
            expect(taskList.count()).toEqual(2);
        });

        it('delete all', function() {
            taskList = element.all(by.repeater('task in tasks'));
            taskList.get(0).click();
            taskList.get(0).element(by.id('deleteTask')).click();
            do {
                taskList = element.all(by.repeater('task in tasks'));
                taskList.get(0).element(by.id('deleteTask')).click();
            } while (taskList.count() > 0);

            expect(taskList.count()).toEqual(0);
        });

        it('add tasks from json', function() {
            element(by.css('#filters > li:nth-child(1) > a')).click();
            for ( var i in todoList.list) {
                addBtn.click();
                dv.sleep(500);
                element(by.name('newTask')).sendKeys(todoList.list[i].task);
                dv.sleep(500);
                element(by.id('submitButton')).click();
                dv.sleep(500);
            }

            taskList = element.all(by.repeater('task in tasks'));

            for ( var i in todoList.list) {
                expect(taskList.get(i).getText()).toEqual(todoList.list[i].task.substring(0, 140));
            }

            expect(taskList.count()).toEqual(todoList.list.length);
        });
    });
});
