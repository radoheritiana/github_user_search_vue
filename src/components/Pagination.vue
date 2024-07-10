<script setup lang="ts">

import { defineEmits } from 'vue';

const props = defineProps<{
    onClickHandler: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    maxPagesShown: number;
    currentPage: number;
}>();

const emit = defineEmits(['update:currentPage']);

const triggerClick = (page: number) => {
    props.onClickHandler(page);
};

const handlePageChange = (newPage: number) => {
    emit('update:currentPage', newPage);
};

</script>

<template>
    <div class="center">
        <vue-awesome-paginate :total-items="props.totalItems" :items-per-page="props.itemsPerPage"
            :max-pages-shown="props.maxPagesShown" :modelValue="props.currentPage" @update:modelValue="handlePageChange"
            @click="triggerClick" />
    </div>
</template>


<style>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2em;
}

.pagination-container {
    display: flex;
    gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.paginate-buttons:hover {
    background-color: #e0e0e0;
    color: #000;
    border-color: #bbb;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: #fff;
    transition: background-color 0.3s, border-color 0.3s;
}

.active-page:hover {
    background-color: #2988c8;
}
</style>