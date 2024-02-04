import { updateCustomerFailure, updateCustomersuccess } from "./action";
import { CREATE_USER, CREATE_USER_FAILURE, CREATE_USER_INIT, CREATE_USER_SUCCESS, FETCH_CUSTOMER_DETAILS_FAILURE, FETCH_CUSTOMER_DETAILS_INIT, FETCH_CUSTOMER_DETAILS_SUCCESS, UPDATE_USER_DETAILS, UPDATE_USER_DETAILS_FAILURE, UPDATE_USER_DETAILS_INIT, UPDATE_USER_DETAILS_SUCCESS } from "./actionTypes";

const INITIAL_STATE = {
    getCustomerSuccess: false,
    getCustomerFailure: false,
    customerDetails: null,
    updateCustomerSuccess: false,
    updateCustomerFailure: false,
    updatedCustomerDetails: null,
    createUserSuccess: false,
    createUserFailure: false,
    newUser: null,
    error: null,
};


const User = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CUSTOMER_DETAILS_SUCCESS:
            return {
                ...state,
                getCustomerSuccess: true,
                getCustomerFailure: false,
                customerDetails: action.payload,
                error: null
            }
        case FETCH_CUSTOMER_DETAILS_FAILURE:
            return {
                ...state,
                getCustomerSuccess: false,
                getCustomerFailure: true,
                customerDetails: null,
                error: action.payload
            }
        case FETCH_CUSTOMER_DETAILS_INIT:
            return {
                ...state,
                getCustomerSuccess: false,
                getCustomerFailure: false,
                customerDetails: null,
                error: null
            }
        case UPDATE_USER_DETAILS_SUCCESS:
            return {
                ...state,
                updateCustomersuccess: true,
                updateCustomerFailure: false,
                updatedCustomerDetails: action.payload,
                error: null
            }
        case UPDATE_USER_DETAILS_FAILURE:
            return {
                ...state,
                updateCustomerFailure: true,
                updateCustomersuccess: false,
                error: action.payload,
                updatedCustomerDetails: null
            }
        case UPDATE_USER_DETAILS_INIT:
            return {
                ...state,
                updateCustomerFailure: false,
                updateCustomersuccess: false,
                updatedCustomerDetails: null,
                error: null
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUserSuccess: true,
                createUserFailure: false,
                newUser: action.payload,
                error: null
            }
        case CREATE_USER_FAILURE:
            return {
                ...state,
                createUserSuccess: false,
                createUserFailure: true,
                newUser: null,
                error: action.payload
            }
        case CREATE_USER_INIT:
            return {
                ...state,
                createUserSuccess: false,
                createUserFailure: false,
                newUser: null,
                error: null
            }
        default:
            return state;
    }
}

export default User