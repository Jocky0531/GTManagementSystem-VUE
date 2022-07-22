import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";

import AdminChangePassword from "@/views/Admin/AdminChangePassword";
import TeachersManagement from "@/views/Admin/TeachersManagement";
import AdminStudentsManagement from "@/views/Admin/StudentsManagement";
import AddTeacher from "@/views/Admin/AddTeacher";
import AddStudent from "@/views/Admin/AddStudent";

import TeacherInfo from "@/views/Teacher/TeacherInfo";
import TeacherStudentsManagement from "@/views/Teacher/StudentsManagement";
import Topics from "@/views/Teacher/Topics";
import CheckTopic from "@/views/Teacher/CheckTopic";
import TeacherChangePassword from "@/views/Teacher/TeacherChangePassword";
import ChangeTeacherInfo from "@/views/Teacher/ChangeTeacherInfo";
import AddTopic from "@/views/Teacher/AddTopic";
import MyStudentsPapers from "@/views/Teacher/MyStudentsPapers";

import StudentInfo from "@/views/Student/StudentInfo";
import StudentChangePassword from "@/views/Student/StudentChangePassword";
import ChangeStudentInfo from "@/views/Student/ChangeStudentInfo";
import MyTopic from "@/views/Student/MyTopic";
import ChooseTopic from "@/views/Student/ChooseTopic";
import MyPapers from "@/views/Student/MyPapers";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },

    {
        path: '/adminhome',
        name: 'AdminHome',
        component: () => import('../views/AdminHome.vue'),
        meta: {
            role: 'admin',
            title: '管理员用户',
            keepAlive: true, // 需要被缓存
        },
        children: [
            {
                path: '/admin/adminchangepassword',
                name: AdminChangePassword,
                component: AdminChangePassword,
                meta: {
                    role: 'admin',
                    title: '管理员用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/admin/teachersmanagement',
                name: TeachersManagement,
                component: TeachersManagement,
                meta: {
                    role: 'admin',
                    title: '管理员用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/admin/studentsmanagement',
                name: AdminStudentsManagement,
                component: AdminStudentsManagement,
                meta: {
                    role: 'admin',
                    title: '管理员用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/admin/addteacher',
                name: AddTeacher,
                component: AddTeacher,
                meta: {
                    role: 'admin',
                    title: '管理员用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/admin/addstudent',
                name: AddStudent,
                component: AddStudent,
                meta: {
                    role: 'admin',
                    title: '管理员用户',
                    keepAlive: true, // 需要被缓存
                },
            },
        ]
    },

    {
        path: '/teacherhome',
        name: 'TeacherHome',
        component: () => import('../views/TeacherHome.vue'),
        meta: {
            role:'teacher',
            title: '教师用户',
            keepAlive: true, // 需要被缓存
        },
        children: [
            {
                path: '/teacher/teacherinfo',
                name: 'TeacherInfo',
                component: TeacherInfo,
                meta: {
                    role:'teacher',
                    title: '教师用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/teacher/teacherchangeinfo',
                name: 'ChangeTeacherInfo',
                component:ChangeTeacherInfo,
                meta: {
                    role:'teacher',
                    title: '教师用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/teacher/teacherchangepassword',
                name: 'TeacherChangePassword',
                component:TeacherChangePassword,
                meta: {
                    role:'teacher',
                    title: '教师用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/teacher/studentsmanagement',
                name: 'TeacherStudentsManagement',
                component: TeacherStudentsManagement,
                meta: {
                    role:'teacher',
                    title: '教师用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/teacher/topics',
                name: 'Topics',
                component: Topics,
                meta: {
                    role:'teacher',
                    title: '教师用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/teacher/checktopic',
                name: 'CheckTopic',
                component: CheckTopic,
                meta: {
                    role:'teacher',
                    itle: '教师用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/teacher/addtopic',
                name: 'AddTopic',
                component: AddTopic,
                meta: {
                    role:'teacher',
                    title: '教师用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/teacher/mystudentspapers',
                name: 'MyStudentsPapers',
                component: MyStudentsPapers,
                meta: {
                    role:'teacher',
                    title: '教师用户',
                    keepAlive: true, // 需要被缓存
                },
            },

        ]
    },

    {
        path: '/studenthome',
        name: 'StudentHome',
        component: () => import('../views/StudentHome.vue'),
        meta: {
            role: 'student',
            title: '学生用户',
            keepAlive: true, // 需要被缓存
        },
        children: [
            {
                path: '/student/studetinfo',
                name: 'StudentInfo',
                component: StudentInfo,
                meta: {
                    role: 'student',
                    title: '学生用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/student/studentchangepassword',
                name: 'StudentChangePassword',
                component: StudentChangePassword,
                meta: {
                    role: 'student',
                    title: '学生用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/student/studentchangeinfo',
                name: 'ChangeStudentInfo',
                component: ChangeStudentInfo,
                meta: {
                    role: 'student',
                    title: '学生用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/student/mytopic',
                name: 'MyTopic',
                component: MyTopic,
                meta: {
                    role: 'student',
                    title: '学生用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/student/choosetopic',
                name: 'ChooseTopic',
                component: ChooseTopic,
                meta: {
                    role: 'student',
                    title: '学生用户',
                    keepAlive: true, // 需要被缓存
                },
            },
            {
                path: '/student/mypapers',
                name: 'MyPapers',
                component: MyPapers,
                meta: {
                    role: 'student',
                    title: '学生用户',
                    keepAlive: true, // 需要被缓存
                },
            },

        ]
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
    if (to.meta.role === 'admin'){
        if (sessionStorage.role === '管理员'){
            next()
        }
    }else if (to.meta.role === 'teacher'){
        if (sessionStorage.role === '教师'){
            next()
        }
    }else if (to.meta.role === 'student'){
        if (sessionStorage.role === '学生'){
            next()
        }
    }else {
        next()
    }

})

export default router
