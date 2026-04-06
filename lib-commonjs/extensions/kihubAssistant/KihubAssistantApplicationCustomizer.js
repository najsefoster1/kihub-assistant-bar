"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_application_base_1 = require("@microsoft/sp-application-base");
var LOG_SOURCE = 'KihubAssistantApplicationCustomizer';
var KihubAssistantApplicationCustomizer = /** @class */ (function (_super) {
    tslib_1.__extends(KihubAssistantApplicationCustomizer, _super);
    function KihubAssistantApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KihubAssistantApplicationCustomizer.prototype.onInit = function () {
        sp_core_library_1.Log.info(LOG_SOURCE, "Initialized ".concat(LOG_SOURCE));
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholders);
        return Promise.resolve();
    };
    KihubAssistantApplicationCustomizer.prototype._renderPlaceholders = function () {
        if (this._bottomPlaceholder)
            return;
        this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(sp_application_base_1.PlaceholderName.Bottom, { onDispose: this._onDispose });
        if (!this._bottomPlaceholder)
            return;
        var div = document.createElement('div');
        div.innerHTML = "\n      <style>\n        #kihub-float {\n          position: fixed;\n          bottom: 24px;\n          right: 24px;\n          z-index: 9999;\n          font-family: \"Segoe UI\", sans-serif;\n        }\n\n        .assistant-wrapper {\n          display: flex;\n          flex-direction: column;\n          align-items: flex-end;\n          gap: 6px;\n        }\n\n        .assistant-label {\n          background: white;\n          padding: 6px 10px;\n          border-radius: 10px;\n          font-size: 12px;\n          box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n          color: #333;\n        }\n\n        .assistant-button {\n          display: flex;\n          align-items: center;\n          gap: 10px;\n          background: linear-gradient(135deg, #8B1D1D, #a83232);\n          color: white;\n          padding: 12px 18px;\n          border-radius: 999px;\n          text-decoration: none;\n          font-weight: 600;\n          font-size: 14px;\n          box-shadow: 0 8px 20px rgba(0,0,0,0.2);\n          transition: transform 0.2s ease, box-shadow 0.2s ease;\n        }\n\n        .assistant-button:hover {\n          transform: scale(1.05);\n          box-shadow: 0 12px 24px rgba(0,0,0,0.25);\n        }\n      </style>\n\n      <div id=\"kihub-float\">\n        <div class=\"assistant-wrapper\">\n          <div class=\"assistant-label\">Need help? \uD83D\uDC47</div>\n          <a class=\"assistant-button\"\n             href=\"https://m365.cloud.microsoft/chat/?titleId=T_acb8f3d4-f1ed-5f4b-9589-525e53472228&source=embedded-builder\"\n             target=\"_blank\">\n            \uD83D\uDCA1 KIHUB Assistant\n          </a>\n        </div>\n      </div>\n    ";
        this._bottomPlaceholder.domElement.appendChild(div);
    };
    KihubAssistantApplicationCustomizer.prototype._onDispose = function () {
        sp_core_library_1.Log.info(LOG_SOURCE, 'Disposed');
    };
    return KihubAssistantApplicationCustomizer;
}(sp_application_base_1.BaseApplicationCustomizer));
exports.default = KihubAssistantApplicationCustomizer;
//# sourceMappingURL=KihubAssistantApplicationCustomizer.js.map