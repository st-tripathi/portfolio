const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    let browser;
    try {
        console.log('🚀 Launching headless browser to run integration tests...');
        browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--allow-file-access-from-files'
            ]
        });
        const page = await browser.newPage();

        // Use absolute path for the test file
        const testFilePath = 'file:///app/docs/tests/index.html';
        console.log(`🔗 Navigating to ${testFilePath}...`);

        await page.goto(testFilePath, { waitUntil: 'networkidle0' });

        // Wait for the summary element to appear (indicating tests are done)
        console.log('⏳ Waiting for tests to complete...');
        await page.waitForSelector('.summary', { timeout: 30000 });

        // Extract test results
        const results = await page.evaluate(() => {
            const summary = document.querySelector('.summary');
            const text = summary ? summary.textContent : '';
            const isPass = summary ? summary.classList.contains('all-pass') : false;

            const failures = Array.from(document.querySelectorAll('.test.fail'))
                .map(el => el.textContent.trim());

            return { text, isPass, failures };
        });

        console.log('\n========================================');
        console.log('🧪 TEST RESULTS SUMMARY:');
        console.log(results.text.trim());
        console.log('========================================\n');

        if (results.isPass) {
            console.log('✅ ALL TESTS PASSED! Safe to commit.');
            process.exit(0);
        } else {
            console.log('❌ TESTS FAILED!');
            results.failures.forEach(fail => console.log(`   - ${fail}`));
            console.log('\n🛑 Commit aborted. Please fix the tests above before committing.');
            process.exit(1);
        }
    } catch (error) {
        console.error('💥 Error running tests:', error.message);
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
})();
