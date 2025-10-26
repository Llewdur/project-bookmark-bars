/**
 * Sidebar script for Project Bookmark Bars
 * Handles UI rendering and user interactions
 */

const STORAGE_KEY = 'bookmarkBarsData';

// State
let data = null;
let currentModal = null;
let currentEditContext = null;

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
  return result[STORAGE_KEY] || { bars: [], activeBarId: null };
}

/**
 * Save data to storage
 */
async function saveData(newData) {
  await browser.storage.local.set({ [STORAGE_KEY]: newData });
  data = newData;
}

/**
 * Get favicon URL for a website
 */
function getFaviconUrl(url) {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
  } catch {
    return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><text y="12" font-size="12">🔖</text></svg>';
  }
}

/**
 * Render the entire UI
 */
function render() {
  const container = document.getElementById('bars-container');

  if (!data || data.bars.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No bookmark bars yet.</p>
        <p>Click "+ New Bar" to get started.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  data.bars.forEach(bar => {
    const barElement = createBarElement(bar);
    container.appendChild(barElement);
  });
}

/**
 * Create a bookmark bar element
 */
function createBarElement(bar) {
  const isActive = bar.id === data.activeBarId;
  const isExpanded = !bar.collapsed;

  const barDiv = document.createElement('div');
  barDiv.className = `bookmark-bar ${bar.collapsed ? 'collapsed' : ''}`;
  barDiv.dataset.barId = bar.id;

  // Bar header
  const header = document.createElement('div');
  header.className = `bar-header ${isActive ? 'active' : ''}`;

  const collapseIcon = document.createElement('span');
  collapseIcon.className = `collapse-icon ${isExpanded ? 'expanded' : ''}`;
  collapseIcon.textContent = '▶';

  const name = document.createElement('span');
  name.className = 'bar-name';
  name.textContent = bar.name;

  const actions = document.createElement('div');
  actions.className = 'bar-actions';

  // Open all button
  const openAllBtn = document.createElement('button');
  openAllBtn.className = 'btn-icon';
  openAllBtn.title = 'Open all bookmarks';
  openAllBtn.textContent = '⇪';
  openAllBtn.onclick = (e) => {
    e.stopPropagation();
    openAllBookmarks(bar.id);
  };

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'btn-icon';
  editBtn.title = 'Rename bar';
  editBtn.textContent = '✎';
  editBtn.onclick = (e) => {
    e.stopPropagation();
    showEditBarModal(bar.id);
  };

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-icon danger';
  deleteBtn.title = 'Delete bar';
  deleteBtn.textContent = '✕';
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    deleteBar(bar.id);
  };

  actions.appendChild(openAllBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  header.appendChild(collapseIcon);
  header.appendChild(name);
  header.appendChild(actions);

  // Toggle collapse and set active on click
  header.onclick = () => {
    toggleBarCollapse(bar.id);
    setActiveBar(bar.id);
  };

  // Add drag-and-drop support to header (for collapsed bars)
  setupHeaderDragAndDrop(header, bar.id);

  // Bookmarks list
  const bookmarksList = document.createElement('div');
  bookmarksList.className = `bookmarks-list ${isExpanded ? 'expanded' : ''}`;

  if (bar.bookmarks && bar.bookmarks.length > 0) {
    bar.bookmarks.forEach(bookmark => {
      const bookmarkElement = createBookmarkElement(bar.id, bookmark);
      bookmarksList.appendChild(bookmarkElement);
    });
  }

  // Add bookmark button
  const addBookmarkBtn = document.createElement('button');
  addBookmarkBtn.className = 'add-bookmark-btn';
  addBookmarkBtn.textContent = '+ Add Bookmark';
  addBookmarkBtn.onclick = () => showAddBookmarkModal(bar.id);
  bookmarksList.appendChild(addBookmarkBtn);

  // Add drag-and-drop support
  setupDragAndDrop(bookmarksList, bar.id)

  barDiv.appendChild(header);
  barDiv.appendChild(bookmarksList);

  return barDiv;
}

/**
 * Create a bookmark element
 */
function createBookmarkElement(barId, bookmark) {
  const bookmarkDiv = document.createElement('div');
  bookmarkDiv.className = 'bookmark-item';
  bookmarkDiv.dataset.bookmarkId = bookmark.id;
  bookmarkDiv.dataset.barId = barId;
  bookmarkDiv.draggable = true;

  // Handle drag start
  bookmarkDiv.ondragstart = (e) => {
    e.stopPropagation();
    // Store both bar ID and bookmark ID
    e.dataTransfer.setData('application/x-bookmark-internal', JSON.stringify({
      sourceBarId: barId,
      bookmarkId: bookmark.id,
      title: bookmark.title,
      url: bookmark.url
    }));
    e.dataTransfer.effectAllowed = 'move';
    bookmarkDiv.classList.add('dragging');
  };

  // Handle drag end
  bookmarkDiv.ondragend = (e) => {
    bookmarkDiv.classList.remove('dragging');
  };

  const favicon = document.createElement('img');
  favicon.className = 'bookmark-favicon';
  favicon.src = getFaviconUrl(bookmark.url);
  favicon.onerror = () => {
    favicon.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><text y="12" font-size="12">🔖</text></svg>';
  };

  const title = document.createElement('span');
  title.className = 'bookmark-title';
  title.textContent = bookmark.title;

  const actions = document.createElement('div');
  actions.className = 'bookmark-actions';

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'btn-icon';
  editBtn.title = 'Edit bookmark';
  editBtn.textContent = '✎';
  editBtn.onclick = (e) => {
    e.stopPropagation();
    showEditBookmarkModal(barId, bookmark.id);
  };

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-icon danger';
  deleteBtn.title = 'Delete bookmark';
  deleteBtn.textContent = '✕';
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    deleteBookmark(barId, bookmark.id);
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  bookmarkDiv.appendChild(favicon);
  bookmarkDiv.appendChild(title);
  bookmarkDiv.appendChild(actions);

  // Open bookmark on click
  bookmarkDiv.onclick = () => {
    browser.tabs.create({ url: bookmark.url });
  };

  return bookmarkDiv;
}

/**
 * Setup drag-and-drop for a bar header (allows dropping on collapsed bars)
 */
function setupHeaderDragAndDrop(header, barId) {
  // Prevent default behavior for dragover to enable drop
  header.addEventListener('dragover', (e) => {
    // Only allow internal bookmark drops on headers
    const types = e.dataTransfer.types || [];
    if (types.includes('application/x-bookmark-internal')) {
      e.preventDefault();
      e.stopPropagation();
      header.classList.add('drag-over-header');
    }
  });

  // Remove drag-over styling when leaving
  header.addEventListener('dragleave', (e) => {
    e.stopPropagation();
    if (e.target === header || header.contains(e.relatedTarget) === false) {
      header.classList.remove('drag-over-header');
    }
  });

  // Handle the drop
  header.addEventListener('drop', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    header.classList.remove('drag-over-header');

    // Only handle internal bookmarks on header drops
    const internalData = e.dataTransfer.getData('application/x-bookmark-internal');
    if (internalData) {
      try {
        const { sourceBarId, bookmarkId, title, url } = JSON.parse(internalData);

        // Don't do anything if dropping on the same bar
        if (sourceBarId === barId) {
          return;
        }

        // Move the bookmark from source bar to destination bar
        await moveBookmark(sourceBarId, bookmarkId, barId);
      } catch (error) {
        console.error('Error handling internal bookmark drop on header:', error);
      }
    }
  });
}

