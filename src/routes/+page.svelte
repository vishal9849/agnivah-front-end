<!-- Page.svelte -->
<script>
  import Header from '../components/Header.svelte';
  import Body from '../components/Body.svelte';
  import Footer from '../components/Footer.svelte';
  
  // Example data for body content
  const paragraphTitle = "Our Vision";
  const paragraphContent = "At our company, we're dedicated to creating innovative solutions that transform the way people interact with technology. Our approach combines cutting-edge development with thoughtful design to deliver experiences that are both powerful and intuitive. We believe that great technology should enhance human capabilities while remaining accessible to everyone.";
  
  const featureCards = [
    { id: 1, title: "Smart Design", content: "Intuitive interfaces that adapt to the needs of your users, creating seamless experiences." },
    { id: 2, title: "Performance", content: "Lightning-fast applications built with efficiency and scalability in mind." },
    { id: 3, title: "Security", content: "Enterprise-grade protection for your data and your users' privacy." },
    { id: 4, title: "Accessibility", content: "Inclusive design principles ensure everyone can use our solutions effectively." },
    { id: 5, title: "Support", content: "Dedicated team available to assist you through every stage of implementation." }
  ];
</script>

<div class="flex flex-col min-h-screen">
  
  <main class="flex-grow">
    <Body 
      paragraphTitle={paragraphTitle}
      paragraphContent={paragraphContent}
      cards={featureCards}
    />
  </main>
  
</div>