<!-- App.svelte -->
<script lang="ts">
	// Form state
	let formData = {
	  firstName: '',
	  lastName: '',
	  email: '',
	  password: '',
	  confirmPassword: '',
	  agreeTerms: false
	};
	
	interface FormErrors {
	  firstName?: string;
	  lastName?: string;
	  email?: string;
	  password?: string;
	  confirmPassword?: string;
	  agreeTerms?: string;
	}
	
	let errors: FormErrors = {};
	let isSubmitting = false;
	let submitSuccess = false;
	
	// Form validation
	function validateForm() {
	  let formErrors: FormErrors = {};
	  let isValid = true;
	  
	  if (!formData.firstName.trim()) {
		formErrors.firstName = 'First name is required';
		isValid = false;
	  }
	  
	  if (!formData.lastName.trim()) {
		formErrors.lastName = 'Last name is required';
		isValid = false;
	  }
	  
	  if (!formData.email.trim()) {
		formErrors.email = 'Email is required';
		isValid = false;
	  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
		formErrors.email = 'Please enter a valid email address';
		isValid = false;
	  }
	  
	  if (!formData.password) {
		formErrors.password = 'Password is required';
		isValid = false;
	  } else if (formData.password.length < 8) {
		formErrors.password = 'Password must be at least 8 characters';
		isValid = false;
	  }
	  
	  if (formData.password !== formData.confirmPassword) {
		formErrors.confirmPassword = 'Passwords do not match';
		isValid = false;
	  }
	  
	  if (!formData.agreeTerms) {
		formErrors.agreeTerms = 'You must agree to the terms and conditions';
		isValid = false;
	  }
	  
	  errors = formErrors;
	  return isValid;
	}
	
	// Form submission
	async function handleSubmit() {
	  if (!validateForm()) return;
	  
	  isSubmitting = true;
	  
	  try {
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		// Reset form and show success message
		submitSuccess = true;
		formData = {
		  firstName: '',
		  lastName: '',
		  email: '',
		  password: '',
		  confirmPassword: '',
		  agreeTerms: false
		};
	  } catch (error) {
		console.error('Registration failed:', error);
	  } finally {
		isSubmitting = false;
	  }
	}
  </script>
  
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
	<div
    class="relative flex flex-col m-6 space-y-8 bg-gray-100 shadow-2xl rounded-2xl md:flex-row md:space-y-0 hover:bg-white transition-color duration-300"
	>
	  <!-- left side -->
	  <div class="flex flex-col justify-center p-8 md:p-14">
			<!-- <div class="relative py-3 sm:max-w-xl sm:mx-auto"> -->
			  <!-- <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-xl rounded-lg sm:p-10"> -->
				
				{#if submitSuccess}
				  <div class="flex flex-col items-center">
					<div class="rounded-full bg-green-100 p-4">
					  <svg class="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
					  </svg>
					</div>
					<h3 class="mt-4 text-xl font-semibold text-gray-800">Registration Successful!</h3>
					<p class="mt-2 text-gray-600 text-center">Thank you for registering. You can now log in with your credentials.</p>
					<button 
					  class="mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
					  on:click={() => submitSuccess = false}
					>
					  Register Another Account
					</button>
				  </div>
				{:else}
				  <div class="max-w-md mx-auto">
					<div class="text-center">
					  <h1 class="text-2xl font-semibold text-gray-900">Create an Account</h1>
					  <p class="mt-2 text-gray-600">Sign up to get started with our service</p>
					</div>
				  
					<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
					  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<!-- First Name -->
						<div>
						  <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
						  <input 
							type="text" 
							id="firstName" 
							bind:value={formData.firstName}
							class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500
							{errors.firstName ? 'border-red-300' : 'border-gray-300'}"
						  />
						  {#if errors.firstName}
							<p class="mt-1 text-sm text-red-600">{errors.firstName}</p>
						  {/if}
						</div>
						
						<!-- Last Name -->
						<div>
						  <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
						  <input 
							type="text" 
							id="lastName" 
							bind:value={formData.lastName}
							class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500
							  {errors.lastName ? 'border-red-300' : 'border-gray-300'}"
						  />
						  {#if errors.lastName}
							<p class="mt-1 text-sm text-red-600">{errors.lastName}</p>
						  {/if}
						</div>
					  </div>
					  
					  <!-- Email -->
					  <div>
						<label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
						<input 
						  type="email" 
						  id="email" 
						  bind:value={formData.email}
							class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500
							{errors.email ? 'border-red-300' : 'border-gray-300'}"
						/>
						{#if errors.email}
						  <p class="mt-1 text-sm text-red-600">{errors.email}</p>
						{/if}
					  </div>
					  
					  <!-- Password -->
					  <div>
						<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
						<input 
						  type="password" 
						  id="password" 
						  bind:value={formData.password}
							class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500
							{errors.password ? 'border-red-300' : 'border-gray-300'}"
						/>
						{#if errors.password}
						  <p class="mt-1 text-sm text-red-600">{errors.password}</p>
						{/if}
					  </div>
					  
					  <!-- Confirm Password -->
					  <div>
						<label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
						<input 
						  type="password" 
						  id="confirmPassword" 
						  bind:value={formData.confirmPassword}
							class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500
							{errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}"
						/>
						{#if errors.confirmPassword}
						  <p class="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
						{/if}
					  </div>
					  
					  <!-- Terms and Conditions -->
					  <div class="flex items-start">
						<input 
						  id="agreeTerms" 
						  type="checkbox" 
						  bind:checked={formData.agreeTerms}
						  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
						<label for="agreeTerms" class="ml-2 block text-sm text-gray-700">
						  I agree to the 
						  <a href="/item5" class="text-blue-600 hover:text-blue-500">Terms and Conditions</a> 
						  and 
						  <a href="/item6" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
						</label>
					  </div>
					  {#if errors.agreeTerms}
						<p class="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
					  {/if}
					  
					  <!-- Submit Button -->
					  <div>
						<button 
						  type="submit" 
						  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						  disabled={isSubmitting}
						>
						  {#if isSubmitting}
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Processing...
						  {:else}
							Create Account
						  {/if}
						</button>
					  </div>
					</form>
					
					<!-- Login Link -->
					<div class="text-sm text-center mt-6">
					  Already have an account? 
					  <a href="/login" class="font-medium text-blue-600 hover:text-blue-500">Sign in</a>
					</div>
				  </div>
				{/if}
			  <!-- </div> -->
			<!-- </div> -->
		  
	  </div>
	  <!-- {/* right side */} -->
	  <div class="relative">
		<img
		  src="image.jpg"
		  alt="img"
		  class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
		/>
		<!-- text on image  -->
		<div
		  class="absolute ml-10 hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm drop-shadow-lg md:block rounded-lg"
		>
		  <span class="text-black text-xl">
			Embrace the power of <span class="text-red-600 font-semibold"
			  >Agniva</span
			> <br />
			in streamlining your career goals, enhancing productivity. <br />
			Imagine missing it.
		  </span>
		</div>
	  </div>
	</div>
  </div>

  <style>
	/* Any additional custom styles can go here */
	:global(body) {
	  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
  </style>