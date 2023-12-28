import { backendURL, successNotification,errorNotification } from "../utils/util.js";

//Form Register

const form_login = document.getElementById('form_login');

form_login.onsubmit = async (e) => {
    e.preventDefault();



    //disable button
    document.querySelector("#form_login button").disabled = true;


    //get values of form
    const formData = new FormData(form_login);

//fetch api user login
    const response = await fetch (backendURL + "/api/login"
        , {
            method: "POST",
    headers: {
        Accept: "application/json",
    },
    body: formData,
});



        //get response if 200-299 status code
        if (response.ok) {
            const json = await response.json();
            console.log(json);
        
            localStorage.setItem("token", json.token);
            localStorage.setItem("role", json.user.role);
            form_login.reset();
        
            window.location.href = "/userDashboard.html";
        }
        //get response if 422 status code
        else if (response.status ==422){
            const json = await response.json();

        
            errorNotification(json.message, 5);
        }

        //enable button
        document.querySelector("#form_login button").disabled = false;
        document.querySelector("#form_login button").innerHTML = 'log in';
        
};