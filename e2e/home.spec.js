'use strict';

describe('CrowDevelop home page', function() {
    var projects = element.all(by.repeater('project in projects'));
    var categories = element.all(by.repeater('category in categories'));
    var searchForm = element(by.className('form'));
    var search = element(by.model('query'));

    beforeEach(function() {
        browser.get('http://localhost:5000');
    });

    it('title should be CrowDevelop', function() {
        expect(browser.getTitle()).toEqual('CrowDevelop');
    });

    it('should have projects', function() {
        if (projects.length == 0) {
            var message = element(by.className('empty'));
            expect(message.getText()).toEqual('No projects created yet');
        }
        expect(projects.length).not.toBe(0);
    });

    it('should have categories', function() {
        expect(categories.length).not.toBe(0);
    });

    it('should have a brand text', function() {
        var brand = element.all(by.className('navbar-brand')).first();
        expect(brand.getText()).toEqual('CROWDEVELOP');
    });

    it('should have footer links', function() {
        expect(element(by.css('footer'))).not.toBe(null);
    });

    it('should have search form that redirects to projects/index', function() {
        search.sendKeys('Test1');
        searchForm.submit().then(function() {
            expect(browser.getCurrentUrl()).toEqual('http://localhost:5000/projects/index');
        });
    });

    it('should automatically show not found when location is not permited', function() {
        browser.get('http://localhost:5000/asd');
        var notFound = element(by.id('notFound'));
        expect(notFound.getText()).toEqual('Page Not Found');
    });
});
