<template>
    <div>
        <div v-show="control === 0">
            <el-empty description="请先等待老师选择"></el-empty>
        </div>
        <div v-show="control === 1">
            <el-empty description="您已有课题"></el-empty>
        </div>
        <div v-show="control === 2">
            <el-tabs type="card" value="first">
                <el-tab-pane label="老师发布的课题" name="first">
                    <el-table :data="topics" style="width: 100%">
                        <el-table-column prop="topictitle" label="课题名" width="350"></el-table-column>
                        <el-table-column prop="topicdepict" label="课题描述" width="750"></el-table-column>
                        <el-table-column>
                            <template slot-scope="topic">
                                <el-button type="success" size="mini" @click="chooseTopic(topic.row)">选择</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="自拟课题" name="second">
                    <el-row type="flex" class="row-bg" justify="center">
                        <el-col :span="9">
                            <div style="margin: 20px;"></div>
                            <el-form label-position="right" label-width="70px" :model="TopicFrom" :rules="rules"
                                     ref="TopicFrom">
                                <el-form-item label="课题名" prop="topictitle">
                                    <el-input placeholder="此项为必填项" v-model="TopicFrom.topictitle"></el-input>
                                </el-form-item>
                                <el-form-item label="课题描述">
                                    <el-input type="textarea" :rows="6" placeholder="请简单描述此课题"
                                              v-model="TopicFrom.topicdepict"></el-input>
                                </el-form-item>
                                <el-form-item style="padding-right: 50px;">
                                    <el-button type="primary" @click="addTopic('TopicFrom')">确认</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ChooseTopic",
        data() {
            return {
                control:0,
                topics: [],
                TopicFrom: {
                    topictitle: '',
                    topicdepict: '',
                    studentid: this.$store.state.userid,
                    teacherid: this.$store.state.teacherid,
                },
                rules: {
                    topictitle: [
                        {required: true, message: '请输入课题名(此项必填)', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            getAllMyTeacherTopics() {
                this.$axios.get(`/topics/getteachertopics?teacherid=${this.$store.state.teacherid}`).then(res => {
                    this.topics = res.data.data
                })
            },
            chooseTopic(chooseTopic) {
                this.$axios.post('/topics/updatatopic', {
                    topictitle: chooseTopic.topictitle,
                    studentid: this.$store.state.userid
                }).then(res => {
                    this.$router.push('/student/mytopic')
                })
            },
            addTopic(TopicFrom){
                this.$refs[TopicFrom].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/topics/addtopic',this.TopicFrom).then(res=>{
                            this.$message.success(res.data.msg)
                            this.$router.push("/student/mytopic")
                        })
                    }else {
                        this.$message.error("请正确填写信息")
                    }
                })
            },
            getMyTopic() {
                this.$axios.get(`/topics/getstudenttopic?studentid=${this.$store.state.userid}`).then(res => {
                    if (res.data.data !== null) {
                        this.control = 1
                    } else {
                        this.control = 2
                        this.getAllMyTeacherTopics()
                    }
                })
            },
            check() {
                this.$axios.get(`/students/getstudent?userid=${this.$store.state.userid}`).then(res => {
                    if (res.data.data.teacherid === '') {
                        this.control = 0
                    } else {
                        this.getMyTopic()
                    }
                })
            },
        },
        created() {
            this.check()
        }
    }
</script>

<style scoped>
    .el-row {
        height: 50%;
        /*background-color: #D3DCE6;*/
    }

    .el-col {
        background-color: #dde6f1;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 10px 50px 0px 30px;
    }

</style>