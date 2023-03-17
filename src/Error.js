function Error(props) {
    let message = props.message;
    switch (message) {
        case 1002:
            message = "password too weak";
            break;
        case 1003:
            message = "username already exist";
            break;
        case 1004:
            message = "username or password isn't correct";
            break;
        case 1005:
            message = "" // no such token
            break;
        // case 1006:
        //     message = "ERROR_NO_SUCH_AUCTION";
        //     break;
        case 1007:
            message = "you need at least 3 offer to end auction";
            break;
        case 1008:
            message = "not enough money ";
            break;
        case 1009:
            message = "the bid price is too low";
            break;
        case 1010:
            message = "product details not send";
            break;
        case 1011:
            message = "not valid offer user";
            break;
        case 1012:
            message = "no offers";
            break;
        case 1013:
            message = "auction is closed";
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
