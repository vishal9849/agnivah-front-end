<!-- Header.svelte -->
<script>
  // Props with defaults
  
  import { authStore } from '../stores/auth'; // Import your auth store


  export let siteName = "Agniva";
  export let navLinks = [
    { text: "Home", href: "/" },
    // { text: "About", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Contact", href: "/contact" },
    { text: "Login", href: "/login" },
  ];
  export let logoSrc = "/google.svg";

  // State for mobile menu
  let mobileMenuOpen = false;

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
  <div class="bg-gray-800 shadow-sm  mx-auto px-4 py-3">
    <div class="flex items-center justify-between">
      <!-- Logo and site name -->
      <div class="flex items-center">
        {#if logoSrc}
          <img src={logoSrc} alt="{siteName} logo" class="h-8 w-auto mr-3" />
        {/if}
        <a href="/" class="text-xl font-bold text-white">{siteName}</a>
        <!-- <a href="/" class="text-xl font-bold text-gray-800">Agniva</a> -->
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-6">
        {#each navLinks as link}
          <a
            href={link.href}
            class="text-white hover:text-gray-300 hover:scale-110 transition-transform duration-200"
          >
            {link.text}
          </a>
        {/each}
      
        {#if $authStore.isAuthenticated}
          <a href="/about" class="text-white hover:text-gray-300 hover:scale-110 transition-transform duration-200">
            About Us
          </a>
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
