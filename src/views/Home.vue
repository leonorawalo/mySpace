<script>
import { ref, onMounted, onUnmounted } from "vue";
import Chart from "chart.js/auto";

import g1 from "@/assets/images/g7.jpeg";
import g2 from "@/assets/images/g8.jpeg";
import g3 from "@/assets/images/g3.jpeg";
import g4 from "@/assets/images/g9.jpeg";
import g5 from "@/assets/images/g5.jpeg";
import g6 from "@/assets/images/g10.jpeg";

export default {
  name: "HomePage",
  setup() {
    const images = [g1, g2, g3, g4, g5, g6];
    const currentIndex = ref(0);
    let intervalId;

    // Auto-swipe gallery
    onMounted(() => {
      intervalId = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length;
      }, 3000);
    });
    onUnmounted(() => clearInterval(intervalId));

    // Chart.js init
    onMounted(() => {
      const ctx = document.getElementById("myCanvas").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "Steps",
              data: [1200, 1900, 3000, 500, 2000, 3000],
              backgroundColor: ["red", "blue", "yellow", "green", "purple", "orange"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });

    return { images, currentIndex };
  },
};
</script>

<template class="w-auto">
  <div class="bg-indigo-100 min-h-full flex flex-col">
    <div class="flex flex-col items-center justify-center">
      <!-- Top row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full p-4 md:p-8">
        <!-- User profile -->
        <div class="border-2 border-gray-100 relative flex flex-col justify-center rounded-2xl overflow-hidden">
          <img src="@/assets/images/homepic.jpeg" alt="User Image" class="w-full h-64 md:h-80 object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div class="absolute bottom-3 left-3 text-white">
            <h4 class="font-bold text-2xl md:text-4xl lg:text-6xl">John Doe</h4>
            <p class="text-sm md:text-base text-gray-200">Nairobi, Kenya</p>
          </div>
        </div>

        <!-- Chart -->
        <div class="bg-white border-2 border-gray-100 flex flex-col justify-center rounded-2xl p-4">
          <div class="h-56 sm:h-72 md:h-80 lg:h-96">
            <canvas id="myCanvas" class="w-full h-full"></canvas>
          </div>
        </div>
      </div>

      <!-- Bottom row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-4 md:p-8">
        <!-- Gallery -->
        <div class="bg-white border-2 border-gray-100 relative flex flex-col justify-center rounded-2xl p-4 overflow-hidden">
          <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-gray-600">Gallery</h3>
          <div class="relative w-full h-40 md:h-56 rounded-lg overflow-hidden">
            <transition name="fade" mode="out-in">
              <img
                :key="images[currentIndex]"
                :src="images[currentIndex]"
                alt="Gallery Image"
                class="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </transition>
          </div>
        </div>

        <!-- Wallet -->
        <div class="bg-white border-2 border-gray-100 flex flex-col justify-center rounded-2xl p-6">
          <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-gray-600">Wallet</h3>
          <p class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">$1,250.00</p>
          <div class="mt-2 text-sm md:text-base text-gray-600">
            <p>Recent Transactions:</p>
            <ul class="list-disc list-inside">
              <li>Grocery Store - $50.00</li>
              <li>Coffee Shop - $5.00</li>
              <li>Online Shopping - $120.00</li>
            </ul>
          </div>
        </div>

        <!-- Tasks -->
        <div class="bg-white border-2 border-gray-100 flex flex-col justify-center rounded-2xl p-6">
          <h3 class="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-gray-600">Tasks</h3>
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li>Finish Vue.js project</li>
            <li>Read new design patterns</li>
            <li>Grocery shopping</li>
            <li>Workout session</li>
            <li>Call mom</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