/**
 * Setup drag-and-drop for a bookmarks list
 */
function setupDragAndDrop(bookmarksList, barId) {
  // Prevent default behavior for dragover to enable drop
  bookmarksList.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    bookmarksList.classList.add('drag-over');
  });

  // Remove drag-over styling when leaving
  bookmarksList.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only remove if we're actually leaving the bookmarksList (not entering a child)
    if (e.target === bookmarksList) {
      bookmarksList.classList.remove('drag-over');
    }
  });

  // Handle the drop
  bookmarksList.addEventListener('drop', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    bookmarksList.classList.remove('drag-over');

    // Check if this is an internal bookmark being moved
    const internalData = e.dataTransfer.getData('application/x-bookmark-internal');
    if (internalData) {
      try {
        const { sourceBarId, bookmarkId, title, url } = JSON.parse(internalData);

        // If dropping on the same bar, handle reordering
        if (sourceBarId === barId) {
          // Calculate drop position based on mouse Y coordinate
          const dropIndex = getDropIndex(bookmarksList, e.clientY);
          await reorderBookmark(barId, bookmarkId, dropIndex);
          return;
        }

        // Move the bookmark from source bar to destination bar
        await moveBookmark(sourceBarId, bookmarkId, barId);
        return;
      } catch (error) {
        console.error('Error handling internal bookmark drop:', error);
      }
    }

    // Try to get URL and title from external drag data
    let url = null;
    let title = null;

    // Method 1: From Firefox bookmark bar or other bookmarks
    // Firefox provides text/x-moz-url with URL and title separated by newline
    const mozUrl = e.dataTransfer.getData('text/x-moz-url');
    if (mozUrl) {
      const lines = mozUrl.split('\n');

      // Check if this is a folder (multiple URLs)
      if (lines.length > 2) {
        // This is a folder - import all bookmarks
        await importBookmarksFromFolder(barId, lines);
        return;
      }

      url = lines[0];
      title = lines[1] || '';
    }

    // Method 2: From web page links or general URLs
    if (!url) {
      url = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
      title = e.dataTransfer.getData('text/html');

      // Try to extract title from HTML if available
      if (title) {
        const match = title.match(/>([^<]+)</);
        if (match) {
          title = match[1];
        } else {
          title = '';
        }
      }
    }

    // Validate URL
    if (!url) {
      console.warn('No URL found in dropped data');
      return;
    }

    // Clean up URL
    url = url.trim();

    // Validate it's a proper URL
    try {
      new URL(url);
    } catch {
      console.warn('Invalid URL dropped:', url);
      return;
    }

    // Clean up title (use hostname if no title provided)
    if (!title || title.trim() === '') {
      try {
        const urlObj = new URL(url);
        title = urlObj.hostname;
      } catch {
        title = 'Untitled';
      }
    }
    title = title.trim();

    // Add the bookmark
    await addBookmarkToBar(barId, title, url);
  });
}

