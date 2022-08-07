<script>
  import {TabulatorFull as Tabulator} from 'tabulator-tables'; //import Tabulator library

  export default {
    data() {
      return {
        tabulator: null, //variable to hold your table
        ajaxData: 'https://localhost:8080/assignedTasks?type=CHORE&complete=0'
      }
    },
    mounted() {
      this.tabulator = new Tabulator(this.$refs.table, {
        data: this.ajaxData,
        layout:"fitColumns",
        reactiveData:true,
        pagination:"local",
        paginationSize:6,
        paginationSizeSelector:[5, 10, 20],
        columns:[
            {title:"Name", field:"username", editor:"input"},
            {title:"Task", field:"taskName", editor:"list", editorParams:{
                valuesURL: "https://localhost:8080/tasks/",
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
                filterRemote:true, 
                listOnEmpty:true, 
                freetext:true, //allow the user to set the value of the cell to a free text entry
            }},
        ],
      });
    }
  }
</script>

<template>
  <div ref="table"></div>
</template>