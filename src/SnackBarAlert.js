import React, {useState} from 'react';
import {Button, Snackbar} from "@mui/material";


/*

מטרנו היום:
- על כל לחיצה של כפתור שיוצג התראה בהתאם אם זה עבד או לא (הצלחות)
-  שדה בולאיני של open/close שיוצג בהתאם להודעה
- כפתורים מסוג button אמור להציג את X


 */

function SnackBarAlert(props) {
    const [open, setOpen] = useState(true);
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
            message = "no such token" // no such token
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
            message = "auction is already close";
            break;
        case 1014:
            message="added Proposal successfully";
            break;
        case 1015:
            message="end auction successfully"
            break;
        case 1016:
            message="sign up successfully"
            break;
        case 1017:
            message="updated user credit successfully"
            break;
        case "1":
            message="added new offer to your auction"
            break;
        case "2":
            message="the auction you submitted an offer was closed"
            break;
    }



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
     setOpen(false)
    };
    const action = (
        <>
            <Button color="secondary" size="small" onClick={handleClose}>
                X
            </Button>
        </>

    );

    return (

        <Snackbar
            // style={{ top: '50px', left: '1600px', backgroundColor: 'red' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
        />
    );
}

export default SnackBarAlert;
