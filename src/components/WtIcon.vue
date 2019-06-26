<template>
    <i :class="className" :style="style"></i>
</template>

<script>
    import main from '../configs/main';
    export default {
        name: "WtIcon",
        props: [ 'name' , 'size', 'color' ],
        computed: {
            className() {
                return 'wt-icon ' + this.name;
            },

            style() {
                let size = this.size || ( main.icon.defaultSize || '12px' );
                let color = this.color || '#333333';
                return 'font-size: ' + size + '; color: ' + color + ';' ;
            }
        }
    }
</script>

<style scoped>

</style>