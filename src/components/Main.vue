<script setup lang="ts">

import { ref, onMounted, watch } from 'vue';
import axios from 'axios'
import type { CountryType } from '../types/CountryType.ts';
import type { UserType } from '../types/UserType.ts';
import { calculate_total_page } from '../utils';
import ListItem from './ListItem.vue';
import Option from './Option.vue';
import Pagination from '../components/Pagination.vue';


const country = ref("");
const username = ref("");
const loading = ref(false);
const countries = ref([] as CountryType[]);
const users = ref([] as UserType[]);
const is_loading_fetch = ref(false);
const is_country_selected = ref(false);
const total_count = ref(0);

const ITEMS_PER_PAGE = 10
const MAX_PAGES_SHOWN = 5

const onClickHandler = async (page: number) => {
    is_loading_fetch.value = true;
    await fetchUsers(page);
    is_loading_fetch.value = false;
};

const currentPage = ref(1);

onMounted(async () => {
    loading.value = true;
    await loadCountries();
    loading.value = false;
});

const loadCountries = async () => {

    const countryResponse = await axios.get('https://data.gouv.nc/api/records/1.0/search/?dataset=liste-des-pays-et-territoires-etrangers&q=&rows=10000&facet=cog');
    const array_pays = countryResponse.data.records;
    var array_sortned = [] as CountryType[];
    array_pays.map(obj => (
        array_sortned.push({ name: obj.fields.libcog, code: obj.fields.libcog.toLowerCase() })
    ));


    array_sortned.sort(function (a, b) {
        return a.code.localeCompare(b.code);
    });

    countries.value = array_sortned
}

const fetchUsers = async (page: number) => {
    currentPage.value = page;
    let url = '';
    if (country.value !== '') {
        url = 'https://api.github.com/search/users?q=' + encodeURI('location:' + country.value.toLowerCase() + '&sort=joined&per_page=' + ITEMS_PER_PAGE + '&page=' + page);
        if (username.value !== '') {
            url = 'https://api.github.com/search/users?q=' + encodeURI(username.value + '+in:login+location:' + country.value.toLowerCase() + '&sort=joined&per_page=' + ITEMS_PER_PAGE + '&page=' + page);
        }
    }

    const res = await axios.get(url);
    let data = res.data;
    let us = [] as UserType[];
    data.items.forEach((element: any) => {
        let user: UserType = {
            login: element.login,
            avatar_url: element.avatar_url,
            url: element.html_url
        }
        us.push(user);
    })
    users.value = us;
    let total = data.total_count;
    if (data.total_count > 1000) {
        total = 1000
    }
    total_count.value = total;
}

const handleKeyPress = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        is_loading_fetch.value = true;
        await fetchUsers(1);
        is_loading_fetch.value = false;
    }
}

watch(country, async (new_value, old_value) => {
    if (new_value) {
        is_country_selected.value = true;
        is_loading_fetch.value = true;
        await fetchUsers(1);
        is_loading_fetch.value = false;
    } else {
        is_country_selected.value = false;
    }
});

</script>

<template>
    <main>
        <h3 v-if="loading">Loading...</h3>
        <div v-else>
            <h3 class="site-title">Search Github User</h3>
            <div class="formulaire">
                <select v-model="country">
                    <option disabled value="">Country</option>
                    <Option :countries="countries" />
                </select>
                <input type="text" v-model="username" placeholder="Username..." @keypress="handleKeyPress"
                    :disabled="!is_country_selected" />
            </div>
            <div>
                <p v-if="is_loading_fetch">Loading user...</p>
                <div v-else>
                    <div v-if="users.length > 0">
                        <ul class="user-list">
                            <li v-for="user in users" class="list-item">
                                <ListItem :user="user" :country="country" />
                            </li>
                        </ul>
                        <div>
                            <Pagination :currentPage="currentPage" :onClickHandler="onClickHandler"
                                :itemsPerPage="ITEMS_PER_PAGE" :maxPagesShown="MAX_PAGES_SHOWN"
                                :totalItems="total_count" />
                        </div>
                    </div>
                    <h3 v-else>Nothing to show...</h3>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>