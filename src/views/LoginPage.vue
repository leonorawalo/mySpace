<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const isSignUpMode = ref(false);
const name = ref("");
const email = ref("");
const password = ref("")
const notification = ref({ show: false, message: "", type: "success" })
 const router = useRouter();

const showNotification = (message, type = "success") => {
  notification.value = { show: true, message, type };
  setTimeout(() => (notification.value.show = false), 3000);
};

// toggle between forms
const toggleMode = () => {
  isSignUpMode.value = !isSignUpMode.value;
};

// SIGNUP
const handleSignup = async () => {
  try {
    await axios.post("http://127.0.0.1:4000/api/register", {
      user: {
        name: name.value,
        email: email.value,
        password: password.value,
      },
    });
    showNotification("Signup successful! Please log in.", "success");
    isSignUpMode.value = false; // switch to login mode after successful signup

  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    showNotification("Signup failed: " + (error.response?.data?.message || error.message), "error");
  }
};

// LOGIN
const handleLogin = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:4000/api/login", {
      email: email.value,
      password: password.value,
    });
    console.log("Login successful:", response.data);
    alert("Login successful!");
    // Redirect to home page or dashboard
    router.push("/");
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    alert("Login failed: " + (error.response?.data?.message || error.message));
  }
};
</script>


<template>
  <div class="py-40 md:px-20 lg:px-40 xl:px-80 items-center justify-center w-full h-auto bg-gradient-to-r from-blue-500 to-blue-200">
    <div class="relative flex flex-col md:flex-row w-auto h-auto p-14 bg-white rounded-3xl shadow-xl overflow-hidden">
    
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
        <h2 class="text-2xl mx-4 font-bold mb-4 md:whitespace-nowrap md:text-4xl whitespace-normal">
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
    v-if="notification.show"
    :message="notification.message"
    :type="notification.type"
  />

</template>
