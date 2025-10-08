<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-blue-200 flex flex-col justify-center items-center p-8 min-h-screen">
    <div class="space-y-4 bg-gray-100 border border-2 boder-gray-200 rounded-3xl pb-4 px-8 py-3 text-base lg:text-lg mb-8">
      <!-- form title & logo-->
      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-row items-center justify-center"><h1 class="text-2xl md:text-3xl lg:text-4xl text-black font-bold mt-6 flex">Create your account</h1></div>
        <p class="text-base lg:text-lg p-3 font-extralight -mt-1">Fill the form below to get started!</p>
      </div>
      <div class="  flex flex-col space-y-2">
        <label for="name" name="name" id="name" class="text-gray-600">Name: </label>
        <input type="text" id="name" v-model="name" placeholder="Your name goes here..." class="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-50 hover:border-blue-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200">
        <p v-if="errors.name" class="text-red-500">{{ errors.name }}</p>
      </div>
      <div class="  flex flex-col space-y-2">
        <label for="username" class="text-gray-600">Userame: </label>
        <input type="text" id="username" v-model="username" placeholder="Your username goes here..." class="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-50 hover:border-blue-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200">
        <p v-if="errors.username" class="text-red-500">{{ errors.username }}</p>
      </div>
      <div class="  flex flex-col space-y-2">
        <label for="email" class="text-gray-600">Email: </label>
        <input type="email" id="email" v-model="email" placeholder="Your email goes here..." class="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-50 hover:border-blue-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200">
        <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
      </div>
      <div class="  flex flex-col space-y-2">
        <label for="image" class="text-gray-600">User Image: </label>
        <input type="file" id="image" v-on="image" placeholder="desired image" class="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-50 hover:border-blue-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200">
      </div>
      <div class="  flex flex-col space-y-2 md:flex-row md:space-x-4">
        <div class="flex flex-col space-y-2">
          <label for="city" class="text-gray-600">City: </label>
          <input type="text" id="city" v-model="city" placeholder="City" class="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-50 hover:border-blue-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200">
          <p v-if="errors.city" class="text-red-500">{{ errors.city }}</p>
        </div>
        <div class="flex flex-col space-y-2">
          <label for="country" class="text-gray-600">Country: </label>
          <input type="text" id="country" v-model="country" placeholder="Country" class="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-50 hover:border-blue-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200">
          <p v-if="errors.country" class="text-red-500">{{ errors.country }}</p>
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="birthdate" class="text-gray-600">Birthday</label>
        <input type="date" id="birthdate" class="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-50 hover:border-blue-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200">
      </div>
      <!--button-->
      <div class="flex justify-center items-center mt-6">
        <button @click="validationSuccess" class="bg-blue-400 text-white px-6 py-2 rounded-full hover:bg-indigo-400 transition w-full mb-4">Continue</button>
      </div>
    </div>
  </div>
</template>

<script setup>
//import { useUserStore } from '@/stores/user'
//import { errors } from '@playwright/test'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const username = ref('')
const city = ref('')
const country = ref('')
const image = ref('')
const errors = ref([])


const validationSuccess = () => {
  errors.value = {} // reset errors

  if (!name.value) {
    errors.value.name = "Full name is required"
  } else if (name.value.length < 3) {
    errors.value.name = "Name must be submitted in full"
  }

  if (!username.value) {
    errors.value.username = "Username is required"
  } else if (username.value.length < 3) {
    errors.value.username = "Username must be at least 3 characters"
  }

  if (!email.value) {
    errors.value.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = "Email format is invalid"
  }

  if (!city.value) {
    errors.value.city = "City is required"
  } else if (city.value.length < 3) {
    errors.value.city = "Enter a valid city"
  }

  if (!country.value) {
    errors.value.country = "Country is required"
  } else if (country.value.length < 3) {
    errors.value.country = "Enter a valid country"
  }

  // ✅ If no errors, reroute
  const isValid = Object.keys(errors.value).length === 0
  if (isValid) {
    alert('Form submitted successfully!')
    router.push('/home')
  }
}

</script>
