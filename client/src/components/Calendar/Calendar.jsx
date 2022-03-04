import React, { Component } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "daypilot-pro-react";
import apiAgents from '../../service/apiAgent';
const styles = {
    wrap: {
        display: "flex"
    },
    left: {
        marginRight: "10px"
    },
    main: {
        flexGrow: "1"
    }
};

class Calendar extends Component {
    constructor(props) {
        super(props);
        const { user } = props;
        const name = `${user.firstName} ${user.lastName}`;
        const phone = user.phone;
        this.state = {
            viewType: "Week",
            cellHeight: 30,
            timeRangeSelectedHandling: "Enabled",
            onTimeRangeSelected: async (args) => {
                const dp = args.control;
                const modal = await DayPilot.Modal.prompt("Create an appointment:", name);
                dp.clearSelection();
                if (!modal.result) { return; }
                const newEvent = {
                    name,
                    phone,
                    start: args.start,
                    end: args.end,
                    id: DayPilot.guid(),
                    text: `${name} ${phone}`
                }
                dp.events.add(newEvent);
                apiAgents.Appointments.add(newEvent);
            },
            onBeforeEventRender: args => {
                args.data.backColor = '#6c5b7b';
                args.data.barHidden = true;
                args.data.fontColor = 'white';
                args.data.borderColor = "darker";
            },
            onEventClick: async (args) => {
                const e = args.e;
                e.data.text = `<div>${e.data.name}<div><p>${e.data.phone}<p>`;
                if (user.admin) this.showDetails(e);
            }
        };
    }

    showDetails(e) {
        DayPilot.Modal.alert(e.data.text);
    }
    async loadEvents() {
        try {
            const apiEvents = await apiAgents.Appointments.list();
            let events = apiEvents;
            if (!this.props.user.admin) {
                events = await apiEvents.map((event) => {
                    event.text = 'scheduled';
                    return event;
                })
            }
            this.setState({events});
        } catch (e) {
            console.log(e);
        }
    }
    
    componentDidMount() {
        this.loadEvents();
    }

    render() {
        const {...config} = this.state;
        return (
            <div style={styles.wrap}>
                <div style={styles.left}>
                    <DayPilotNavigator
                        selectMode={"week"}
                        showMonths={2}
                        skipMonths={2}
                        onTimeRangeSelected={args => {
                            this.setState({
                                startDate: args.day
                            });
                        }}
                    />
                </div>
                <div style={styles.main}>
                    <DayPilotCalendar
                        {...config}
                        ref={component => {
                            this.calendar = component && component.control;
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Calendar;