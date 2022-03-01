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
        console.log('userCalendar:', user.firstName);
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
                    text: modal.result
                }
                dp.events.add(newEvent);
                apiAgents.Appointments.add(newEvent);
                console.log('events:', this.state.events);
            },
            onEventClick: async (args) => {
                const e = args.e;
                console.log('e:', e);
                e.data.text = `<div>${e.data.name}<div><p>${e.data.phone}<p>`;
                this.showDetails(e);
            }
        };
    }

    showDetails(e) {
        DayPilot.Modal.alert(e.data.text);
    }
    async loadEvents() {
        try {
            const events = await apiAgents.Appointments.list();
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
        console.log('state:', this.state);
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