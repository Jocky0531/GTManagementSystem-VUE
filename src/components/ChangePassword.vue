<template>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :lg="8" :md="11" :sm="15" :xs="24">
            <el-form :model="passForm" status-icon :rules="rules" ref="passForm" label-width="100px" class="demo-passForm">
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" show-password v-model="passForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" show-password v-model="passForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('passForm')">提交</el-button>
                    <el-button @click="resetForm('passForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>


</template>

<script>
    export default {
        name: "ChangePassword",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.passForm.checkPass !== '') {
                        this.$refs.passForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                passForm: {
                    password: '',
                    checkPass: '',
                },
                changePassWord:{
                    userid : this.$store.state.userid,
                    password:''
                },
                rules: {
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
            };
        },
        watch:{
            'passForm.password':{
                handler(){
                    this.changePassWord.password = this.passForm.password
                }
            }
        },
        props:{
            updatapasswordurl:''
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    const _this = this
                    if(valid){
                        this.$axios.post(this.updatapasswordurl,this.changePassWord).then(res=>{
                            _this.$alert(res.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback:action => {
                                    this.$refs[formName].resetFields();
                                    this.$router.push('/')
                                }
                            });
                            }
                        )
                    }else {
                        this.$alert('两次输入的密码不一致', '错误', {
                            confirmButtonText: '确定'
                        });
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .el-row{
        padding-right: 185px;
        padding-top: 100px;

    }


</style>