<template>
  <div class="submit-form">
    <div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          required
          v-model="task.description"
          name="description"
        />
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <input
          class="form-control"
          id="type"
          required
          v-model="task.type"
          name="type"
        />
      </div>
      <div class="form-group">
        <label for="target">Target</label>
        <input
          class="form-control"
          id="target"
          required
          v-model="task.target"
          name="target"
        />
      </div>
      <div class="form-group">
        <label for="value">Value</label>
        <input
          class="form-control"
          id="value"
          v-model="task.value"
          name="value"
        />
      </div>
      <button @click="saveTask" class="btn btn-success">Submit</button>
    </div>
  </div>
</template>
<script lang="ts">
import {  Vue } from "vue-property-decorator";
import type Task from "@/types/Task";
import POST from "@/composables/POST";
import auth0 from "@/composables/auth0Client";

export default class AddTask extends Vue {
  public task: Task = {
    id: null,
    description: "",
    type: -1,
    target: -1,
    value: -1
  };
  public async saveTask() {
    let data = {
      description: this.task.description,
      type: this.task.type,
      target: this.task.target,
      value: this.task.value,
    };
      var accessToken = await auth0.getTokenSilently();
      let result = await POST("task", accessToken, data);
      this.task.id = result.id;
  }
  newTask() {
    this.task = {} as Task;
  }
}
</script>
<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>