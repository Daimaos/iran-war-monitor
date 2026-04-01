const cron = require('node-cron');
const { fetchNews } = require('./newsService');
const { fetchACLEDEvents } = require('./acledService');

function startScheduler() {
    console.log('⏰ Scheduler started');

    // Fetch news every 2 hours
    cron.schedule('0 */2 * * *', async () => {
        console.log('🔄 Scheduled news fetch...');
        await fetchNews();
    });

    // Fetch ACLED events every 6 hours
    cron.schedule('0 */6 * * *', async () => {
        console.log('🔄 Scheduled ACLED fetch...');
        await fetchACLEDEvents();
    });

    // Run immediately on startup
    fetchNews();
    fetchACLEDEvents();
}

module.exports = { startScheduler };