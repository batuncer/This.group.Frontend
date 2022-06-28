const form = document.getElementById('form')
const listAllGifs = document.querySelector('#render_gifs_list');
const grab_giphy = document.querySelector('#render_giphy');
const postBox = document.querySelector('#render-posts')


const submitGifSearch = document.querySelector('#submit_search_giphy');
const apiKey = 'rQYB70wWlBOocUdHVWOssNcEL7BVMjGy'


// MODAL AND SEARCHING GIPHY
submitGifSearch.addEventListener('click', (e) => {

    const searchGifInput = document.querySelector('#search_input').value;

    fetch(`https://api.giphy.com/v1/gifs/search?q=${searchGifInput}&api_key=${apiKey}&&limit=12`)
        .then(res => res.json())
        .then(response => {
            response.data.forEach(data => {
                listAllGifs.innerHTML += `
        
                <input class="giphy-img" type="image" src="https://media0.giphy.com/media/${data.id}/giphy.gif?cid=ecf05e47lmco04g3zlrnwqck76d72v0t69ag28j0g0s1vhls&amp;rid=giphy.gif&amp;ct=g" width="120" height="120">

                `
            })

            const giphysAll = document.querySelectorAll('.giphy-img');
            for (const listAll of giphysAll) {
                listAll.addEventListener('click', (e) => {
                    render_giphy.innerHTML = `

                    <img class="giphy-img mb-2 mt-2 gifima" type="image" src="${e.path[0].attributes[2].nodeValue}" width="100%" height="350">

                    `
                })
            }
        })
})

renderPosts()
form.addEventListener('submit', submitPost);
// RENDER ALL POSTS AS SOON AS HTML STARTS
renderPosts()


// FUNCTION FOR POST DATA
form.addEventListener('submit', submitPost)

// COMMENTS SESSION 
postBox.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.className === 'post-btns-comment') {
        const postId = e.target.id
        renderComments(postId)
    }
})





