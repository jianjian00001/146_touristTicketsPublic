<template>
    <span class="e-select-view"> {{ content }} </span>
</template>
<style type="text/scss" lang="scss"></style>
<script>
    import api from "@/api";
    import { inArray, isArray } from "@/utils/extend";

    export default {
        name: "e-select-view",
        data() {
            return {
                content: "",
            };
        },
        props: {
            value: [String, Number],
            module: {
                type: String,
                required: true,
            },
            select: {
                type: [String, Number],
                required: true,
            },
            show: {
                type: [String, Number],
                required: true,
            },
        },
        watch: {
            value() {
                this.getValue();
            },
        },
        computed: {},
        methods: {
            getValue() {
                this.content = "";
                if (this.value) {
                    var vals = ("" + this.value).split(",").filter((s) => s);

                    this.$store.dispatch(this.module + "/selectAll").then((lists) => {
                        var result = [];
                        for (var ci of lists) {
                            if (inArray("" + ci[this.select], vals)) {
                                result.push(ci[this.show]);
                            }
                        }
                        this.content = result.join(",");
                    });
                }
            },
        },
        created() {
            this.getValue();
        },
        mounted() {},
        destroyed() {},
    };
</script>
