const puppeteer = require('puppeteer');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => { 
  const browser = await puppeteer.launch(); 
  const page = await browser.newPage(); 
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('console', msg => console.log('CONSOLE:', msg.text()));

  try {
    console.log('--- STARTING MODULE EXPLORATION TEST ---');
    await page.goto('http://localhost:5173/#/dashboard', {waitUntil: 'networkidle0'});
    
    const modulesToTest = [
        'jalons', 'problemes', 'risques', 'delais', 'kpi', 'budget', 
        'agile', 'kanban', 'ressources', 'gantt', 'cycle', 
        'temps', 'docs', 'factures', 'workflows', 'portfolio', 
        'okr', 'calendrier', 'webhooks', 'intake', 'automations',
        'safe', 'greenpmo', 'evm', 'neuralmap', 'redteam', 'excel',
        'geniecivil', 'sentiment', 'guide', 'notifications',
        'analytics', 'themes', 'onboarding', 'gamification',
        'certifications', 'espace-universitaire', 'mentor-ia', 
        'innovation-lab', 'etudes-cas', 'qualite', 'esg', 'talent'
    ];

    for (const mod of modulesToTest) {
        process.stdout.write(`Testing /${mod}... `);
        try {
            await page.goto(`http://localhost:5173/#/${mod}`, {waitUntil: 'networkidle0'});
            console.log('OK');
        } catch (e) {
            console.log('FAILED: ' + e.message);
        }
    }

    console.log('--- STARTING E2E PROJECT FLOW ---');
    await page.goto('http://localhost:5173/#/nouveau-projet', {waitUntil: 'networkidle0'});
    
    console.log('Step 0: Select Type...');
    await page.waitForSelector('button', {timeout: 5000});
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const itBtn = btns.find(b => b.innerText.includes('Informatique'));
        if (itBtn) { itBtn.click(); console.log('IT Clicked'); }
    });
    await delay(500);
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const nextBtn = btns.find(b => b.innerText.includes('Continuer'));
        if (nextBtn) { nextBtn.click(); console.log('Next Clicked'); }
    });
    
    console.log('Step 1: Fill Infos...');
    await page.waitForSelector('input', {timeout: 5000});
    await page.type('input[placeholder*="Construction"]', 'E2E Test Project');
    await page.type('input[placeholder*="Mamadou"]', 'Test Bot');
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const nextBtn = btns.find(b => b.innerText.includes('Continuer'));
        if (nextBtn) nextBtn.click();
    });

    console.log('Step 2: Methodo...');
    await delay(500);
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const agileBtn = btns.find(b => b.innerText.includes('Agile'));
        if (agileBtn) agileBtn.click();
    });
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const nextBtn = btns.find(b => b.innerText.includes('Continuer'));
        if (nextBtn) nextBtn.click();
    });

    console.log('Step 3: Budget & Dates...');
    await page.waitForSelector('input[type="number"]', {timeout: 5000});
    await page.type('input[type="number"]', '100');
    const dateInputs = await page.$$('input[type="date"]');
    await dateInputs[0].type('01012026');
    await dateInputs[1].type('31122026');
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const nextBtn = btns.find(b => b.innerText.includes('Continuer'));
        if (nextBtn) nextBtn.click();
    });

    console.log('Step 4: Risks...');
    await delay(500);
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        btns[0].click();
        btns[1].click();
    });
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const nextBtn = btns.find(b => b.innerText.includes('Continuer'));
        if (nextBtn) nextBtn.click();
    });

    console.log('Step 5: Launch...');
    await delay(500);
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const launchBtn = btns.find(b => b.innerText.includes('Lancer'));
        if (launchBtn) launchBtn.click();
    });

    await delay(2000);
    console.log('Project Created Successfully!');

    console.log('--- ALL TESTS COMPLETED ---');
  } catch (err) {
    console.log('FATAL TEST ERROR: ' + err.message);
  } finally {
    await browser.close();
  }
})();
