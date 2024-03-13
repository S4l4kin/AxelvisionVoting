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

var id = (Math.random()*4294967296)>>>0;

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
    var max = "";
    var maxV = 0;
    Object.entries(body).forEach(([k,v]) => {
        votes[k] += v;
        if(votes[k] >= maxV && k != "waterloo"){
            maxV = votes[k];
            max = k;
        }
    })

    votes["waterloo"] = Math.min(votes["waterloo"],maxV-1);

    return c.text("Thank you for voting!");
});


async function readPage(url) {
    var text = "hello";
    await Deno.readTextFile(url)
    .then((body) => {
        text = body;
    });
    return text;
}

app.get("/", async (c) => c.html(await readPage("./scores.html"))); //The main score view
app.get("/voting", async (c) => c.html(await readPage("./voting.html")));                                     //The voting view

app.get("/votes", (c) => {                                                                 //Used to send how many votes each song has
    var dir = {...votes};
    dir["count"] = get_all_votes();
    return c.json(dir);
});



app.put("/", async (c) => {
    const socket = await c.upgrade();
    connections.push(socket);
});

app.on("RESET", "/", (c) => {
    id = (Math.random()*4294967296)>>>0;
    votes = {"waterloo": 0,
        "10_years": 0,
        "molitva": 0,
        "lautar": 0,
        "dancing_lasha": 0,
        "fairytail": 0,
        "rise_phoenix": 0,
        "cha_cha_cha": 0};
});

//To make it possible to read external scripts & images
app.get("/script/:path{.+\\.js$}", async (c) => {
    const text = await Deno.readTextFile("./script/"+c.req.param("path"));
    
    return c.text(text);
});
app.get("/images/:path{.+\\.png$}", async (c) => {
    const img = await Deno.readFile("./images/"+c.req.param("path"));
    const head = new Headers();
    head.set('content-type', 'image/png');
    const response = new Response(img, { headers: head, status: 200 });
    return response;
});

export default app;