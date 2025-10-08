<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/auth';

const isSignUpMode = ref(false);
const name = ref("");
const email = ref("");
const password = ref("")
const notification = ref({ show: false, message: "", type: "success" })
const router = useRouter();
const authStore = useAuthStore();

const showNotification = (message, type = "success") => {
  notification.value = { show: true, message, type };
  setTimeout(() => (notification.value.show = false), 3000);
};

// toggle between forms
const toggleMode = () => {
  isSignUpMode.value = !isSignUpMode.value;
};

// SIGNUP - Use the auth store
const handleSignup = async () => {
  try {
    await authStore.register(name.value, email.value, password.value);
    showNotification("Signup successful!", "success");
    console.log ("Sgnup Successhfull," + name.value);
    router.push("/accreate");
  } catch (error) {
    console.error("Signup failed:", error.message);
    showNotification("Signup failed: " + error.message, "error");
  }
};

// LOGIN - Use the auth store
const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    showNotification("Login successful!", "success");
    router.push("/home");
  } catch (error) {
    console.error("Login failed:", error.message);
    showNotification("Login failed: " + error.message, "error");
  }
};
</script>

<template>
  <div class="py-40 md:px-20 lg:px-40 xl:px-80 items-center justify-center w-full h-auto bg-gradient-to-r from-blue-500 to-blue-200">
    <div class="relative flex flex-row w-auto h-auto p-14 bg-white rounded-3xl shadow-xl overflow-hidden">

      <!-- Login form -->
      <div
        class="flex flex-col justify-center items-center w-1/2 p-8 transition-all duration-500"
        :class="{ 'translate-x-full opacity-0 pointer-events-none': isSignUpMode }"
      >
        <h2 class="text-2xl mr-12 font-bold text-gray-800">Sign In</h2>
        <p class="text-gray-500 mr-12 mb-6 whitespace-nowrap">or use your email account</p>

        <input
          type="email"
          placeholder="Email"
          v-model="email"
          class="w-full px-4 py-2 mb-4 mr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          class="w-full px-4 py-2 mb-6 mr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          class="w-full bg-blue-500 text-white py-2 mr-12 rounded-lg hover:bg-indigo-600 transition"
          @click="handleLogin"
        >
          SIGN IN
        </button>
      </div>

      <!-- Sign-up form -->
      <div
        class="flex flex-col justify-center items-center w-1/2 bottom-1 p-8 transition-all duration-500 absolute top-0 left-0"
        :class="{ 'translate-x-full opacity-100': isSignUpMode, 'opacity-0 pointer-events-none': !isSignUpMode }"
      >
        <h2 class="text-2xl font-bold text-gray-800">Create Account</h2>
        <p class="text-gray-500 mb-6">or use your email for registration</p>

        <input
          type="text"
          placeholder="Name"
          v-model="name"
          class="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          class="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          class="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <button
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition"
          @click="handleSignup"
        >
          SIGN UP
        </button>
      </div>

      <!-- Sliding panel -->
      <div
        class="absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-blue-200 to-blue-400 text-white flex flex-col items-center justify-center p-10 transition-transform duration-500"
        :class="{ '-translate-x-full': isSignUpMode }"
      >
        <h2 class="flex justify-center text-3xl mx-4 font-bold mb-4 md:whitespace-nowrap md:text-4xl whitespace-normal">
          {{ isSignUpMode ? "Welcome Friend!" : "Hello Again!" }}
        </h2>
        <p class="mb-6 text-center max-w-xs">
          {{ isSignUpMode
            ? "Enter your personal details and start your journey with us."
            : "To keep connected with us please login with your personal info." }}
        </p>
        <button
          class="border-2 border-white px-6 py-2 rounded-lg hover:bg-white hover:text-indigo-600 transition"
          @click="toggleMode"
        >
          {{ isSignUpMode ? "SIGN IN" : "SIGN UP" }}
        </button>
      </div>
    </div>
  </div>
    <!-- Notification box -->
  <Notification
    v-if="notification.showNotification"
    :message="notification.message"
    :type="notification.type"
  />

</template>
