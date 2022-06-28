const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '..index.html'), 'utf8');

describe('index.html', () =>{
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    
    })
   
    describe('head', () => {
        test('its has a title'), () => {
            const title =document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("This.group Project")
        }
    })

    describe('body', () => {
        describe('button' , () => {
            let button;
            beforeEach(() => {
                button = document.getElementById('gif_list')
            })
        })
    })
})
