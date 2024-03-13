/* JavaScript file for voting.eta */

var select_ids = ["choice_1", "choice_2", "choice_3", "choice_4", 
        "choice_5", "choice_6", "choice_7", "choice_8"];

var vote_points = [12, 9, 7, 5, 4, 3, 2, 1];

function enableDisableOptions(){
    // Variables for selected elements
    var selected_el = {
        "waterloo": 0,
        "10_years": 0,
        "molitva": 0,
        "lautar": 0,
        "dancing_lasha": 0,
        "fairytail": 0,
        "rise_phoenix": 0,
        "cha_cha_cha": 0,
        "undecided": 0
    };

    for(var i = 0; i < select_ids.length; i++){
        var select = document.getElementById(select_ids[i]);
        var value = select.options[select.selectedIndex].value;
        selected_el[value] += 1;
        // enable every option
        for(var j = 0; j < select.options.length; j++){
            select.options[j].disabled = false;
        }
    }

    for(var i = 0; i < select_ids.length; i++){
        var select = document.getElementById(select_ids[i]);
        for (var key in selected_el){
            if(selected_el[key] > 0 && key != "undecided"){
                for(var j = 0; j < select.options.length; j++){
                    if(select.options[j].value == key && select.options[select.selectedIndex].value != key){
                        select.options[j].disabled = true;
                    }
                }
            }
        }
        M.FormSelect.init(select);
    }
}


function updateSelects(){
    // get all values from every select element
    for(var i = 0; i < select_ids.length; i++){
        var select = document.getElementById(select_ids[i]);
        select.addEventListener("change", function(){
            enableDisableOptions();
        });
    }
}

function send_votes(){
    var votes = {};
    for(var i = 0; i < select_ids.length; i++){
        var select = document.getElementById(select_ids[i]);
        var selected_val = select.options[select.selectedIndex].value;
        var points = vote_points[i];
        if (selected_val != "undecided"){
            votes[selected_val] = points;
        }
        
    }
    send(votes).then(data => {
        M.toast({html: data})
    });
    
}

