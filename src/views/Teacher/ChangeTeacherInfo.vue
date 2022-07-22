<template>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="9">
                <div style="margin: 20px;"></div>
                <el-form label-position="right" label-width="80px" :model="teacherinfo">
                    <el-form-item label="职工号">
                        <el-input :placeholder="teacherinfo.teacherid" :v-model="teacherinfo.teacherid" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="teacherinfo.username"></el-input>
                    </el-form-item>
                    <el-form-item label="职称">
                        <el-input v-model="teacherinfo.teachertitle"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="teacherinfo.teachertelephone"></el-input>
                    </el-form-item>
                    <el-form-item label="联系地址">
                        <el-input v-model="teacherinfo.address"></el-input>
                    </el-form-item>
                    <el-form-item style="padding-right: 50px;">
                        <el-button type="primary" @click="updataTeacherInfo">确认</el-button>
                    </el-form-item>
                </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "ChangeTeacherInfo",
        data() {
            return {
                teacherinfo: {
                    teacherid: '',
                    username: '',
                    teachertitle: '',
                    teachertelephone: '',
                    address: ''
                }
            };
        },
        methods:{
            getUserInfo(){
                this.$axios.get(`/teachers/getteacher?userid=${this.$store.state.userid}`).then(res=>{
                    this.teacherinfo = res.data.data
                })
            },
            updataTeacherInfo(){
                this.$axios.post('/teachers/updatateacher',JSON.stringify(this.teacherinfo)).then(res=>{
                    this.$message.success(res.data.msg)
                    setTimeout(()=>{
                        this.$router.push('/teacher/teacherinfo')
                    },1000)
                })
            }
        },
        created() {
            this.getUserInfo()
        }
    }
</script>

<style scoped>
    .el-row{
        height: 70%;
        /*background-color: #D3DCE6;*/
    }
    .el-col{
        background-color: #dde6f1;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 10px 50px 0px 30px;
    }


</style>