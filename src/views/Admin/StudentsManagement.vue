<template>
    <div>
        <el-descriptions title="学生账号管理">
            <el-input v-model="studentid" placeholder="输入学号查找学生" slot="extra" @change="selectStudent">

            </el-input>
        </el-descriptions>
        <el-descriptions>
            <el-button type="primary" icon="el-icon-circle-plus" slot="title" @click="goAddStudent">添加学生用户</el-button>
        </el-descriptions>
        <el-table :data="students" style="width: 100%" border>
            <el-table-column prop="studentid" label="学号（账号）" width="350"></el-table-column>
            <el-table-column prop="password" label="密码" width="350" ></el-table-column>
            <el-table-column prop="username" label="姓名" width="350"></el-table-column>

            <el-table-column>
                <template slot-scope="student">
                    <el-button type="danger" size="mini" @click="deleteStudent(student.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "StudentsManagement",
        data(){
            return{
                students:[],
                studentid:'',
            }
        },
        methods:{
            getAllStudents(){
                this.$axios.get("/students/getallstudents").then(res=>{
                    this.students = res.data.data
                })
            },
            selectStudent(){
                this.students = []
                if (this.studentid === ''){
                    this.getAllStudents();
                }else {
                    this.$axios.get(`/students/getstudentbyid?studentid=${this.studentid}`).then(res=>{
                        if (res.data.data !== null){
                            this.students.push(res.data.data)
                        }
                    })
                }
            },
            deleteStudent(student){
                this.$axios.get(`/students/deletestudentbyid?studentid=${student.studentid}`).then(res=>{
                    this.getAllStudents();
                    this.$message.success(res.data.msg)
                })
            },
            goAddStudent(){
                this.$router.push('/admin/addstudent')
            }
        },

        created() {
          this.getAllStudents()
        }
    }
</script>

<style scoped>

</style>