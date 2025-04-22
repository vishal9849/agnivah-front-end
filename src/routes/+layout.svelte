<!-- Layout.svelte -->
<script>
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import "../app.css";
  import { onMount } from "svelte";
  import { authStore } from "../stores/auth"; // Adjust the path as necessary

  // You can pass these as props from your pages if needed
  export let siteName = "Agnivah";

  onMount(() => {
    authStore.initialize();
  });
</script>

<Header {siteName} />
<div class="flex flex-col min-h-screen">
  <main class="flex-grow">
    <!-- This is where page content will be rendered -->
    <slot></slot>
  </main>

  <Footer {siteName} />
</div>
