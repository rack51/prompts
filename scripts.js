document.addEventListener('DOMContentLoaded', () => {
  const promptText = document.getElementById('prompt-text');
  const nextPromptButton = document.getElementById('next-prompt');
  
  let displayedPrompts = []; // To track displayed prompts

  // Function to fetch the next prompt that hasn't been displayed
  async function fetchNextPrompt() {
    try {
      const response = await fetch('https://wssdtetyjafznlphnrmb.supabase.co/rest/v1/prompts', {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzc2R0ZXR5amFmem5scGhucm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3MTI2MTksImV4cCI6MjAwNjI4ODYxOX0.xkFd8YYPahe90YDjBsdks1Co9GjcaudFz2BTWsfDTV0',
          'Prefer': 'return=representation',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prompt.');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching prompt:', error);
      return null;
    }
  }

  // Display the next prompt
  async function displayNextPrompt() {
    try {
      const prompt = await fetchNextPrompt();

      if (prompt) {
        promptText.textContent = prompt[0].prompt_text;
        displayedPrompts.push(prompt[0].id);
      } else {
        promptText.textContent = 'No more prompts available.';
        nextPromptButton.disabled = true;
      }
    } catch (error) {
      console.error('Error displaying prompt:', error);
      promptText.textContent = 'Error fetching prompt.';
    }
  }

  // Handle "Next Prompt" button click
  nextPromptButton.addEventListener('click', displayNextPrompt);

  // Display the first prompt when the page loads
  displayNextPrompt();
});
