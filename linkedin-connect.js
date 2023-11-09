(function() {
  const SEE_ALL_BUTTON_SELECTOR = '.artdeco-button[aria-label="See all People you may know based on your recent activity"]';
  const CONNECT_BUTTON_TEXT = 'Connect';
  const SHOW_MORE_BUTTON_SELECTOR = '.scaffold-finite-scroll__load-button';

  const randomDelay = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const automateConnect = async () => {
    // Click "See all" button
    const seeAllButton = document.querySelector(SEE_ALL_BUTTON_SELECTOR);
    if (seeAllButton) {
      seeAllButton.click();
    }

    // Function to click "Connect" buttons
    const clickConnectButtons = async () => {
      const connectButtons = document.querySelectorAll('.artdeco-button .artdeco-button__text');
      for (const button of connectButtons) {
        if (button.textContent.trim() === CONNECT_BUTTON_TEXT) {
          button.closest('.artdeco-button').click();

          // Delay a bit to simulate human-like interaction
          await new Promise(resolve => setTimeout(resolve, randomDelay(5000, 9000)));

          // Find the "Connect" button within the modal dialog
          const connectModalButton = document.querySelector('.artdeco-button[aria-label="Connect"]');
          if (connectModalButton) {
            connectModalButton.click();
          }

          // Delay before processing the next profile
          await new Promise(resolve => setTimeout(resolve, randomDelay(10000, 15000)));
        }
      }
    };

    // Function to click "Show more results" button and load additional profiles
    const loadMoreResults = async () => {
      const showMoreButton = document.querySelector(SHOW_MORE_BUTTON_SELECTOR);
      if (showMoreButton) {
        showMoreButton.click();

        // Delay a bit to allow more profiles to load
        await new Promise(resolve => setTimeout(resolve, randomDelay(23000, 25000)));

        await clickConnectButtons(); // After loading, click "Connect" buttons again
        await loadMoreResults(); // Recursively load more results
      }
    };

    // Wait for the "See all" page to load, then find and click "Connect" buttons
    setTimeout(async () => {
      await clickConnectButtons();
      await loadMoreResults(); // Start loading more results
    }, 2000);
  };

  automateConnect();
})();
