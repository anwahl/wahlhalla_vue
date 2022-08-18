<template>
 <div class="list row">
    <Loading v-if="isLoading"></Loading>
  </div>
  <div v-if="!isLoading">
    <ViewButton v-for="(cat, index) in categories" :item="cat.name" @viewEvent="viewCategory(cat)" ></ViewButton>
  </div>
  <div v-if="!isLoading">
    <h4>{{ categoryName }}</h4>
    <Calendar v-if="renderCalendar" @updateEvents="forceRerender" :category="category" ></Calendar>
  </div>
</template>
 
<script>
import Calendar from "@/components/Calendar.vue";
import ViewButton from "@/components/buttons/ViewButton.vue";

export default {
  name: 'dashboard',
  components: { Calendar, ViewButton },
  data () {
    return {
        isLoading: true,
        category: 'ASSIGNEDTASK',
        categoryName: 'All',
        renderCalendar: true,
        categories: [{name: 'All', category: 'ASSIGNEDTASK'},
                     {name: 'Appointments', category: 'APPOINTMENT'},
                     {name: 'Bills', category: 'BILL'},
                     {name: 'Chores', category: 'CHORE'},
                     {name: 'Lists', category: 'LIST'},
                     {name: 'Other', category: 'OTHER'}],
    }
  },
  methods: {
    viewCategory (cat) {
        this.category = cat.category;
        this.categoryName = cat.name;
        this.forceRerender();
    },
    async forceRerender() {
      this.renderCalendar = false;
      this.isLoading = true;
      await this.$nextTick();
      this.renderCalendar = true;
      this.isLoading = false;
    }
  },
  mounted () {
    this.isLoading = false;
  }
}
</script>