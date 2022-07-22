<template>
    <div>
        <el-descriptions title="学生自拟课题"></el-descriptions>
        <el-table :data="unreviewedtopics" style="width: 100%">
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


            <el-table-column width="150px">
                <template slot-scope="topic">
                    <el-button type="success" size="mini" @click="checkTopic(topic.row,'已通过')">通过</el-button>
                    <el-button type="danger" size="mini" @click="checkTopic(topic.row,'未通过')">驳回</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "CheckTopic",
        data() {
            return {
                unreviewedtopics: [],
            }
        },
        methods: {
            getUnreviewedTopics() {
                this.$axios.get(`/topics/getconfirmedtopicsandstudents?teacherid=${this.$store.state.userid}&topicstatus=未审核`).then(res => {
                    if (res.data.data !== null) {
                        this.unreviewedtopics = res.data.data
                    }
                })
            },
            checkTopic(topic,topicstatus){
                this.$axios.post('/topics/updatatopic',{topictitle:topic.topictitle,topicstatus:topicstatus}).then(res=>{
                    this.getUnreviewedTopics()
                })
            }
        },
        created() {
            this.getUnreviewedTopics()
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
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