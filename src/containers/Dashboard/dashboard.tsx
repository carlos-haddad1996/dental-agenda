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
    EventInput,
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

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

const createEventId = () => {
    return String(eventGuid++);
};

const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr,
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00',
    },
];

const Dashboard: React.FC = () => {
    const [dateState, setDateState] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState<boolean>(false);
    const [openAddEvent, setOpenAddEvent] = useState<boolean>(false);
    const [eventInformation, setEventInformation] = useState({});
    const [addEventMethod, setAddEventMethod] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
    }, []);

    const handleDateClick = () => {
        alert('date clicked');
    };

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        // let title = prompt('Please enter a new title for your event');
        // let startDate = prompt('Please enter a start date for your event');
        // let endDate = prompt('Please enter end date for your event');
        setOpenAddEvent(true);
        let calendarApi = selectInfo.view.calendar;
        setAddEventMethod(calendarApi);
        // calendarApi.unselect();

        // if (title) {
        //     calendarApi.addEvent({
        //         id: createEventId(),
        //         title,
        //         start: moment(startDate).format(),
        //         end: moment(endDate).format(),
        //     });
        // }
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
