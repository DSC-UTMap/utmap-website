import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper
} from '@material-ui/core';
import Draggable from 'react-draggable';
/*
const useStyles = makeStyles(theme => ({
    box: {
        display: 'flex',

    }
}))
*/
function SingleEventPage() {
    return (
        <div>
            <Dialog
                //PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
            {/*Event Title*/}
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Event Title
                </DialogTitle>
                {/*Event Information*/}
                <DialogContent>
                    <DialogContentText>
                        Event Information
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
 
export default SingleEventPage;