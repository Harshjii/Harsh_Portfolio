/**
 * Storage Manager for managing Backend API communications (replaces LocalStorage).
 */
const API_BASE_URL = "http://localhost:5000/api";

export const StorageManager = {
    /**
     * Save contact message to MongoDB via Backend.
     * @param {Object} message - The message details.
     * @returns {Promise<boolean>} Success status.
     */
    async saveMessage(message) {
        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: message.name,
                    email: message.email,
                    subject: message.subject || "Contact Form Submission",
                    message: message.message
                })
            });

            const data = await response.json();
            return data.success;
        } catch (e) {
            console.error("Error saving message to database:", e);
            return false;
        }
    },

    /**
     * Retrieve all saved messages from MongoDB via Backend.
     * @returns {Promise<Array>} List of saved messages.
     */
    async getMessages() {
        try {
            const response = await fetch(`${API_BASE_URL}/contact`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch (e) {
            console.error("Error reading messages from backend:", e);
            return [];
        }
    },

    /**
     * Increment click count for a specific project via Backend.
     * @param {string} projectId - The unique name of the project.
     * @returns {Promise<boolean>} Success status.
     */
    async trackProjectClick(projectId) {
        try {
            const response = await fetch(`${API_BASE_URL}/metrics/click`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    projectName: projectId
                })
            });

            const data = await response.json();
            return data.success;
        } catch (e) {
            console.error("Error tracking project click in backend:", e);
            return false;
        }
    },

    /**
     * Retrieve all project click metrics from Backend.
     * @returns {Promise<Object>} Project click counts map.
     */
    async getProjectClicks() {
        try {
            const response = await fetch(`${API_BASE_URL}/metrics/clicks`);
            const data = await response.json();
            if (data.success && data.data) {
                // Transform data array into a map key-value matching the original format
                const clicksMap = {};
                data.data.forEach(item => {
                    clicksMap[item.projectName] = item.count;
                });
                return clicksMap;
            }
            return {};
        } catch (e) {
            console.error("Error reading project clicks from backend:", e);
            return {};
        }
    }
};
