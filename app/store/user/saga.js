import {
    takeEvery,
    fork,
    put,
    all,
    call,
    takeLatest,
    take,
} from "redux-saga/effects";
import { CREATE_USER, FETCH_CUSTOMER_DETAILS, UPDATE_USER_DETAILS } from "./actionTypes";
import { fetchCustomerDetailsSuccess, fetchCustomerDetailsFailure, updateCustomersuccess, updateCustomerFailure, createUserFailure, createUserSuccess } from "./action";
import { fetchTodoList } from "../../services/todo";
import { createCustomer, getCustomer, updateCustomerInfo } from "../../services/User";

function* getCustomerDetails(action) {
    try {
        const customer = yield call(getCustomer, action.payload); // Make API request
        if (customer != undefined) {
            yield put(fetchCustomerDetailsSuccess(customer));
        }
    } catch (err) {
        yield put(fetchCustomerDetailsFailure(err));
    }
}
function* updateCustomer(action) {
    try {
        const updatedDetails = yield call(updateCustomerInfo, action.payload)
        console.log(updatedDetails, "response in saga")
        if (updatedDetails.userExist) {
            yield put(updateCustomerFailure(updatedDetails))
        } else {
            yield put(updateCustomersuccess(updatedDetails))

        }

    } catch (error) {
        yield put(updateCustomerFailure(error))

    }
}
function* createNewUser(action) {
    try {
        const newUser = yield call(createCustomer, action.payload)
        if (newUser.errorCreating) {
            yield put(createUserFailure(newUser))
        } else {
            yield put(createUserSuccess(newUser))
        }
    } catch (error) {
        yield put(createUserFailure(error))

    }
}

export function* watchFetchCustomerDetails() {
    yield takeEvery(FETCH_CUSTOMER_DETAILS, getCustomerDetails);
}

export function* watchUpdateCustomerInfo() {
    yield takeEvery(UPDATE_USER_DETAILS, updateCustomer)
}
export function* watchCreateNewUser() {
    yield takeEvery(CREATE_USER, createNewUser)
}
function* UserSaga() {
    yield all([
        fork(watchFetchCustomerDetails),
        fork(watchUpdateCustomerInfo),
        fork(watchCreateNewUser)
    ]);
}

export default UserSaga;
