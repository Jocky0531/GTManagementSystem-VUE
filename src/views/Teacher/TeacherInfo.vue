<template>

    <el-row type="flex" class="row-bg">
        <el-col :span="20">
            <el-descriptions class="margin-top" title="个人信息" :column="3" border :labelStyle="{width:'40px'}" :contentStyle="{width:'60px'}">
                <template slot="extra">
                    <el-button type="primary" size="small" @click="goChangeInfo">编辑</el-button>
                </template>
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

        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "TeacherInfo",
        data() {
            return {
                teacherinfo: {
                    teacherid: '',
                    username: '',
                    teachertitle: '',
                    teachertelephone: '',
                    address: ''
                },

            }
        },
        methods: {
            getUserInfo() {
                this.$axios.get(`/teachers/getteacher?userid=${this.$store.state.userid}`).then(res => {
                    this.teacherinfo = res.data.data
                    // 将获取到的用户姓名存入Vuex中，便于修改信息之后头部的用户姓名会随之改变
                    this.$store.commit('SET_USERNAME',res.data.data.username)
                })
            },
            goChangeInfo() {
                this.$router.push('/teacher/teacherchangeinfo')
            }
        },
        mounted() {
            this.getUserInfo()
        }

    }
</script>

<style scoped>
    .el-descriptions >>> th {
        background: #f7f7f7;
        color: #666666;
    }
</style>