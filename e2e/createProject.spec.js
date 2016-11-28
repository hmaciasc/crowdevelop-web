'use strict';

describe('CrowDevelop details page', function() {
    var updates = element.all(by.repeater('update in projectUpdates'));
    var comments = element.all(by.repeater('comment in comments'));
    var features = element.all(by.repeater('feature in features'));

    beforeAll(function() {
        browser.get('http://localhost:5000/projects/create');
        browser.sleep(4000);
    });

    it('title should be CrowDevelop', function() {
        expect(browser.getTitle()).toEqual('CrowDevelop');
    });

    it('should have a brand text', function() {
        var brand = element.all(by.className('navbar-brand')).first();
        expect(brand.getText()).toEqual('CROWDEVELOP');
    });

    it('should have footer links', function() {
        expect(element(by.css('footer'))).not.toBe(null);
    });

    it('should have an email input', function() {
        var email = element(by.model('project.email'));
        expect(email.isPresent());
    });

    it('should have a name input', function() {
        var name = element(by.model('project.name'));
        expect(name.isPresent());
    });

    it('should have a category select', function() {
        var category = element(by.model('project.category'));
        expect(category.isPresent());
    });

    it('should have an image input', function() {
        var image = element(by.model('project.image'));
        expect(image.isPresent());
    });

    it('should have a video input', function() {
        var video = element(by.model('project.video'));
        expect(video.isPresent());
    });

    it('should have a goal input', function() {
        var goal = element(by.model('project.goal'));
        expect(goal.isPresent());
    });


});
