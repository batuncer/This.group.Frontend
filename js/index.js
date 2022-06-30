const form = document.getElementById('form');
const listAllGifs = document.querySelector('#render_gifs_list');
const grab_giphy = document.querySelector('#render_giphy');
const postBox = document.querySelector('#render-posts');


const submitGifSearch = document.querySelector('#submit_search_giphy');
const apiKey = 'rQYB70wWlBOocUdHVWOssNcEL7BVMjGy'


// MODAL AND SEARCHING GIPHY
submitGifSearch.addEventListener('click', (e) => {

    const searchGifInput = document.querySelector('#search_input').value;
    document.querySelector('#modal_footer').style.display = 'block'
    listAllGifs.innerHTML = ''

    fetch(`https://api.giphy.com/v1/gifs/search?q=${searchGifInput}&api_key=${apiKey}&&limit=12`)
        .then(res => res.json())
        .then(response => {
            response.data.forEach(data => {
                listAllGifs.innerHTML += `
        
                <input class="giphy-img" type="image" src="https://media0.giphy.com/media/${data.id}/giphy.gif?cid=ecf05e47lmco04g3zlrnwqck76d72v0t69ag28j0g0s1vhls&amp;rid=giphy.gif&amp;ct=g" width="120" height="120" data-bs-dismiss="modal"
                aria-label="Close">

                `
            })

            const giphysAll = document.querySelectorAll('.giphy-img');
            for (const listAll of giphysAll) {
                listAll.addEventListener('click', (e) => {
                    grab_giphy.innerHTML = `

                    <img class="giphy-selected mb-2 mt-2 gifima" type="image" src="${e.path[0].attributes[2].nodeValue}" width="100%" height="350">

                    `
                })
            }
        })
})


// RENDER ALL POSTS AS SOON AS HTML STARTS
renderPosts()


// FUNCTION FOR POST DATA
form.addEventListener('submit', submitPost)

// COMMENTS SESSION 
postBox.addEventListener('click', (e) => {

    if (e.target.className === 'post-btns-comment') {
        const postId = parseInt(e.target.id)
        renderComments(postId)
    }

    if (e.target.className === 'comment-post') {
        const postId = parseInt(e.target.id)
        submitCommentPost(postId)
    }

    if (e.target.className === 'post-icons likes') {
        const postId = parseInt(e.target.id)
        const index = 0
        const quantity = parseInt(e.path[0].childNodes[1].innerText)
        submitEmojisReactions(postId, index, quantity)

    } else if (e.target.className === 'post-icons smile') {
        const postId = parseInt(e.target.id)
        const index = 1
        const quantity = parseInt(e.path[0].childNodes[1].innerText)
        submitEmojisReactions(postId, index, quantity)

    } else if (e.target.className === 'post-icons happy') {
        const postId = parseInt(e.target.id)
        const index = 2
        const quantity = parseInt(e.path[0].childNodes[1].innerText)
        submitEmojisReactions(postId, index, quantity)
    }
})





