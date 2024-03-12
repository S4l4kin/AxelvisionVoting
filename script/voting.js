/* JavaScript file for voting.eta */

// Variables for selected elements
var selected_el = {
    "waterloo": 0,
    "10_years": 0,
    "molitva": 0,
    "lautar": 0,
    "dancing_lasha": 0,
    "fairytail": 0,
    "rise_phoenix": 0,
    "cha_cha_cha": 0
};


// Create the voting select elements
function createSelect(id){
    var select = document.getElementById(id);

    // remove all child elements from the select
    while (select.firstChild) {
        select.removeChild(select.lastChild);
    }

    // create the options for the select
    var option = document.createElement("option");
    option.setAttribute("value", "undecided");
    option.innerHTML = "undecided";
    select.appendChild(option);
    var images = ["sweden.png", "iceland.png", "serbia.jpg", "moldova.png",
        "ukraine.png", "norway.png", "austria.png", "finland.png"];
    var option_values = ["waterloo", "10_years", "molitva", "lautar", 
        "dancing_lasha", "fairytail", "rise_phoenix", "cha_cha_cha"];
    var option_texts = ["Waterloo", "10 Years", "Molitva", "Lautar",
        "Dancing Lasha Tumbai", "Fairytale", "Rise Like a Phoenix", "Cha Cha Cha"];

    for(var i = 0; i < option_values.length; i++){
        if (selected_el[option_values[i]] == 0){
            var option = document.createElement("option");
            option.setAttribute("value", option_values[i]);
            option.innerHTML = option_texts[i];
            option.setAttribute("data-icon", "images/"+ images[i]);
            select.appendChild(option);
        } else if (selected_el[option_values[i]] == i + 1){
            var option = document.createElement("option");
            option.setAttribute("value", option_values[i]);
            option.innerHTML = option_texts[i];
            option.setAttribute("data-icon", "images/"+ images[i]);
            option.setAttribute("selected", "selected");
            select.appendChild(option);
            select.value = option_values[i];
        }
    }
    return select;
}

// Create all the select elements
function createAllSelects(){
    createSelect("choice_1");
    createSelect("choice_2");
    createSelect("choice_3");
    createSelect("choice_4");
    createSelect("choice_5");
    createSelect("choice_6");
    createSelect("choice_7");
    createSelect("choice_8");
}