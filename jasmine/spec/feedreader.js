/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run in the application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 *

 These tests were updated by Christine Stoner, Udacity student, September 22-23, 2016*/
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* Our first test tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Our second test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have defined urls that are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });


        /* Our third test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have defined names that are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });

    describe('The menu', function() {


        var menuIconTest = $('.menu-icon-link');
        /* Our first test ensures the menu element is
         * hidden by default. 
         */

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        /* Our second test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again. 
         */

        it('changes visibility when the menu icon is clicked', function() {
            expect(menuIconTest).toBeDefined();
            menuIconTest.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIconTest.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);


        });

    });


    /*This test suite ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */


    describe('Initial Entries', function() {


        beforeEach(function(done) {
            loadFeed(0, done);
        });


        it('should have one at least one entry', function() {
            expect($('.feed .entry').length).toBeDefined();
            expect($('.feed .entry').length).toBeGreaterThan(0);

        });




    });

    /* This test suite ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */


    describe('New Feed Selection', function() {

        var testContent, testContent2;

        beforeEach(function(done) {

            function cbLoadSecondFeed() {
                if ($('.feed').find('h2').first().text()) {
                    testContent = $('.feed').find('h2').first().text();
                }
                loadFeed(1, function() {
                    if ($('.feed').find('h2').first().text()) {
                        testContent2 = $('.feed').find('h2').first().text();
                    }
                    done();
                });
            }

            loadFeed(0, cbLoadSecondFeed());

        });


        it('should change content', function(done) {
            expect(testContent).toBeDefined();
            expect(testContent2).toBeDefined();
            expect(testContent).not.toBe(testContent2);
            done();

        });


    });




}());