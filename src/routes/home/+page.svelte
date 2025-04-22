<!-- BodyContent.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  // import { authStore } from "../../stores/auth"; // Import your auth store

  // Props
  export let paragraphTitle = "About Us";
  export let paragraphContent =
    "At our company, we're dedicated to creating innovative solutions that transform the way people interact with technology. Our approach combines cutting-edge development with thoughtful design to deliver experiences that are both powerful and intuitive. We believe that great technology should enhance human capabilities while remaining accessible to everyone.";

  export let cards = [
    {
      id: 1,
      title: "CV Analyzer",
      content: "Analyze your CV with our advanced AI tools.",
    },
    {
      id: 2,
      title: "Career Guidance AI Assistant",
      content: "Get personalized career advice and insights.",
    },
    {
      id: 3,
      title: "Professional Course Recommendations",
      content: "Discover courses tailored to your career goals.",
    },
    {
      id: 4,
      title: "Job Matching Insights",
      content: "Find jobs that match your skills and experience.",
    },
    {
      id: 5,
      title: "Feature Five",
      content: "Highlights of feature five with relevant details.",
    },
  ];

  // Scroll functionality
  let cardContainer: HTMLElement | null = null;
  let currentIndex = 0;

  function scrollLeft() {
    if (currentIndex > 0) {
      currentIndex--;
      scrollToCard(currentIndex);
    }
  }

  function scrollRight() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      scrollToCard(currentIndex);
    }
  }

  function scrollToCard(index: number) {
    if (cardContainer) {
      const cardElements = cardContainer.querySelectorAll(".card");
      if (cardElements[index]) {
        cardContainer.scrollLeft =
          (cardElements[index] as HTMLElement).offsetLeft -
          (cardContainer as HTMLElement).offsetLeft;
      }
    }
  }

  // Initialize scroll position
  // onMount(() => {
  //   scrollToCard(currentIndex);
  //   authStore.initialize();
  // });
</script>

<div class="flex flex-col bg-gray-800 min-h-screen p-8">
  <div class="flex md:flex-row gap-8">
    <!-- Left section: Paragraph -->
    <div class="md:w-1/3">
      <h2 class="text-2xl font-bold mb-4 text-gray-100">{paragraphTitle}</h2>
      <p class="text-gray-300 leading-relaxed">
        {paragraphContent}
      </p>
    </div>

    <!-- Right section: Card carousel -->
    <div class="md:w-2/3 relative">
      <div class="flex items-center">
        <!-- Left arrow -->
        <button
          on:click={scrollLeft}
          class="absolute left-0 z-10
           bg-blue-600 text-gray-100
            hover:bg-blue-500
           hover:text-gray-50
           cursor-pointer
             rounded-full shadow-lg p-2 transition-colors"
          aria-label="Previous card"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Cards container -->
        <div
          bind:this={cardContainer}
          class="flex overflow-x-scroll scrollbar-hide snap-x snap-mandatory gap-4 py-4 px-8"
          style="scroll-behavior: smooth;"
        >
          {#each cards as card}
            <div class="card snap-center flex-shrink-0 w-64">
              <div
                class="rounded-lg shadow-md p-6 bg-gray-800 border border-gray-900 
                hover:bg-gray-900
                transition-all duration-600 hover:scale-110 hover:rounded-lg h-full flex flex-col"
              >
                <button>
                  <h3 class="relative mb-4">
                    <span
                      class="text-xl font-bold bg-clip-text text-gray-100"
                    >
                      {card.title}
                    </span>
                    <!-- <div
                      class="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded mt-1"
                    ></div> -->
                  </h3>
                  <p class="text-gray-300">{card.content}</p>
                </button>
              </div>
            </div>
          {/each}
        </div>

        <!-- Right arrow -->
        <button
          on:click={scrollRight}
          class="absolute right-0 z-10 
           bg-blue-600 text-gray-100
            hover:bg-blue-500
           hover:text-gray-50
           cursor-pointer
             rounded-full shadow-lg p-2 transition-colors"
          aria-label="Next card"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Hide scrollbar but allow scrolling */
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
</style>
