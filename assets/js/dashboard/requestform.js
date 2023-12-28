import {
    backendURL,
    successNotification,
    errorNotification,
    showNavAdminPages
} from "../utils/util.js";

// Get All Data
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("user_id");
    const requestForm = document.getElementById("requestForm");

    requestForm.onsubmit = async (e) => {
        e.preventDefault();
        await submitRequestForm(requestForm, userId);
    };

    // Call the getReceivedRequests function to initially fetch and display received requests
    getReceivedRequests();
});

async function submitRequestForm(form, userId) {
    const formData = new FormData(form);

    // Append the user_id to the formData
    formData.append('user_id', userId);

    try {
        const response = await fetch(backendURL + "/api/request_form", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: formData,
        });

        // Handle response
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("Request form submitted successfully:", jsonResponse);
            
            // Display the submitted request
            displayReceivedRequests([jsonResponse]);
            
            // Reset the form after successful submission
            form.reset();
        } else {
            await handleRequestError(response);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function getReceivedRequests() {
    try {
        const userId = localStorage.getItem("user_id");
        const response = await fetch(backendURL + `/api/manager/requests?user_id=${userId}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });

        if (response.ok) {
            const json = await response.json();
            console.log("Received Requests:", json);

            // Display received requests on the page
            displayReceivedRequests(json);
        } else {
            await handleRequestError(response);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function displayReceivedRequests(requests) {
    const receivedRequestsTableBody = document.getElementById("receivedRequestsTableBody");

    // Create HTML to display received requests
    const requestsHTML = requests.map(request => {
        return `
            <tr>
                <td>${request.request_id}</td>
                <td>${request.property_type}</td>
                <td>${request.house_type}</td>
                <td>${request.appointment_date}</td>
                <td>${request.appointment_time}</td>
            
            </tr>
        `;
    }).join("");

    // Append the HTML to the table body
    receivedRequestsTableBody.innerHTML += requestsHTML;

    // Add event listeners to the "Receive Request" buttons
    const receiveRequestButtons = document.querySelectorAll(".receive-request");
    receiveRequestButtons.forEach(button => {
        button.addEventListener("click", function () {
            const requestId = this.getAttribute("data-request-id");
            receiveRequest(requestId);
        });
    });
}

async function handleRequestError(response) {
    // Handle the error case
    const errorData = await response.json();
    console.error("Error submitting request form or fetching received requests:", errorData);
    errorNotification("HTTP-Error: " + response.status);
}

function receiveRequest(requestId) {
    // Implementation of the receiveRequest function
    // ...
}
