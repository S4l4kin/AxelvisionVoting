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

var voted = [];
function compareScore(a, b) {
    return b.value - a.value;
}

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

    
    
    const body = await c.req.json();
    //New voting detection
    
    if(voted.includes(body["ip"])){
        return c.text("You can only vote once!");
    }
    voted.push(body["ip"]);
    var max = "";
    var maxV = 0;
    Object.entries(body["votes"]).forEach(([k,v]) => {
        votes[k] += v;
        if(votes[k] >= maxV && k != "waterloo"){
            maxV = votes[k];
            max = k;
        }
    })

    votes["waterloo"] = Math.min(0,Math.min(votes["waterloo"],maxV-1));

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
    var dir = {};
    var positions = [];
    Object.entries(votes).forEach(([k,v]) => {
        positions.push({"name":k,"value":v});
    });
    positions.sort(compareScore);

    var position = 1;
    positions.forEach(element =>{
        dir[element.name] = {"value":element.value, "position": position};
        position++;
    })

    dir["count"] = {"value": get_all_votes()};
    return c.json(dir);
});

app.on("RESET", "/", (c) => {
    voting = [];
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