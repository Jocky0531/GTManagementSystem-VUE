<template>
    <div>

        <el-descriptions title="按学生分类">
            <el-input v-model="studentid" placeholder="输入学号查找学生" slot="extra" @change="selectStudent"></el-input>
        </el-descriptions>


        <el-tabs tab-position="left" style="height:100%;">
            <el-tab-pane v-for="(student,index) in mystudents" :key="index"
                         :label="student.studentid+'('+student.username+')'">
                <OneStudentPapers :studentid="student.studentid"></OneStudentPapers>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import OneStudentPapers from "@/views/Teacher/OneStudentPapers";

    export default {
        name: "MyStudentsPapers",
        components: {OneStudentPapers},
        data() {
            return {
                mystudents: [],
                studentid: '',
            }
        },
        methods: {
            getMyStudents() {
                this.$axios.get(`/students/getstudentsbyteacherid?userid=${this.$store.state.userid}`).then(res => {
                    this.mystudents = res.data.data
                })
            },
            selectStudent() {
                this.mystudents = [];
                if (this.studentid === '') {
                    this.getMyStudents();
                } else {
                    this.$axios.get(`/students/getstudentbyid?studentid=${this.studentid}`).then(res => {
                        if (res.data.data !== null) {
                            this.mystudents.push(res.data.data)
                        }
                    })
                }
            }
        },
        component: {
            OneStudentPapers
        },
        created() {
            this.getMyStudents()
        }
    }
</script>

<style scoped>
    /*.el-collapse >>> .el-collapse-item__header{*/
    /*    font-size: 16px;*/
    /*    color: #858585;*/
    /*}*/


</style>