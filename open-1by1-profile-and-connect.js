const randomDelay = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const simulateClick = async (element) => {
  if (element) {
    element.click();
    await new Promise((resolve) => setTimeout(resolve, randomDelay(2000, 4000)));
  }
};

const simulateKeyPress = async (element, text) => {
  if (element) {
    // Use element.focus() to ensure proper focus for input and textarea elements
    element.focus();

    for (const char of text) {
      await new Promise((resolve) => {
        // Update the value of the textarea
        element.value += char;

        // Create an input event and dispatch it
        const inputEvent = new Event('input', { bubbles: true });
        element.dispatchEvent(inputEvent);

        setTimeout(resolve, randomDelay(20, 50));
      });
    }
  }
};

const waitForElement = async (selector) => {
  let element;
  while (!element) {
    element = document.querySelector(selector);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return element;
};

const isModalOpen = () => {
  return document.querySelector('.artdeco-modal--layer-default.send-invite') !== null;
};

const automateLinkedInConnection = async () => {
  try {
    // Find and click the profile link
    const profileLinkElement = document.querySelector('.entity-result__title-line .app-aware-link');
    if (!profileLinkElement) {
      console.error('Profile link element not found.');
      return;
    }
    profileLinkElement.click();

    // Wait for the profile page to load
    await new Promise((resolve) => setTimeout(resolve, randomDelay(5000, 7000)));

    // Check if the modal is open
    if (isModalOpen()) {
      // Click the "Add a note" button directly
      const addNoteButton = await waitForElement('[aria-label="Add a note"]');
      await simulateClick(addNoteButton);

      // Input the message in the textarea
      const noteTextarea = document.querySelector('#custom-message');
      if (noteTextarea) {
        await simulateKeyPress(noteTextarea, "Hi, I'm Dyla Razak, founder of RealmChat, a Messaging Commerce Platform. Seeking investment for our seed startup. Interested in a quick chat for potential opportunities?");
      } else {
        console.error('Note textarea not found.');
        return;
      }

      // Wait for a brief moment (you may adjust this delay based on your testing)
      await new Promise((resolve) => setTimeout(resolve, randomDelay(1000, 2000)));

      // Send the connection request
      const sendNowButton = await waitForElement('[aria-label="Send now"]');
      await simulateClick(sendNowButton);

      console.log('Connection process completed successfully.');
    } else {
      // Open the "More" dropdown
      const moreDropdown = document.querySelector('.artdeco-dropdown__trigger--placement-bottom');
      await simulateClick(moreDropdown);

      // Check if "Connect" is inside the "More" dropdown
      let connectOption = document.querySelector('.artdeco-dropdown__item--is-dropdown[aria-label^="Invite"]');
      if (!connectOption) {
        console.error('Connect option/button not found.');
        return;
      }

      // Click the "Connect" option
      await simulateClick(connectOption);

      // Automate connection with a note
      const addNoteButton = await waitForElement('[aria-label="Add a note"]');
      await simulateClick(addNoteButton);

      // Input the message in the textarea
      const noteTextarea = document.querySelector('#custom-message');
      if (noteTextarea) {
        await simulateKeyPress(noteTextarea, "Hi, I'm Dyla Razak, founder of RealmChat, a Messaging Commerce Platform. Seeking investment for our seed startup. Interested in a quick chat for potential opportunities?");
      } else {
        console.error('Note textarea not found.');
        return;
      }

      // Wait for a brief moment (you may adjust this delay based on your testing)
      await new Promise((resolve) => setTimeout(resolve, randomDelay(1000, 2000)));

      // Send the connection request
      const sendNowButton = await waitForElement('[aria-label="Send now"]');
      await simulateClick(sendNowButton);

      console.log('Connection process completed successfully.');
    }
  } catch (error) {
    console.error('Error during automation:', error);
  }
};

// Click the More button to reveal the Connect button
var moreButton = document.querySelector('button.artdeco-button--secondary');
if (moreButton) {
  moreButton.click();

  // Wait for a short duration to ensure the Connect button is visible
  setTimeout(async function () {
    // Click the Connect button if it is a "Connect" button, ignore if it is a "Follow" button
    var connectButton = document.querySelector('button.artdeco-button--primary span:contains("Connect")');
    if (connectButton) {
      await simulateClick(connectButton);
    } else {
      console.error('Connect button not found.');
    }
  }, 2000); // Adjust the duration (in milliseconds) based on your needs
} else {
  console.error('More button not found.');
}

// Run the automation
automateLinkedInConnection();