/**
 * Add a bookmark to a bar (used by drag-and-drop)
 */
async function addBookmarkToBar(barId, title, url) {
  const bar = data.bars.find(b => b.id === barId);
  if (!bar) return;

  const newBookmark = {
    id: generateId(),
    title,
    url
  };

  if (!bar.bookmarks) {
    bar.bookmarks = [];
  }
  bar.bookmarks.push(newBookmark);

  await saveData(data);
  render();
}

/**
 * Move a bookmark from one bar to another
 */
async function moveBookmark(sourceBarId, bookmarkId, targetBarId) {
  const sourceBar = data.bars.find(b => b.id === sourceBarId);
  const targetBar = data.bars.find(b => b.id === targetBarId);

  if (!sourceBar || !targetBar) {
    console.error('Source or target bar not found');
    return;
  }

  // Find the bookmark in the source bar
  const bookmarkIndex = sourceBar.bookmarks.findIndex(b => b.id === bookmarkId);
  if (bookmarkIndex === -1) {
    console.error('Bookmark not found in source bar');
    return;
  }

  // Remove from source
  const [bookmark] = sourceBar.bookmarks.splice(bookmarkIndex, 1);

  // Add to target
  if (!targetBar.bookmarks) {
    targetBar.bookmarks = [];
  }
  targetBar.bookmarks.push(bookmark);

  await saveData(data);
  render();
}

/**
 * Reorder a bookmark within the same bar
 */
