<template>
  <scroll-bar>
    <div class="sys-title text-center">{{$t('login.title')}}</div>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import ScrollBar from '@/components/ScrollBar';

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
<style scoped>
.sys-title {
  font-size: 18px;
  color: #fff;
  line-height: 80px;
}
</style>
