<template>
    <i :class="className" :style="style"></i>
</template>

<script>
    export default {
        name: "WtIcon",
        props: {
            styleData: {
                type: Object,
                default: () => {
                    return {};
                }
            },

            name: {
                type: String,
                required: true,
            }
        },
        computed: {
            className() {
                return 'wt-icon ' + this.name;
            },

            style() {
                return Object.assign({
                    fontSize: 'inherit',
                    color: 'inherit'
                }, this.styleData);
            }
        }
    }
</script>

<style scoped>

</style>