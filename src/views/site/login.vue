<template>
    <div class="site-login">
        <h1>登录</h1>

        <input type="text" v-model="loginForm.username"/>
        <input type="text" v-model="loginForm.password"/>
        <button @click="login">登录</button>
    </div>
</template>

<script>
    import BaseModel from "../../cores/model/BaseModel";

    export default {
        name: "login",
        methods: {
            login() {
                if( this.$store.state.user.validate( this.loginForm ) ) {
                    BaseModel.setTip('登录成功');
                } else {
                    console.log( this.$store.state.user.errors );
                }
            }
        },
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                }
            };
        }
    }
</script>

<style scoped>
</style>