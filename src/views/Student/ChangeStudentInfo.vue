<template>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="9">
            <div style="margin: 20px;"></div>
            <el-form label-position="right" label-width="95px" :model="studentinfo" ref="studentinfo">
                <el-form-item label="学号(账号)" prop="studentid">
                    <el-input :placeholder="studentinfo.studentid" v-model="studentinfo.studentid" :disabled="true"></el-input>
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
                    <el-button type="primary" @click="updataStudent('studentinfo')">确认</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ChangeStudentInfo",
        data() {
            return {
                studentinfo:{
                    studentid: '',
                    username: '',
                    department: '',
                    specialty: '',
                    studentclass: '',
                    studenttelephone:''
                },
            }
        },
        methods:{
            getStudentInfo(){
                this.$axios.get(`/students/getstudent?userid=${this.$store.state.userid}`).then(res=>{
                    this.studentinfo = res.data.data
                })
            },
            updataStudent(){
                this.$axios.post('/students/updatastudent',JSON.stringify(this.studentinfo)).then(res=>{
                    this.$message.success(res.data.msg)
                    setTimeout(()=>{
                        this.$router.push('/student/studetinfo')
                    },1000)
                })
            }
        },
        created() {
            this.getStudentInfo()
        }
    }
</script>

<style scoped>
    .el-row{
        height: 75%;
    }
    .el-col{
        background-color: #dde6f1;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 10px 50px 0px 30px;
    }
</style>