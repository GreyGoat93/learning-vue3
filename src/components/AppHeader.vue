<template>
    <header>
        <h1 class="h1">{{title}}</h1>
    </header>
</template>

<script>
export default {
    data(){
        return {
            title: "App"
        }
    }
}
</script>

<style scoped>
    header {
        width: 100%;
        padding: 1.5em;
        background-image: linear-gradient(172deg, #030, #AAA);
    }

    h1 {
        text-align: left;
        color: #fff;
    }
</style>