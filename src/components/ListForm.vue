<template>
  <div  class="list row">
    <Loading v-if="isLoading"></Loading>
  </div>
  <div class="list row list-view">
    <div class="col col-lg-12" >
      <span v-if="currentObject">
          <h4>{{ objectName }}
              <vue-final-modal :lock-scroll="false" v-model="showEdit" :esc-to-close="true" classes="modal-container" content-class="modal-content">
                  <button class="modal__close" @click="showEdit = false" />
                  <component :is="childComponent" :objectId="currentObject.id"  @onFormSubmit="showEdit = false; refreshList()" />
              </vue-final-modal>
              <button class="btn btn-primary" @click="showEdit = true">Edit</button>
              <button class="btn btn-secondary" @click="currentObject = null">Close</button>
          </h4>
          <ObjectCard :objectProps="objectProps" :currentObject="currentObject" ></ObjectCard>
      </span>
      </div>
  </div>
  <div class="list row list-view">
    <div class="col col-lg-12">
      <h4 v-if="!isLoading">{{ objectName }} List
        <vue-final-modal :lock-scroll="false" v-model="showCreate" :esc-to-close="true" classes="modal-container" content-class="modal-content">
            <button class="modal__close" @click="showCreate = false" />
            <component :is="childCreateComponent" @onFormSubmit="showCreate = false; refreshList()" :byObjectId="byObjectId ? byObjectId : ''" />
        </vue-final-modal>
        <button class="btn btn-primary" @click="showCreate = true">Add a{{ (objectName[0].match(/[AEIOUaeiou]/g) ? 'n ' +  objectName : ' ' + objectName)}}</button>
      </h4>
      <div ref="table"></div>
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent, ref } from 'vue';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import GET from "@/composables/GET";
import { VueFinalModal } from 'vue-final-modal';
import TargetCreate from "@/views/Target/TargetCreate.vue";
import Target from "@/views/Target/Target.vue";
import TargetTypeCreate from "@/views/TargetType/TargetTypeCreate.vue";
import TargetType from "@/views/TargetType/TargetType.vue";
import PersonCreate from "@/views/Person/PersonCreate.vue";
import Person from "@/views/Person/Person.vue";
import TaskTypeCreate from "@/views/TaskType/TaskTypeCreate.vue";
import TaskType from "@/views/TaskType/TaskType.vue";
import TaskCreate from "@/views/Task/TaskCreate.vue";
import Task from "@/views/Task/Task.vue";
import AssignedTaskCreate from "@/views/AssignedTask/AssignedTaskCreate.vue";
import AssignedTask from "@/views/AssignedTask/AssignedTask.vue";
import SubtaskCreate from "@/views/Subtask/SubtaskCreate.vue";
import Subtask from "@/views/Subtask/Subtask.vue";
import ObjectCard from "@/components/ObjectCard.vue";

export default {
  name: "objects-list",
  components: { ObjectCard, VueFinalModal, TargetCreate, Target, TargetTypeCreate, TargetType, PersonCreate, Person, TaskType, TaskTypeCreate, Task, TaskCreate, AssignedTask, AssignedTaskCreate, Subtask, SubtaskCreate},
  props: {
    objectURL: String,
    childComponent: String,
    childCreateComponent: String,
    objectProps: {
      type: Array,
      default: []
    },
    displayProps: {
      type: Array,
      default: []
    },
    searchByURL: String,
    objectName: String,
    byObjectId: Number
  },
  data() {
    return {
      objects: [],
      currentObject: null,
      currentIndex: -1,
      searchValue: "",
      showCreate: false,
      showEdit: false,
      tabulator: null,
      tableData: [],
      isLoading: true
    };
  },
  methods: {
    async retrieveObjects() {
      
      this.objects = await GET(this.objectURL);
      return this.objects;
    },
    async refreshList() {
      this.tabulator.replaceData(await this.retrieveObjects());
      this.currentObject = null;
      this.currentIndex = -1;
    },
    setActiveObject(object, index) {
      this.currentObject = object;
      this.currentIndex = index;
    }
  },
  async mounted() {
    this.retrieveObjects();
    let columns = [];
    this.displayProps.forEach(element =>  {
        columns.push({
            title: element.label,
            field: element.name,
            formatter: (element.formatter ? element.formatter : "plaintext"),
            formatterParams: (element.formatterParams ? element.formatterParams : {})
        });
    });
    
    this.tabulator = new Tabulator(this.$refs.table, {
        data: await this.retrieveObjects(),
        layout:"fitDataStretch",
        reactiveData:true,
        selectable:1,
        columns: columns,
        pagination:"local",
        paginationSize:10,
        paginationSizeSelector:[10, 20, 50],
    });
    this.tabulator.on('rowClick', (e, row) => {
            this.setActiveObject(row.getData(), row.getIndex());
    });
    
    this.isLoading = false;
  }
};
</script>
<style scope>
.list-view {
  padding: 25px;
}
</style>