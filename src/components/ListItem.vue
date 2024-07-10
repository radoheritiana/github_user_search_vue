<script setup lang="ts">

import type { PropType } from 'vue';
import type { UserType } from '../types/UserType.ts';
import { capitalizeFirstLetter } from '../utils';

const props = defineProps({
    user: { type: Object as PropType<UserType>, required: true },
    country: { type: String, required: true }
});

</script>

<template>
    <div class="user-desc">
        <img :src="user.avatar_url" :alt="user.login" class="avatar" />
        <div class="list-text">
            <span class="username">{{ user.login }}</span>
            <span class="country">{{ capitalizeFirstLetter(country) }}</span>
        </div>
    </div>
    <a :href="user.url" class="btn-see-profile">See profile</a>
</template>