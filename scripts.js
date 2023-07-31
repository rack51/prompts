document.addEventListener('DOMContentLoaded', () => {
  const promptText = document.getElementById('prompt-text');
  const nextPromptButton = document.getElementById('next-prompt');

  // Function to fetch and display the next prompt
  async function fetchAndDisplayNextPrompt() {
    try {
      // Fetch the next prompt from Supabase
      const response = await fetch('/api/get-next-prompt');
      const data = await response.json();

      if (data && data.prompt_text) {
        promptText.textContent = data.prompt_text;
        // Mark the prompt as displayed (update 'displayed' to true)
        await markPromptAsDisplayed(data.id);
      } else {
        promptText.textContent = 'No more prompts available.';
        nextPromptButton.disabled = true;
      }
    } catch (error) {
      console.error('Error fetching prompt:', error);
      promptText.textContent = 'Error fetching prompt.';
    }
  }

  // Function to mark the prompt as displayed (update 'displayed' to true)
  async function markPromptAsDisplayed(promptId) {
    try {
      const response = await fetch('/api/mark-prompt-as-displayed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptId }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark prompt as displayed.');
      }
    } catch (error) {
      console.error('Error marking prompt as displayed:', error);
    }
  }

  nextPromptButton.addEventListener('click', fetchAndDisplayNextPrompt);

  // Fetch and display the first prompt when the page loads
  fetchAndDisplayNextPrompt();
});
