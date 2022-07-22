<template>
    <div>
        <el-descriptions title="教师账号管理">
            <el-input v-model="teacherid" placeholder="输入职工号查找老师" slot="extra" @change="selectTeacher">

            </el-input>
        </el-descriptions>
        <el-descriptions>
            <el-button type="primary" icon="el-icon-circle-plus" slot="title" @click="goAddTeacher">添加教师用户</el-button>
        </el-descriptions>
        <el-table :data="teachers" style="width: 100%" border>
            <el-table-column prop="teacherid" label="职工号（账号）" width="350"></el-table-column>
            <el-table-column prop="password" label="密码" width="350" ></el-table-column>
            <el-table-column prop="username" label="姓名" width="350"></el-table-column>

<!--            <el-table-column prop="teachertitle" label="职称" width="200"></el-table-column>-->
<!--            <el-table-column prop="teachertelephone" label="手机号" width="180"></el-table-column>-->
<!--            <el-table-column prop="address" label="联系地址" width="180"></el-table-column>-->
            <el-table-column>
                <template slot-scope="teacher">
                    <el-button type="danger" size="mini" @click="deleteTeacher(teacher.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "TeachersManagement",
        data(){
            return{
                teachers:[],
                teacherid:'',
            }
        },
        methods:{
            getAllTeachers(){
                this.$axios.get("/teachers/getallteachers").then(res=>{
                    this.teachers = res.data.data
                })
            },
            selectTeacher(){
                this.teachers = []
                if (this.teacherid === ''){
                    this.getAllTeachers();
                }else {
                    this.$axios.get(`/teachers/getteacherbyid?teacherid=${this.teacherid}`).then(res=>{
                        if (res.data.data !== null){
                            this.teachers.push(res.data.data)
                        }
                    })
                }
            },
            deleteTeacher(teacher){
                this.$axios.get(`/teachers/deleteteacherbyid?teacherid=${teacher.teacherid}`).then(res=>{
                        this.getAllTeachers();
                        this.$message.success(res.data.msg)
                })
            },
            goAddTeacher(){
                this.$router.push("/admin/addteacher")
            }
        },
        created() {
            this.getAllTeachers()
        }
    }
</script>

<style scoped>

</style>