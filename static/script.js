document.addEventListener("DOMContentLoaded", function () {
    // Helper Functions
    function showError(id, message) {
        const errorDiv = document.getElementById(id);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = "block";
        }
    }

    function hideError(id) {
        const errorDiv = document.getElementById(id);
        if (errorDiv) {
            errorDiv.style.display = "none";
        }
    }

    function showIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.style.display = "inline-block";
        }
    }

    function hideIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.style.display = "none";
        }
    }

    function handleResponse(response, indicatorId, errorId) {
        hideIndicator(indicatorId);
        if (response.status === "error") {
            showError(errorId, response.message || "An error occurred");
        } else {
            hideError(errorId);
            alert("Request successful!");
        }
    }

    async function sendRequest(url, data, indicatorId, errorId) {
        hideError(errorId);
        showIndicator(indicatorId);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            handleResponse(result, indicatorId, errorId);
        } catch (error) {
            showError(errorId, "Error processing request");
            console.error("Request failed:", error);
        }
    }

    // Event Listeners
    document.getElementById("send-message-btn")?.addEventListener("click", () => {
        const data = {
            to: document.getElementById("to-message").value,
            message: document.getElementById("message-text").value
        };

        if (!data.to || !data.message) {
            showError("message-error", "Please fill in all fields");
            return;
        }

        sendRequest("/send_message", data, "message-indicator", "message-error");
    });

    document.getElementById("send-media-btn")?.addEventListener("click", () => {
        const data = {
            to: document.getElementById("to-media").value,
            from: document.getElementById("from-media").value,
            mediaType: document.getElementById("media-type").value,
            mediaUrl: document.getElementById("media-url").value,
            caption: document.getElementById("caption").value || ""
        };

        if (!data.to || !data.from || !data.mediaType || !data.mediaUrl) {
            showError("media-error", "Please fill in all required fields");
            return;
        }

        sendRequest("/send-media", data, "media-indicator", "media-error");
    });

    document.getElementById("send-buttons-btn")?.addEventListener("click", () => {
        const data = {
            to: document.getElementById("to-buttons").value,
            from: document.getElementById("from-buttons").value
        };

        if (!data.to || !data.from) {
            showError("buttons-error", "Please fill in all required fields");
            return;
        }

        sendRequest("/send_buttons", data, "buttons-indicator", "buttons-error");
    });

    document.getElementById("send-interactive-btn")?.addEventListener("click", () => {
        const data = {
            to: document.getElementById("to-interactive").value,
            from: document.getElementById("from-interactive").value
        };

        if (!data.to || !data.from) {
            showError("interactive-error", "Please fill in all required fields");
            return;
        }

        sendRequest("/send-interactive-list", data, "interactive-indicator", "interactive-error");
    });




  document.getElementById("create-template-btn")?.addEventListener("click", () => {
  // Show the loader and hide any previous error messages
  document.getElementById("create-template-indicator").style.display = "inline-block";
  document.getElementById("create-template-error").style.display = "none";

  // Collect form data
  const data = {
    templateName: document.getElementById("template-name").value,
    language: document.getElementById("language").value,
    category: document.getElementById("category").value,
    headerFormat: document.getElementById("header-format").value,
    headerText: document.getElementById("header-text").value,
    headerExample: document.getElementById("header-example").value,
    bodyText: document.getElementById("body-text").value,
    bodyExamples: document.getElementById("body-examples").value
  };

  // Basic validation
  if (!data.templateName || !data.language || !data.category) {
    document.getElementById("create-template-error").textContent = "Please fill in all required fields.";
    document.getElementById("create-template-error").style.display = "block";
    document.getElementById("create-template-indicator").style.display = "none";
    return;
  }

  // Send the POST request
  fetch("/create_template", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      document.getElementById("create-template-indicator").style.display = "none";
      if (!response.ok) {
        return response.json().then(err => {
         showError(errorId, "Error processing request");
          document.getElementById("create-template-error").textContent = "Error: " + err.error;
          document.getElementById("create-template-error").style.display = "block";
        });
      } else {
        // Handle successful response
         alert("Request successful!");
        console.log("Template created successfully");
        // You can add additional success handling here
      }
    })
    .catch(error => {
      document.getElementById("create-template-indicator").style.display = "none";
      document.getElementById("create-template-error").textContent = "Error: " + error.message;
      document.getElementById("create-template-error").style.display = "block";
    });
});


});


