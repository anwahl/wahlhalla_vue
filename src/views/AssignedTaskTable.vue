<script setup>
  import {ref, reactive, onMounted} from 'vue';
  import {TabulatorFull as Tabulator} from 'tabulator-tables'; 
  import auth0 from "@/composables/auth0Client";
  import PUT from "@/composables/PUT";
  import DELETE from "@/composables/DELETE";
  import GET from "@/composables/GET";
  import router from '@/router'


  const table = ref(null); 
  const tabulator = ref(null); 
  const tableData = reactive([]);

  var personContextMenu = [
    {
        label:"Edit Person",
        action:function(e, cell){
            
        }
    },
  ];

   var taskContextMenu = [
    {
        label:"View Subtasks",
        action:function(e, cell){

        }
    },
    {
        label:"Edit Task",
        action:function(e, cell){
          
        }
    },
    {
        label:"Add Subtask",
        action:function(e, cell){

        }
    },
  ];

   var targetContextMenu = [
    {
        label:"Edit Target",
        action:function(e, cell){
            
        }
    },
  ];

  var removeContextMenu = [
    {
        label:"Remove Assignment",
        action:function(e, cell){
            
        }
    },
  ];

  var personHeaderMenu = [
    {
        label:"Create Person",
        action:function(e, column){
            router.push({ path: '/person/create' });
            //showModal = true;
        }
    },
  ];

  var taskHeaderMenu = [
    {
        label:"Create Task",
        action:function(e, column){
            
        }
    },
    {
        label:"Create Task Type",
        action:function(e, column){
            
        }
    },
  ];

  var targetHeaderMenu = [
    {
        label:"Create Target",
        action:function(e, column){
            
        }
    },{
        label:"Create Target Type",
        action:function(e, column){
            
        }
    },
  ];

  onMounted(async () => {
      const accessToken = await auth0.getTokenSilently();
      tabulator.value = new Tabulator(table.value, {
        ajaxURL: 'http://localhost:8080/api/assignedTask/',
        ajaxConfig: {
          headers:{
              'Content-Type': 'text/html',
              'Authorization': 'Bearer ' + accessToken
          }
        },
        layout:"fitColumns",
        reactiveData:true,
        pagination:"local",
        paginationSize:5,
        paginationSizeSelector:[5, 10, 20],
        columns:[
            {titleFormatter:"buttonTick",responsive:0, headerSort:false, formatter:"tickCross", 
                formatterParams:{crossElement:false}, cellClick:function(e, cell){

                }
            },
            {title:"Name", field:"username", editor:"list", editorParams:{
                values: async function (){
                  return GET("person", accessToken);
                },
                itemFormatter: function(label, value, item, element){
                    return item.name;
                },
                sort:"asc", 
                emptyValue:null, 
                maxWidth:true, 
                placeholderLoading:"Loading People...", 
                placeholderEmpty:"No Results Found", 
                autocomplete:true,
                filterFunc:function(term, label, value, item){
                    return item.firstName === term || item.lastName === term;
                },
                listOnEmpty:true
              },
              contextMenu:personContextMenu,
              headerMenu:personHeaderMenu
            },
            {title:"Task", field:"task", editor:"list", editorParams:{
                values: async function (){
                  return GET("task", accessToken);
                },
                itemFormatter: function(label, value, item, element){
                    return item.name;
                },
                sort:"asc", 
                emptyValue:null, 
                maxWidth:true, 
                placeholderLoading:"Loading Tasks...", 
                placeholderEmpty:"No Results Found", 
                autocomplete:true,
                filterFunc:function(term, label, value, item){
                    return item.name === term;
                },
                listOnEmpty:true, 
                freetext:true,
              },
              contextMenu:taskContextMenu,
              headerMenu:taskHeaderMenu
            },
            {title:"Target", field:"target", editor:"list", editorParams:{
                values: async function (){
                  return GET("target", accessToken);
                },
                itemFormatter: function(label, value, item, element){
                    return item.name;
                },
                sort:"asc", 
                emptyValue:null, 
                maxWidth:true, 
                placeholderLoading:"Loading Targets...", 
                placeholderEmpty:"No Results Found", 
                autocomplete:true,
                filterFunc:function(term, label, value, item){
                    return item.name === term;
                },
                listOnEmpty:true, 
                freetext:true,
               },
              contextMenu:targetContextMenu,
              headerMenu:targetHeaderMenu
            },
            {title:"Due Date", field:"dueDate", editor:"date", formatter:function(cell, formatterParams, onRendered){
                  var val = new Date(new Date(cell.getValue()).setHours(new Date(cell.getValue()).getHours() + 29));
                  val < new Date(new Date().setHours(0, 0, 0, 0)) ? cell.getRow().getElement().style.backgroundColor = "#f5beba"
                   : val > new Date(new Date().setHours(23, 59, 59, 0)) ? cell.getRow().getElement().style.backgroundColor = "#c2f2d8" : '';
                  return val.toString().slice(0, 15);
                }
            },
            {title:"Frequency", field:"frequency", editor:"list", editorParams:{
                values: [{value:'DAILY',label:'Daily'},{value:'WEEKLY',label:'Weekly'},{value:'MONTHLY',label:'Monthly'},{value:'YEARLY',label:'Yearly'}],
                emptyValue:null, 
                maxWidth:true, 
                placeholderLoading:"Loading Frequencies...", 
                placeholderEmpty:"No Results Found", 
                autocomplete:true,
                filterFunc:function(term, label, value, item){
                    return item.name === term;
                },
                listOnEmpty:true
            }},
            {titleFormatter:"buttonCross",responsive:0, headerSort:false, formatter:"tickCross", 
                cellClick:function(e, cell){

                }, contextMenu:removeContextMenu
            }
        ],
      });
    return{tabulator, table};
})
</script>
<script>
import { VueFinalModal } from 'vue-final-modal';
import PersonCreate from "./Person/PersonCreate.vue";
import Person from "./Person/Person.vue";

export default {
  components: {PersonCreate, Person, VueFinalModal},
}
</script>
<template>
  <vue-final-modal id="assignedTaskTableModal" :esc-to-close="true" classes="modal-container" content-class="modal-content" >
    <router-view></router-view>
  </vue-final-modal>
  <div ref="table"></div>
</template>