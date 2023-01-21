const url = "https://jsonplaceholder.typicode.com/posts";

async function sendRequest(url){
    return fetch(url).then(response => {
        return response.text()
    })
}

sendRequest(url).then(data=>console.log(data))
.catch(err=>console.log(err));