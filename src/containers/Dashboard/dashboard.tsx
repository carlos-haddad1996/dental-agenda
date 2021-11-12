import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Section } from '../../components/common/wrapper';
import FullCalendar, {
    DateSelectArg,
    EventApi,
    EventClickArg,
    EventContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import 'moment/locale/es';
import { DashboardDialog, AddEventDialog } from '../../components/Dashboard';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const Dashboard: React.FC = () => {
    const [dateState, setDateState] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState<boolean>(false);
    const [openAddEvent, setOpenAddEvent] = useState<boolean>(false);
    const [eventInformation, setEventInformation] = useState({});
    const [addEventMethod, setAddEventMethod] = useState({});

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    }, []);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        setOpenAddEvent(true);
        setAddEventMethod(selectInfo);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        setOpen(true);
        setEventInformation(clickInfo.event);
    };

    const handleEvents = (events: EventApi[]) => {
        setEvents(events as []);
    };

    const renderEventContent = (eventInfo: EventContentArg) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        );
    };

    return (
        <Layout>
            <Container maxWidth="xl">
                <Section>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Item>
                                <Typography variant="h2">
                                    {`${dateState.toLocaleString('es', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'short',
                                    })}. ${dateState.toLocaleString('es', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    })}`}
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item>
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                editable={true}
                                selectable={true}
                                initialView="dayGridMonth"
                                // initialEvents={INITIAL_EVENTS}
                                select={handleDateSelect}
                                eventClick={handleEventClick}
                                eventContent={renderEventContent}
                                eventsSet={handleEvents}
                                // dateClick={handleDateClick}
                            />
                        </Grid>
                    </Grid>
                </Section>
            </Container>
            <DashboardDialog
                open={open}
                setOpen={setOpen}
                event={eventInformation}
            />
            <AddEventDialog
                open={openAddEvent}
                setOpen={setOpenAddEvent}
                addEventMethod={addEventMethod}
            />
        </Layout>
    );
};

export default Dashboard;
