<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation"; // for redirecting after logout
  import { authStore } from "../../stores/auth"; // adjust path as needed

  onMount(() => {
    authStore.logout();
    // goto("/login"); // or wherever you want to go after logout
    // setTimeout(() => {
    //   goto("/login"); // Redirect to login after 2 seconds
    // }, 5000); // Redirect after 2 seconds
  });

  export let logoSrc = "/logout.svg"; // Adjust the logo path as needed
  export let message = "Thanks for visiting!!! See you back again soon"; // HTTP status code

</script>

<div
  class="bg-gray-800 flex flex-col items-center min-h-screen justify-center px-6 py-12"
>
  <div class="max-w-md text-center">

    <img src={logoSrc} alt="{message} logo"  />

    <!-- Heading -->
    <p class="mt-4 text-lg text-gray-100">
        {message}
    </p>

    <!-- Button -->
    <!-- <a
      href="/"
      class="mt-6 inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600 hover:scale-115 transition-transform duration-200"
    >
      Go back home
    </a> -->
  </div>
</div>