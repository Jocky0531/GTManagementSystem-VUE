<template>
    <el-container>
        <el-aside width="200px">
            <SideMenu></SideMenu>
        </el-aside>


        <el-container>
            <el-header height="66px">
                <Header userinfourl="/students/getstudent" changepasswordurl='/student/studentchangepassword'></Header>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import SideMenu from "@/components/Student/SideMenu";
    import Header from "@/components/Header";
    export default {
        name: "StudentHome",
        components:{
            SideMenu,
            Header
        }
    }
</script>

<style scoped>

    .el-container {
        padding: 0;
        margin: 0;
        height: 100%;

    }

    .el-header {
        background-color: #2c6eb4;
        color: white;
        text-align: center;
        line-height: 60px;
        margin:0px 3px 0px 3px;
        padding-left: 50px;
        border-radius: 4px;
    }



    .el-aside {

        background-color: #D3DCE6;
        color: #333;
        line-height: 200px;
    }


    .el-main {
        color: #333;
        text-align: center;
        /*line-height: 160px;*/
        margin:0px 20px 0px 20px;
    }
</style>