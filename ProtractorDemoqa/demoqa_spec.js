var regData = {
    firstName: 'Jan',
    lastName: 'Nowak',
    countrySel: 'Poland',
    dateMonth: '7',
    dateDay: '11',
    dateYear: '1991',
    phone: '55512345678',
    username: 'newUser1',
    email: 'newUser1@gmailo.com',
    password: '123qwePassword'
}

var expects = {
    homeTitle: 'Home',
    regTitle: 'Registration',
    dragTitle: 'Draggable',
    tabTitle: 'Tabs',
    tab1: 'Proin elit arcu, rutrum commodo, vehicula tempus',
    tab2: 'Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante',
    tab3: 'Mauris eleifend est et turpis. Duis id erat',
    regSuccessTitle: 'Thank you for your registration',
    aboutUsText: 'Lorem Ipsum is simply dummy text'
}

describe('demoqa', function () {
    browser.ignoreSynchronization = true;
    var DemoqaPage = require("./DemoqaPage.js");
    var demoqaPage = new DemoqaPage();

    describe('homepage', function () {
        it('open homepage', function () {
            demoqaPage.open();
            expect(demoqaPage.getTitle()).toEqual(expects.homeTitle);
        });
    });

    describe('registration', function () {
        it('registration success', function () {
            demoqaPage.goRegistration();
            expect(demoqaPage.getTitle()).toContain(expects.regTitle);
            demoqaPage.fillRegData(regData);
            expect(demoqaPage.submitRegistration()).not.toEqual(expects.regSuccessTitle);
        });
    });

    describe('about us', function () {
        it('check text', function () {
            expect(demoqaPage.goAboutUs()).toContain(expects.aboutUsText);
        });
    });

    describe('draggable', function () {
        it('drag and drop element', function () {
            demoqaPage.goDraggable();
            expect(demoqaPage.getTitle()).toContain(expects.dragTitle);
            var position = demoqaPage.getPositionOfDragBox();
            demoqaPage.dragAndDropBox(50, 50);
            var position2 = demoqaPage.getPositionOfDragBox();
            expect(position2[0]).not.toEqual(position[0]);
            expect(position2[1]).not.toEqual(position[1]);
        });
    });

    describe('tabs', function () {
        it('check tabs', function () {
            demoqaPage.goTabs();
            expect(demoqaPage.getTitle()).toContain(expects.tabTitle);
            expect(demoqaPage.getTabText()).toContain(expects.tab1);
            demoqaPage.changeTab(2);
            expect(demoqaPage.getTabText()).toContain(expects.tab2);
            demoqaPage.changeTab(3);
            expect(demoqaPage.getTabText()).toContain(expects.tab3);
        });
    });
});