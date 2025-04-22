<!-- Header.svelte -->
<script lang="ts">
  // Props with defaults

  import { authStore } from "../stores/auth";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let showUserMenu = false;
  let showFeatureMenu = false;
  let showConfirmation = false;

  let dropdownUserRef: HTMLElement | null = null;
  let dropdownFeatureRef: HTMLElement | null = null;
  let dropdownConformationRef: HTMLElement | null = null;

  function handleClickOutside(event: MouseEvent) {
    if (dropdownUserRef && !dropdownUserRef.contains(event.target as Node)) {
      showUserMenu = false;
    }
    if (
      dropdownFeatureRef &&
      !dropdownFeatureRef.contains(event.target as Node)
    ) {
      showFeatureMenu = false;
    }
    if (dropdownConformationRef && !dropdownConformationRef.contains(event.target as Node)) {
      showConfirmation = false;
    }
  
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  function handleSignOut() {
    showConfirmation = true;
    showUserMenu = false;
    console.log("showconformation",showConfirmation);
  }

  async function confirmSignOut() {
    console.log('Signing out...');
    // Your actual sign-out logic here (e.g., API call, clearing local storage)
    // await new Promise(resolve => setTimeout(resolve, 200)); // Simulate an async operation

    // After successful sign-out, navigate using goto
    goto('/logout'); // Replace '/login' with your desired route
    showConfirmation = false; // Close the dialog
  }

  // function cancelSignOut() {
  //   showConfirmation = false; // Close the dialog
  // }


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

{#if showConfirmation}
  <div
    class="fixed top-0 left-0 w-full h-full  bg-opacity-50 flex items-center justify-center" 
  >
    <div class="bg-gray-800 border border-gray-900 rounded-lg shadow-xl p-6 transition-all ease-in-out duration-600">
      <p class="text-lg font-semibold text-gray-100 mb-4">
        Are you sure you want to sign out?
      </p>
      <div class="flex justify-center gap-4">
        <button
          class="bg-red-600 hover:bg-red-500 text-gray-100 font-bold py-2 px-4 rounded transition-all ease-in-out duration-600"
          onclick={confirmSignOut}
          >Yes, Sign Out</button
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded tranalletion-all ease-in-out duration-600"
          onclick={() => (showConfirmation = !showConfirmation)}
          >No</button
        >
      </div>
    </div>
  </div>
{/if}

<header class="sticky top-0 z-50">
  <!-- bg-gradient-to-r from-blue-500 to-purple-600 -->
  <div
    class="bg-gradient-to-t from-gray-800 to-gray-900 text-gray-100 mx-auto px-4 pb-4 pt-3"
  >
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
            class="pt-1.5 text-gray-300 hover:text-gray-100 hover:scale-110 transition-all duration-400 ease-in-out"
          >
            About Us
          </a>
        {/if}

        <!-- <ul class="relative"> -->
        <ul class="relative" bind:this={dropdownFeatureRef}>
          <button
            class="pt-1.5 flex items-center text-gray-300 hover:scale-110 hover:text-gray-100 transition-all duration-200"
            onclick={() => (showFeatureMenu = !showFeatureMenu)}
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
              class="absolute left-0 mt-2 w-48 border border-gray-900 rounded shadow-lg z-10"
            >
              {#if $authStore.isAuthenticated}
                <li>
                  <a
                    href="/cv-analyzer"
                    class="block px-4 py-2
                    bg-gradient-to-b from-cyan-800 to-cyan-950 text-gray-100
                    hover:scale-x-105 hover:rounded-md hover:text-gray-50 transition-all duration-600 ease-in-out"
                  >
                    CV Analyzer
                  </a>
                </li>
              {:else}
                <li>
                  <a
                    href="/login"
                    class="block px-4 py-2 bg-gray-800 text-gray-100 hover:bg-gray-900 hover:scale-x-105 cursor-pointer
                   transition-all duration-600 ease-in-out"
                  >
                    CV Analyzer (Premium)
                </a>
                </li>
              {/if}
              <li>
                <a
                  href="/cv-analyzer"
                  class="block px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100 
                   hover:rounded-md 
                  transition-all duration-600 ease-in-out"
                >
                  Career Guidance AI
                </a>
              </li>
              <li>
                <a
                  href="/item3"
                  class="block px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100 
                   hover:rounded-md 
                  transition-all duration-600 ease-in-out"
                  >Professional Courses</a
                >
              </li>
              <li>
                <a
                  href="/item3"
                  class="block px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100 
                   hover:rounded-md 
                  transition-all duration-600 ease-in-out"
                  >Job Matching Insights</a
                >
              </li>
            </ul>
          {/if}
        </ul>

        {#each navLinks as link}
          <a
            href={link.href}
            class="pt-1.5 text-gray-300 hover:text-gray-100 hover:scale-110 transition-all duration-400 ease-in-out"
          >
            {link.text}
          </a>
        {/each}

        {#if !$authStore.isAuthenticated}
          <a
            href="/login"
            class="pt-1.5 text-gray-300 hover:text-gray-100 hover:scale-110 transition-all duration-400 ease-in-out"
          >
            Login
          </a>
        {:else if $authStore.isAuthenticated}
          <div class="relative" bind:this={dropdownUserRef}>
            <button
              onclick={() => (showUserMenu = !showUserMenu)}
            >
              <img
                src={$authStore.user?.profilePic || "/anil-img.jpeg"}
                alt="User Avatar"
                class="w-10 h-10 bg-gray-100 hover:bg-gray-50 rounded-full border-2 border-blue-600 
                hover:scale-110 hover:border-blue-700 transition-all duration-600
                ease-in-out"
              />
            </button>

            {#if showUserMenu}
              <!-- <div
                class="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-950
                hover:border-gray-700
                transition-all duration-600
                 text-gray-100 rounded-lg shadow-xl z-50 overflow-hidden p-4"
              > -->
              <div
                class="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-900
                     text-gray-100 rounded-lg shadow-xl z-50 overflow-hidden p-4
                     transition-all duration-300 ease-in-out"
              >
                <!-- Email on top -->
                <div class="text-sm text-gray-100 mb-3 font-semibold text-center">
                  {$authStore.user?.email}
                </div>

                <!-- Profile picture and name -->
                <div class="flex flex-col items-center mb-4">
                  <img
                    src={$authStore.user?.profilePic || "/anil-img.jpeg"}
                    alt="User Avatar"
                    class="w-16 h-16 rounded-full bg-gray-50 border-4 border-blue-600 hover:scale-110 hover:border-blue-700
                     transition-all duration-600 mb-2"
                  />
                  <div class="text-lg text-gray-100 font-semibold">
                    Hi, {$authStore.user?.name}!
                  </div>
                </div>

                <!-- Action Items -->
                <ul class="text-sm">
                  <li
                    class="flex px-4 py-2 hover:bg-gray-600 hover:rounded-md transition-all duration-600 cursor-pointer text-center ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 pr-0.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    Profile
                  </li>
                  <li
                    class="flex px-4 py-2 hover:bg-gray-600 hover:rounded-md transition-all duration-600 cursor-pointer text-center ease-in-out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 pr-0.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    Settings
                  </li>
                  <li class="border-t my-2"></li>
                  <li class="flex px-4 py-2 hover:rounded-lg text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 pr-0.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>

                    <button
                      onclick={handleSignOut}
                      class="text-gray-100 bg-red-600 hover:bg-red-700 font-semibold
                      trainsition-all duration-600 cursor-pointer
                      pl-2 pr-2 pb-1 rounded-lg scale-110">Sign out</button
                    >
                  </li>
                </ul>
              </div>
            {/if}
          </div>
        {/if}
      </nav>

      <!-- Mobile menu button -->
      <button
        onclick={toggleMobileMenu}
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
              onclick={() => (mobileMenuOpen = false)}
            >
              {link.text}
            </a>
          {/each}
        </div>
      </nav>
    {/if}
  </div>
</header>
