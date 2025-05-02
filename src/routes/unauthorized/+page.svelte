<!-- NotFound.svelte or +error.svelte -->
<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let status = 403;
  export let error = { message: "Unauthorized! Please contact Admin." };
  export let logoSrc = "/unauthorized.svg";

  // onMount(() => {
  //   goto("/login");
  //   // setTimeout(() => {
  //   //   goto("/login");
  //   // }, 10000);
  // });
</script>


<div class="bg-gray-800 min-h-screen flex flex-col items-center justify-center px-6 py-12">
  <div class="max-w-md text-center">
    <img src={logoSrc} alt="{error} logo" />

    <!-- Heading -->
    <h1 class="text-5xl font-bold text-blue-600">{status}</h1>
    <p class="mt-4 text-lg text-gray-100">
      Oops! You are not authorized to access this page.
    </p>
    <p class="text-sm text-gray-300 mt-1 italic">{error?.message}</p>

    <!-- Button -->
    <a
      href="/home"
      class="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 hover:scale-110 transition-all ease-in-out duration-300"
    >
      Home
    </a>
  </div>
</div>
