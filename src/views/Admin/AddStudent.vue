<template>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="9">
            <div style="margin: 20px;"></div>
            <el-form label-position="right" label-width="95px" :model="studentinfo" :rules="rules" ref="studentinfo">
                <el-form-item label="学号(账号)" prop="studentid">
                    <el-input placeholder="此项为必填项" v-model="studentinfo.studentid"></el-input>
                </el-form-item>
                <el-form-item label="密码" >
                    <el-input placeholder="默认为stu+学号（账号）" v-model="studentinfo.password"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="studentinfo.username"></el-input>
                </el-form-item>
                <el-form-item label="院系">
                    <el-input v-model="studentinfo.department"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="studentinfo.specialty"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-input v-model="studentinfo.studentclass"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="studentinfo.studenttelephone"></el-input>
                </el-form-item>
                <el-form-item style="padding-right: 50px;">
                    <el-button type="primary" @click="addStudent('studentinfo')">确认</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "AddStudent",
        data() {
            return {
                studentinfo:{
                    studentid: '',
                    password:'',
                    username: '',
                    department: '',
                    specialty: '',
                    studentclass: '',
                    studenttelephone:''
                },
                rules: {
                    studentid: [
                        {required: true, message: '请输入账号(此项必填)', trigger: 'blur'},
                    ]
                }
            }
        },
        methods:{
            addStudent(studentinfo){
                this.$refs[studentinfo].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/students/addstudent",JSON.stringify(this.studentinfo)).then(res=>{
                            this.$message.success(res.data.msg)
                            this.$router.push("/admin/studentsmanagement")
                        })
                    }else {
                        this.$message.error("请正确填写信息")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-row{
        height: 85%;
        /*background-color: #D3DCE6;*/
    }
    .el-col{
        background-color: #dde6f1;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 10px 50px 0px 30px;
    }
</style>