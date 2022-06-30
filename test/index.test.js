const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


global.fetch = require('jest-fetch-mock');
global.jest = require('jest-mock');
let app = require('../js/api.js');

describe('app', () => {
    beforeEach(() => {

        document.documentElement.innerHTML = html.toString();

    })
    afterEach(() => {
        fetch.resetMocks();
    })
    describe('html clicks', () => {

        const requestMook = '[{"id":1,"date":"2022-07-25","title":"Our first community Blog Post","body":" This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology.  ","gif":"https://giphy.com/embed/3mYSRZpwbBqNu1NWNU","emoji":{"likes":3},"comments":[{"id":1.1,"date":"25/07/2022","title":"First  title ","body":" First comment body"},{"id":1.2,"date":"25/07/2022","title":"Second comment title ","body":" Secondcomment body"}]}]'
        // document.body.innerHTML = "<div id='render-populars'></div>";
        //jest.mock(app.mostPopularPosts);
        fetch.mockResponse({
            preventDefault:jest.fn()
        })
        test("popularLinks click", () => {
            
            // app.mostPopularPosts.mockImplementation(cb =>{
            //     cb()
            // })
             //document.querySelector('#popular-links').click()
            fetch.mockResponse(requestMook)
            app.mostPopularPosts(jest.fn())
            expect(document.querySelector('#render-populars')).not.toBeNull();

        })

    })
    describe('html clicks', () => {

        const requestMook = '[{"id":1,"date":"2022-07-25","title":"Our first community Blog Post","body":" This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology.  ","gif":"https://giphy.com/embed/3mYSRZpwbBqNu1NWNU","emoji":{"likes":3},"comments":[{"id":1.1,"date":"25/07/2022","title":"First  title ","body":" First comment body"},{"id":1.2,"date":"25/07/2022","title":"Second comment title ","body":" Secondcomment body"}]}]'
        // document.body.innerHTML = "<div id='render-populars'></div>";
        //jest.mock(app.mostPopularPosts);
        fetch.mockResponse({
            preventDefault:jest.fn()
        })
        test("popularLinks click", () => {
            
            document.body.innerHTML = "<div id='render_comments_1'></div>";
            fetch.mockResponse(requestMook)
            app.renderComments(1)
            expect(document.querySelector('#render_comments_1').innerHTML).toMatch(/div/);

        })

    })

})
