<template>
    <i :class="className" :style="style"></i>
</template>

<script>
    export default {
        name: "WtIcon",
        props: [ 'name' , 'size', 'color' ],
        computed: {
            className() {
                return 'wt-icon wt-icon-' + this.name;
            },

            style() {
                let size = this.size || '14px';
                let color = this.color || '#333333';
                return 'font-size: ' + size + '; color: ' + color + ';' ;
            }
        }
    }
</script>

<style scoped>

</style>