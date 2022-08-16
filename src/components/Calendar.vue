<script setup>
import useAsyncOptions from '@/composables/useAsyncOptions';
import auth0 from "@/composables/auth0Client";
import GET from "@/composables/GET";
import { reactive, toRefs } from "vue";
const props = defineProps({
  category: String,
});

var accessToken = await auth0.getTokenSilently();
const assignedTasks = await GET(`assignedTask/category/${props.category}`, accessToken);
const events = [];
 for (const element in assignedTasks) {
    events.push({
        id: assignedTasks[element].id,
        start: assignedTasks[element].dueDate + (assignedTasks[element].timeOfDay ?  " " + assignedTasks[element].timeOfDay : ''),
        end: assignedTasks[element].dueDate + (assignedTasks[element].endTimeOfDay ?  " " + assignedTasks[element].endTimeOfDay : ''),
        allDay: (assignedTasks[element].timeOfDay ?  false : true),
        title : (assignedTasks[element].personId ? ('(' + assignedTasks[element].person.firstName + ' ' + assignedTasks[element].person.lastName + ') ') : '') + assignedTasks[element].task.description,
        class: (assignedTasks[element].complete ? 'green-event' : new Date(assignedTasks[element].dueDate) > new Date() ? '' : 'red-event')
    });
};
    
</script>
<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { VueFinalModal } from 'vue-final-modal';
import AssignedTask from "@/views/AssignedTask/AssignedTask.vue";
import SubtaskList from "@/views/Subtask/SubtaskList.vue";
import AssignedTaskCreate from "@/views/AssignedTask/AssignedTaskCreate.vue";
import Loading from "@/components/Loading.vue";
import ObjectCard from "@/components/ObjectCard.vue";
import * as formatter from "@/composables/cellFormatter.js";
import PUT from "@/composables/PUT";
import dateFunc from 'date-and-time';

export default {
    name: 'calendar',
    emits: ['updateEvents'],
    props: {
        category: String
    },
    data: function() {
        return { 
            showDate: new Date(),
            currentAssignedTask: null,
            showEdit: false,
            showCreate: false,
            showSeriesEdit: false,
            showSubtasks: false,
            onDate: null,
            atTime: null,
            objectProps: [{label: 'Person',
                        name: 'firstName',
                        subOf: 'person'},
                        {label: 'Task',
                        name: 'description',
                        subOf: 'task'},
                        {label: 'Target',
                        name: 'description',
                        subOf: 'target',
                        subOfSub: 'task'},
                        {label: 'Type',
                        name: 'type',
                        formatter: this.formatWord},
                        {label: 'Due Date',
                        name: 'dueDate',
                        formatter: this.formatDate},
                        {label: 'Time',
                        name: 'timeOfDay',
                        formatter: this.formatTime},
                        {label: 'End Time',
                        name: 'endTimeOfDay',
                        formatter: this.formatTime},
                        {label: 'Value',
                        name: 'value',
                        subOf: 'task',
                        formatter: this.formatMoney},
                        {label: 'Occurrences',
                        name: 'occurrences'},
                        {label: 'Complete',
                        name: 'complete'}]
        }
    },
    components: {
       VueCal, Loading, VueFinalModal, AssignedTaskCreate, AssignedTask, SubtaskList, ObjectCard
    },
    methods: {
        async onEventClick(event, e) {
            this.currentAssignedTask = await this.retrieveAssignedTask(event.id);
        },
        onCellClick(event, e){
            let date = new Date(event);
            this.onDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
            //this.atTime = {hours: (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()), minutes: (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())};
            this.showCreate = true;
        },
        setActiveAssignedTask(assignedTask) {
            this.currentAssignedTask = assignedTask;
        },
        async retrieveAssignedTask(id) {
            var accessToken = await auth0.getTokenSilently();
            this.assignedTask = await GET(`assignedTask/${id}`, accessToken);
            return this.assignedTask;
        },
        setShowDate(d) {
            this.showDate = d;
        },
        formatTime (value){
            return formatter.formatTime(value);
        },
        formatDate (value){
            return formatter.formatDate(value);
        },
        formatMoney (value){
            return formatter.formatMoney(value);
        },
        formatWord (value){
            return formatter.formatWord(value);
        },
        async refreshList() {
            this.isLoading = true;
            var accessToken = await auth0.getTokenSilently();
            let assignedTasks = await GET(`assignedTask/category/${this.$props.category}`, accessToken);
            
            this.events = [];
            for (const element in assignedTasks) {
                this.events.push({
                    id: assignedTasks[element].id,
                    start: assignedTasks[element].dueDate + (assignedTasks[element].timeOfDay ?  " " + assignedTasks[element].timeOfDay : ''),
                    end: assignedTasks[element].dueDate + (assignedTasks[element].endTimeOfDay ?  " " + assignedTasks[element].endTimeOfDay : ''),
                    allDay: (assignedTasks[element].timeOfDay ?  false : true),
                    title : assignedTasks[element].task.description,
                    class: (assignedTasks[element].complete ? 'green-event' : new Date(assignedTasks[element].dueDate) > new Date() ? '' : 'red-event')
                });
            };
            this.currentAssignedTask = null;
            this.$emit('updateEvents');
            this.isLoading = false;
        },
        async complete (complete) {
            if (complete) {
                this.currentAssignedTask.complete = true;
            } else {
                this.currentAssignedTask.complete = false;
            }
            if (this.currentAssignedTask['timeOfDay'] != null) {
                let hours, minutes;
                if (this.currentAssignedTask['timeOfDay'].split(':')[0] < 10 && this.currentAssignedTask['timeOfDay'].split(':')[0][0] != '0') {
                    hours = '0' +  this.currentAssignedTask['timeOfDay'].split(':')[0];
                }else {
                    hours = this.currentAssignedTask['timeOfDay'].split(':')[0];
                }
                if (this.currentAssignedTask['timeOfDay'].split(':')[1] < 10 && this.currentAssignedTask['timeOfDay'].split(':')[1][0] != '0') {
                    minutes = '0' +  this.currentAssignedTask['timeOfDay'].split(':')[1];
                } else {
                    minutes = this.currentAssignedTask['timeOfDay'].split(':')[1];
                }
                this.currentAssignedTask['timeOfDay'] = `${hours}:${minutes}`;
            }
            if (this.currentAssignedTask['endTimeOfDay'] != null) {
                let hours, minutes;
                if (this.currentAssignedTask['endTimeOfDay'].split(':')[0] < 10 && this.currentAssignedTask['endTimeOfDay'].split(':')[0][0] != '0') {
                    hours = '0' +  this.currentAssignedTask['endTimeOfDay'].split(':')[0];
                }else {
                    hours = this.currentAssignedTask['endTimeOfDay'].split(':')[0];
                }
                if (this.currentAssignedTask['endTimeOfDay'].split(':')[1] < 10 && this.currentAssignedTask['endTimeOfDay'].split(':')[1][0] != '0') {
                    minutes = '0' +  this.currentAssignedTask['endTimeOfDay'].split(':')[1];
                } else {
                    minutes = this.currentAssignedTask['endTimeOfDay'].split(':')[1];
                }
                this.currentAssignedTask['endTimeOfDay'] = `${hours}:${minutes}`;
            }
            let date = dateFunc.addHours(new Date(this.currentAssignedTask['dueDate']), 6);
            date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
            this.currentAssignedTask['dueDate'] = date;

            var accessToken = await auth0.getTokenSilently();
            await PUT(`assignedTask/${this.currentAssignedTask.id}`, accessToken, this.currentAssignedTask);
            this.$emit('updateEvents');
        }
    },
    mounted() {
        this.isLoading = false;
    }
}
</script>

