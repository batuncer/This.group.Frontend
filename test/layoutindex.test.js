const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();

    })

    describe('head',  () => {
        test(('its has a title'), function () {
            const title = document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("This.group Project")
        })
    })

    describe('body', () => {
        describe("button", () => {
            let button;
            
            beforeEach(() => {
                button = document.getElementById('gif_list')
            })

            test('it exists', () => {
                expect(button).toBeTruthy();
            })

            test("it has a call to action", () => {
                expect(button.textContent.toLowerCase()).toContain('gif!')
            })
        })
        describe("Post button", () => {
            let button;
            beforeEach(() => {
                button = document.querySelector('#postbtn')
            })

            test('it exists', () => {
                expect(button).toBeTruthy();
            })

            test("it has a call to action", () => {
                
                expect(button.value).toContain('Post!')
            })
        })

        describe("form", () => {
            let form ;
            let title, postContext, postButton;
            beforeEach(() => {
                form = document.querySelector("form")
                title = form.querySelector('#title')
                postContext = form.querySelector('#postContext')
                postButton = form.querySelector('#postbtn')
            })
            test('it exists', () => {
                expect(form).toBeTruthy();
            })
            
            test('it has an id of "title"', () => {
                expect(title).toBeTruthy();
            })

            // test('it is a text input"', () => {
            //     expect(postContext.getAttribute('type')).toBe('text')
            // })
    
        })
    })

    

})
