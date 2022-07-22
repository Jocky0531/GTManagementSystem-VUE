import request from "@/axios";

const Mock = require('mockjs')

let teacherInfo = {
    teacherid: '20201114107',
    password: '1234',
    username: '张娜',
    teachertitle: '无数据',
    teachertelephone: '无数据',
    address: '无数据'
}

let myStudents = []

let students = [
    {
        studentid: '20201114107',
        password:'',
        username: '蒋逸舟',
        department: '信息科学与工程学院',
        specialty: '计算机科学与技术',
        studentclass: '2004班',
        studenttelephone:'13505052323',
        teacherid: ''
    },
]

let topics = [{
    topictitle:'',
    topictype:'',
    topicdepict:'',
    topicstatus:'',
    studentid:'',
    teacherid:'',

}]

let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}


//处理登录请求，参数{userid，password}
Mock.mock('/login', 'post', (req) => {
    let {userid, password} = JSON.parse(req.body)
    if (userid === teacherInfo.teacherid && password === teacherInfo.password) {
        Result.code = 200
        Result.msg = ''
        return Result
    } else {
        Result.code = 400
        Result.msg = '账号或密码错误'
        return Result
    }
})


//更新密码 参数{password}
Mock.mock('/updatapassword', 'post', (req) => {
    let password = JSON.parse(req.body)
    teacherInfo.password = password.password
    Result.code = 200
    Result.msg = '修改成功'
    return Result
})

//获取用户信息
Mock.mock('/userinfo', 'get', () => {
    Result.code = 200
    Result.msg = ''
    Result.data = teacherInfo
    return Result
})

// 更新老师信息  参数{teachername，teachertilte，teachertelephone，address}
Mock.mock('/teacher/updatauserinfo', 'post', (option) => {
    let {name, teachertitle, telephone, address} = (JSON.parse(option.body))
    teacherInfo = JSON.parse(option.body)
    Result.code = 200
    Result.msg = ''
    // Result.data = Result.data.teacherInfo
    return Result

})


//获取当前老师指导的学生学生数据
Mock.mock('/teacher/getmystudents', 'get', () => {
    Result.code = 200
    Result.msg = ''
    Result.data = myStudents
    return Result
})
//获取没有绑定老师的学生
Mock.mock('/teacher/getstudents', 'get', () => {
    Result.code = 200
    Result.msg = ''
    Result.data = students
    return Result
})


//处理解绑学生  参数{studentid}
Mock.mock('/teacher/unbindstudent', 'post', (req) => {
    let studentid = JSON.parse(req.body)
    for (let i = 0; i<myStudents.length; i++){
        if(myStudents[i].studentid == studentid){
            students.push(myStudents[i])
            myStudents.splice(i,1)
            Result.code = 200
            Result.msg = '删除成功'
            return Result
        }else{
            Result.code = 600;
            Result.msg = '删除失败'
        }
    }
    return Result
})
//处理绑定学生
Mock.mock('/teacher/bindstudent', 'post', (req) => {
    let studentid = JSON.parse(req.body)
    for (let i = 0; i<students.length; i++){
        if(students[i].studentid == studentid){
            myStudents.push(students[i])
            students.splice(i,1)
            Result.code = 200
            Result.msg = '添加成功'
            return Result
        }else{
            Result.code = 200;
            Result.msg = ''
        }
    }

    return Result
})


//按照学号查找学生  参数{studentid}  如果是老师查询，则只返回他教的或者未绑定老师的学生
Mock.mock('/selectstudent', 'post', (req) => {
    let studentid = JSON.parse(req.body)
    for (let i = 0; i<students.length; i++){
        if(students[i].studentid == studentid){
            Result.data = students[i]
            Result.code = 200
            Result.msg = ''
            return Result
        }else{
            Result.code = 600;
            Result.msg = '查询失败'
        }
    }
    for (let i = 0; i<myStudents.length; i++){
        if(myStudents[i].studentid == studentid){
            Result.data = myStudents[i]
            Result.code = 200
            Result.msg = ''
            return Result
        }else{
            Result.code = 600;
            Result.msg = '查询失败'
        }
    }
    return Result
})