const divs2 = ["background_div", "methods_div", "community_voices_div", "shared_purpose_div", "data_div", "equity_div", "governance_div", "power_dynamics_div", "collective_action_div", "trust_div", "financing_div", "local_context_div", "alignment_div", "effectiveness_div", "perceptions_lt_div"];

const divs = ["community_voices_div", "shared_purpose_div"];

function move(clicked_id) {
    console.log(clicked_id);
    let current = clicked_id + "_div";
    console.log(current);
    for(let d of divs) {
        document.getElementById(d).style.display="none";
    }
    document.getElementById(current).style.display="grid";
}