import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const DialogStyles = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

let eventGuid = 0;

const createEventId = () => {
    return String(eventGuid++);
};

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

interface AddEventDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addEventMethod: any;
}

const AddEventDialog = (props: AddEventDialogProps) => {
    const { open, setOpen, addEventMethod } = props;

    const [startDateValue, setStartDateValue] = React.useState<Date | null>(
        new Date()
    );

    const [endDateValue, setEndDateValue] = React.useState<Date | null>(
        new Date()
    );

    const [eventTitle, setEventTitle] = React.useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitleChange = (e: any) => {
        setEventTitle(e.target.value);
    };

    const handleStartDateChange = (newValue: Date | null) => {
        setStartDateValue(newValue);
    };

    const handleEndDateChange = (newValue: Date | null) => {
        setEndDateValue(newValue);
    };

    const addEventHandler = () => {
        addEventMethod.unselect();
        addEventMethod.addEvent({
            id: createEventId(),
            title: eventTitle,
            start: moment(startDateValue).format('YYYY-MM-DD'),
            end: moment(endDateValue).format('YYYY-MM-DD'),
        });
        setOpen(false);
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DialogStyles onClose={handleClose} open={open}>
                    <CustomDialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                    >
                        {`Ingrese la información de su evento`}
                    </CustomDialogTitle>
                    <DialogContent dividers>
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <TextField
                                    label="Titulo"
                                    variant="outlined"
                                    onChange={handleTitleChange}
                                />
                            </Grid>
                            <Grid item>
                                <DateTimePicker
                                    label="Inicio"
                                    value={startDateValue}
                                    onChange={handleStartDateChange}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <DateTimePicker
                                    label="Fin"
                                    value={endDateValue}
                                    onChange={handleEndDateChange}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button autoFocus onClick={addEventHandler}>
                            Guardar Cambios
                        </Button>
                    </DialogActions>
                </DialogStyles>
            </LocalizationProvider>
        </div>
    );
};

export default AddEventDialog;
