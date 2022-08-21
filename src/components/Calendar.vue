<script setup>
import GET from "@/composables/GET";
import { reactive, toRefs } from "vue";
const props = defineProps({
  category: String,
});


const assignedTasks = await GET(`assignedTask/category/${props.category}`);
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
 
const objectProps = await getProperties(AssignedTask)   
</script>
<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { VueFinalModal } from 'vue-final-modal';
import SubtaskList from "@/views/Subtask/SubtaskList.vue";
import ObjectCard from "@/components/ObjectCard.vue";
import * as formatter from "@/composables/cellFormatter.js";
import PUT from "@/composables/PUT";
import dateFunc from 'date-and-time';
import Confirmation from '../components/Confirmation.vue'
import Workflow from "@/components/Workflow.vue";
import UpdateForm from "@/components/UpdateForm.vue";
import getProperties from "@/composables/getProperties.js";
import AssignedTask from "@/types/impl/AssignedTask";


export default {
    name: 'calendar',
    emits: ['updateEvents'],
    props: {
        category: String
    },
    data: function() {
        return { 
            isLoading: true,
            showDate: new Date(),
            currentAssignedTask: null,
            showCurrentAssignedTask: false,
            showEdit: false,
            showCreate: false,
            showSeriesEdit: false,
            showSubtasks: false,
            onDate: '',
            atTime: null,
        }
    },
    components: {
       UpdateForm, VueCal, VueFinalModal, SubtaskList, ObjectCard, Confirmation, Workflow
    },
    methods: {
        async onEventClick(event, e) {
            this.currentAssignedTask = await this.retrieveAssignedTask(event.id);
            this.showCurrentAssignedTask = true;
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
            this.assignedTask = await GET(`assignedTask/${id}`);
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
            
            let assignedTasks = await GET(`assignedTask/category/${this.$props.category}`);
            
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
            let confirmOptions = {};
            let ok = false;
            if (complete) {
                ok = true;
                this.currentAssignedTask.complete = true;
            } else {
                confirmOptions = {
                    title: 'Incomplete Task',
                    message: `Mark Assigned Task as Incomplete?`,
                    okButton: 'Mark Incomplete',
                };
                ok = await this.$refs.confirmDialogue.show(confirmOptions);
                this.currentAssignedTask.complete = false;
            }
            if (ok) {
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

                await PUT(`assignedTask/${this.currentAssignedTask.id}`, this.currentAssignedTask);
                this.$emit('updateEvents');
            }
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
  <div  v-if="!isLoading" class="list row">
    <vue-final-modal :lock-scroll="false" v-model="showCreate" :esc-to-close="true" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="showCreate = false" type="button" />
        <!--<AssignedTaskCreate v-if="showCreate" :onDate="onDate" :atTime="atTime" @onFormSubmit="showCreate = false; refreshList()" />-->
        <Workflow action="Create" :onDate="onDate" @onFormSubmit="showCreate = false; refreshList()"> </Workflow>
    </vue-final-modal>
    <div class="">
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
    <vue-final-modal :lock-scroll="false" v-model="showCurrentAssignedTask" :esc-to-close="true" classes="modal-container" content-class="modal-content">
        <button class="modal__close" @click="showCurrentAssignedTask = false" />
        <span v-if="currentAssignedTask">
            <vue-final-modal :lock-scroll="false" v-model="showEdit" :esc-to-close="true" classes="modal-container" content-class="modal-content">
                <button class="modal__close" @click="showEdit = false" />
                <UpdateForm 
                        :objectId="currentAssignedTask.id"  
                        @onFormSubmit="showEdit = false; refreshList()"
                        :objectProps="objectProps"
                        objectURL="assignedTask"
                        objectName="Assigned Task" />
            </vue-final-modal>
            <button class="btn btn-primary" @click="showEdit= true">Edit</button>
            <vue-final-modal :lock-scroll="false" v-model="showSeriesEdit" :esc-to-close="true" classes="modal-container" content-class="modal-content">
                <button class="modal__close" @click="showSeriesEdit = false" />
                <UpdateForm 
                        :inSeries="true"
                        :objectId="currentAssignedTask.id" 
                        @onFormSubmit="showSeriesEdit = false; refreshList()"
                        :objectProps="objectProps"
                        objectURL="assignedTask"
                        objectName="Assigned Task" />
            </vue-final-modal>
            <button class="btn btn-secondary" @click="showSeriesEdit= true" v-if="currentAssignedTask.type != 'STANDALONE'">Edit Series</button>
            <vue-final-modal :lock-scroll="false" @closed="refreshList()" v-model="showSubtasks" :esc-to-close="true" classes="modal-container" content-class="modal-content">
                <button class="modal__close" @click="showSubtasks = false" />
                <component :is="SubtaskList" :byAssignedTask="currentAssignedTask.id" />
            </vue-final-modal>
            <button class="btn btn-primary" @click="showSubtasks= true">Subtasks</button>
            <ObjectCard :objectProps="objectProps" :currentObject="currentAssignedTask" ></ObjectCard>
            <button class="btn btn-primary" v-if="currentAssignedTask['complete'] != true" @click="complete(true)">Complete</button>
            <button class="btn btn-primary" v-else @click="complete(false)">Incomplete</button>
        </span>
        <Confirmation ref="confirmDialogue"></Confirmation>
    </vue-final-modal>
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
.list.row {
    width: fit-content;
}
.vuecal {
    min-width: 600px;
}
</style>