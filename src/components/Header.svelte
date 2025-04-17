<!-- Header.svelte -->
<script lang="ts">
  // Props with defaults

  import { authStore } from "../stores/auth";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";


  let showUserMenu = false;
  let showFeatureMenu = false;
  let dropdownUserRef: HTMLElement | null = null;
  let dropdownFeatureRef: HTMLElement | null = null;

  function handleClickOutside(event: MouseEvent) {
    if (dropdownUserRef && !dropdownUserRef.contains(event.target as Node)) {
      showUserMenu = false;
    }
    if (dropdownFeatureRef &&!dropdownFeatureRef.contains(event.target as Node)) {
      showFeatureMenu = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  export let siteName = "Agniva";
  export let navLinks = [
    { text: "Home", href: "/home" },
    // { text: "About", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Contact", href: "/contact" },
    // { text: "Login", href: "/login" },
  ];

  export let logoSrc = "/google.svg";
  let username = "john_doe"; // Replace with real username from store/api
  let userPhoto = "/anil.svg"; // Replace with real user photo from store/api
  // State for mobile menu
  let mobileMenuOpen = false;

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header
  class="sticky top-0 z-50 bg-gray-800 hover:shadow-lg hover:shadow-gray-400 transition-shadow duration-600"
>
  <!-- bg-gradient-to-r from-blue-500 to-purple-600 -->
  <div class="bg-gray-800 text-white mx-auto px-4 pb-4 pt-3">
    <div class="flex items-center justify-between">
      <!-- Logo and site name -->
      <div class="flex items-center">
        {#if logoSrc}
          <img src={logoSrc} alt="{siteName} logo" class="h-8 w-auto mr-2" />
        {/if}
        <a href="/" class="text-xl font-bold text-white">{siteName}</a>
        <!-- <a href="/" class="text-xl font-bold text-gray-800">Agniva</a> -->
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-6">
        {#if $authStore.isAuthenticated}
          <a
            href="/about"
            class="pt-1.5 text-white hover:text-gray-300 hover:scale-110 transition-transform duration-200"
          >
            About Us
          </a>
        {/if}

        <!-- <ul class="relative"> -->
        <ul class="relative" bind:this={dropdownFeatureRef}>
          <button
            class=" pt-1.5 flex items-center text-white hover:scale-110 hover:text-gray-300 transition-transform duration-200"
            on:click={() => (showFeatureMenu = !showFeatureMenu)}
          >
            Features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              /></svg
            >
          </button>
          {#if showFeatureMenu}
            <ul
              class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
            >
              {#if $authStore.isAuthenticated}
                <li>
                  <a
                    href="/cv-analyzer"
                    class="block px-4 py-2 text-blue-600 font-semibold
                     hover:text-white
                     hover:scale-105 transition-transform duration-500
                     shadow-lg shadow-gray-300 hover:shadow-blue-400
                     hover:bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden rounded-md"
                  >
                    CV Analyzer
                  </a>
                </li>
              {:else}
                <span class="block px-4 py-2 text-gray-400 cursor-not-allowed"
                  >CV Analyzer (Disabled)</span
                >
              {/if}
              <li>
                <a
                  href="/item2"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >Career Guidance AI</a
                >
              </li>
              <li>
                <a
                  href="/item3"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >Professional Courses</a
                >
              </li>
              <li>
                <a
                  href="/item3"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >Job Matching Insights</a
                >
              </li>
            </ul>
          {/if}
        </ul>

        {#each navLinks as link}
          <a
            href={link.href}
            class="w-auto h-auto pt-1.5 text-white hover:text-gray-300 hover:scale-110 transition-transform duration-200"
          >
            {link.text}
          </a>
        {/each}

        {#if !$authStore.isAuthenticated}
          <a
            href="/login"
            class="pt-1.5 text-white hover:text-gray-300 hover:scale-110 transition-transform duration-200"
          >
            Login
          </a>
        {:else if $authStore.isAuthenticated}
          <div class="relative" bind:this={dropdownUserRef}>
            <button
              class="flex items-center
              cursor-pointer
            text-white
            hover:text-gray-300
              transition-all duration-300"
              on:click={() => (showUserMenu = !showUserMenu)}
            >
              <!-- <span class="hidden sm:inline">{username}</span> -->
              <!-- src={$authStore.user?.profilePic} -->
              <!-- src={userPhoto} -->

              <img
                src={$authStore.user?.profilePic || '/anil-img.jpeg'}
                alt="User Avatar"
                class="w-10 h-10
                bg-white 
                rounded-full border-3 border-blue-600
                hover:scale-110 
                hover:border-blue-400
                transition-all duration-300"
              />
              <!-- <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg> -->
            </button>

            {#if showUserMenu}
              <ul
                class="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded shadow-lg z-50 overflow-hidden"
              >
                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <button
                  class="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  on:click={() => goto('/about')}
                >
                  Settings
                </button>
                <li class="border-t my-1 "></li>
                <li
                  class="px-4 pb-4 pt-2 text-blue-600 shadow-lg hover:shadow-lg">
                  <a href="/logout"> Logout </a>
                </li>
              </ul>
            {/if}
          </div>
        {/if}
      </nav>

      <!-- Mobile menu button -->
      <button
        on:click={toggleMobileMenu}
        class="md:hidden p-2 rounded-md bg-gray-800 text-white hover:bg-gray-100 hover:text-black hover:scale-110 transition-transform duration-200"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {#if mobileMenuOpen}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          {:else}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          {/if}
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    {#if mobileMenuOpen}
      <nav class="mt-4 pb-3 md:hidden">
        <div class="flex flex-col space-y-3">
          {#each navLinks as link}
            <a
              href={link.href}
              class="p-2 text-white rounded-sm hover:bg-gray-100 hover:text-black"
              on:click={() => (mobileMenuOpen = false)}
            >
              {link.text}
            </a>
          {/each}
        </div>
      </nav>
    {/if}
  </div>
</header>
