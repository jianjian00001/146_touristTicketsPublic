<template>
    <span>
        <template v-if="value">
            <a href="javascript:;" @click="downloadFile($formatImageSrc(value),filename ? filename : basename(value))"> 下载 </a>
        </template>
        <template v-else> - </template>
    </span>
</template>
<style type="text/scss" lang="scss"></style>
<script>
    import setting from "@/setting";
    import axios from "axios";
    const path = require("path");

    export default {
        name: "e-file-list",
        data() {
            return {
                setting,
                path,
            };
        },
        props: {
            value: String,
            filename: String,
        },
        watch: {},
        computed: {},
        methods: {
            downloadFile(url, label) {
                axios
                    .get(url, { responseType: "blob" })
                    .then((response) => {
                        const blob = new Blob([response.data]);
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = label;
                        link.click();
                        URL.revokeObjectURL(link.href);
                    })
                    .catch(console.error);
            },
            basename: path.basename,
        },
        created() {},
        mounted() {},
        destroyed() {},
    };
</script>
