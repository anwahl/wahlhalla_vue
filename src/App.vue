<template>
  <nav>
    <SidebarMenu :menu="menu"  @item-click="onItemClick" :collapsed="collapsed"  @update:collapsed="onToggleCollapse"  />
  </nav>
  <main id="main-view" :class="{'collapsed' : collapsed}">
    <router-view />
  </main>
</template>
<script lang="ts">
import {  Vue } from "vue-property-decorator";
import { SidebarMenu } from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import auth0 from "@/composables/auth0Client";

export default  {
  name: "App",
  components: { SidebarMenu },
  setup() {
    console.log('Loading...');
    return {};
  },
  data() {
        return {
            menu: [
              {
                  header: "Wahlhalla",
                  hiddenOnCollapse: true
              },
              {
                  href: '/',
                  title: 'Dashboard',
                  icon: {
                      element: 'img',
                      attributes: {src: "/images/WAHLHALLA-W.png"}
                      // text: ''
                  }
              },
              {
                  title: 'View',
                  icon: 'bi bi-view-list',
                  child: [
                  {
                      href: '/assignedTasks',
                      title: 'Assigned Tasks',
                      icon: 'bi bi-list-task',
                  },
                  {
                      href: '/tasks',
                      title: 'Tasks',
                      icon: 'bi bi-hexagon-fill',
                  },
                  {
                      href: '/subtasks',
                      title: 'Subasks',
                      icon: 'bi bi-check-all',
                  },
                  {
                      href: '/persons',
                      title: 'People',
                      icon: 'bi bi-people',
                  },
                  {
                      href: '/targets',
                      title: 'Targets',
                      icon: 'bi bi-bullseye',
                  },
                  {
                      href: '/targetTypes',
                      title: 'Target Types',
                      icon: 'bi bi-bullseye',
                  },
                  {
                      href: '/taskTypes',
                      title: 'Task Types',
                      icon: 'bi bi-hexagon',
                  }
                  ]
              },
              {
                  header: 'Utilities',
                  hiddenOnCollapse: true
              },
              {
                  title: 'Login',
                  icon: 'bi bi-person-circle'
              },
              {
                  title: 'Sign Out',
                  icon: 'bi bi-person-x-fill'
              }
            ],
            collapsed: false
        }
    },
    methods : {
        // @ts-ignore
        onToggleCollapse (collapsed) {
            // @ts-ignore
            this.collapsed = collapsed;
        },
        // @ts-ignore
        onItemClick (event, item) {
            if (item.title === 'Login') {
                auth0.loginWithRedirect();
            }
            if (item.title === 'Sign Out') {
                auth0.logout({ returnTo: window.location.origin });
            }
        },
        onResize () {
            if (window.innerWidth <= 767) {
                // @ts-ignore
                this.collapsed = true;
            } else {
                // @ts-ignore
                this.collapsed = false;
            }
        }
    },
    mounted () {
        // @ts-ignore
        this.onResize();
        // @ts-ignore
        window.addEventListener('resize', this.onResize);
    }
}
export class App extends Vue {

}
</script>

<style>
#main-view {
  padding-left: 350px;
  transition: 0.3s ease;
}
#main-view.collapsed {
  padding-left: 110px;
}
</style>