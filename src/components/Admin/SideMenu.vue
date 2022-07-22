<template>
<!--    #545c64   #284663-->
    <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true">
        <el-menu-item index="1" route="/admin/teachersmanagement">
            <i class="el-icon-user"></i>
            <span slot="title">教师管理</span>
        </el-menu-item>

        <el-menu-item index="2" route="/admin/studentsmanagement">
            <i class="el-icon-s-custom"></i>
            <span slot="title">学生管理</span>
        </el-menu-item>

    </el-menu>
</template>

<script>
    export default {
        name: "SideMenu"
    }
</script>

<style scoped>
    .el-menu-vertical-demo{
        height: 100%;
    }
    .a {
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
    }
</style>