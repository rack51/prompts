document.addEventListener('DOMContentLoaded', () => {
  const promptText = document.getElementById('prompt-text');

  // Function to fetch the prompt of the day
  async function fetchPromptOfTheDay() {
    try {
      const response = await fetch('https://wssdtetyjafznlphnrmb.supabase.co/rest/v1/prompts/rest/v1/prompts', {
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

  // Display the prompt of the day when the page loads
  async function displayPromptOfTheDay() {
    try {
      const prompt = await fetchPromptOfTheDay();

      if (prompt && prompt.length > 0) {
        promptText.textContent = prompt[0].prompt_text;
      } else {
        promptText.textContent = 'No prompt available for today.';
      }
    } catch (error) {
      console.error('Error displaying prompt:', error);
      promptText.textContent = 'Error fetching prompt.';
    }
  }

  // Display the prompt of the day when the page loads
  displayPromptOfTheDay();
});
