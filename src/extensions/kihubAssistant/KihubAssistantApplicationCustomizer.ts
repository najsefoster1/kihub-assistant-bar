import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

const LOG_SOURCE: string = 'KihubAssistantApplicationCustomizer';

export default class KihubAssistantApplicationCustomizer
  extends BaseApplicationCustomizer<{}> {

  private _bottomPlaceholder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${LOG_SOURCE}`);
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholders);
    return Promise.resolve();
  }

  private _renderPlaceholders(): void {
    if (this._bottomPlaceholder) return;

    this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Bottom,
      { onDispose: this._onDispose }
    );

    if (!this._bottomPlaceholder) return;

    const div = document.createElement('div');

    div.innerHTML = `
      <style>
        #kihub-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: "Segoe UI", sans-serif;
        }

        .assistant-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .assistant-label {
          background: white;
          padding: 6px 10px;
          border-radius: 10px;
          font-size: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          color: #333;
        }

        .assistant-button {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #8B1D1D, #a83232);
          color: white;
          padding: 12px 18px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .assistant-button:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 24px rgba(0,0,0,0.25);
        }
      </style>

      <div id="kihub-float">
        <div class="assistant-wrapper">
          <div class="assistant-label">Need help? 👇</div>
          <a class="assistant-button"
             href="https://m365.cloud.microsoft/chat/?titleId=T_acb8f3d4-f1ed-5f4b-9589-525e53472228&source=embedded-builder"
             target="_blank">
            💡 KIHUB Assistant
          </a>
        </div>
      </div>
    `;

    this._bottomPlaceholder.domElement.appendChild(div);
  }

  private _onDispose(): void {
    Log.info(LOG_SOURCE, 'Disposed');
  }
}