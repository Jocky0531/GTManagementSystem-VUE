<template>
<!--学生菜单-->
    <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true">
        <el-menu-item index="1" route="/student/studetinfo">
            <i class="el-icon-user"></i>
            <span slot="title">个人首页</span>
        </el-menu-item>

        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>课题管理</span>
            </template>
            <el-menu-item index="2-1" route="/student/mytopic">
                <i class="el-icon-view"></i>
                <span slot="title">查看课题</span>
            </el-menu-item>
            <el-menu-item index="2-2" route="/student/choosetopic">
                <i class="el-icon-tickets"></i>
                <span slot="title">选择课题</span>
            </el-menu-item>
        </el-submenu>


        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-s-management"></i>
                <span>论文管理</span>
            </template>
            <el-menu-item index="3-1" route="/student/mypapers">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">我的论文</span>
            </el-menu-item>
        </el-submenu>
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