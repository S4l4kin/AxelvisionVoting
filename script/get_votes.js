var votes = {};
get_votes = async function get_votes(){           //Make a fetch request to the back end to get current votes
const url = window.location.search + "/votes";
await fetch(url)                                //Takes the response, changes it to a dictionary and adds it to votes
    .then(body => body.json())
    .then(data => votes=data);

Object.entries(votes).forEach(([k,v]) => {      //Loop through all votes and change the label to match the value
    document.getElementById(k).innerHTML = v.value;

    document.getElementById("p_"+k).innerHTML = v.position;
    if (v.position <=3){
        document.getElementById("p_"+k).style.color = "red";
    } else {
        document.getElementById("p_"+k).style.color = "black";
    }

});

};
get_votes();

setInterval(get_votes, 5000);                             //Excutes get_votes again and again to keep it up to date
