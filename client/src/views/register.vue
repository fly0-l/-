<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">米修在线后台管理系统</span>

        <div class="contentForm">
          <el-form
            :model="registerUser"
            :rules="rules"
            ref="registerForm"
            label-width="80px"
            class="registerForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="registerUser.name" placeholder="请输入用户名" />
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="registerUser.email" placeholder="请输入邮箱" />
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerUser.password"
                placeholder="请输入密码"
              />
            </el-form-item>

            <el-form-item label="确认密码" prop="password2">
              <el-input
                type="password"
                v-model="registerUser.password2"
                placeholder="请确认密码"
              />
            </el-form-item>

            <el-form-item label="用户身份" prop="identity">
              <el-select v-model="registerUser.identity" placeholder="选择身份">
                <el-option label="员工" value="employee" />
                <el-option label="管理员" value="manager" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="submit_btn" @click="SubmitForm">
                注册
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// ⚠️ 关键：一定要用你封装的 axios
import axios from "@/http";
import { ElMessage } from "element-plus";

const router = useRouter();
const registerForm = ref(null);

// 表单数据
const registerUser = reactive({
  name: "",
  email: "",
  password: "",
  password2: "",
  identity: ""
});

// 确认密码校验
const validatePass2 = (rule, value, callback) => {
  if (value !== registerUser.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

// 校验规则
const rules = {
  name: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 2, max: 30, message: "长度2-30个字符", trigger: "blur" }
  ],
  email: [
    { required: true, type: "email", message: "邮箱格式不正确", trigger: "blur" }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 30, message: "密码长度6-30位", trigger: "blur" }
  ],
  password2: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
    { validator: validatePass2, trigger: "blur" }
  ],
  identity: [
    { required: true, message: "请选择身份", trigger: "change" }
  ]
};

// 提交表单
const SubmitForm = () => {
  registerForm.value.validate(async (valid) => {
    if (!valid) return;

    try {
      // baseURL = http://localhost:3000/api/
      // 实际请求地址 = /api/users/register
      const res = await axios.post("users/register", registerUser);

      ElMessage.success("注册成功");
      router.push("/login");
    } catch (err) {
      // 错误已被拦截器处理，这里只兜底
      console.error(err);
    }
  });
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/image/background2.png) no-repeat center center;
  background-size: 100% 100%;
}

.form_container {
  width: 370px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}

.title {
  font-size: 26px;
  font-weight: bold;
  color: #fff;
}

.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 30px 40px 20px;
  border-radius: 5px;
  box-shadow: 5px 10px 10px #ccc;
}

.submit_btn {
  width: 100%;
}
</style>
