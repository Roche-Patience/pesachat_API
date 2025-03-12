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
            from: document.getElementById("from-message").value,
            message: document.getElementById("message-text").value
        };

        if (!data.to || !data.from || !data.message) {
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
});
