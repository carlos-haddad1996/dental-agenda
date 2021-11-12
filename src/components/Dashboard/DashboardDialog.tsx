import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const DialogStyles = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const CustomDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export interface DialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    event: any;
}

const DashboardDialog = (props: DialogProps) => {
    const { open, setOpen, event } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const removeEvent = () => {
        event.remove();
        setOpen(false);
    };

    return (
        <div>
            <DialogStyles onClose={handleClose} open={open}>
                <CustomDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {event.title}
                </CustomDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {`Start Date: ${moment(event.start)
                            .locale('es')
                            .format('L hh:mm a')}`}
                    </Typography>
                    <Typography gutterBottom>{`End Date: ${moment(event.end)
                        .locale('es')
                        .format('L hh:mm a')}`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button autoFocus onClick={removeEvent}>
                        Borrar Evento
                    </Button>
                </DialogActions>
            </DialogStyles>
        </div>
    );
};

export default DashboardDialog;
