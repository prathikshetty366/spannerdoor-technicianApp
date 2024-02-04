import axios from "axios";

export function getCustomer(phoneNumber) {
    //encapsulate the API calls needed for frontend
    return (
        axios
            .get(`${process.env.NEXT_BASE_URL}/getCustomerDetails?phoneNumber=${phoneNumber}`)
            //promise
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error("Failed to fetch todo list");
            })
    );
}

export function updateCustomerInfo(payload) {
    console.log("reacing api", payload)
    return axios.put(`${process.env.NEXT_BASE_URL}/updateCustomer`, payload.userDetails, {
        params: {
            id: payload.customerId,
        },
    })
        .then(response => {
            // Handle the updated customer data
            return response.data;
        })
        .catch(error => {
            // Handle errors
            return error.response.data
        });
}

export function createCustomer(payload) {
    return axios.post(`${process.env.NEXT_BASE_URL}/createCustomer`, payload.customerData)
        .then(response => {
            // Handle the response from the server
            return response.data;
        })
        .catch(error => {
            // Handle errors
            return error.response.data
        });
}