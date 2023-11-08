(function() {
    const DELETE = "Delete conversation";
    const goneFn = () => {
      const timer = setInterval(() => {
        const dropdown = document.querySelector('.msg-thread-actions__control');
        if (!dropdown) return clearInterval(timer);
        dropdown.click(); // Opens Up Menu
        const dropdownItems = document.querySelectorAll('.msg-thread-actions__dropdown-option');
        for (let i = 0; i < dropdownItems.length; i++) {
          let txt = dropdownItems[i].textContent.trim();
          if (txt === DELETE) {
            dropdownItems[i].click();
            // Delay a bit to allow the modal to open
            setTimeout(() => {
              // Find the "Yes, delete" button within the modal dialog
              const deleteButton = document.querySelector('.artdeco-modal .artdeco-button--primary');
              if (deleteButton) {
                deleteButton.click();
              }
            }, 500);
          }
        }
      }, 1000);
      setInterval(() => {
        let objDiv = document.querySelector('.msg-conversations-container__conversations-list');
        objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
      }, 5000);
    };
    goneFn();
  })();
  