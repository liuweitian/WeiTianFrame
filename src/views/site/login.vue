<template>
    <div class="site-login">
        <div>
            <input v-model="form.username" type="text"></input>
        </div>
        <div>
            <input v-model="form.password" type="password"></input>
        </div>

        <button @click="login">登录</button>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            };
        },
        methods: {
            login() {
                this.$store.state.user.updateData( this.form );

                this.$store.dispatch('showLoading', {
                    run: ( closeHandle ) => {
                        this.$store.state.user.login(( {type, data} ) => {
                            closeHandle();

                            if( type !== 'success' ) {
                                this.$store.dispatch('showTip', {
                                    text: data.message,
                                    type: 'error'
                                });
                                return false;
                            }

                            this.$store.dispatch('showTip', {
                                text: '欢迎回来，' + this.$store.state.user.getValue('username'),
                                type: 'success'
                            });

                            this.$router.push( { path: '/' } );
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>
