"use strict";
(self["webpackChunktskit_launcher"] = self["webpackChunktskit_launcher"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js"
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__);



/**
 * Custom Launcher Widget with Update Detection
 */
class CustomLauncher extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget {
    constructor() {
        super();
        this.app = null;
        this.contentConfig = null;
        this.STORAGE_KEY = 'tskit-launcher-content-hash';
        this.AUTO_RESET_KEY = 'tskit-launcher-auto-reset-content-hash';
        this.UI_STATE_VERSION_KEY = 'tskit-launcher-ui-state-version';
        this.UI_STATE_VERSION = 'pyodide-2026-0-native-import';
        this.CONFIG_URL = './content-config.json';
        this.addClass('jp-Launcher');
        this.id = 'launcher';
        this.title.label = 'Welcome';
        this.title.iconClass = 'jp-LauncherIcon';
        this.createUI();
        this.checkForUpdates();
    }
    createUI() {
        this.node.innerHTML = `
      <div class="jp-Launcher-body tskit-launcher">
        <div class="jp-Launcher-content">

          <div class="tskit-header">
            <img src="https://raw.githubusercontent.com/tskit-dev/administrative/refs/heads/main/logos/svg/tskit/Tskit_logo.eps.svg" alt="tskit logo" class="tskit-logo" />
            <h1>explore</h1>
            <p>Interactive tree sequence notebooks</p>
          </div>

          <div class="tskit-update-warning" id="update-warning" style="display: none;">
            <div class="tskit-warning-content">
              <div class="tskit-warning-icon">⚠️</div>
              <div class="tskit-warning-text">
                <strong>Notebooks Updated!</strong>
                <p>You can update to them, but it will overwrite any local changes you have made.</p>
              </div>
              <button class="tskit-reset-button" id="reset-button">
                Reset Notebooks and Data
              </button>
            </div>
          </div>

          <div class="jp-Launcher-section">
            <div class="jp-Launcher-sectionHeader">
              <h2>Example notebooks</h2>
            </div>
            <div class="jp-Launcher-cardContainer">
              <div class="jp-LauncherCard tskit-card" id="tskit-notebook">
                <div class="jp-LauncherCard-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#204e66"/>
                  </svg>
                </div>
                <div class="tskit-card-content">
                  <div class="jp-LauncherCard-label">Open tskit Tutorial</div>
                  <div class="jp-LauncherCard-description">Explore tree sequence analysis</div>
                </div>
              </div>
            </div>
            <div class="jp-Launcher-cardContainer">
              <div class="jp-LauncherCard tskit-card" id="sc2ts-notebook">
                <div class="jp-LauncherCard-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#204e66"/>
                  </svg>
                </div>
                <div class="tskit-card-content">
                  <div class="jp-LauncherCard-label">Open sc2ts examples</div>
                  <div class="jp-LauncherCard-description">Explore the sc2ts dataset</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    `;
        this.setupEventHandlers();
    }
    setupEventHandlers() {
        const tskitNotebookCard = this.node.querySelector('#tskit-notebook');
        if (tskitNotebookCard) {
            tskitNotebookCard.addEventListener('click', () => {
                var _a;
                (_a = this.app) === null || _a === void 0 ? void 0 : _a.commands.execute('docmanager:open', {
                    path: 'tskit.ipynb'
                });
            });
        }
        const sc2tsNotebookCard = this.node.querySelector('#sc2ts-notebook');
        if (sc2tsNotebookCard) {
            sc2tsNotebookCard.addEventListener('click', () => {
                var _a;
                (_a = this.app) === null || _a === void 0 ? void 0 : _a.commands.execute('docmanager:open', {
                    path: 'sc2ts.ipynb'
                });
            });
        }
        const resetButton = this.node.querySelector('#reset-button');
        if (resetButton) {
            resetButton.addEventListener('click', async () => {
                await this.resetLocalState();
            });
        }
    }
    async checkForUpdates() {
        try {
            // Fetch current content configuration
            const response = await fetch(this.CONFIG_URL);
            if (!response.ok) {
                console.warn('Could not fetch content configuration');
                return;
            }
            this.contentConfig = await response.json();
            if (this.shouldResetUiStateForVersion()) {
                await this.resetUiState(this.UI_STATE_VERSION);
                return;
            }
            // Get stored hash from localStorage
            const storedData = localStorage.getItem(this.STORAGE_KEY);
            const storedConfig = storedData ? JSON.parse(storedData) : null;
            // Check if content has been updated
            if (this.contentConfig &&
                storedConfig &&
                storedConfig.contentHash !== this.contentConfig.contentHash) {
                if (this.shouldAutoResetUiState(this.contentConfig.contentHash)) {
                    await this.resetUiState(this.contentConfig.contentHash);
                    return;
                }
                this.showUpdateWarning();
            }
            else if (!storedConfig) {
                // First time visit - store the current hash
                this.storeCurrentHash();
            }
        }
        catch (error) {
            console.warn('Error checking for content updates:', error);
        }
    }
    shouldResetUiStateForVersion() {
        return (localStorage.getItem(this.UI_STATE_VERSION_KEY) !== this.UI_STATE_VERSION);
    }
    shouldAutoResetUiState(resetMarker) {
        return sessionStorage.getItem(this.AUTO_RESET_KEY) !== resetMarker;
    }
    showUpdateWarning() {
        const warningElement = this.node.querySelector('#update-warning');
        if (warningElement) {
            warningElement.style.display = 'block';
        }
    }
    storeCurrentHash() {
        if (this.contentConfig) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.contentConfig));
        }
    }
    async resetUiState(resetMarker) {
        if (!this.contentConfig) {
            return;
        }
        sessionStorage.setItem(this.AUTO_RESET_KEY, resetMarker);
        await this.clearJupyterLiteState();
        this.storeCurrentHash();
        localStorage.setItem(this.UI_STATE_VERSION_KEY, this.UI_STATE_VERSION);
        window.location.reload();
    }
    async resetLocalState() {
        try {
            // Clear JupyterLite state
            await this.clearJupyterLiteState();
            // Update stored hash
            this.storeCurrentHash();
            // Force refresh
            window.location.reload();
        }
        catch (error) {
            console.error('Error resetting local state:', error);
            // Fallback: just reload
            window.location.reload();
        }
    }
    async clearJupyterLiteState() {
        this.clearJupyterLiteLocalStorage();
        await this.clearJupyterLiteIndexedDBDatabases();
        await this.clearJupyterLiteCaches();
        await this.unregisterJupyterLiteServiceWorkers();
    }
    clearJupyterLiteLocalStorage() {
        // Clear JupyterLite-specific localStorage items
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key &&
                (key.startsWith('jupyter-') ||
                    key.startsWith('jupyterlab-') ||
                    key.startsWith('lumino-') ||
                    key.startsWith('@jupyterlab/') ||
                    key.startsWith('@jupyterlite/') ||
                    key.includes('filebrowser') ||
                    key.includes('notebook') ||
                    key.includes('kernel') ||
                    key.includes('workspace'))) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
    }
    async clearJupyterLiteIndexedDBDatabases() {
        const knownDbNames = [
            'JupyterLite Storage',
            'JupyterLite Contents',
            'jupyter-config-data',
            'jupyter-lab-workspaces',
            'pyodide-packages'
        ];
        const dbNames = new Set(knownDbNames);
        const indexedDBWithDatabases = indexedDB;
        if (indexedDBWithDatabases.databases) {
            const databases = await indexedDBWithDatabases.databases();
            for (const database of databases) {
                const name = database.name;
                if (name && this.isJupyterLiteDatabase(name)) {
                    dbNames.add(name);
                }
            }
        }
        await this.deleteIndexedDBDatabases([...dbNames]);
    }
    isJupyterLiteDatabase(name) {
        return (name.startsWith('JupyterLite') ||
            name.startsWith('jupyter') ||
            name.startsWith('pyodide'));
    }
    async deleteIndexedDBDatabases(dbNames) {
        await Promise.all(dbNames.map(dbName => new Promise(resolve => {
            const deleteRequest = indexedDB.deleteDatabase(dbName);
            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => {
                console.warn(`Could not delete database: ${dbName}`);
                resolve();
            };
            deleteRequest.onblocked = () => {
                console.warn(`Database deletion blocked: ${dbName}`);
                resolve();
            };
        })));
    }
    async clearJupyterLiteCaches() {
        if (!('caches' in window)) {
            return;
        }
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames
            .filter(cacheName => cacheName.includes('jupyter') || cacheName === 'precache')
            .map(cacheName => caches.delete(cacheName)));
    }
    async unregisterJupyterLiteServiceWorkers() {
        if (!navigator.serviceWorker) {
            return;
        }
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations
            .filter(registration => { var _a; return (_a = registration.active) === null || _a === void 0 ? void 0 : _a.scriptURL.includes(location.origin); })
            .map(registration => registration.unregister()));
    }
    setApp(app) {
        this.app = app;
    }
    // Implement ILauncher interface methods
    add(options) {
        return { dispose: () => { } };
    }
}
/**
 * The launcher plugin.
 */
const launcher = {
    id: 'tskit_launcher:plugin',
    description: 'Tskit custom launcher',
    provides: _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__.ILauncher,
    requires: [],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    activate: (app, restorer) => {
        const { shell } = app;
        const launcher = new CustomLauncher();
        launcher.setApp(app);
        shell.add(launcher, 'main');
        if (restorer) {
            restorer.add(launcher, 'launcher');
        }
        return launcher;
    },
    autoStart: true
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (launcher);


/***/ }

}]);
//# sourceMappingURL=lib_index_js.32418e8219200614d25d.js.map