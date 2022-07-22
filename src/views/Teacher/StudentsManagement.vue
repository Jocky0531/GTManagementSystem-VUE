<template>
    <div>
        <el-descriptions title="我的学生">
            <el-input v-model="studentid" placeholder="输入学号查找学生" slot="extra" @change="selectStudent">

            </el-input>
        </el-descriptions>
        <el-table :data="myStudents" style="width: 100%">
            <el-table-column prop="studentid" label="学号" width="180"></el-table-column>
            <el-table-column prop="username" label="姓名" width="175"></el-table-column>
            <el-table-column prop="department" label="院系" width="200"></el-table-column>
            <el-table-column prop="specialty" label="专业" width="180"></el-table-column>
            <el-table-column prop="studentclass" label="班级" width="180"></el-table-column>
            <el-table-column prop="studenttelephone" label="联系方式" width="180"></el-table-column>
            <el-table-column>
                <template slot-scope="student">
                    <el-button type="danger" size="mini" @click="unBindStudent(student.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-descriptions title="可选学生"></el-descriptions>
        <el-table :data="students" style="width: 100%">
            <el-table-column prop="studentid" label="学号" width="180"></el-table-column>
            <el-table-column prop="username" label="姓名" width="175"></el-table-column>
            <el-table-column prop="department" label="院系" width="200"></el-table-column>
            <el-table-column prop="specialty" label="专业" width="180"></el-table-column>
            <el-table-column prop="studentclass" label="班级" width="180"></el-table-column>
            <el-table-column prop="studenttelephone" label="联系方式" width="180"></el-table-column>
            <el-table-column>
                <template slot-scope="student">
                    <el-button type="success" size="mini" @click="bindStudent(student.row)">添加</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>

    export default {
        name: "StudentsManagement",
        data() {
            return {
                myStudents: [],
                students: [],
                studentid:''
            }
        },
        methods: {
            getMyStudents() {
                this.$axios.get(`/students/getstudentsbyteacherid?userid=${this.$store.state.userid}`).then(res => {
                    this.myStudents = res.data.data
                })
            },
            getStudents() {
                this.$axios.get('/students/getstudentsbyteacherid?userid=').then(res => {
                    this.students = res.data.data
                })
            },
            getAllStudents(){
                this.getMyStudents()
                this.getStudents()
            },
            unBindStudent(student) {
                this.$axios.post('/students/unbindstudent',{studentid:student.studentid}).then(res=>{
                    this.getAllStudents();
                    this.$message.success(res.data.msg)
                })
            },
            bindStudent(student){
                this.$axios.post('/students/bindstudent',{studentid:student.studentid,teacherid:this.$store.state.userid}).then(res=>{
                    this.getAllStudents();
                    this.$message.success(res.data.msg)
                })
            },
            selectStudent(){
                this.myStudents = [];
                this.students = [];
                if (this.studentid === ''){
                    this.getAllStudents();
                }else {
                    this.$axios.get(`/students/getstudentbyid?studentid=${this.studentid}`).then(res=>{
                        if (res.data.data !== null){
                            if (res.data.data.teacherid === ''){
                                this.students.push(res.data.data)
                            }else{
                                this.myStudents.push(res.data.data)
                            }
                        }
                    })
                }
            }
        },
        created() {
            this.getAllStudents();

        }
    }
</script>

<style scoped>
    .el-table {
        margin-bottom: 20px;
    }

    /*.el-button{*/
    /*    display: none;*/
    /*}*/


</style>