async function reorderBookmark(barId, bookmarkId, newIndex) {
  const bar = data.bars.find(b => b.id === barId);
  if (!bar || !bar.bookmarks) {
    return;
  }

  // Find the bookmark
  const oldIndex = bar.bookmarks.findIndex(b => b.id === bookmarkId);
  if (oldIndex === -1) {
    return;
  }

  // Don't do anything if dropping in the same position
  if (oldIndex === newIndex) {
    return;
  }

  // Remove from old position
  const [bookmark] = bar.bookmarks.splice(oldIndex, 1);

  // Adjust target index if we removed an item before it
  const insertIndex = newIndex > oldIndex ? newIndex - 1 : newIndex;

  // Insert at new position
  bar.bookmarks.splice(insertIndex, 0, bookmark);

  await saveData(data);
  render();
}

/**
 * Calculate drop index based on mouse Y position
 */
function getDropIndex(bookmarksList, clientY) {
  const bookmarkElements = Array.from(bookmarksList.querySelectorAll('.bookmark-item'));

  // If no bookmarks, insert at beginning
  if (bookmarkElements.length === 0) {
    return 0;
  }

  // Find which bookmark the mouse is over
  for (let i = 0; i < bookmarkElements.length; i++) {
    const rect = bookmarkElements[i].getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;

    // If mouse is in top half, insert before this bookmark
    if (clientY < midpoint) {
      return i;
    }
  }

  // If we got here, insert at the end
  return bookmarkElements.length;
}

/**
 * Import bookmarks from a folder (drag-drop from Firefox)
 */
async function importBookmarksFromFolder(barId, lines) {
  const bar = data.bars.find(b => b.id === barId);
  if (!bar) {
    return;
  }

  if (!bar.bookmarks) {
    bar.bookmarks = [];
  }

  // Parse lines: format is URL\nTitle\nURL\nTitle\n...
  let count = 0;
  for (let i = 0; i < lines.length - 1; i += 2) {
    const url = lines[i].trim();
    const title = lines[i + 1] ? lines[i + 1].trim() : '';

    // Skip if URL is empty or invalid
    if (!url) continue;

    try {
      new URL(url);

      // Add the bookmark
      const newBookmark = {
        id: generateId(),
        title: title || url,
        url: url
      };
      bar.bookmarks.push(newBookmark);
      count++;
    } catch {
      // Skip invalid URLs
      console.warn('Skipping invalid URL from folder:', url);
    }
  }

  if (count > 0) {
    await saveData(data);
    render();
    console.log(`Imported ${count} bookmarks from folder`);
  }
}

/**
 * Toggle bar collapse state
 */
async function toggleBarCollapse(barId) {
  const bar = data.bars.find(b => b.id === barId);
  if (!bar) return;

  bar.collapsed = !bar.collapsed;
  await saveData(data);
  render();
}

/**
 * Toggle all bars between collapsed and expanded
 */
async function toggleAll() {
  if (!data || !data.bars) return;

  // Check if all bars are currently collapsed
  const allCollapsed = data.bars.every(bar => bar.collapsed);

  // Toggle: if all collapsed, expand all; otherwise collapse all
  const newState = !allCollapsed;

  data.bars.forEach(bar => {
    bar.collapsed = newState;
  });

  await saveData(data);
  render();
}

/**
 * Set active bar
 */
async function setActiveBar(barId) {
  data.activeBarId = barId;
  await saveData(data);
  render();
}

/**
 * Open all bookmarks in a bar
 */
async function openAllBookmarks(barId) {
  const bar = data.bars.find(b => b.id === barId);
  if (!bar || !bar.bookmarks || bar.bookmarks.length === 0) {
    return;
  }

  // Ask for confirmation if more than 10 bookmarks
  if (bar.bookmarks.length > 10) {
    const confirmed = confirm(
      `This will open ${bar.bookmarks.length} tabs. Continue?`
    );
    if (!confirmed) return;
  }

  // Open all bookmarks
  for (const bookmark of bar.bookmarks) {
    await browser.tabs.create({ url: bookmark.url, active: false });
  }
}

/**
 * Show modal for adding a new bar
 */
function showAddBarModal() {
  currentEditContext = { type: 'add-bar' };
  document.getElementById('bar-modal-title').textContent = 'New Bookmark Bar';
  document.getElementById('bar-name-input').value = '';
  document.getElementById('bar-modal').classList.remove('hidden');
  document.getElementById('bar-name-input').focus();
}

