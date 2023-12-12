// Select all elements with the class app-aware-link
const appAwareLinkElements = document.querySelectorAll('.app-aware-link');

// Initialize a Set to store unique href values
const uniqueHrefs = new Set();

// Iterate through each app-aware-link element
appAwareLinkElements.forEach((element) => {
  // Extract the href attribute value
  const hrefValue = element.getAttribute('href');

  // Check if the href contains the desired substring
  if (hrefValue.includes('https://www.linkedin.com/in/')) {
    // Add the href to the Set to ensure uniqueness
    uniqueHrefs.add(hrefValue);
  }
});

// Convert the Set to an array
const uniqueHrefsArray = Array.from(uniqueHrefs);

// Create a JSON object with the unique href values
const jsonData = {
  uniqueHrefs: uniqueHrefsArray
};

// Convert the JSON object to a string with beautified formatting
const jsonString = JSON.stringify(jsonData, null, 2);

// Log the JSON string
console.log(jsonString);
