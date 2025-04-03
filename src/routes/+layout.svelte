<!-- <script>
    let { children } = $props();
    import "../app.css";
  </script>
  {@render children()}
 -->
<!-- <script> 
import Header from '../components/Header.svelte';
import Footer from '../components/Footer.svelte';
import "../app.css";
</script>

<div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-1">
        <slot />
    </div>
    <Footer />
</div> -->

<!-- Layout.svelte -->
<script>
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import "../app.css";

  // You can pass these as props from your pages if needed
  export let siteName = "Agnivah";
</script>

  <Header {siteName} />
  <div class="flex flex-col min-h-screen">

  <main class="flex-grow">
    <!-- This is where page content will be rendered -->
    <slot></slot>
  </main>

  <Footer {siteName} />
</div>
