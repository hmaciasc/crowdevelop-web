'use strict';

describe('CrowDevelop details page', function() {
    var updates = element.all(by.repeater('update in projectUpdates'));
    var comments = element.all(by.repeater('comment in comments'));
    var features = element.all(by.repeater('feature in features'));

    beforeAll(function() {
        browser.get('http://localhost:5000/projects/index/-KXWsNzIL95aYJc3S9GX');
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

    it('should have a title and owner', function() {
        var title = element(by.id('projectName'));
        var owner = element(by.id('projectOwner'));
        expect(title.getText()).toEqual('Test');
        expect(owner.getText()).toEqual('by Héctor Macías');
    });

    it('should have a donate button', function() {
        var donateButton = element(by.id('donateButton'));
        expect(donateButton.getText()).toEqual('Donate to this project');
    });

    it('should have a favourite button', function() {
        var favouriteButton = element(by.className('fav-btn'));
        expect(favouriteButton.isPresent());
    });

    it('should have a description', function() {
        var description = element(by.id('description'));
        expect(description.getText()).toEqual('Test');
    });

    it('should have a category', function() {
        var category = element(by.id('category'));
        expect(category.getText()).toEqual('Sports');
    });

    it('should have a deadline', function() {
        var deadline = element(by.id('deadline'));
        expect(deadline.getText()).toEqual('Deadline: 5/2/2100');
    });

    it('should have a targetAmount', function() {
        var targetAmount = element(by.id('targetAmount'));
        expect(targetAmount.getText()).toEqual('Target amount: 120000€');
    });

    it('should have an update', function() {
        var updateIndex = element.all(by.className('updateIndex')).first();
        var updateBody = element.all(by.className('updateBody')).first();
        var updateURL = element.all(by.className('updateURL')).first();
        expect(updateIndex.getText()).toEqual('Update 1');
        expect(updateBody.getText()).toEqual('Update 1');
        expect(updateURL.getText()).toEqual('https://goo.gl/forms/e1TXG8Mf9hoVgTtP2');
    });

    it('should have a feature', function() {
        var featureDescription = element.all(by.className('featureDescription')).first();
        var featurePoints = element.all(by.className('featurePoints')).first();
        expect(featureDescription.getText()).toEqual('1º Feature 1');
        expect(featurePoints.getText()).toEqual('1');
    });

    it('should have a comment', function() {
        var commentWriter = element.all(by.className('comment-writer')).first();
        expect(commentWriter.getText()).toEqual('Héctor Macías');
        var commentText = element.all(by.className('comment-text')).first();
        expect(commentText.getText()).toEqual('Comment 1');
    });

    it('should have 3 share buttons', function() {
        var googleShare = element.all(by.className('googleShare')).first();
        var twitterShare = element.all(by.className('twitterShare')).first();
        var facebookShare = element.all(by.className('facebookShare')).first();
        expect(twitterShare.isPresent());
        expect(googleShare.isPresent());
        expect(facebookShare.isPresent());
    });



});
