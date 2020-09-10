<template>
    <div class="login">
        <div class="login-container">

            <div class="slogan">
                WeiTianFrame
            </div>

            <div class="form">
                <el-input
                        prefix-icon="el-icon-user"
                        v-model="model.data.username"
                        :placeholder="model.getLabel('username')"
                ></el-input>

                <div class="error-message">
                    <span v-if="Array.isArray( model.errors['username'] )">{{model.errors['username'].join('，')}}</span>
                </div>

                <el-input
                        prefix-icon="el-icon-lock"
                        v-model="model.data.password"
                        :show-password="true"
                        type="password"
                        :placeholder="model.getLabel('password')"
                ></el-input>

                <div class="error-message">
                    <span v-if="Array.isArray( model.errors['password'] )">{{model.errors['password'].join('，')}}</span>
                </div>

                <el-checkbox v-model="model.data.remember_me">记住密码</el-checkbox>

                <div class="error-message"></div>

                <el-button
                        type="primary"
                        class="width-100"
                        @click="onSubmit"
                >登录</el-button>
            </div>


        </div>

        <div class="main-text">
            ICP备案
        </div>
    </div>
</template>

<script>
    import LoginForm from "../../models/formModel/LoginForm";

    export default {
        name: "login",
        data() {
            return {
                model: new LoginForm({
                    username: '',
                    password: '',
                    remember_me: false,
                }),
            };
        },
        methods: {
            onSubmit() {
                this.$store.dispatch('showLoading', {
                    run: ( closeHandle ) => {
                        if( !this.model.validate() ) {
                            closeHandle();
                            return ;
                        }

                        this.model.login(( {type} ) => {
                            closeHandle();
                            if( type === 'success' ) {
                                this.$store.dispatch('showTip', {
                                    text: '登录成功，' + this.model.getValue('username'),
                                    type: 'success'
                                });
                                this.$router.push( { path: '/' } );
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .slogan {
        width: 100%;
        overflow: hidden;
        margin-bottom: 80px;
        text-align: center;
        font-size: 30px;
    }

    .main-text {
        color: #FFF;
        text-align: center;
        position: absolute;
        bottom: 15px;
        width: 100%;
        font-size: 12px;
        z-index: 15;
    }

    .login-container {
        position: absolute;
        z-index: 15;
        max-width: 480px;
        width: 80%;
        transform: translate(-50%, -60%);
        left: 50%;
        top: 50%;
        min-width: 320px;
    }

    .error-message {
        font-size: 12px;
        color: #fff;
        height: 28px;
        line-height: 28px;
    }

    .form {
        width: 60%;
        margin: 0 auto;
        min-width: 320px;
    }
</style>
