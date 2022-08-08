<script setup>
  import {ref, reactive, onMounted} from 'vue';
  import {TabulatorFull as Tabulator} from 'tabulator-tables'; 


  const table = ref(null); 
  const tabulator = ref(null); 
  const tableData = reactive([]);

  onMounted(() => {
      tabulator.value = new Tabulator(table.value, {
        ajaxUrl: 'http://localhost:8080/api/assignedTask/',
        layout:"fitColumns",
        reactiveData:true,
        pagination:"local",
        paginationSize:5,
        paginationSizeSelector:[5, 10, 20],
        columns:[
            {title:"Name", field:"username", editor:"input"},
            {title:"Task", field:"taskName", editor:"list", editorParams:{
                valuesURL: "http://localhost:8080/api/task/",
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
    return{tabulator, table};
})
</script>

<template>
  <div ref="table"></div>
</template>