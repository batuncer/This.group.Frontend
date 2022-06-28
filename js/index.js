const form = document.getElementById('form')
const listAllGifs = document.querySelector('#render_gifs_list');
const grab_giphy = document.querySelector('#render_giphy')

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

                    <img class="giphy-img mb-2 mt-2" type="image" src="${e.path[0].attributes[2].nodeValue}" width="100%" height="350">

                    `
                })
            }
        })
})






// function init(){
//     document.getElementById("gif-btn").addEventListener("click", function (ev) {
//         ev.preventDefault(); //to stop the page reload
//         document.querySelector('.img-box').innerHTML = "";
//         //let contexSubmit =document.getElementById('contextText').value
//         let APIKEY= "RMNO0yUUR1puM2V68kv1DGTa3NwskM28"
//         let str = document.getElementById("search").value.trim();   // trim removing space around string
//         console.log(str)
//         let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=${str}`;
//         fetch(url)
//           .then(response => response.json())
//           .then(content => {
//             //  data, pagination, meta
//             console.log(content.data);
//             console.log("META", content.meta);
//             let fig = document.createElement("figure");
//             let img = document.createElement("img");
//             img.id = 'gifImageSrc'
//             img.src = content.data[0].images.downsized.url;
//             img.alt = content.data[0].title;
//             fig.append(img);
//             let out = document.querySelector("#post-context");
//             out.insertAdjacentElement("afterbegin", fig);
//             document.querySelector('.img-box').insertAdjacentElement("beforeend",fig);
//             document.querySelector("#search").value = "";


//           })
//           .catch(err => {
//             console.error(err);
//           });
//       });
// } 


renderPosts()
form.addEventListener('submit', submitPost)


