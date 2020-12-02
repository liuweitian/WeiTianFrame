<template>
    <div class="wt-loading-bar" v-show="show">
        <div class="wt-loading-inner"></div>
    </div>
</template>

<script>
    export default {
        name: "WtLoadingBar",
        props: {
            show: {
                type: Boolean,
                default: false,
            }
        }
    }
</script>

<style scoped>
    .wt-loading-bar {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 4px;
        background-color: rgba(84, 172, 255, .6);
    }

    .wt-loading-inner {
        width: 60%;
        height: 100%;
        background-color: #54acff;
        position: absolute;
        left: -60%;
        animation: loading infinite linear 1.5s;
    }

    @keyframes loading {
        0% {
            left: -60%;
        }

        75% {
            left: 120%;
        }

        100% {
            left: 120%;
        }
    }
</style>