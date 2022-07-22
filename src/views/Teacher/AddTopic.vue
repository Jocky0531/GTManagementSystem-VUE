<template>
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="9">
            <div style="margin: 20px;"></div>
            <el-form label-position="right" label-width="70px" :model="TopicFrom" :rules="rules" ref="TopicFrom">
                <el-form-item label="课题名" prop="topictitle">
                    <el-input placeholder="此项为必填项" v-model="TopicFrom.topictitle"></el-input>
                </el-form-item>
                <el-form-item label="课题描述"  >
                    <el-input type="textarea" :rows="6" placeholder="请简单描述此课题" v-model="TopicFrom.topicdepict"></el-input>
                </el-form-item>
                <el-form-item style="padding-right: 50px;">
                    <el-button type="primary" @click="addTopic('TopicFrom')">确认</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "AddTopic",
        data(){
            return{
                TopicFrom:{
                    topictitle:'',
                    topicdepict:'',
                    teacherid:this.$store.state.userid,
                },
                rules: {
                    topictitle: [
                        {required: true, message: '请输入课题名(此项必填)', trigger: 'blur'},
                    ]
                }
            }
        },
        methods:{
            addTopic(TopicFrom){
                this.$refs[TopicFrom].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/topics/addtopic',this.TopicFrom).then(res=>{
                            this.$message.success(res.data.msg)
                            this.$router.push("/teacher/topics")
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
        height: 50%;
        /*background-color: #D3DCE6;*/
    }
    .el-col{
        background-color: #dde6f1;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 10px 50px 0px 30px;
    }

</style>