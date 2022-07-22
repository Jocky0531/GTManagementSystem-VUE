<template>
    <div>
        <div>
            <el-descriptions>
                <el-button type="primary" icon="el-icon-circle-plus" slot="title" @click="addTopic">发布新课题</el-button>
            </el-descriptions>
            <!--            <el-descriptions title="我发布的课题">-->
            <!--&lt;!&ndash;                <el-input v-model="studentid" placeholder="输入学号查找学生" slot="extra" @change="selectStudent">&ndash;&gt;-->

            <!--&lt;!&ndash;                </el-input>&ndash;&gt;-->
            <!--            </el-descriptions>-->
            <el-tabs type="card" value="first">
                <el-tab-pane label="我发布的课题" name="first">
                    <el-table :data="mytopics" style="width: 100%">
                        <el-table-column prop="topictitle" label="课题名" width="350"></el-table-column>
                        <el-table-column prop="topicdepict" label="课题描述" width="750"></el-table-column>
                        <!--                <el-table-column prop="username" label="姓名" width="350"></el-table-column>-->

                        <el-table-column>
                            <template slot-scope="topic">
                                <el-button type="danger" size="mini" @click="deleteTopic(topic.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="学生已选课题" name="second">
                    <el-table :data="confirmedtopics" style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="课题名:">
                                        <span>{{ props.row.topictitle }}</span>
                                    </el-form-item>
                                    <el-form-item label="课题描述:">
                                        <span>{{ props.row.topicdepict }}</span>
                                    </el-form-item>
                                    <el-form-item label="课题类型:">
                                        <span>{{ props.row.topictype }}</span>
                                    </el-form-item>
                                    <el-form-item label="学生学号:">
                                        <span>{{ props.row.studentid }}</span>
                                    </el-form-item>
                                    <el-form-item label="学生姓名:">
                                        <span>{{ props.row.username }}</span>
                                    </el-form-item>
                                    <el-form-item label="联系方式:">
                                        <span>{{ props.row.studenttelephone }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column prop="topictitle" label="课题名" width="350"></el-table-column>
                        <el-table-column prop="studentid" label="学号" width="350"></el-table-column>
                        <el-table-column prop="username" label="姓名" width="350"></el-table-column>


                        <el-table-column>
                            <template slot-scope="topic">
                                <el-button type="danger" size="mini" @click="deleteTopic(topic.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Topics",
        data() {
            return {
                mytopics: [],
                confirmedtopics: []
            }
        },
        methods: {
            getAllMyTopics() {
                this.$axios.get(`/topics/getteachertopics?teacherid=${this.$store.state.userid}`).then(res => {
                    this.mytopics = res.data.data
                })
            },
            getAllConfirmedTopics() {
                this.$axios.get(`/topics/getconfirmedtopicsandstudents?teacherid=${this.$store.state.userid}&topicstatus=已通过`).then(res => {
                    if (res.data.data !== null) {
                        this.confirmedtopics = res.data.data

                    }
                })
            },
            deleteTopic(topic) {
                this.$axios.post('/topics/deletetopic', {topictitle: topic.topictitle}).then(res => {
                    this.getAllMyTopics()
                    this.getAllConfirmedTopics()
                    this.$message.success(res.data.msg)
                })
            },
            addTopic() {
                this.$router.push("/teacher/addtopic")
            }
        },

        created() {
            this.getAllMyTopics()
            this.getAllConfirmedTopics()
        }
    }
</script>

<style scoped>

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #a4a4a4;
    }

    .demo-table-expand .el-form-item {
        border-radius: 5px;
        background-color: whitesmoke;
        padding-left: 100px;
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }

</style>