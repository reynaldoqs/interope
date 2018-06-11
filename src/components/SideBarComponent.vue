<template>
<div class="side-bar-component">
    <SideBarView :user="user" />
</div>
</template>

<script>
import SideBarView from "./SideBarView";
export default {
  data() {
    return {
      user: "asd"
    };
  },
  components: {
    SideBarView
  }
};
</script>
