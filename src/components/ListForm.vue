<template>
  <div  class="list row">
    <Loading v-if="isLoading"></Loading>
  </div>
  <div class="list row">
    <div v-if="!isLoading" class="col-13">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search..."
          v-model="searchValue"/>
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button"
            @click="searchBy">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col col-lg-9">
      <h4 v-if="!isLoading">{{ objectName }} List
        <vue-final-modal @closed="refreshList" v-model="showCreate" :esc-to-close="true" classes="modal-container" content-class="modal-content">
            <button class="modal__close" @click="showCreate = false" />
            <component :is="childCreateComponent" @onFormSubmit="showCreate = false" />
        </vue-final-modal>
        <button class="btn btn-primary" @click="showCreate = true">Add a {{ objectName }}</button>
      </h4>
      <div ref="table"></div>
    </div>
    <div class="col col-lg-3" >
    <span v-if="currentObject">
        <h4>{{ objectName }}
            <vue-final-modal @closed="refreshList" v-model="showEdit" :esc-to-close="true" classes="modal-container" content-class="modal-content">
                <button class="modal__close" @click="showEdit = false" />
                <component :is="childComponent" :objectId="currentObject.id"  @onFormSubmit="showEdit = false" />
            </vue-final-modal>
            <button class="btn btn-primary" @click="showEdit = true">Edit</button>
        </h4>
        <div class="card active-object">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="prop in objectProps">
                    <strong>{{ prop.label }}:</strong> {{ prop.subOfSub ?  prop.formatter ? prop.formatter(this.currentObject[prop.subOfSub][prop.subOf][prop.name]) : this.currentObject[prop.subOfSub][prop.subOf][prop.name] 
                                  : prop.subOf ?  prop.formatter ? prop.formatter(this.currentObject[prop.subOf][prop.name]) : this.currentObject[prop.subOf][prop.name]
                                  : prop.formatter ? prop.formatter(currentObject[prop.name]) : currentObject[prop.name] }}
                </li>
                </ul>
            </div>
        </div>
    </span>
    </div>
  </div>
</template>
<script>
import { defineAsyncComponent, ref } from 'vue';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import GET from "@/composables/GET";
import auth0 from "@/composables/auth0Client";
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
import Loading from "@/components/Loading.vue";

export default {
  name: "objects-list",
  components: { Loading, VueFinalModal, TargetCreate, Target, TargetTypeCreate, TargetType, PersonCreate, Person, TaskType, TaskTypeCreate, Task, TaskCreate, AssignedTask, AssignedTaskCreate, Subtask, SubtaskCreate},
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
    objectName: String
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
      var accessToken = await auth0.getTokenSilently();
      this.objects = await GET(this.objectURL, accessToken);
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
    },
    async searchBy() {
        if (this.searchValue != null && this.searchValue != '') {
            var accessToken = await auth0.getTokenSilently();
            this.objects = await GET(`${this.objectURL}/${this.searchByURL}/${this.searchValue}`, accessToken);
            this.tabulator.replaceData(this.objects);
            return this.objects;
        } else {
            return await this.refreshList();
        }
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
    var accessToken = await auth0.getTokenSilently();
    this.tabulator = new Tabulator(this.$refs.table, {
        data: await this.retrieveObjects(),
        layout:"fitColumns",
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