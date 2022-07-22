<template>
    <div>
        <div v-show="control === 0">
            <el-empty description="请先选择课题"></el-empty>
        </div>


        <div v-show="control === 1">
            <el-descriptions title="我的论文">
                <el-button style="margin-right: 50px" type="primary" slot="extra" @click="dialogUploadVisible = true">
                    上传论文
                </el-button>
            </el-descriptions>
            <el-table :data="mypapers" style="width: 100%" border>
                <el-table-column type="index" label="序号" width="200"></el-table-column>
                <el-table-column prop="filename" label="名称" width="300"></el-table-column>
                <el-table-column label="上传时间" width="300">
                    <template slot-scope="paper">
                        {{dateFormat(paper.row.date)}}
                    </template>
                </el-table-column>
                <el-table-column label="教师评价" width="300">
                    <template slot-scope="paper">
                        {{(paper.row.teachermsg === null) ? "未阅评":paper.row.teachermsg }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="paper">
                        <el-button type="danger" size="mini" @click="deletePaper(paper.row)">删除</el-button>
                        <el-button type="success" size="mini" @click="downloadPaper(paper.row)">下载</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--        上传论文弹框-->
<!--            localhost:8081-->
            <el-dialog title="上传论文" :visible.sync="dialogUploadVisible" width="37%">
                <el-upload
                        ref="upload"
                        class="upload-demo"
                        drag
                        action="http://localhost:8081/papers/uploadpaper"
                        :before-upload="beforeUpload"
                        :on-success="onSuccess"
                        :auto-upload="false"
                        :data="userinfo">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
                <el-button style="margin-top: 10px" size="small" type="success" @click="uploadPaper">上传到服务器</el-button>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    var moment = require('moment');
    export default {
        name: "MyPapers",
        data() {
            return {
                control: 0,
                mypapers: [],
                dialogUploadVisible: false,
                userinfo: {
                    studentid: this.$store.state.userid,
                    teacherid: this.$store.state.teacherid
                }
            }
        },
        computed: {},
        methods: {
            getMyPapers() {
                this.$axios.get(`/papers/getmypapers?studentid=${this.$store.state.userid}`).then(res => {
                    if (res.data.data !== null) {
                        this.mypapers = res.data.data
                    }
                })
            },
            deletePaper(paper) {
                this.$axios.post('/papers/deletepaper', paper).then(res => {
                    this.mypapers = [];
                    this.getMyPapers();
                })
            },
            beforeUpload(file){
                const size = file.size/1024/1024 < 20
                if (!size) {
                    this.$message.error('上传文件大小不能超过 20MB!')
                }
                return size
            },
            uploadPaper() {
                this.$refs.upload.submit();
            },
            onSuccess(){
                this.dialogUploadVisible = false;
                this.getMyPapers();
                this.$refs.upload.clearFiles();
            },
            downloadPaper(paper) {
                this.$axios.get(`/papers/downloadpaper?paperid=${paper.paperid}`, {responseType: 'blob'}).then(res => {
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                    let a = document.createElement('a')
                    a.setAttribute("download", paper.filename)
                    a.href = url
                    a.click();
                });
            },
            check() {
                this.$axios.get(`/topics/getstudenttopic?studentid=${this.$store.state.userid}`).then(res => {
                    if (res.data.data !== null && res.data.data.topicstatus === '已通过') {
                        this.getMyPapers()
                        this.control = 1
                    }
                })
            },
            // 格式化时间
            dateFormat(date){
                return moment(date).format("YYYY年M月D日HH:MM:SS")
            }

        },
        created() {
            this.check()
        }
    }
</script>

<style scoped>
    .el-dialog {
        width: 43%;
    }


</style>