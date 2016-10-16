'use strict';

describe('CrowDevelop index and categories page', function() {
    var projects = element.all(by.repeater('project in projects'));

    beforeEach(function() {
        browser.get('http://localhost:5000/projects/category/Development');
        browser.waitForAngular();
    });

    it('title should be CrowDevelop', function() {
        expect(browser.getTitle()).toEqual('CrowDevelop');
    });

    it('should be at least one project', function() {
        if (projects.length == 0) {
            var message = element(by.className('empty'));
            expect(message.getText()).toEqual('No projects created yet');
        }
        expect(projects.length).not.toBe(0);
    });

    it('should be on categories view', function() {
        expect(browser.getCurrentUrl()).toEqual('http://localhost:5000/projects/category/Development');
    });

    it('should have a test project', function() {
        // element.all(by.repeater('project in projects')).then(function(projects) {
        //     var titleElement = projects[0].element(by.id('Title1'));
        //     expect(titleElement.getText()).toEqual('Title1');
        // });
        browser.driver.wait(function() {
            return element(by.id('Test1')).isDisplayed().then(function(IsVisible) {
                console.log(IsVisible);
                if (IsVisible) {
                    var title = element(by.id('Test1'));
                    expect(title.getText()).toBe('Test1');
                }
            });
        }, 10000);
    });

});
