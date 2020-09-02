<template>
    <div class="site-login">
        <div>
            <input v-model="model.data.username" type="text"></input>
        </div>
        <div>
            <input v-model="model.data.password" type="password"></input>
        </div>

        <button @click="login">登录</button>
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
                }),
            };
        },
        methods: {
            login() {
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
</style>
