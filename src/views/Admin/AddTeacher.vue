<template>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="9">
            <div style="margin: 20px;"></div>
            <el-form label-position="right" label-width="105px" :model="teacherinfo" :rules="rules" ref="teacherinfo">
                <el-form-item label="职工号(账号)" prop="teacherid">
                    <el-input placeholder="此项为必填项" v-model="teacherinfo.teacherid"></el-input>
                </el-form-item>
                <el-form-item label="密码" >
                    <el-input placeholder="默认为tc+职工号（账号）" v-model="teacherinfo.password"></el-input>
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
                    <el-button type="primary" @click="updataTeacher('teacherinfo')">确认</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "AddTeacher",
        data() {
            return {
                teacherinfo:{
                    teacherid: '',
                    password:'',
                    username: '',
                    teachertitle: '',
                    teachertelephone: '',
                    address: ''
                },
                rules: {
                    teacherid: [
                        {required: true, message: '请输入账号(此项必填)', trigger: 'blur'},
                    ]
                }
            }
        },
        methods:{
            updataTeacher(teacherinfo){
                this.$refs[teacherinfo].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/teachers/addteacher",JSON.stringify(this.teacherinfo)).then(res=>{
                            this.$message.success(res.data.msg)
                            this.$router.push("/admin/teachersmanagement")
                        })
                    }else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-row{
        height: 74%;
        /*background-color: #D3DCE6;*/
    }
    .el-col{
        background-color: #dde6f1;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 10px 50px 0px 30px;
    }

</style>