<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import { redirect } from "@sveltejs/kit";
  import { authStore } from '../../stores/auth'; // Import your auth store

  let { data }: { data: PageData } = $props();

  let username = "";
  let password = "";
  let error = "";
  let token = "";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function login() {
    error = ""; // Clear previous errors
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        token = data.token;
        // Store the token (e.g., in localStorage or a cookie)
        localStorage.setItem("authToken", token);
        console.log("Login successful, token:", token);
        // Redirect to a protected route or update the UI
        // redirect(303,"/"); // Example redirect

        authStore.update(() => ({
          isAuthenticated: true,
          user: {
            name: "John Doe", // Used for initials if no profile pic
            profilePic: "/apple.svg", // Optional - will use initials if not provided
          },
        }));

        goto("/"); // Redirect to the home page
      } else {
        const data = await response.json();
        error = data.message || "Login failed";
      }
    } catch (err) {
      error = "Network error";
      console.error("Login error:", err);
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div
    class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
  >
    <!-- left side -->
    <div class="flex flex-col justify-center p-8 md:p-14">
      <span class="mb-3 text-4xl font-bold">Welcome back</span>
      <span class="font-light text-gray-400 mb-8">
        Welcom back! Please enter your details
      </span>
      <div class="py-4">
        <span class="mb-2 text-md">Email</span>
        <input
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="email"
          id="email"
        />
      </div>
      <div class="py-4">
        <span class="mb-2 text-md">Password</span>
        <input
          type="password"
          name="pass"
          id="pass"
          class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        />
      </div>
      <div class="flex justify-between w-full py-4">
        <div class="mr-24">
          <input type="checkbox" name="ch" id="ch" class="mr-2" />
          <span class="text-md">Remember for 30 days</span>
        </div>
        <span class="font-bold text-md">Forgot password</span>
      </div>

      <button
        type="button"
        onclick={login}
        class="w-full p-2 text-center rounded-lg mb-6 bg-cyan-500 text-black hover:scale-105 transition-transform duration-200"
        aria-label="Sign in"
      >
        Sign in
      </button>

      <div class="text-center text-gray-400 mb-6">or continue with</div>
      <div class="flex flex-row">
        <button
          class="w-24 p-2 rounded-full mb-6 hover:scale-125 transition-transform duration-200"
        >
          <img src="google.svg" alt="img" class="w-6 h-6 inline" />
          <!-- Sign in with Google -->
        </button>
        <button
          class="w-24 p-2 rounded-full mb-6 hover:scale-125 transition-transform duration-200"
        >
          <img src="apple.svg" alt="img" class="w-6 h-6 inline" />
          <!-- Sign in with Apple -->
        </button>
        <button
          class="w-24 p-2 rounded-full mb-6 hover:scale-125 transition-transform duration-200"
        >
          <img src="linkedin.svg" alt="img" class="w-6 h-6 inline" />
          <!-- Sign in with linkedin -->
        </button>
        <button
          class="w-24 p-2 rounded-full mb-6 hover:scale-125 transition-transform duration-200"
        >
          <img src="github.svg" alt="img" class="w-6 h-6 inline fill-white" />
          <!-- Sign in with Github -->
        </button>
        <button
          class="w-24 p-2 rounded-full mb-6 hover:scale-125 transition-transform duration-200"
        >
          <img src="twitter.svg" alt="img" class="w-6 h-6 inline" />
          <!-- Sign in with Twitter -->
        </button>
        <button
          class="w-24 p-2 rounded-full mb-6 hover:scale-125 transition-transform duration-200"
        >
          <img src="facebook.svg" alt="img" class="w-6 h-6 inline" />
          <!-- Sign in with facebook -->
        </button>
      </div>

      <div class="text-center text-gray-400">
        Dont'have an account?
        <span class="font-bold text-black">Sign up for free</span>
      </div>
    </div>
    <!-- {/* right side */} -->
    <div class="relative">
      <img
        src="image.jpg"
        alt="img"
        class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
      />
      <!-- text on image  -->
      <div
        class="absolute ml-10 hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm drop-shadow-lg md:block rounded-lg"
      >
        <span class="text-black text-xl">
          Embrace the power of <span class="text-red-600 font-semibold"
            >Agniva</span
          > <br />
          in streamlining your career goals, enhancing productivity. <br />
          Imagine missing it.
        </span>
      </div>
    </div>
  </div>
</div>
