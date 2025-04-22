<!-- NotFound.svelte or +error.svelte -->
<script>

  
  export let status = 404;
  export let error = { message: "Page not found" };
  export let logoSrc = "/404-error.svg";

</script>

<div class="bg-gray-800 min-h-screen flex flex-col items-center justify-center px-6 py-12">
  <div class="max-w-md text-center">

    <img src={logoSrc} alt="{error} logo"  />


    <!-- Heading -->
    <h1 class="text-5xl font-bold text-blue-600">{status}</h1>
    <p class="mt-4 text-lg text-gray-100">
      Oops! The page you are looking for doesn't exist.
    </p>
    <p class="text-sm text-gray-300 mt-1 italic">{error?.message}</p>

    <!-- Button -->
    <a
      href="/home"
      class="mt-6 inline-block bg-blue-600 text-gray-100 px-6 py-3 rounded-lg hover:bg-blue-500 hover:scale-110 transition-all ease-in-out duration-300"
    >
      Go back home
    </a>
  </div>
</div>
