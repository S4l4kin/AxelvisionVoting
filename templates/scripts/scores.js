var votes = {};
get_votes = async function get_votes(){
    const url = window.location.search + "/votes";
    await fetch(url)
        .then(body => body.json())
        .then(data => votes=data);

    Object.entries(votes).forEach(([k,v]) => {
        if(k == "count")
        document.getElementById("count").innerHTML = v;
        else
        document.getElementById(k+"_votes").innerHTML = v;
    });
    };
get_votes();

setInterval(get_votes);