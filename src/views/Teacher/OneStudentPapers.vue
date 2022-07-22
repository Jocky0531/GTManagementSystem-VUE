<template>
    <div>
<!--        <el-descriptions :title="this.studentid"></el-descriptions>-->
        <el-table :data="papers" style="width: 100%" >
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="filename" label="名称" width="300"></el-table-column>
            <el-table-column label="上传时间" width="300">
                <template slot-scope="paper">
                    {{dateFormat(paper.row.date)}}
                </template>
            </el-table-column>
            <el-table-column label="状态" width="200">
                <template slot-scope="paper">
                    {{(paper.row.teachermsg === null) ? "未阅评":"已阅评" }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="paper">
                    <el-button type="primary" size="mini" @click="commentsPaper(paper.row)">评价</el-button>
                    <el-button type="success" size="mini" @click="downloadPaper(paper.row)">下载</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="修改建议" :visible.sync="control" width="37%">
            <el-form label-position="right" label-width="40px" :model="commentspaperfrom" ref="TopicFrom">

                <el-form-item label="建议">
                    <el-input type="textarea" :rows="15" v-model="commentspaperfrom.teachermsg"></el-input>
                </el-form-item>
                <el-form-item style="padding-right: 50px;">
                    <el-button type="primary" @click="updataPaper">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    var moment = require('moment');

    export default {
        name: "OneStudentPapers",
        data(){
            return{
                papers:[],
                control:false,
                commentspaperfrom:{
                    paperid:0,
                    teachermsg:''
                }
            }
        },
        props:{
            studentid:""
        },
        methods:{
            getPapaer(){
                this.$axios.get(`/papers/getmypapers?studentid=${this.studentid}`).then(res=>{
                    if (res.data.data!==null){
                        this.papers = res.data.data
                    }
                })
            },
            downloadPaper(paper){
                this.$axios.get(`/papers/downloadpaper?paperid=${paper.paperid}`,{responseType:"blob"}).then(res=>{
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                    let a = document.createElement('a')
                    a.setAttribute("download",paper.filename)
                    a.href = url
                    a.click();
                });
            },
            commentsPaper(paper){
                this.control = true
                this.commentspaperfrom.paperid = paper.paperid
            },
            updataPaper(){
                this.$axios.post('/papers/updatapaper',this.commentspaperfrom).then(res=>{
                    this.getPapaer()
                    setTimeout(()=>{
                        this.$message.success(res.data.data.msg)
                        this.control = false
                    },500)
                })
            },
            // 格式化时间
            dateFormat(date){
                return moment(date).format("YYYY年M月D日HH:MM:SS")
            }

        },
        created() {
            this.getPapaer()
        }
    }
</script>

<style scoped>
    .el-table {
        margin-bottom: 20px;
    }

</style>