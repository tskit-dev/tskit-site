"use strict";
(self["webpackChunktskit_launcher"] = self["webpackChunktskit_launcher"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
            resetButton.addEventListener('click', () => {
                this.resetLocalState();
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
            // Get stored hash from localStorage
            const storedData = localStorage.getItem(this.STORAGE_KEY);
            const storedConfig = storedData ? JSON.parse(storedData) : null;
            // Check if content has been updated
            if (this.contentConfig && storedConfig && storedConfig.contentHash !== this.contentConfig.contentHash) {
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
    resetLocalState() {
        try {
            // Clear JupyterLite state
            this.clearJupyterLiteState();
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
    clearJupyterLiteState() {
        // Clear JupyterLite-specific localStorage items
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('jupyter-') ||
                key.startsWith('jupyterlab-') ||
                key.startsWith('lumino-') ||
                key.includes('notebook') ||
                key.includes('kernel'))) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        // Clear IndexedDB databases used by JupyterLite
        this.clearIndexedDBDatabases();
    }
    clearIndexedDBDatabases() {
        // Common JupyterLite IndexedDB database names
        const dbNames = [
            'JupyterLite Storage',
            'jupyter-config-data',
            'jupyter-lab-workspaces',
            'pyodide-packages'
        ];
        dbNames.forEach(dbName => {
            const deleteRequest = indexedDB.deleteDatabase(dbName);
            deleteRequest.onerror = () => {
                console.warn(`Could not delete database: ${dbName}`);
            };
        });
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


/***/ })

}]);
//# sourceMappingURL=lib_index_js.579b2358b786bc6a7de5.js.map