import { action, observable } from 'mobx';
import { browser } from 'webextension-polyfill-ts';

class Storage {
  @observable.ref public isLoading: boolean = true;
  @observable.ref public hideDescriptions: boolean|null = null;
  @observable.ref public maxSuggestions: number|null = 0;
  @observable.ref public operatorBlacklist: string[] = [];

  /**
   * Fetch the sync storage
   * @return Nothing
   */
  @action public fetchStorage = async (): Promise<void> => {
    const storage = await browser.storage.sync.get(/* get all items */);

    this.hideDescriptions  = storage.hide_descriptions;
    this.maxSuggestions    = storage.max_suggestions;
    this.operatorBlacklist = storage.operator_blacklist;
  }

  /**
   * Change visibility of description
   * @param value Number of suggestions
   * @return Nothing
   */
  @action public toggleDescriptions = async (value: boolean): Promise<void> => {
    await browser.storage.sync.set({ hide_descriptions: value });
    const { hide_descriptions } = await browser.storage.sync.get('hide_descriptions');

    this.hideDescriptions = hide_descriptions;
  }

  /**
   * Change maximum number of suggesttions
   * @param value Number of suggestions
   * @return Nothing
   */
  @action public changeMaxSuggestions = async (value: number): Promise<void> => {
    await browser.storage.sync.set({ max_suggestions: value });
    const { max_suggestions } = await browser.storage.sync.get('max_suggestions');

    this.maxSuggestions = max_suggestions;
  }

  /**
   * Add operator to blacklist by given operator id
   * @param id Operator id to add
   * @return Nothing
   */
  @action public addOperatorsToBlacklist = async (id: string): Promise<void> => {
    const mergedBlacklist = [...this.operatorBlacklist, id];
    await browser.storage.sync.set({ operator_blacklist: mergedBlacklist });

    const {
      operator_blacklist: newBlacklist,
    } = await browser.storage.sync.get('operator_blacklist');

    this.operatorBlacklist = newBlacklist;
  }

  /**
   * Remove operator from blacklist by given operator id
   * @param id Operator id to remove
   * @return Nothing
   */
  @action public removeOperatorsFromBlacklist = async (id: string): Promise<void> => {
    const mergedBlacklist = this.operatorBlacklist.filter((item) => item !== id);
    await browser.storage.sync.set({ operator_blacklist: mergedBlacklist });

    const {
      operator_blacklist: newBlacklist,
    } = await browser.storage.sync.get('operator_blacklist');

    this.operatorBlacklist = newBlacklist;
  }
}

export const storage = new Storage();
