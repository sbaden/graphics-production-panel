import React, { forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const styles = {
  formatText: {
    whiteSpace: 'pre-wrap'  // RECOGNIZES FORMATING FOR  \n and \t  IN STRING
  }
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InfoDialog = (props) => {
  const { infoTitle, infoMessage, openInfo, onClose } = props;

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={openInfo}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{infoTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={styles.formatText}
            id="alert-dialog-slide-description"
          >
            {infoMessage}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InfoDialog;
