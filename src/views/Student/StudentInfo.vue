<template>
    <el-row type="flex" class="row-bg">
        <el-col :span="20">
            <el-descriptions class="margin-top" title="个人信息" :column="3"  border style="margin-bottom: 30px;" :labelStyle="{width:'40px'}" :contentStyle="{width:'60px'}">
                <template slot="extra">
                    <el-button type="primary" size="small" @click="goChangeInfo">编辑</el-button>
                </template>
                <el-descriptions-item label="姓名">
                    {{studentinfo.username}}
                </el-descriptions-item>
                <el-descriptions-item label="学号">
                    {{studentinfo.studentid}}
                </el-descriptions-item>
                <el-descriptions-item label="联系方式">
                    {{studentinfo.studenttelephone}}
                </el-descriptions-item>
                <el-descriptions-item label="院系">
                    {{studentinfo.department}}
                </el-descriptions-item>
                <el-descriptions-item label="专业">
                    {{studentinfo.specialty}}
                </el-descriptions-item>
                <el-descriptions-item label="班级">
                    {{studentinfo.studentclass}}
                </el-descriptions-item>
            </el-descriptions>

            <el-descriptions class="margin-top" title="指导老师"></el-descriptions>
            <div v-show="control">
                <el-descriptions class="margin-top" :column="3" border :labelStyle="{width:'40px'}" :contentStyle="{width:'60px'}" >
                    <el-descriptions-item label="姓名">
                        {{teacherinfo.username}}
                    </el-descriptions-item>
                    <el-descriptions-item label="职工号">
                        {{teacherinfo.teacherid}}
                    </el-descriptions-item>
                    <el-descriptions-item label="联系方式">
                        {{teacherinfo.teachertelephone}}
                    </el-descriptions-item>
                    <el-descriptions-item label="职称">
                        {{teacherinfo.teachertitle}}
                    </el-descriptions-item>
                    <el-descriptions-item label="联系地址">
                        {{teacherinfo.address}}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="emptyTeacher" v-show="!control">
                <strong>请等待老师选择</strong>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "StudentInfo",
        data(){
            return{
                studentinfo:{
                    username:'',
                    studentid:'',
                    studenttelephone:'',
                    department:'',
                    specialty:'',
                    studentclass:'',
                },
                teacherinfo:{
                    username:'',
                    teacherid:'',
                    teachertelephone:'',
                    teachertitle:'',
                    address:''
                },
                control : false
            }
        },
        methods:{
            getStudentInfo(){
                this.$axios.get(`/students/getstudent?userid=${this.$store.state.userid}`).then(res=>{
                    this.studentinfo = res.data.data
                    // 将获取到的用户姓名存入Vuex中，便于修改信息之后头部的用户姓名会随之改变
                    this.$store.commit('SET_USERNAME',res.data.data.username)
                    if (res.data.data.teacherid !== ''){
                        this.$store.commit("SET_TEACHERID",res.data.data.teacherid)
                        this.control = true;
                        this.getTeacherInfo(res.data.data.teacherid)
                    }else {
                        this.$store.commit("SET_TEACHERID",'')
                    }
                })
            },
            goChangeInfo(){
                this.$router.push('/student/studentchangeinfo')
            },
            getTeacherInfo(teacherid){
                this.$axios.get(`/teachers/getteacherbyid?teacherid=${teacherid}`).then(res=>{
                        this.teacherinfo = res.data.data
                })
            },
        },
        created() {
            this.getStudentInfo()
        }
    }
</script>

<style scoped>

    .emptyTeacher{
        padding-top: 18px;
        width: 100%;
        height: 42px;
        background-color: #f4f4f4;
        color: #adadad;
        border-radius: 8px;
    }

</style>