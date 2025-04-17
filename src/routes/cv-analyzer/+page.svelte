<script lang="ts">
  import { goto } from "$app/navigation";
  import { authStore } from "../../stores/auth";
  import { onMount } from 'svelte';

  onMount(() => {
    if (!$authStore.isAuthenticated) {
      goto('/unauthorized');
    }
  });

  let selectedFile: File | null = null;
  let jobDescription = "";
  let isAnalyzing = false;
  let analysisResult: { analysis: string; enhanced_cv: string } | null = null;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      selectedFile = target.files[0];
    }
  }

  async function analyzeCV() {
    isAnalyzing = true;
    analysisResult = null; // Clear previous results

    if (!selectedFile) {
      alert("Please select a file to analyze.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", selectedFile);
    formData.append("job_description", jobDescription);

    try {
      const response = await fetch(`${API_BASE_URL}/feign/analyze-cv`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Response status:", response);
        const data = await response.json();
        console.log("Analysis result:", data);
        analysisResult = data; // Store the result

        // Handle the analysis result (e.g., display it to the user)
      } else {
        console.error("Error analyzing CV:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    isAnalyzing = false;
  }

  $: isAnalyzeButtonDisabled = !jobDescription.trim();
</script>

{#if $authStore.isAuthenticated}
  <div class="min-h-screen flex bg-stone-200">
    <div class="p-8 w-1/3">
      <div class="card-hover">
        <h2 class="text-2xl font-semibold mb-4">CV Analyzer (SaaS)</h2>
        <p class="text-gray-600 mb-6">
          Upload your CV and get AI-powered insights for job matching.
        </p>

        <div class="mb-4">
          <label
            for="job-description"
            class="block text-sm font-medium text-gray-700"
          >
            Job Description:
            <span class="text-red-500">*</span>
          </label>
          <textarea
            id="job-description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows="5"
            bind:value={jobDescription}
            required
          ></textarea>
          {#if isAnalyzeButtonDisabled && jobDescription === ""}
            <p class="text-red-500 text-sm mt-1">
              Job description is required.
            </p>
          {/if}
        </div>

        <div class="flex items-center space-x-4">
          <label
            for="file-upload"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded cursor-pointer"
          >
            Upload CV
          </label>
          <input
            id="file-upload"
            type="file"
            class="hidden"
            on:change={handleFileChange}
          />
          <span>{selectedFile ? selectedFile.name : "No file chosen"}</span>

          <!-- <button
          class="bg-blue-700 hover:bg-blue-600 hover:scale-105 duration-200 text-white font-semibold py-2 px-4 rounded"
          on:click={analyzeCV}
          disabled={isAnalyzing || isAnalyzeButtonDisabled}
        >
          {#if isAnalyzing}
            Analyzing...
          {:else}
            Analyze
          {/if}
        </button> -->
          {#if isAnalyzeButtonDisabled}
            <button
              class="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed font-semibold"
              disabled={true}
            >
              Analyze
            </button>
            {:else}
            <button
              class="bg-blue-700 hover:bg-blue-600 hover:scale-105 duration-200 text-white font-semibold py-2 px-4 rounded"
              on:click={analyzeCV}
            >
              Analyze
            </button>
          {/if}

          {#if isAnalyzing}
            <button
              class="bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
              disabled={true}
            >
              Analyzing...
            </button>
          {/if}
        </div>

        {#if isAnalyzing}
          <div class="mt-4 text-center text-gray-600">Please wait.</div>
        {/if}
      </div>
    </div>

    {#if analysisResult}
      <div class="p-8 w-1/3 overflow-y-auto">
        <div
          class="bg-gray-50 hover:bg-white transition-transform duration-300 rounded-lg shadow-md p-8"
        >
          <h3 class="text-lg font-semibold mb-2">Analysis:</h3>
          <p class="text-gray-800 whitespace-pre-wrap">
            {analysisResult.analysis}
          </p>
        </div>
      </div>

      <div class="p-8 w-1/3 overflow-y-auto">
        <div
          class="bg-gray-50 hover:bg-white transition-transform duration-300 rounded-lg shadow-md p-8"
        >
          <h3 class="text-lg font-semibold mb-2">Enhanced CV:</h3>
          <p class="text-gray-800 whitespace-pre-wrap">
            {analysisResult.enhanced_cv}
          </p>
        </div>
      </div>
    {/if}
  </div>

{/if}
