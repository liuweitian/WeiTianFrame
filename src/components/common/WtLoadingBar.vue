<template>
    <div class="wt-loading-bar" v-show="show"></div>
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
        background-color: #188AE2;
        border: 1px solid #188AE2;
        background-size: 3em 3em;
        background-image: linear-gradient(-45deg, transparent 0em,
        transparent 0.8em, #35b8e0 0.9em, #35b8e0 2.1em, transparent 2.1em,
        transparent 2.9em, #35b8e0 3.1em);
        animation: warning-animation 300ms infinite linear;
    }

    @-webkit-keyframes warning-animation {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 3em 0;
        }
    }
    @-moz-keyframes warning-animation {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 3em 0;
        }
    }
    @keyframes warning-animation {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 3em 0;
        }
    }

    .wt-loading-bar:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        background-image: linear-gradient(to bottom, #188AE2,
        rgba(24, 138, 226, 0.6) 15%, transparent 60%, #188AE2);
    }
</style>