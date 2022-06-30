const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


global.fetch = require('jest-fetch-mock');
let app = require('../js/api.js');

describe('app', () => {
    beforeEach(() => {

        document.documentElement.innerHTML = html.toString();

    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('request', () => {
        describe("url", () => {
            test("it makes a get request url", () => {
                fetch.mockResponse('[{"id":1,"date":"2022-07-25","title":"Our first community Blog Post","body":" This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology.  ","gif":"https://giphy.com/embed/3mYSRZpwbBqNu1NWNU","emoji":{"likes":3},"comments":[{"id":1.1,"date":"25/07/2022","title":"First  title ","body":" First comment body"},{"id":1.2,"date":"25/07/2022","title":"Second comment title ","body":" Secondcomment body"}]}]')


                app.renderPosts();

                expect(fetch.mock.calls[0][0]).toEqual(
                    'https://community-blog-server.herokuapp.com/api/blog'
                )

            })
        })
        describe("have been called one", () => {
            test("it is calling once", () => {
                fetch.mockResponse('[{"id":1,"date":"2022-07-25","title":"Our first community Blog Post","body":" This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology.  ","gif":"https://giphy.com/embed/3mYSRZpwbBqNu1NWNU","emoji":{"likes":3},"comments":[{"id":1.1,"date":"25/07/2022","title":"First  title ","body":" First comment body"},{"id":1.2,"date":"25/07/2022","title":"Second comment title ","body":" Secondcomment body"}]}]')


                app.renderPosts();
                expect(fetch).toHaveBeenCalledTimes(1);

            })

        })

        describe('submitPost', () => {
            test('it makes a post request to /post with the post data', () => {
      
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        title: { value: 'Bob' },
                        body: { value: 'Hello how are u?' },
                       
                    }
                }

                app.submitPost(fakeSubmitEvent);
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ title: "Bob", body: "Hello how are u? " }));
            })
        })
        // describe('comment id' , () => {
        //     test('there is comment id', () =>{
        //         fetch.mockResponse('[{"id":1,"date":"2022-07-25","title":"Our first community Blog Post","body":" This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology.  ","gif":"https://giphy.com/embed/3mYSRZpwbBqNu1NWNU","emoji":{"likes":3},"comments":[{"id":1.1,"date":"25/07/2022","title":"First  title ","body":" First comment body"},{"id":1.2,"date":"25/07/2022","title":"Second comment title ","body":" Secondcomment body"}]}]')
        //         app.renderComments(1);
        //         expect(fetch.mock.calls[0][0]).toEqual('https://community-blog-server.herokuapp.com/api/blog/1')
        //     })
        // })

    })
})

// DATE TEST


// SUBMITPOST TEST


