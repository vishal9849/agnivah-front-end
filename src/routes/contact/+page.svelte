<!-- Contact.svelte -->
<script>

  // Form handling
  let name = "";
  let email = "";
  let subject = "";
  let message = "";
  let submitting = false;
  let submitSuccess = false;
  let submitError = false;

  // Office locations
  const officeLocations = [
    {
      city: "New York",
      address: "123 Broadway, Suite 500",
      postal: "NY 10001",
      phone: "+1 (212) 555-1234",
      email: "newyork@example.com",
    },
    {
      city: "San Francisco",
      address: "456 Market Street, 3rd Floor",
      postal: "CA 94105",
      phone: "+1 (415) 555-6789",
      email: "sanfrancisco@example.com",
    },
    {
      city: "London",
      address: "10 Oxford Street",
      postal: "W1D 1BS",
      phone: "+44 20 7123 4567",
      email: "london@example.com",
    },
  ];

  // Handle form submission
  function handleSubmit() {
    submitting = true;

    // Simulate form submission - replace with actual form handling
    setTimeout(() => {
      submitting = false;
      submitSuccess = true;

      // Reset form
      name = "";
      email = "";
      subject = "";
      message = "";

      // Reset success message after 5 seconds
      setTimeout(() => {
        submitSuccess = false;
      }, 5000);
    }, 1500);
  }
</script>

<div class="flex flex-col min-h-screen">


  <main class="flex-grow">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p class="text-xl max-w-3xl mx-auto">
          We'd love to hear from you. Get in touch with our team.
        </p>
      </div>
    </div>

    <!-- Contact Information -->
    <section class="container mx-auto px-4 py-16">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Form Section -->
        <div class="md:w-1/2">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">
            Send us a Message
          </h2>

          {#if submitSuccess}
            <div
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
            >
              Thank you for your message! We'll get back to you soon.
            </div>
          {/if}

          {#if submitError}
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            >
              There was an error sending your message. Please try again.
            </div>
          {/if}

          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <div>
              <label for="name" class="block text-gray-700 mb-2"
                >Your Name</label
              >
              <input
                type="text"
                id="name"
                bind:value={name}
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="email" class="block text-gray-700 mb-2"
                >Email Address</label
              >
              <input
                type="email"
                id="email"
                bind:value={email}
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="subject" class="block text-gray-700 mb-2"
                >Subject</label
              >
              <input
                type="text"
                id="subject"
                bind:value={subject}
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="message" class="block text-gray-700 mb-2"
                >Your Message</label
              >
              <textarea
                id="message"
                bind:value={message}
                required
                rows="5"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              class="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <!-- Office Locations -->
        <div class="md:w-1/2">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">Our Offices</h2>

          <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {#each officeLocations as office}
              <div
                class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 class="text-xl font-semibold mb-3 text-gray-800">
                  {office.city}
                </h3>
                <div class="space-y-2 text-gray-600">
                  <p>{office.address}</p>
                  <p>{office.postal}</p>
                  <p class="pt-2">{office.phone}</p>
                  <p class="text-blue-600">{office.email}</p>
                </div>
              </div>
            {/each}
          </div>

          <div class="mt-8">
            <h3 class="text-xl font-semibold mb-4 text-gray-800">
              Business Hours
            </h3>
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="grid grid-cols-2 gap-2">
                <div class="text-gray-600">Monday - Friday:</div>
                <div class="text-gray-800">9:00 AM - 6:00 PM</div>

                <div class="text-gray-600">Saturday:</div>
                <div class="text-gray-800">10:00 AM - 4:00 PM</div>

                <div class="text-gray-600">Sunday:</div>
                <div class="text-gray-800">Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center text-gray-800">
          Find Us
        </h2>

        <!-- Placeholder for map - in production this would be replaced with an actual map embed -->
        <div
          class="bg-gray-200 h-96 rounded-lg flex items-center justify-center"
        >
          <div class="text-gray-600 text-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 mx-auto mb-3 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p class="text-xl font-medium">Map will be displayed here</p>
            <p class="mt-2">
              In production, this would be replaced with an interactive map
              showing our office locations
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800">
        Frequently Asked Questions
      </h2>

      <div class="max-w-3xl mx-auto space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-3 text-gray-800">
            How quickly can I expect a response?
          </h3>
          <p class="text-gray-600">
            We typically respond to all inquiries within 24-48 business hours.
            For urgent matters, please indicate this in your message subject.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-3 text-gray-800">
            Do you offer support outside of business hours?
          </h3>
          <p class="text-gray-600">
            For clients with support contracts, we offer 24/7 emergency support.
            Please contact your account manager for details.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-3 text-gray-800">
            How can I request a quote for my project?
          </h3>
          <p class="text-gray-600">
            You can use the contact form on this page or email us directly. For
            the fastest response, please provide as much detail about your
            project as possible.
          </p>
        </div>
      </div>
    </section>
  </main>

</div>
