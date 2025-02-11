
    // Helper function to handle API responses
    function showError(id, message) {
        const errorDiv = document.getElementById(id);
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    function hideError(id) {
        const errorDiv = document.getElementById(id);
        errorDiv.style.display = 'none';
    }

    function showIndicator(id) {
        const indicator = document.getElementById(id);
        indicator.style.display = 'inline-block';
    }

    function hideIndicator(id) {
        const indicator = document.getElementById(id);
        indicator.style.display = 'none';
    }

    function handleResponse(response, indicatorId, errorId) {
        hideIndicator(indicatorId);
        if (response.status === "error") {
            showError(errorId, response.message);
        } else {
            hideError(errorId);
            alert("Request successful!");
        }
    }

    // Send Message
    document.getElementById('send-message-btn').addEventListener('click', () => {
        const to = document.getElementById('to-message').value;
        const from = document.getElementById('from-message').value;
        const message = document.getElementById('message-text').value;

        if (!to || !from || !message) {
            showError('message-error', 'Please fill in all fields');
            return;
        }

        hideError('message-error');
        showIndicator('message-indicator');

        fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                   body: JSON.stringify({
        to: to,
        from: from,
        message: message
    })
        })
        .then(response => response.json())
        .then(data => handleResponse(data, 'message-indicator', 'message-error'))
        .catch(err => showError('message-error', 'Error sending message'));
    });

    // Send Media
    document.getElementById('send-media-btn').addEventListener('click', () => {
        const to = document.getElementById('to-media').value;
        const from = document.getElementById('from-media').value;
        const mediaType = document.getElementById('media-type').value;
        const mediaUrl = document.getElementById('media-url').value;
        const caption = document.getElementById('caption').value;

        if (!to || !from || !mediaType || !mediaUrl) {
            showError('media-error', 'Please fill in all required fields');
            return;
        }

        hideError('media-error');
        showIndicator('media-indicator');

        fetch('/send-media', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to, from, mediaType, mediaUrl, caption })
        })
        .then(response => response.json())
        .then(data => handleResponse(data, 'media-indicator', 'media-error'))
        .catch(err => showError('media-error', 'Error sending media'));
    });

    // Send Buttons
    document.getElementById('send-buttons-btn').addEventListener('click', () => {
        const to = document.getElementById('to-buttons').value;
        const from = document.getElementById('from-buttons').value;

        if (!to || !from) {
            showError('buttons-error', 'Please fill in all required fields');
            return;
        }

        hideError('buttons-error');
        showIndicator('buttons-indicator');

        fetch('/send_buttons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to, from })
        })
        .then(response => response.json())
        .then(data => handleResponse(data, 'buttons-indicator', 'buttons-error'))
        .catch(err => showError('buttons-error', 'Error sending buttons'));
    });

    // Send Interactive List
    document.getElementById('send-interactive-btn').addEventListener('click', () => {
        const to = document.getElementById('to-interactive').value;
        const from = document.getElementById('from-interactive').value;

        if (!to || !from) {
            showError('interactive-error', 'Please fill in all required fields');
            return;
        }

        hideError('interactive-error');
        showIndicator('interactive-indicator');

        fetch('/send-interactive-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to, from })
        })
        .then(response => response.json())
        .then(data => handleResponse(data, 'interactive-indicator', 'interactive-error'))
        .catch(err => showError('interactive-error', 'Error sending interactive list'));
    });