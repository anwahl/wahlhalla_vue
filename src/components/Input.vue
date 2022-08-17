<template>
    <input
          type="text"
          class="form-control"
          :id="prop.name"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          :name="prop.name"
          v-if="prop.type == 'inputText'"
        />
        <select @search="$emit('fetchOptions')" ref=""
          class="form-control"
          :id="prop.name"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          @change="$emit('onOptionChange')"
          :name="prop.name"
          v-if="prop.type == 'inputSelect'">
            <option value=''></option>
            <option v-for="item in prop.items" :value="item.id ? item.id : item[prop.itemDisplay]">{{ prop.itemSubOf ? item[prop.itemSubOf][prop.itemDisplay] : item[prop.itemDisplay] }}</option>
        </select>
        <input
          type="number"
          class="form-control"
          :id="prop.name"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          :name="prop.name"
          v-if="prop.type == 'inputNumber'"
         />
        <Datepicker :enableTimePicker="false" autoApply :textInput="true" 
          :id="prop.name"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          :name="prop.name"
          :modelValue="prop.value"
          v-if="prop.type == 'inputDate'"
        />
        {{ prop.value }}
        <Datepicker timePicker
          :id="prop.name"
          :required="prop.required ? true : false"
          v-model="object[prop.name]"
          :name="prop.name"
          v-if="prop.type == 'inputTime'"
           />
        <label class="checkboxContainer" v-if="prop.type == 'inputCheck'">
          <input
              type="checkbox"
              :id="prop.name"
              :required="prop.required ? true : false"
              v-model="object[prop.name]"
              :name="prop.name"
            />
            <span class="checkbox" ></span>
          </label>
</template>
<script>
import Datepicker from '@vuepic/vue-datepicker';
export default {
    name: "form-input",
    emits: ['fetchOptions','onOptionChange'],
    components: {
        Datepicker
    },
    props: {
        prop: {},
        object: {},
    }
}
</script>