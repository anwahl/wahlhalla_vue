<template>
  <div  class="list row">
    <Loading v-if="isLoading"></Loading>
  </div>
  <span v-if="currentObject">
    <div class="row">
      <div class="col col-lg-5" >
          <vue-final-modal :lock-scroll="false" v-model="showEdit" :esc-to-close="true" classes="modal-container" content-class="modal-content">
              <button class="modal__close" @click="showEdit = false" />
              <UpdateForm 
                  :objectId="currentObject.id"
                  @onFormSubmit="showEdit = false; refreshList()"
                  :objectProps="objectProps"
                  :objectURL="objectURL"
                  :objectName="objectName" />
          </vue-final-modal>
          <button class="btn btn-primary" @click="showEdit = true">Edit</button>
          <button class="btn btn-secondary" @click="currentObject = null">Close</button>
          <ObjectCard :objectProps="objectProps" :currentObject="currentObject" ></ObjectCard>
        </div>
        <div class="col col-lg-7" >
          <component is="SubtaskList" :key="subtaskKey" :byAssignedTask="currentObject.id" />
        </div>
      </div>
  </span>
  <div class="row list-view">
    <div class="col col-lg-12">
      <h4 v-if="!isLoading">
        <vue-final-modal :lock-scroll="false" v-model="showCreate" :esc-to-close="true" classes="modal-container" content-class="modal-content">
            <button class="modal__close" @click="showCreate = false" />
            <CreateForm 
                @onFormSubmit="showCreate = false; refreshList()" 
                :objectProps="objectProps"
                :objectURL="objectURL"
                :objectName="objectName" />
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
import SubtaskList from "@/views/Subtask/SubtaskList.vue";
import GET from "@/composables/GET";
import { VueFinalModal } from 'vue-final-modal';
import ObjectCard from "@/components/ObjectCard.vue";
import CreateForm from "@/components/CreateForm.vue";
import UpdateForm from "@/components/UpdateForm.vue";

export default {
  name: "objects-list",
  components: { UpdateForm, CreateForm, ObjectCard, VueFinalModal, SubtaskList },
  props: {
    getURL: String,
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
    byObjectId: [String, Number]
  },
  data() {
    return {
      objects: [],
      currentObject: null,
      currentIndex: -1,
      searchValue: "",
      showCreate: false,
      showEdit: false,
      showSubtasks: false,
      tabulator: null,
      tableData: [],
      isLoading: true,
      subtaskKey: 0
    };
  },
  methods: {
    async retrieveObjects() {
      this.objects = await GET(this.getURL);
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
            this.subtaskKey++;
            console.log(row.getIndex);
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