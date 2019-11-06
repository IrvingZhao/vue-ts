<template>
    <xlb-base-page>
        <template v-slot:title>测试标题</template>
        <template v-slot:searchForm>
            <input >
            <button>查询</button>
        </template>
        <template v-slot:tools>
            <button>操作A</button>
            <button>操作B</button>
        </template>
        <template v-slot:content>
            <p>内容区</p>
        </template>
        <template v-slot:footer>
            底部区域
        </template>
    </xlb-base-page>
</template>

<script>
    export default {
        name: "BasePage",
        data() {
            return {
                form: {
                    text: ""
                }
            }
        }
    }
</script>

<style scoped>

</style>
