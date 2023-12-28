import {backendURL, showNavAdminPages} from "../utils/util.js";


showNavAdminPages();

const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = async() => {

    //Access logout api endpoint
    const response = await fetch (backendURL + "/api/logout", {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
    },

});



        //get response if 200-299 status code
        if (response.ok) {
            localStorage.clear();
            window.location.pathname = "/index.html";
        }
        //get response if 422 status code
        else {
            const json = await response.json();

            alert(json.message,10);
        }
    };