/**
 * Show modal for editing a bar
 */
function showEditBarModal(barId) {
  const bar = data.bars.find(b => b.id === barId);
  if (!bar) return;

  currentEditContext = { type: 'edit-bar', barId };
  document.getElementById('bar-modal-title').textContent = 'Rename Bookmark Bar';
  document.getElementById('bar-name-input').value = bar.name;
  document.getElementById('bar-modal').classList.remove('hidden');
  document.getElementById('bar-name-input').focus();
}

/**
 * Save bar (add or edit)
 */
async function saveBar() {
  const name = document.getElementById('bar-name-input').value.trim();

  if (!name) {
    alert('Please enter a name for the bookmark bar.');
    return;
  }

  if (currentEditContext.type === 'add-bar') {
    // Add new bar
    const newBar = {
      id: generateId(),
      name,
      collapsed: false,
      bookmarks: []
    };
    data.bars.push(newBar);

    // Set as active if it's the first bar
    if (data.bars.length === 1) {
      data.activeBarId = newBar.id;
    }
  } else if (currentEditContext.type === 'edit-bar') {
    // Edit existing bar
    const bar = data.bars.find(b => b.id === currentEditContext.barId);
    if (bar) {
      bar.name = name;
    }
  }

  await saveData(data);
  closeModal('bar-modal');
  render();
}

/**
 * Delete a bar
 */
async function deleteBar(barId) {
  const bar = data.bars.find(b => b.id === barId);
  if (!bar) return;

  const bookmarkCount = bar.bookmarks ? bar.bookmarks.length : 0;
  const message = bookmarkCount > 0
    ? `Delete "${bar.name}" and its ${bookmarkCount} bookmark(s)?`
    : `Delete "${bar.name}"?`;

  if (!confirm(message)) {
    return;
  }

  data.bars = data.bars.filter(b => b.id !== barId);

  // If we deleted the active bar, set a new active bar
  if (data.activeBarId === barId) {
    data.activeBarId = data.bars.length > 0 ? data.bars[0].id : null;
  }

  await saveData(data);
  render();
}

/**
 * Show modal for adding a bookmark
 */
function showAddBookmarkModal(barId) {
  currentEditContext = { type: 'add-bookmark', barId };
  document.getElementById('bookmark-modal-title').textContent = 'New Bookmark';
  document.getElementById('bookmark-title-input').value = '';
  document.getElementById('bookmark-url-input').value = '';
  document.getElementById('bookmark-modal').classList.remove('hidden');
  document.getElementById('bookmark-title-input').focus();
}

/**
 * Show modal for editing a bookmark
 */
function showEditBookmarkModal(barId, bookmarkId) {
  const bar = data.bars.find(b => b.id === barId);
  if (!bar) return;

  const bookmark = bar.bookmarks.find(b => b.id === bookmarkId);
  if (!bookmark) return;

  currentEditContext = { type: 'edit-bookmark', barId, bookmarkId };
  document.getElementById('bookmark-modal-title').textContent = 'Edit Bookmark';
  document.getElementById('bookmark-title-input').value = bookmark.title;
  document.getElementById('bookmark-url-input').value = bookmark.url;
  document.getElementById('bookmark-modal').classList.remove('hidden');
  document.getElementById('bookmark-title-input').focus();
}

/**
 * Save bookmark (add or edit)
 */
async function saveBookmark() {
  const title = document.getElementById('bookmark-title-input').value.trim();
  const url = document.getElementById('bookmark-url-input').value.trim();

  if (!title) {
    alert('Please enter a title for the bookmark.');
    return;
  }

  if (!url) {
    alert('Please enter a URL for the bookmark.');
    return;
  }

  // Validate URL
  try {
    new URL(url);
  } catch {
    alert('Please enter a valid URL (e.g., https://example.com).');
    return;
  }

  const bar = data.bars.find(b => b.id === currentEditContext.barId);
  if (!bar) return;

  if (currentEditContext.type === 'add-bookmark') {
    // Add new bookmark
    const newBookmark = {
      id: generateId(),
      title,
      url
    };

    if (!bar.bookmarks) {
      bar.bookmarks = [];
    }
    bar.bookmarks.push(newBookmark);
  } else if (currentEditContext.type === 'edit-bookmark') {
    // Edit existing bookmark
    const bookmark = bar.bookmarks.find(b => b.id === currentEditContext.bookmarkId);
    if (bookmark) {
      bookmark.title = title;
      bookmark.url = url;
    }
  }

  await saveData(data);
  closeModal('bookmark-modal');
  render();
}

/**
 * Delete a bookmark
 */
async function deleteBookmark(barId, bookmarkId) {
  const bar = data.bars.find(b => b.id === barId);
  if (!bar) return;

  const bookmark = bar.bookmarks.find(b => b.id === bookmarkId);
  if (!bookmark) return;

  if (!confirm(`Delete "${bookmark.title}"?`)) {
    return;
  }

  bar.bookmarks = bar.bookmarks.filter(b => b.id !== bookmarkId);
  await saveData(data);
  render();
}

/**
 * Close a modal
 */
function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
  currentEditContext = null;
}

/**
 * Export data to JSON file
 */
function exportData() {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `bookmark-bars-backup-${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

/**
 * Import data from JSON file
 */
function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';

  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedData = JSON.parse(text);

      // Validate structure
      if (!importedData.bars || !Array.isArray(importedData.bars)) {
        throw new Error('Invalid data format');
      }

      if (!confirm('This will replace all your current bookmark bars. Continue?')) {
        return;
      }

      await saveData(importedData);
      render();
      alert('Data imported successfully!');
    } catch (error) {
      alert(`Failed to import data: ${error.message}`);
    }
  };

  input.click();
}

/**
 * Add current tab to the active bar
 */
async function addCurrentTab() {
  // Check if there's an active bar
  if (!data.activeBarId) {
    alert('Please create a bookmark bar first.');
    return;
  }

  try {
    // Get the current active tab
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });

    if (!tabs || tabs.length === 0) {
      alert('No active tab found.');
      return;
    }

    const currentTab = tabs[0];
    const title = currentTab.title || 'Untitled';
    const url = currentTab.url;

    // Don't allow certain internal URLs
    if (url.startsWith('about:') || url.startsWith('chrome:') || url.startsWith('moz-extension:')) {
      alert('Cannot bookmark this page.');
      return;
    }

    // Add the bookmark
    await addBookmarkToBar(data.activeBarId, title, url);

    // Visual feedback
    const btn = document.getElementById('add-current-tab-btn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = 'var(--success-color)';
    btn.style.color = '#ffffff';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
    }, 1500);
  } catch (error) {
    console.error('Error adding current tab:', error);
    alert('Failed to add current tab: ' + error.message);
  }
}

/**
 * Initialize the sidebar
 */
async function init() {
  // Load data
  data = await getData();
  render();

  // Set up event listeners
  document.getElementById('add-bar-btn').addEventListener('click', showAddBarModal);
  document.getElementById('add-current-tab-btn').addEventListener('click', addCurrentTab);
  document.getElementById('toggle-all-btn').addEventListener('click', toggleAll);

  document.getElementById('bar-modal-cancel').addEventListener('click', () => {
    closeModal('bar-modal');
  });

  document.getElementById('bar-modal-save').addEventListener('click', saveBar);

  document.getElementById('bookmark-modal-cancel').addEventListener('click', () => {
    closeModal('bookmark-modal');
  });

  document.getElementById('bookmark-modal-save').addEventListener('click', saveBookmark);

  document.getElementById('export-btn').addEventListener('click', exportData);
  document.getElementById('import-btn').addEventListener('click', importData);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('bar-modal');
      closeModal('bookmark-modal');
    }
  });

  // Handle Enter key in modals
  document.getElementById('bar-name-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveBar();
    }
  });

  document.getElementById('bookmark-url-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveBookmark();
    }
  });

  // Listen for messages from background script
  browser.runtime.onMessage.addListener(async (message) => {
    if (message.type === 'BAR_SWITCHED') {
      data = await getData();
      render();
    }
  });
}

// Start the application
init();
