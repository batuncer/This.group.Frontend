const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


global.fetch = require('jest-fetch-mock');
let app;

describe('app', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../js/api.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('request', () =>{
        describe("get all gifts", () =>{
            test("it makes a get request to post /api/blog", () => {
                console.log(app.renderPosts())
                expect(fetch.mock.calls).toMatch(/Post$/)
            })
        })
    })
})
