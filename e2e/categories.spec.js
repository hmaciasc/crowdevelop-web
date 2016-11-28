// 'use strict';
//
// describe('CrowDevelop home page', function() {
//     var projects = element.all(by.repeater('project in projectSearch'));
//     var searchForm = element(by.className('form'));
//     var search = element(by.model('query'));
//
//     beforeAll(function() {
//         browser.get('http://localhost:5000/projects/category/Game');
//     });
//
//     it('title should be CrowDevelop', function() {
//         expect(browser.getTitle()).toEqual('CrowDevelop');
//     });
//
//     it('should have a projects list or an error message', function() {
//         if (projects.length == 0) {
//             var errorBig = element(by.id('error-big'));
//             var errorSmall = element(by.id('error-small'));
//             expect(errorBig.getText()).toEqual('No projects found in that category');
//             expect(errorSmall.getText()).toEqual('Look for something else');
//         } else {
//             expect(projects.length).not.toBe(0);
//         }
//     });
//
//     it('should have a navbar', function() {
//         var brand = element.all(by.className('navbar-brand')).first();
//         expect(brand.getText()).toEqual('CROWDEVELOP');
//     });
//
//     it('should have a footer', function() {
//         expect(element(by.css('footer'))).not.toBe(null);
//     });
//
//     it('should have search form that redirects to projects/index', function() {
//         search.sendKeys('Test');
//         searchForm.submit().then(function() {
//             expect(browser.getCurrentUrl()).toEqual('http://localhost:5000/projects/index');
//         });
//     });
// });
