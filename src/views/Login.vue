<template>
    <el-row type="flex" class="row-bg" justify="center">

        <el-col :span="6" id="right" style="background-color: white">
            <div class="LoginTitle">
                <h2>欢迎使用论文管理系统</h2>
            </div>

            <el-form :model="loginFrom" :rules="rules" ref="loginFrom" label-width="100px" class="demo-loginFrom">
                <el-form-item label="用户名" prop="userid">
                    <el-input v-model="loginFrom.userid"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginFrom.password" show-password></el-input>
                </el-form-item>

                <el-form-item label="登陆角色" prop="role">
                    <el-radio-group v-model="loginFrom.role">
                        <el-radio label="管理员"></el-radio>
                        <el-radio label="教师"></el-radio>
                        <el-radio label="学生"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginFrom')">登录</el-button>
                    <el-button type="text" @click="resetForm('loginFrom')" >重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginFrom: {
                    userid: '',
                    password: '',
                    role: '',
                    // token:''
                },
                rules: {
                    userid: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    role: [
                        { required: true, message: '请选择登录角色', trigger: 'change' }
                    ],
                }
            };
        },
        methods: {
            submitForm(loginFrom) {
                this.$refs[loginFrom].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/login',JSON.stringify(this.loginFrom)).then(res =>{
                            this.$store.commit("SET_USERID",this.loginFrom.userid)
                            this.$store.commit("SET_ROLE",this.loginFrom.role)
                            if(this.loginFrom.role === '管理员'){
                                this.$router.push('/admin/teachersmanagement')
                            }else if(this.loginFrom.role === '教师'){
                                this.$router.push('/teacher/teacherinfo')
                            }else {
                                this.$router.push('/student/studetinfo')
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(loginFrom) {
                this.$refs[loginFrom].resetFields();
            }
        }
    }
</script>

<style scoped>

    .el-row{
        height: 100%;
        background-color: #fafafafa;
        display: flex;
        align-items: center;
        background-image:url("../assets/LoginBackground.jpg");
        background-size: 100%;
        background-repeat:no-repeat;
        text-align: center;

    }

    .el-col{
        padding-right: 50px;
        background-color: white;
        border-radius: 10px;
        opacity:0.95;
    }

    .LoginTitle{
        color: #3b5f89;
        margin-left: 50px;

    }

    .el-input{
        width: 85%;
    }

</style>