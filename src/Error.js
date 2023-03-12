function Error(props) {
    let message = props.message;
    switch (message) {
        case 1000:
            message = "ERROR_MISSING_USERNAME!";
            break;
        case 1001:
            message = "ERROR_MISSING_PASSWORD";
            break;
        case 1002:
            message = "ERROR_WEAK_PASSWORD!";
            break;
        case 1003:
            message = "ERROR_USERNAME_ALREADY_EXISTS";
            break;
        case 1004:
            message = "ERROR_WRONG_LOGIN_CREDS";
            break;
        case 1005:
            message = "" // no such token
            break;
        case 1006:
            message = "ERROR_NO_SUCH_AUCTION";
            break;
        case 1007:
            message = "ERROR_NOT_ENOUGH_OFFERS";
            break;
        case 1008:
            message = "ERROR_NOT_ENOUGH_MONEY";
            break;
        case 1009:
            message = "ERROR_TOO_LOWER_OFFER_PRICE";
            break;
        case 1010:
            message = "ERROR_PRODUCT_DETAILS_NOT_SEND";
            break;
        case 1011:
            message = "ERROR_NOT_VALID_OFFER_USER";
            break;
        case 1012:
            message = "ERROR_NO_OFFERS";
            break;
        case 1013:
            message = "ERROR_AUCTION_IS_CLOSED";
            break;
    }

    return (
        <span style={{color: "red"}}>
            {
                props.lineBreak ?
                    <div>
                        {message}
                    </div>
                    :
                    <span>
                        {message}
                    </span>
            }
        </span>
    )
}

export default Error;