'use strict';

describe('CrowDevelop contact page', function() {

    beforeAll(function() {
        browser.get('http://localhost:5000/contact');
        browser.sleep(2000);
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

    it('should have an email link', function() {
        var email = element(by.id('email'));
        expect(email.getText()).toEqual('Email us');
    });

    it('should have an owner and a powered by text', function() {
        var owner = element(by.id('owner'));
        var powered = element(by.id('powered'));
        expect(owner.getText()).toEqual('Created by Héctor Macías');
        expect(powered.getText()).toEqual('Powered by Firebase');
    });

    it('should have 3 share buttons', function() {
        var facebook = element.all(by.className('btn-facebook')).first();
        var twitter = element.all(by.className('btn-twitter')).first();
        var google = element.all(by.className('btn-google')).first();
        expect(twitter.isPresent());
        expect(google.isPresent());
        expect(facebook.isPresent());
    });



});
