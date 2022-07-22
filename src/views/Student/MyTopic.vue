<template>
    <div>
        <el-descriptions title="我的课题"></el-descriptions>
        <div v-show="control === 0">
            <el-empty description="请先等待老师选择"></el-empty>
        </div>
        <div v-show="control === 1">
            <el-empty description="您还未选择课题"></el-empty>
        </div>
        <div v-show="control === 2">
            <el-table :data="mytopic" style="width: 100%">
                <el-table-column prop="topictitle" label="课题名" width="300"></el-table-column>
                <el-table-column prop="topicdepict" label="课题描述" width="350"></el-table-column>
                <el-table-column prop="topictype" label="课题类型" width="300"></el-table-column>
                <el-table-column prop="topicstatus" label="课题状态" width="200"></el-table-column>

                <el-table-column>
                    <template slot-scope="mytopic" >
                        <el-button type="danger" size="mini" @click="deleteTopic(mytopic.row)" v-show="status === 1">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div  v-show="this.status === 1" style="font-size: 13px; color: #ff0000; text-align: left">注意：审核未通过的课题需要删除后才能重新选择或自拟</div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "MyTopic",
        data() {
            return {
                mytopic:[],
                control: 0,
                status:0
            }
        },
        methods: {
            getMyTopic() {
                this.$axios.get(`/topics/getstudenttopic?studentid=${this.$store.state.userid}`).then(res => {
                    if (res.data.data === null) {
                        this.control = 1
                    } else {
                        this.control = 2
                        this.mytopic.push(res.data.data)
                        if (res.data.data.topicstatus === '未通过'){
                            this.status = 1
                        }
                    }
                })
            },
            check(){
                this.$axios.get(`/students/getstudent?userid=${this.$store.state.userid}`).then(res=>{
                    if (res.data.data.teacherid === ''){
                        this.control = 0
                    }else {
                        this.getMyTopic()
                    }
                })
            },
            deleteTopic(topic) {
                this.$axios.post('/topics/deletetopic', {topictitle: topic.topictitle}).then(res => {
                    this.getMyTopic()
                    this.$message.success(res.data.msg)
                })
            },
        },
        created() {
            this.check()
        }
    }
</script>

<style scoped>

</style>