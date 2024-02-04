import { CREATE_USER, CREATE_USER_FAILURE, CREATE_USER_INIT, CREATE_USER_SUCCESS, FETCH_CUSTOMER_DETAILS, FETCH_CUSTOMER_DETAILS_FAILURE, FETCH_CUSTOMER_DETAILS_INIT, FETCH_CUSTOMER_DETAILS_SUCCESS, UPDATE_USER_DETAILS, UPDATE_USER_DETAILS_FAILURE, UPDATE_USER_DETAILS_INIT, UPDATE_USER_DETAILS_SUCCESS } from "./actionTypes"

export const fetchCustomerDetails = (data) => {
    return {
        type: FETCH_CUSTOMER_DETAILS,
        payload: data
    }
}
export const fetchCustomerDetailsSuccess = (data) => {
    return {
        type: FETCH_CUSTOMER_DETAILS_SUCCESS,
        payload: data
    }
}

export const fetchCustomerDetailsFailure = (data) => {
    return {
        type: FETCH_CUSTOMER_DETAILS_FAILURE,
        payload: data
    }
}

export const fetchCustomerDetailsInit = (data) => {
    return {
        type: FETCH_CUSTOMER_DETAILS_INIT,
        payload: data
    }
}


export const updateCustomer = (data) => {
    return {
        type: UPDATE_USER_DETAILS,
        payload: data
    }
}


export const updateCustomersuccess = (data) => {
    return {
        type: UPDATE_USER_DETAILS_SUCCESS,
        payload: data
    }
}

export const updateCustomerFailure = (data) => {
    return {
        type: UPDATE_USER_DETAILS_FAILURE,
        payload: data
    }
}


export const updateCustomerInit = (data) => {
    return {
        type: UPDATE_USER_DETAILS_INIT,
        payload: data
    }
}


export const createUser = (data) => {
    return {
        type: CREATE_USER,
        payload: data
    }
}
export const createUserSuccess = (data) => {
    return {
        type: CREATE_USER_SUCCESS,
        payload: data
    }
}
export const createUserFailure = (data) => {
    return {
        type: CREATE_USER_FAILURE,
        payload: data
    }
}
export const createUserInit = (data) => {
    return {
        type: CREATE_USER_INIT,
        payload: data
    }
}