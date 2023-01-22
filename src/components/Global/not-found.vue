<template>
    <div class="please-search">
        <span class="icon">
            <i class="fas fa-box-full"></i>
        </span>
        <div>
            <h3> {{ text }} </h3>
        </div>
    </div>
</template>
<script>
export default {
    props: ["type", "text"],
    // props: {
    //   show: {
    //     type: Boolean,
    //     required: true,
    //   },
    // },
};
</script>
