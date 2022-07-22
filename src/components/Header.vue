<template>
    <div>
        <strong>论文管理系统</strong>
        <div class="header-avator">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <el-dropdown>
                  <span class="el-dropdown-link">
                    {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="chagePassword(changepasswordurl)">修改密码</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{

            }
        },
        computed:{
            username(){
                return this.$store.state.username
            },
        },
        props:{
            userinfourl:'',
            changepasswordurl:''
        },

        methods:{
            getUserInfo(userinfourl){
                this.$axios.get(`${userinfourl}?userid=${this.$store.state.userid}`).then(res=>{
                    //将获取到的用户姓名放入Vuex中，显示使用到的用户姓名会从Vuex中获取，用户修改信息之后也会修改Vuex中的值，此组件中的姓名信息会随之改变
                    this.$store.commit('SET_USERNAME',res.data.data.username)
                })
            },
            chagePassword(changepasswordurl){
                this.$router.push(changepasswordurl)
            },
            logout(){
                localStorage.clear()
                sessionStorage.clear()
                this.$router.push('/')
            }
        },
        beforeMount() {
            this.getUserInfo(this.userinfourl)
        }
    }
</script>

<style scoped>
    .header-avator {

        float: right;
        width: 130px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: white;
    }
</style>