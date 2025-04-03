<!-- BodyContent.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
  
    // Props
    export let paragraphTitle = "About Us";
    export let paragraphContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget urna cursus fermentum. Sed auctor, magna in feugiat tincidunt, enim sapien aliquam nisi, nec tincidunt magna nunc vel risus. Vivamus at feugiat odio. Cras vitae lectus eget justo consequat vestibulum. Morbi sapien nulla, feugiat nec purus vel, vehicula tincidunt diam. Nulla facilisi. Proin at nunc at libero facilisis facilisis.";
  
    export let cards = [
      {
        id: 1,
        title: "Feature One",
        content: "Description of feature one goes here with some details.",
      },
      {
        id: 2,
        title: "Feature Two",
        content: "Description of feature two with exciting information.",
      },
      {
        id: 3,
        title: "Feature Three",
        content: "Details about feature three and its benefits.",
      },
      {
        id: 4,
        title: "Feature Four",
        content: "Information about feature four and why it matters.",
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
            (cardElements[index] as HTMLElement).offsetLeft - (cardContainer as HTMLElement).offsetLeft;
        }
      }
    }
  
    // Initialize scroll position
    onMount(() => {
      scrollToCard(currentIndex);
    });
  </script>
  
  <div class="container mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left section: Paragraph -->
      <div class="md:w-1/3">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">{paragraphTitle}</h2>
        <p class="text-gray-600 leading-relaxed">
          {paragraphContent}
        </p>
      </div>
  
      <!-- Right section: Card carousel -->
      <div class="md:w-2/3 relative">
        <div class="flex items-center">
          <!-- Left arrow -->
          <button
            on:click={scrollLeft}
            class="absolute left-0 z-10 bg-white rounded-full shadow-lg p-2 text-gray-600 hover:text-gray-900 transition-colors"
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
                  class="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-110 h-full flex flex-col"
                >
                  <h3 class="relative mb-4">
                    <span
                      class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
                    >
                      {card.title}
                    </span>
                    <div
                      class="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded mt-1"
                    ></div>
                  </h3>
                  <p class="text-gray-600">{card.content}</p>
                </div>
              </div>
            {/each}
          </div>
  
          <!-- Right arrow -->
          <button
            on:click={scrollRight}
            class="absolute right-0 z-10 bg-white rounded-full shadow-lg p-2 text-gray-600 hover:text-gray-900 transition-colors"
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
  