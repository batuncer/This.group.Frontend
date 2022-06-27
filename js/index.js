const form = document.getElementById('form')
const getGifList = document.querySelector('#gif_list')

getGifList.addEventListener('click', (e) => {
    console.log(e)
})

renderPosts()
form.addEventListener('submit', submitPost)

