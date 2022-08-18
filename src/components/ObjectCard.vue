<template>
<div class="card active-object">
    <div class="card-body">
        <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="prop in objectProps">
            <strong>{{ prop.label }}:</strong> {{ prop.subOfSub ?  prop.formatter ? prop.formatter(currentObject[prop.subOfSub][prop.subOf][prop.name]) : currentObject[prop.subOfSub][prop.subOf][prop.name] 
                        : prop.subOf ?  prop.formatter ? prop.formatter(currentObject[prop.subOf][prop.name]) : (currentObject[prop.subOf] ? currentObject[prop.subOf][prop.name] : '')
                        : prop.formatter ? prop.formatter(currentObject[prop.name]) : currentObject[prop.name] }}
        </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
  name: "objects-card",
  props: {
    currentObject: {},
    objectProps: {
      type: Array,
      default: []
    },
  }
}
</script>