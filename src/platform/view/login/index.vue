<template>
    <el-form ref="form" :model="form" :rules="formRules" class="login-form-area">
        <div class="main">
            <div class="login-form">
                <div class="form-title">欢迎使用修乐巴</div>
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名/手机号" v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="vercode">
                    <div class="vercode">
                        <el-input width="100" placeholder="请输入验证码" v-model="form.verificationCode"
                                  @keypress.enter="login"></el-input>
                        <div class="vercode-area" @click="updateVerCode">
                            <img :src="verCodeData"/>
                        </div>
                        <el-button type="text" @click="updateVerCode">看不清楚？</el-button>
                    </div>
                </el-form-item>
                <div class="operator-area">
                    <el-button type="text">忘记密码？</el-button>
                </div>
                <div class="login-button-area">
                    <el-button type="primary" class="login-button" @click="login">登录</el-button>
                </div>
            </div>
        </div>
    </el-form>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from "vuex-class";
    import {ElForm} from "element-ui/types/form";

    const UserStore = namespace("base_user");

    @Component<Login>({
        mounted() {
            this.updateVerCode();
        }
    })
    export default class Login extends Vue {
        public $refs!: { form: ElForm };
        private form = {
            userName: "",
            password: "",
            verificationCode: "",
        };

        private formRules = {
            userName: {required: true, message: "请输入用户名/手机号"},
            password: {required: true, message: "请输入密码"},
            verificationCode: {required: true, message: "请输入验证码"}
        };

        private verCodeData: string | ArrayBuffer | null = "";

        @UserStore.Mutation("userData")
        // @Mutation("UserStore/userData")
        private commitUserInfo: any;

        private updateVerCode(): void {
            this.$axios.get("getVerificationCode", {responseType: "blob"}).then((data: any) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        this.verCodeData = e.target.result;
                    }
                };
                reader.readAsDataURL(data);
            });
        }

        private login(): void {
            this.$refs.form.validate().then(() => {
                this.$axios.post("login", {...this.form}).then(({code, data}: any) => {
                    if (code === "000000") {
                        this.commitUserInfo(data);
                        this.$router.push("/"); // TODO 根据权限 跳转相关页面
                    } else {
                        this.updateVerCode();
                    }
                });
            });
        }

    }
</script>

<style scoped lang="scss">
    .login-form-area {
        width: 100%;
        height: 100%;
    }

    .main {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
    }

    .login-form {
        flex: 0 0 500px;

        .form-title {
            color: #fff;
            font-size: 40px;
            line-height: 56px;
            margin-bottom: 26px;
            text-align: center;
        }

        .form-item-area {
            margin: 10px 0;
        }

        .vercode {
            display: flex;
            justify-content: space-between;

            .el-input {
                flex: 0 0 200px;
            }

            .vercode-area {
                flex: 0 0 160px;
                height: 40px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .operator-area {
            text-align: right;
        }

        .login-button-area {
            text-align: center;

            .login-button {
                width: 200px;
            }
        }

    }
</style>
