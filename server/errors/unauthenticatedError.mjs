import {StatusCodes} from "http-status-codes"
import CustomAPIError from "./custom-api-error.mjs";

class UnauthenticatedError extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnauthenticatedError