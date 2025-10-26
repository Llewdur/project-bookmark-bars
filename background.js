/**
 * Background script for Project Bookmark Bars
 * Handles initialization and keyboard commands
 */

const STORAGE_KEY = 'bookmarkBarsData';

/**
 * Generate a unique ID
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get data from storage
 */
async function getData() {
  const result = await browser.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || null;
}

/**
 * Save data to storage
 */
async function saveData(data) {
  await browser.storage.local.set({ [STORAGE_KEY]: data });
}

/**
 * Initialize default data structure
 */
async function initializeData() {
  const data = await getData();

  if (!data) {
    const defaultBar = {
      id: generateId(),
      name: 'My Bookmarks',
      collapsed: false,
      bookmarks: []
    };

    const initialData = {
      bars: [defaultBar],
      activeBarId: defaultBar.id
    };

    await saveData(initialData);
    console.log('Initialized default bookmark bar');
  }
}

/**
 * Switch to a specific bar by index (0-based)
 */
async function switchToBar(index) {
  const data = await getData();
  if (!data || !data.bars[index]) {
    return;
  }

  data.activeBarId = data.bars[index].id;
  await saveData(data);

  // Notify sidebar to update
  browser.runtime.sendMessage({ type: 'BAR_SWITCHED', barId: data.activeBarId });
}

/**
 * Switch to next/previous bar
 */
async function switchBar(direction) {
  const data = await getData();
  if (!data || data.bars.length === 0) {
    return;
  }

  const currentIndex = data.bars.findIndex(bar => bar.id === data.activeBarId);
  let newIndex;

  if (direction === 'next') {
    newIndex = (currentIndex + 1) % data.bars.length;
  } else {
    newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = data.bars.length - 1;
    }
  }

  data.activeBarId = data.bars[newIndex].id;
  await saveData(data);

  // Notify sidebar to update
  browser.runtime.sendMessage({ type: 'BAR_SWITCHED', barId: data.activeBarId });
}

/**
 * Handle keyboard commands
 */
browser.commands.onCommand.addListener(async (command) => {
  console.log('Command received:', command);

  switch (command) {
    case 'switch-to-next':
      await switchBar('next');
      break;
    case 'switch-to-previous':
      await switchBar('previous');
      break;
    case 'switch-to-bar-1':
      await switchToBar(0);
      break;
    case 'switch-to-bar-2':
      await switchToBar(1);
      break;
    case 'switch-to-bar-3':
      await switchToBar(2);
      break;
  }
});

/**
 * Initialize on install
 */
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('Extension installed, initializing...');
    await initializeData();
  }
});

/**
 * Initialize on startup (in case storage was cleared)
 */
browser.runtime.onStartup.addListener(async () => {
  await initializeData();
});

// Initialize immediately
initializeData();
