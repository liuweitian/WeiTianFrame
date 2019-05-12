<template>
    <div class="site-login">
        <h1>登录</h1>
    </div>
</template>

<script>
    import BaseModel from "../../cores/model/BaseModel";
    import User from "../../models/User";
    import Models from "../../cores/model/Models";

    export default {
        name: "login",
        mounted() {
            let list = [
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
            ];

            let models = User.instanceList(list);

            console.log( models.getByAttribute('id', 3, false) );
        },
    }
</script>

<style scoped>
</style>