import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.7.4/mod.ts";import {
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    deleteCookie,
  } from 'https://deno.land/x/hono/helper.ts'


const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const app = new Hono();


const id = (Math.random()*4294967296)>>>0;;

var votes = {"waterloo": 0,
        "10_years": 0,
        "molitva": 0,
        "lautar": 0,
        "dancing_lasha": 0,
        "fairytail": 0,
        "rise_phoenix": 0,
        "cha_cha_cha": 0};

function get_all_votes () {
    var count = 0;
    Object.entries(votes).forEach(([k,v]) => {
        count += v;
    });
    return count;
}


app.post("/vote", async (c) => {

    const votedCookie = getCookie(c,"voted");
    if (votedCookie == id)                          //Each device can only vote once
        console.log("please vote only once");
        //return c.text("You can only vote once");
    setCookie(c, 'voted', id);


    const body = await c.req.json();
    
    Object.entries(body).forEach(([k,v]) => {
        console.log(k,v);
        votes[k] += v;
    })

    return c.text("Thank you for voting!");
});


app.get("/", (c) => c.html(eta.render("scores.eta", { votes: votes, count: get_all_votes() }))); //The main score view
app.get("/voting", (c) => c.html(eta.render("voting.eta")));                                     //The voting view
app.get("/votes", (c) => {                                                                 //Used to send how many votes each song has
    var dir = {...votes};
    dir["count"] = get_all_votes();
    return c.json(dir);
});


Deno.serve(app.fetch);