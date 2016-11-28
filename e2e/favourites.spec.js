'use strict';

describe('CrowDevelop favourite page', function() {
    var handlePromise;
    var favourites = element.all(by.repeater('project in favProjects'));

    beforeAll(function() {

        browser.get('http://localhost:5000/projects/favourites');
    });

    it('title should be CrowDevelop', function() {
        expect(browser.getTitle()).toEqual('CrowDevelop');
    });

    it('should have a navbar', function() {
        var brand = element.all(by.className('navbar-brand')).first();
        expect(brand.getText()).toEqual('CROWDEVELOP');
    });

    it('should have a footer', function() {
        expect(element(by.css('footer'))).not.toBe(null);
    });

    it('should have a list of projects', function() {
        if (favourites.length == 0) {
            expect(element(by.id('errorBig')).getText()).toEqual('You have no favourite projects...Yet!');
            expect(element(by.id('errorSmall')).getText()).toEqual('Favourite a project first');
        } else {
            var project = favourites.first();
            var projectName = element(by.id('projectName'));
            var projectDescription = element(by.id('projectDescription'));
            var detailsButton = element(by.id('detailsButton'));
            expect(projectName.isPresent());
            expect(projectDescription.isPresent());
            expect(detailsButton.isPresent());
        }
    });

});
