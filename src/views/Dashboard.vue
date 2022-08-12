<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
import "../../node_modules/vue-simple-calendar/dist/style.css"
import "../../node_modules/vue-simple-calendar/static/css/default.css"
import auth0 from "@/composables/auth0Client";
import GET from "@/composables/GET";

export default {
    name: 'dashboard',
    data: function() {
        return { 
            showDate: new Date(),
            events: [],
            assignedTasks: {
                type: Array,
                default: []
            },
        }
    },
    components: {
        CalendarView,
        CalendarViewHeader,
    },
    methods: {
        setShowDate(d) {
            this.showDate = d;
        },
        async getAssignedTasks() {
            var accessToken = await auth0.getTokenSilently();
            this.assignedTasks = await GET("assignedTask", accessToken);
            return this.assignedTasks;
        }
    },
    async mounted () {
        let event = {};
        this.assignedTasks = await this.getAssignedTasks();
        for (const element in this.assignedTasks) {
            console.log(this.assignedTasks[element]);
            event.id = this.assignedTasks[element].id;
            event.startDate = new Date(this.assignedTasks[element].dueDate).toISOString();// + " " + this.assignedTasks[element].timeOfDay;
            event.title = this.assignedTasks[element].task.description;
            this.events.push(event);
        };
    }
}
</script>

<template>
  <div id="app">
		<h1>My Calendar</h1>
		<calendar-view
			:show-date="showDate"
			class="theme-default"
            :events="this.events"
            
            >
			<template #header="{ headerProps }">
				<calendar-view-header
					:header-props="headerProps"
					@input="setShowDate" 
                    />
			</template>
		</calendar-view>
	</div>
</template>