<template>
  <div  class="list row">
    <Loading v-if="isLoading"></Loading>
  </div>
  <div  v-if="!isLoading" class="list row" style="width: 70vw;">
    <vue-final-modal v-model="showCreate" :esc-to-close="true" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="showCreate = false" />
        <AssignedTaskCreate v-if="showCreate" :onDate="onDate" :atTime="atTime" @onFormSubmit="showCreate = false; refreshList()" />
    </vue-final-modal>
    <div class="col col-lg-8">
        <vue-cal style="height: 80vh; " :events="events" 
                        :disable-views="['years', 'year']"
                        :show-all-day-events="true"
                        :time-from="6 * 60"
                        :time-to="20 * 60"
                        :time-cell-height="55"
                        allDayBarHeight="55px"
                        events-on-month-view="true"
                        showWeekNumbers="false"
                        :on-event-click="onEventClick"
                        @cell-click="onCellClick"
                        activeView="month"
                        class="" />
    </div>
    <div class="col col-lg-4" > 
        <span v-if="currentAssignedTask">
            <vue-final-modal v-model="showEdit" :esc-to-close="true" classes="modal-container" content-class="modal-content">
                <button class="modal__close" @click="showEdit = false" />
                <AssignedTask :objectId="currentAssignedTask.id"  @onFormSubmit="showEdit = false; refreshList()" />
            </vue-final-modal>
            <button class="btn btn-primary" @click="showEdit= true">Edit</button>
            <vue-final-modal v-model="showSeriesEdit" :esc-to-close="true" classes="modal-container" content-class="modal-content">
                <button class="modal__close" @click="showSeriesEdit = false" />
                <AssignedTask :inSeries="true" :objectId="currentAssignedTask.id"  @onFormSubmit="showSeriesEdit = false; refreshList()" />
            </vue-final-modal>
            <button class="btn btn-secondary" @click="showSeriesEdit= true" v-if="currentAssignedTask.type != 'STANDALONE'">Edit Series</button>
            <vue-final-modal @closed="refreshList" v-model="showSubtasks" :esc-to-close="true" classes="modal-container" content-class="modal-content">
                <button class="modal__close" @click="showSubtasks = false" />
                <component :is="SubtaskList" :byAssignedTask="currentAssignedTask.id" />
            </vue-final-modal>
            <button class="btn btn-primary" @click="showSubtasks= true">Subtasks</button>
            <ObjectCard :objectProps="objectProps" :currentObject="currentAssignedTask" ></ObjectCard>
            <button class="btn btn-primary" v-if="currentAssignedTask['complete'] != true" @click="complete(true)">Complete</button>
            <button class="btn btn-primary" v-else @click="complete(false)">Incomplete</button>
        </span>
    </div>
  </div>
</template>
<style scope>
.vuecal__title, .vuecal__menu {
    background: var(--vt-c-yellow-soft);
    border-radius: 10px;
    color: #555;
}
.vuecal__event-title, .vuecal__event {
    font-size: 1rem;
}
.vuecal__event {
    border-top: 1px solid var(--vt-c-yellow-soft);
    border-bottom: 1px solid var(--vt-c-yellow-soft);
}
</style>