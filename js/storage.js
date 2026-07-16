/**
 * Storage Manager for managing LocalStorage data.
 */
export const StorageManager = {
    /**
     * Save contact message to localStorage.
     * @param {Object} message - The message details.
     * @returns {boolean} Success status.
     */
    saveMessage(message) {
        try {
            const messages = this.getMessages();
            messages.push({
                ...message,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem("portfolio_contact_messages", JSON.stringify(messages));
            return true;
        } catch (e) {
            console.error("Error saving message to localStorage:", e);
            return false;
        }
    },

    /**
     * Retrieve all saved messages from localStorage.
     * @returns {Array} List of saved messages.
     */
    getMessages() {
        try {
            const data = localStorage.getItem("portfolio_contact_messages");
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error reading messages from localStorage:", e);
            return [];
        }
    },

    /**
     * Increment click count for a specific project.
     * @param {string} projectId - The unique name of the project.
     * @returns {number} Updated click count.
     */
    trackProjectClick(projectId) {
        try {
            const clicks = this.getProjectClicks();
            clicks[projectId] = (clicks[projectId] || 0) + 1;
            localStorage.setItem("portfolio_project_clicks", JSON.stringify(clicks));
            return clicks[projectId];
        } catch (e) {
            console.error("Error tracking project click in localStorage:", e);
            return 0;
        }
    },

    /**
     * Retrieve all project click metrics.
     * @returns {Object} Project click counts map.
     */
    getProjectClicks() {
        try {
            const data = localStorage.getItem("portfolio_project_clicks");
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error("Error reading project clicks from localStorage:", e);
            return {};
        }
    }
};
