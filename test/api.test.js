const fs = require('fs');
const path = require('path');
const { execPath } = require('process');
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

    describe('request', () => {
        const requestMook = '[{"id":1,"date":"2022-07-25","title":"Our first community Blog Post","body":" This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology.  ","gif":"https://giphy.com/embed/3mYSRZpwbBqNu1NWNU","emoji":{"likes":3},"comments":[{"id":1.1,"date":"25/07/2022","title":"First  title ","body":" First comment body"},{"id":1.2,"date":"25/07/2022","title":"Second comment title ","body":" Secondcomment body"}]}]'
        describe("url", () => {
            test("it makes a get request url", () => {
            
                fetch.mockResponse(requestMook)


                app.renderPosts();

                expect(fetch.mock.calls[0][0]).toEqual(
                    'https://community-blog-server.herokuapp.com/api/blog'
                )

            })
        })
        describe("have been called one", () => {
            test("it is calling once", () => {
                fetch.mockResponse(requestMook)


                app.renderPosts();
                expect(fetch).toHaveBeenCalledTimes(1);

       

            })

        })

        describe('submitPost', () => {
            test('it makes a post request to /post with the post data', () => {
    
                const fakeSubmitEvent = {
                    preventDefault: jest.fn
                }
                fetch.mockResponse(requestMook);
                const imgGif = document.createElement('img');
                imgGif.className = "giphy-img"
                imgGif.src =  'https://media0.giphy.com/media/57ZvMMkuBIVMlU88Yh/giphy.gif?cid=ecf05e47lmco04g3zlrnwqck76d72v0t69ag28j0g0s1vhls&rid=giphy.gif&ct=g'
                document.querySelector('#render_giphy').append(imgGif)
         
                app.submitPost(fakeSubmitEvent);
                //console.log(expect(app.submitPost)).toBeCalled()
                //console.log(fetch.mock.calls);
                expect(app.renderPosts).toContain(renderPost)
                // expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                // expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ title: "Bob", body: "Hello how are u? " }));
            })
        })
        // describe('comment id' , () => {
        //     test('there is comment id', () =>{
        //         fetch.mockResponse('{"id":1,"date":"2022-07-25","title":"Our first community Blog Post","body":" This is the first community blog post.  This  community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology. This is the first community blog post. This community uses the latest blog technology.  ","gif":"https://media2.giphy.com/media/3mYSRZpwbBqNu1NWNU/giphy.gif?cid=790b761184b61fd89868935df3ef97b82d9ca31898fe4507&rid=giphy.gif&ct=g","emoji":[3,7,4],"comments":[{"id":1.1,"date":"25/07/2022","title":"First title ","body":" First comment body"},{"id":1.2,"date":"25/07/2022","title":"Second comment title ","body":" Secondcomment body"}]}')
        //         app.renderComments("1");
        //         expect(document.querySelector('body').textContent).toContain('<h4 class="commentTitle">Our first community Blog Post</h4>')
        //     })
        // })

    })
})

// DATE TEST


// SUBMITPOST TEST


