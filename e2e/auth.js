'use strict';

describe('CrowDevelop home page', function() {
    var handlePromise;

    beforeAll(function() {
        browser.get('http://localhost:5000/login');
        handlePromise = browser.driver.getAllWindowHandles();
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

    it('login shows 3 providers', function() {
        var google = element(by.className('btn-google'));
        var twitter = element(by.className('btn-twitter'));
        var facebook = element(by.className('btn-facebook'));
        expect(google.isPresent());
        expect(twitter.isPresent());
        expect(facebook.isPresent());
    });

    // it('google auth popsup', function() {
    //     var google = element(by.className('btn-google')).click();
    //     browser.sleep(12000);
    //     browser.getAllWindowHandles().then(function(handles) {
    //
    //         browser.switchTo().window(handles[1]).then(function() {
    //             var email = browser.driver.findElement(by.id('Email'));
    //             email.sendKeys('crowdevelopTest@gmail.com');
    //             var nextButton = element(by.id('next'));
    //             nextButton.click();
    //             var password = browser.driver.findElement(by.id('Passwd'));
    //             password.sendKeys('cdcrowdevelop');
    //
    //             var signInButton = browser.driver.findElement(by.id('signIn'));
    //             signInButton.click();
    //             browser.sleep(12000);
    //         });
    //
    //         browser.switchTo().window(handles[0]).then(function() {
    //             browser.sleep(60000);
    //         });
    //     });
    //     browser.sleep(60000);
    //     // browser.switchTo().window(0);
    //
    // });
});
