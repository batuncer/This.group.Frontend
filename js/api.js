document.addEventListener("DOMContentLoaded", init);


const createPostElement = (data) => {

    return `
            
    <div class="posts-box">
        <div>
            <h3>${data.title}</h3>
            <span>${data.date}</span>
            <p>${data.body}</p>
            <iframe src="${data.gif}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </div>
        <div class="post-btns">
            <div class="post-btns-icons">
               <button id="btn-tumb"> <span class="post-icons" id="like">👍 ${typeof data.emoji === "undefined" ?  0 : data.emoji[0]} </span></button>
               <button id="btn-smile"> <span class="post-icons" id="smile">😊  ${typeof data.emoji === "undefined" ?  0 : data.emoji[1]}</span></button>
               <button id="btn-cry">  <span class="post-icons" id="crysmile">😂  ${typeof data.emoji === "undefined" ?  0 : data.emoji[2]}</span></button>
            </div>

            <div class="post-btns-comment">Comments</div>
        </div>
       
    </div>`

}

const createPostElementforgift = (data) => {

    return `
            
    <div class="posts-box">
        <div>
            <h3>${data.title}</h3>
            <span>${data.date}</span>
            <p>${data.body}</p>
            <img src="${data.gift}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></img>
        </div>
        <div class="post-btns">
            <div class="post-btns-icons">
               <button id="btn-tumb"> <span class="post-icons" id="like">👍 ${typeof data.emoji === "undefined" ?  0 : data.emoji[0]} </span></button>
               <button id="btn-smile"> <span class="post-icons" id="smile">😊  ${typeof data.emoji === "undefined" ?  0 : data.emoji[1]}</span></button>
               <button id="btn-cry">  <span class="post-icons" id="crysmile">😂  ${typeof data.emoji === "undefined" ?  0 : data.emoji[2]}</span></button>
            </div>

            <div class="post-btns-comment">Comments</div>
        </div>
       
    </div>`

}


const renderPosts = () => {
    fetch('https://community-blog-server.herokuapp.com/api/blog')
        .then(response => response.json())
        .then(res => res.forEach(data => {
            const renderPost = document.querySelector('#render-posts');
            renderPost.innerHTML += createPostElement(data);
        }))
}


const submitPost = (e) => {

    e.preventDefault();

    const title = document.getElementById("title")
    const body = document.getElementById("post-context")
    const gifUrl = document.getElementById("gifImageSrc").getAttribute('src')
    const today = new Date();
    var hours = String(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const newToday = hours +" "+ dd + '/' + mm + '/' + yyyy;


    fetch("https://community-blog-server.herokuapp.com/api/createBlogEntry", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": 6,
            "date": `"${newToday}"`,
            "title": `${title.value}`,
            "body": `${body.value}`,
            "emoji":[0,0,0],
            "gift":gifUrl
        }),
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            const renderPost = document.querySelector('#render-posts');
            renderPost.innerHTML += createPostElementforgift(res['req.body']);
            //location.reload()
        })
}

function init(){
    document.getElementById("gif-btn").addEventListener("click", function (ev) {
        ev.preventDefault(); //to stop the page reload
        document.querySelector('.img-box').innerHTML = "";
        //let contexSubmit =document.getElementById('contextText').value
        let APIKEY= "RMNO0yUUR1puM2V68kv1DGTa3NwskM28"
        let str = document.getElementById("search").value.trim();   // trim removing space around string
        console.log(str)
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=${str}`;
        fetch(url)
          .then(response => response.json())
          .then(content => {
            //  data, pagination, meta
            console.log(content.data);
            console.log("META", content.meta);
            let fig = document.createElement("figure");
            let img = document.createElement("img");
            img.id = 'gifImageSrc'
            img.src = content.data[0].images.downsized.url;
            img.alt = content.data[0].title;
            fig.append(img);
            let out = document.querySelector("#post-context");
            out.insertAdjacentElement("afterbegin", fig);
            document.querySelector('.img-box').insertAdjacentElement("beforeend",fig);
            document.querySelector("#search").value = "";
    
    
          })
          .catch(err => {
            console.error(err);
          });
      });
} 

// const smileCount = document.getElementById('btn-smile')
// const tumbCount = document.getElementById('btn-tumb')
// const cryCount = document.getElementById('btn-cry')


// tumbCount.addEventListener("click", function () {
//     console.log("hello ")
//     console.log(document.getElementById("like").innerHTML)
//  })
 


exports = {
    renderPosts,
    submitPost
} 
