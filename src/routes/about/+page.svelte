<script lang="ts">
  import { onMount } from "svelte";
  import { authStore } from "../../stores/auth.js";
  import { goto } from "$app/navigation"; // for redirecting after logout

  onMount(() => {
    console.log("Auth Store:", $authStore); // Check the auth store state
    if (!$authStore.isAuthenticated) {
      goto("/unauthorized");
    }
  });


  // Company stats for the metrics section
  const companyStats = [
    { value: "10+", label: "Years Experience" },
    { value: "250+", label: "Projects Completed" },
    { value: "50+", label: "Team Members" },
    { value: "30+", label: "Countries Served" },
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "/apple.svg",
      bio: "Alex has over 15 years of experience in the industry and founded the company in 2012.",
    },
    {
      name: "Sam Rivera",
      role: "CTO",
      image: "/twitter.svg",
      bio: "Sam leads our technical strategy and oversees all development and innovation initiatives.",
    },
    {
      name: "Taylor Morgan",
      role: "Design Director",
      image: "/google.svg",
      bio: "Taylor ensures our products maintain the highest design standards and user experience.",
    },
    {
      name: "Jordan Lee",
      role: "Operations Manager",
      image: "/github.svg",
      bio: "Jordan keeps everything running smoothly, from project management to client relations.",
    },
  ];

  export let about_us_svg = "./about-us.svg"; // Logo source for the hero section
</script>

{#if $authStore.isAuthenticated}
  <div class="flex flex-col min-h-screen">
    <main class="flex-grow">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div class="container mx-auto px-4 py-20 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">About Our Company</h1>
          <p class="text-xl max-w-3xl mx-auto">
            We're passionate about creating innovative solutions that transform
            ideas into reality.
          </p>
        </div>
      </div>

      <!-- Our Story Section -->
      <section class="container mx-auto px-4 py-16">
        <div class="flex flex-col md:flex-row gap-12 items-center">
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
            <div class="space-y-4 text-gray-600">
              <p>
                Founded in 2012, our company began with a simple mission: to
                build technology that makes a difference. What started as a
                small team of three passionate developers has grown into a
                global company serving clients across multiple industries.
              </p>

              <p>
                Throughout our journey, we've remained committed to our core
                values of innovation, quality, and client satisfaction. We
                believe that technology should simplify and enhance people's
                lives, not complicate them.
              </p>

              <p>
                Today, we're proud to have a diverse team of experts who bring
                their unique perspectives and talents to every project. Our
                collaborative approach allows us to tackle complex challenges
                and deliver solutions that exceed expectations.
              </p>
            </div>
          </div>

          <div class="md:w-1/2">
            <img
              src={about_us_svg}
              alt="Our company story"
              class="rounded-lg shadow-xl w-full h-auto bg-gray-200 hover:scale-105 hover:bg-white transition-transform-color duration-400"
            />
          </div>
        </div>
      </section>

      <!-- Company Metrics -->
      <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            {#each companyStats as stat}
              <div class="text-center">
                <div class="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div class="text-gray-600">{stat.label}</div>
              </div>
            {/each}
          </div>
        </div>
      </section>

      <!-- Our Values -->
      <section class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold mb-12 text-center text-gray-800">
          Our Values
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-400"
          >
            <div
              class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-800">Innovation</h3>
            <p class="text-gray-600">
              We continuously seek new and better ways to solve problems and
              create value for our clients.
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-400"
          >
            <div
              class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-800">Quality</h3>
            <p class="text-gray-600">
              We are committed to excellence in everything we do, from code
              quality to client relationships.
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-400"
          >
            <div
              class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-800">
              Collaboration
            </h3>
            <p class="text-gray-600">
              We believe in the power of teamwork and partnership with our
              clients to achieve shared goals.
            </p>
          </div>
        </div>
      </section>

      <!-- Our Team -->
      <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-12 text-center text-gray-800">
            Meet Our Leadership Team
          </h2>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each teamMembers as member}
              <div
                class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  class="w-full h-32 p-4 object-scale-none"
                />
                <div class="p-6">
                  <h3 class="text-xl font-semibold mb-1 text-gray-800">
                    {member.name}
                  </h3>
                  <div class="text-blue-600 mb-4">{member.role}</div>
                  <p class="text-gray-600">{member.bio}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section
        class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16"
      >
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-6">Ready to Work With Us?</h2>
          <p class="text-xl max-w-3xl mx-auto mb-8">
            We're always looking for new challenges and exciting projects.
          </p>
          <a
            href="/contact"
            class="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  </div>
{/if}
