var todoList = require('./tasks.json');

describe('rubensdev homepage', function() {
    var RubensPage = require("./RubensPage.js");
    var rubensPage = new RubensPage();
    var buttons;
    var expects = {
        homeUrl : "http://rubensdev.com/todo-app/#/home",
        buttonLabel : {
            all : "All",
            active : "Active",
            completed : "Completed"
        }
    }

    it("open homepage", function() {
        rubensPage.open();
        expect(dv.getCurrentUrl()).toEqual(expects.homeUrl);
        buttons = rubensPage.getFilterButtons();
        expect(buttons.all.getText()).toEqual(expects.buttonLabel.all);
        expect(buttons.active.getText()).toEqual(expects.buttonLabel.active);
        expect(buttons.completed.getText()).toEqual(expects.buttonLabel.completed);
    });

    describe('todo list', function() {

        beforeEach(function() {
        });

        it('should add a task', function() {
            rubensPage.addTask("First task");
            expect(rubensPage.getTasksCount()).toEqual(1);
        });

        it('should add another task', function() {
            rubensPage.addTask("Second task");
            expect(rubensPage.getTasksCount()).toEqual(2);
        });

        it('completed tasks list should be empty', function() {
            rubensPage.completedTasks();
            expect(rubensPage.getTasksCount()).toEqual(0);
        });

        it('checkbox test', function() {
            rubensPage.allTasks();
            rubensPage.checkAll();
            rubensPage.completedTasks();
            expect(rubensPage.getTasksCount()).toEqual(2);
        });

        it('delete all', function() {
            expect(1).toEqual(1);
        });

        it('add tasks from json', function() {
            expect(1).toEqual(1);
        });
    });
});
