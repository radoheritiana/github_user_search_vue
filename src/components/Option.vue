<script setup>

const props = defineProps({
    countries: {
        type: Array,
        required: true
    }
})

</script>

<template>
    <option v-for="c, key in countries" :key="key" :value="c.code">{{ c.name }}</option>
</template>