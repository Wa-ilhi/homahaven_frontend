import {backendURL, successNotification,errorNotification, } from "../utils/util.js";

//Form Register


const form_register = document.getElementById('form_register');

form_register.onsubmit = async (e) => {
    e.preventDefault();



    //disable button
    document.querySelector("#form_register button").disabled = true;


    //get values of form
    const formData = new FormData(form_register);
    formData.append("role", "user");

//fetch api user register
    const response = await fetch (backendURL + "/api/user"
        , {
            method: "POST",
            header: {
                Accept:"application/json",
                
            },
            body:formData,
        });

        //get response if 200-299 status code
        if (response.ok) {
    
            form_register.reset();

            successNotification("Successfully registered account", 5);
        }
        //get response if 422 status code
        else if (response.status ==422){
            const json = await response.json();

        
            errorNotification(json.message, 5);
        }

        //enable button
        document.querySelector("#form_register button").disabled = false;
        document.querySelector("#form_register button").innerHTML='Sign Up';
        
};