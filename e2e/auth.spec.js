'use strict';

describe('CrowDevelop authentication', function() {
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

    it('should login with google', function() {
        var google = element(by.className('btn-google')).click();
        browser.getAllWindowHandles().then(function(handles) {
            browser.getAllWindowHandles().then(function(handles) {
                var popupHandle = handles[1];

                browser.switchTo().window(popupHandle);

                var emailFieldExists = by.id('Email');
                browser.driver.wait(function() {
                    return browser.driver.isElementPresent(emailFieldExists);
                }, 5000);

                var email = browser.driver.findElement(by.id('Email'));
                var next = browser.driver.findElement(by.id('next'));
                var signIn = browser.driver.findElement(by.id('signIn'));

                email.sendKeys('crowdevelopTest@gmail.com');
                next.click();
                browser.sleep(1000);
                var passwd = browser.driver.findElement(by.id('Passwd'));
                var passwordFieldExists = by.id('Passwd');
                browser.driver.wait(function() {
                    return browser.driver.isElementPresent(passwordFieldExists);
                }, 5000);

                passwd.sendKeys('cdcrowdevelop');
                signIn.click();

                browser.sleep(3000);
                browser.switchTo().window(handles[0]);
                var signOut = element(by.id('quickstart-sign-in'))
                expect(signOut.isPresent()).toBe(true);

            });
        });
    });


});
