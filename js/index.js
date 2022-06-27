const form = document.getElementById('form')
const listAllGifs = document.querySelector('#render_gifs_list');

const submitGifSearch = document.querySelector('#submit_search_giphy');
const apiKey = 'rQYB70wWlBOocUdHVWOssNcEL7BVMjGy'


submitGifSearch.addEventListener('click', (e) => {

    const searchGifInput = document.querySelector('#search_input').value;

    fetch(`https://api.giphy.com/v1/gifs/search?q=${searchGifInput}&api_key=${apiKey}&&limit=12`)
        .then(res => res.json())
        .then(response => {
            response.data.forEach(data => {
                listAllGifs.innerHTML += `
        
                <input class="giphy-img" type="image" src="https://media0.giphy.com/media/${data.id}/giphy.gif?cid=ecf05e47lmco04g3zlrnwqck76d72v0t69ag28j0g0s1vhls&amp;rid=giphy.gif&amp;ct=g" width="120" height="120">
                `
                console.log(data)
            }
            )
        })
})

renderPosts()
form.addEventListener('submit', submitPost)


// const getGiphy = async () => {

//     const listAllGifs = document.querySelector('#render_gifs_list');
//     const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=smile&api_key=${apiKey}&limit=20`)
//     const giphyData = await response.json()
//     giphyData.data.forEach(data => {
//         listAllGifs.innerHTML += `

//         <img class="giphy-img" src="https://media0.giphy.com/media/${data.id}/giphy.gif?cid=ecf05e47lmco04g3zlrnwqck76d72v0t69ag28j0g0s1vhls&amp;rid=giphy.gif&amp;ct=g" width="120" height="120">
//         `

//         console.log(data)

//     })
// }

