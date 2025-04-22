<script lang="ts">
  import { goto } from "$app/navigation";
  import { authStore } from "../../stores/auth";
  import { onMount } from "svelte";

  onMount(() => {
    if (!$authStore.isAuthenticated) {
      goto("/unauthorized");
    }
  });

  let selectedFile: File | null = null;
  let jobDescription = "";
  let isAnalyzing = false;
  let analysisResult: { analysis: string; enhanced_cv: string } | null = null;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_PYTHON_URL = import.meta.env.VITE_API_PYTHON_URL;
  
  let cvText = "This is the original CV text.";
  let jd = "This is a sample job description.";
  let enhancedText = "";
  let isDownloading = false;

  async function enhanceAndDownload() {
    isDownloading = true;
    try {
      // Assuming you have a function to get the enhanced text from your backend
      // const enhanceResponse = await fetch(`${API_BASE_URL}/enhance_cv`, { // Replace with your actual enhance endpoint
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ cv_text: cvText, job_description: jd }),
      // });

      // if (!enhanceResponse.ok) {
      //   console.error('Failed to enhance CV:', await enhanceResponse.text());
      //   return;
      // }
      let cv_response =  await analyzeCV();

      console.log("cv_response", cv_response);
      const enhancedText = cv_response?.enhanced_cv;
      // enhancedText = (enhancedData?.enhanced_cv ?? ""); // Assuming the enhanced text is in this field

      // Now, trigger the PDF download
      const downloadResponse = await fetch(`${API_PYTHON_URL}/download_enhanced_cv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Important for sending form data
        },
        body: `enhanced_text=${encodeURIComponent(enhancedText ?? "")}`, // Encode the text
      });

      if (downloadResponse.ok) {
        const blob = await downloadResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Enhanced_CV.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        console.log('PDF download initiated successfully!');
      } else {
        console.error('Failed to download PDF:', await downloadResponse.text());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      isDownloading = false;
    }
  }

  async function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      selectedFile = target.files[0];
    }
  }

  async function analyzeCV() {
    isAnalyzing = true;

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
    return analysisResult
      ? analysisResult
      : { analysis: "No analysis available", enhanced_cv: "No enhanced CV available" };
  }

  $: isAnalyzeButtonDisabled = !jobDescription.trim();
</script>

{#if $authStore.isAuthenticated}
  <div class="min-h-screen flex bg-gray-800">
    <div class="p-8 w-1/3">
      <div
        class="bg-gradient-to-b from-gray-700 border border-gray-900 text-gray-100
      transition-all duration-600 rounded-lg p-8"
      >
        <h2 class="text-2xl font-semibold mb-4">CV Analyzer (SaaS)</h2>
        <p class="text-gray-300 mb-6">
          Upload your CV and get AI-powered insights for job matching.
        </p>

        <div class="mb-4">
          <label
            for="job-description"
            class="block text-sm font-medium text-gray-300"
          >
            Job Description:
            <span class="text-red-400">*</span>
          </label>
          <textarea
            id="job-description"
            class="mt-1 block w-full border border-blue-400
             rounded-md shadow-sm p-2 bg-gray-800 text-gray-100 placeholder-gray-400"
            placeholder="  Enter the job description here..."
            rows="5"
            bind:value={jobDescription}
            required
          ></textarea>
          {#if isAnalyzeButtonDisabled && jobDescription === ""}
            <p class="text-red-400 text-sm mt-1">
              Job description is required.
            </p>
          {/if}
        </div>

        <div class="flex items-center space-x-4">
          <label
            for="file-upload"
            class="bg-blue-600 hover:bg-blue-500 text-gray-100 font-semibold py-2 px-4 rounded cursor-pointer transition-all duration-600"
          >
            Upload CV
          </label>
          <input
            id="file-upload"
            type="file"
            class="hidden"
            on:change={handleFileChange}
          />
          <span class="text-gray-300"
            >{selectedFile ? selectedFile.name : "No file chosen"}</span
          >

          {#if isAnalyzeButtonDisabled}
            <button
              class="bg-gray-400 text-gray-100 py-2 px-4 rounded cursor-not-allowed font-semibold"
              disabled={true}
            >
              Analyze
            </button>
          {/if}

          {#if isAnalyzing}
            <button
              class="bg-gray-400 text-gray-100 py-2 px-4 rounded cursor-not-allowed font-semibold"
              disabled={true}
            >
              Analyzing...
            </button>
          {:else if !isAnalyzeButtonDisabled}
            <button
              class="bg-teal-600 hover:bg-teal-500 hover:scale-105 duration-200 text-gray-100 font-semibold py-2 px-4 rounded"
              on:click={enhanceAndDownload}
            >
              Analyze
            </button>
          {/if}
        </div>

        {#if isAnalyzing}
          <div class="mt-4 text-center text-gray-600">Please wait...</div>
        {/if}
      </div>
    </div>

    {#if analysisResult}
      <div class="p-8 w-1/3 overflow-y-auto">
        <div
          class="bg-gradient-to-b from-gray-700 border border-gray-900 text-gray-100
                transition-all duration-600 rounded-lg p-8">
          <h3 class="text-lg font-semibold text-gray-100 mb-2">Analysis:</h3>
          <p class="text-gray-100 whitespace-pre-wrap">
            {analysisResult.analysis}
          </p>
        </div>
      </div>

      <div class="p-8 w-1/3 overflow-y-auto">
        <div
        class="bg-gradient-to-b from-gray-700 border border-gray-900 text-gray-100
              transition-all duration-600 rounded-lg p-8">
          <h3 class="text-lg font-semibold text-gray-100 mb-2">Enhanced CV:</h3>
          <p class="text-gray-100 whitespace-pre-wrap">
            {analysisResult.enhanced_cv}
          </p>
        </div>
      </div>
    {/if}
  </div>
{/if}
