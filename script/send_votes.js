
//TODO: rewrite 
// async function send_votes() {                               //Makes a HTTP Post request to add the choosen amount of votes to the total
//                                                             //Makes a dict of them with their id being key and innerHTML in int as value, this dict will then be sent to the backend 
// var voteElements = document.getElementsByClassName("vote");
// var votes = {};
// for (let element of voteElements) {
//     votes[element.id] = parseInt(element.innerHTML);
// }

// const url = window.location.search + "/vote";
// await fetch(url,{
//         method: 'POST',
//         headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(votes)
//     }).then(body => body.text())
//     .then(data => {
//         return data;
//     });
// }

async function send(votes){
    const url = window.location.search + "/vote";
    await fetch(url,{
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(votes)
    }).then(body => body.text())
    .then(data => {
        console.log(data)
        return data;
    });
}