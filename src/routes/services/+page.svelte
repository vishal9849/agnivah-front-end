<!-- Services.svelte -->
<script lang="ts">

  // Services data
  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites and web applications designed to meet your specific business needs.",
      icon: "code",
      features: [
        "Responsive design for all devices",
        "SEO optimization",
        "Content management systems",
        "E-commerce solutions",
        "Progressive web apps",
      ],
    },
    {
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps for iOS and Android that provide seamless user experiences.",
      icon: "mobile",
      features: [
        "Native iOS development",
        "Native Android development",
        "Cross-platform solutions",
        "App Store optimization",
        "Maintenance and updates",
      ],
    },
    {
      title: "UI/UX Design",
      description:
        "User-centered design that enhances user satisfaction and improves engagement with your products.",
      icon: "design",
      features: [
        "User research and testing",
        "Wireframing and prototyping",
        "Visual design",
        "Interaction design",
        "Design systems",
      ],
    },
    {
      title: "Cloud Solutions",
      description:
        "Scalable and secure cloud infrastructure to power your applications and store your data.",
      icon: "cloud",
      features: [
        "Cloud migration",
        "Infrastructure as code",
        "Serverless architecture",
        "DevOps automation",
        "24/7 monitoring and support",
      ],
    },
  ];

  // Client testimonials
  const testimonials = [
    {
      quote:
        "Working with this team has transformed our business. Their web development expertise helped us increase conversions by 40%.",
      author: "Sarah Johnson",
      company: "TechStart Inc.",
      image: "/api/placeholder/80/80",
    },
    {
      quote:
        "The mobile app they developed for us has received outstanding feedback from our users and significantly improved our customer engagement.",
      author: "Michael Chen",
      company: "Global Retail Solutions",
      image: "/api/placeholder/80/80",
    },
    {
      quote:
        "Their UI/UX design work completely transformed our product. User satisfaction scores increased by 60% after the redesign.",
      author: "Emily Rodriguez",
      company: "HealthTech Innovations",
      image: "/api/placeholder/80/80",
    },
  ];

  // Service process steps
  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We start by understanding your business goals, requirements, and challenges through in-depth consultation.",
    },
    {
      number: "02",
      title: "Planning",
      description:
        "Our team creates a detailed project plan with timelines, deliverables, and resource allocation.",
    },
    {
      number: "03",
      title: "Design",
      description:
        "We design the solution with a focus on user experience, accessibility, and your brand guidelines.",
    },
    {
      number: "04",
      title: "Development",
      description:
        "Our developers bring the designs to life using the latest technologies and best practices.",
    },
    {
      number: "05",
      title: "Testing",
      description:
        "Rigorous testing ensures your product is bug-free, secure, and performs well under all conditions.",
    },
    {
      number: "06",
      title: "Launch",
      description:
        "We help you deploy your solution and provide support during the critical launch phase.",
    },
  ];

  // Get icon based on service type
  function getIcon(type: string) {
    switch (type) {
      case "code":
        return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />';
      case "mobile":
        return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />';
      case "design":
        return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />';
      case "cloud":
        return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />';
      default:
        return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />';
    }
  }
</script>

<div class="flex flex-col min-h-screen">

  <main class="flex-grow">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
        <p class="text-xl max-w-3xl mx-auto">
          Comprehensive solutions tailored to your business needs
        </p>
      </div>
    </div>

    <!-- Services Overview -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-6 text-gray-800">What We Offer</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our expert team provides end-to-end services to help you build, grow,
          and optimize your digital presence.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        {#each services as service}
          <div
            class="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {@html getIcon(service.icon)}
              </svg>
            </div>

            <h3 class="text-2xl font-bold mb-4 text-gray-800">
              {service.title}
            </h3>
            <p class="text-gray-600 mb-6">{service.description}</p>

            <ul class="space-y-2">
              {#each service.features as feature}
                <li class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span class="text-gray-600">{feature}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>

    <!-- Our Process -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">Our Process</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            We follow a proven methodology to ensure successful outcomes for
            every project.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each processSteps as step}
            <div
              class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div class="text-4xl font-bold text-blue-600 opacity-50 mb-4">
                {step.number}
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-800">
                {step.title}
              </h3>
              <p class="text-gray-600">{step.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-6 text-gray-800">
          What Our Clients Say
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say
          about working with us.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        {#each testimonials as testimonial}
          <div
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div class="font-semibold text-gray-800">
                  {testimonial.author}
                </div>
                <div class="text-gray-500 text-sm">{testimonial.company}</div>
              </div>
            </div>

            <p class="text-gray-600 italic">"{testimonial.quote}"</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Technology Stack -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">
            Our Technology Stack
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            We use the latest technologies to build modern, high-performance
            solutions.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {#each ["React", "Vue", "Svelte", "Node.js", "Python", "AWS", "MongoDB", "PostgreSQL", "Docker", "Kubernetes", "Flutter", "React Native"] as tech, i}
            <div
              class="bg-white p-4 rounded-lg shadow-md text-center h-24 flex items-center justify-center"
            >
              <span class="font-medium text-gray-800">{tech}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16"
    >
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p class="text-xl max-w-3xl mx-auto mb-8">
          Contact us today for a free consultation and let's bring your ideas to
          life.
        </p>
        <a
          href="/contact"
          class="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
        >
          Get Started
        </a>
      </div>
    </section>
  </main>

</div>
