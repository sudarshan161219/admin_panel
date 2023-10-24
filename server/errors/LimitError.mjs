import {StatusCodes} from "http-status-codes"
import CustomAPIError from "./custom-api-error.mjs";

class LimitError extends CustomAPIError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.TOO_MANY_REQUESTS
    }
}

export default LimitError