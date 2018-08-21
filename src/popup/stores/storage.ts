import { action, observable } from 'mobx';
import { browser } from 'webextension-polyfill-ts';

export interface SyncStorage {
  hide_descriptions: boolean;
  max_suggestions: number;
  operator_blacklist: string[];
}

class Storage {
  @observable.ref public isLoading: boolean              = true;
  @observable.ref public hideDescriptions?: boolean|null = null;
  @observable.ref public maxSuggestions?: number|null    = null;
  @observable.ref public operatorBlacklist?: string[]    = [];

  /**
   * Fetch the sync storage
   * @return Nothing
   */
  @action.bound public async fetchStorage (): Promise<void> {
    let storage: Partial<SyncStorage>;

    storage = await browser.storage.sync.get(/* get all data */);

    if (!storage.max_suggestions || !storage.hide_descriptions || !storage.operator_blacklist) {
      storage = await this.initializeStorage();
    }

    this.isLoading         = false;
    this.hideDescriptions  = storage.hide_descriptions;
    this.maxSuggestions    = storage.max_suggestions;
    this.operatorBlacklist = storage.operator_blacklist;
  }

  /**
   * Initialize the sync storage
   * @return Initialized storage object
   */
  @action protected async initializeStorage (): Promise<SyncStorage> {
    const initialStorage = {
      hide_descriptions:  false,
      max_suggestions:    5,
      operator_blacklist: [],
    };

    await browser.storage.sync.set(initialStorage);

    return initialStorage;
  }

  /**
   * Change visibility of description
   * @param value Number of suggestions
   * @return Nothing
   */
  @action.bound public async toggleDescriptionVisibility (value: boolean): Promise<void> {
    await browser.storage.sync.set({ hide_descriptions: value });
    const { hide_descriptions } = await browser.storage.sync.get('hide_descriptions');

    this.hideDescriptions = hide_descriptions;
  }

  /**
   * Change maximum number of suggesttions
   * @param value Number of suggestions
   * @return Nothing
   */
  @action.bound public async changeMaxSuggestions (value: number): Promise<void> {
    await browser.storage.sync.set({ max_suggestions: value });
    const { max_suggestions } = await browser.storage.sync.get('max_suggestions');

    this.maxSuggestions = max_suggestions;
  }

  /**
   * Add operator to blacklist by given operator id
   * @param id Operator id to add
   * @return Nothing
   */
  @action.bound public async addOperatorsToBlacklist (id: string): Promise<void> {
    const mergedBlacklist = [...this.operatorBlacklist || [], id];
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
  @action.bound public async removeOperatorsFromBlacklist (id: string): Promise<void> {
    const mergedBlacklist = (this.operatorBlacklist || []).filter((item) => item !== id);
    await browser.storage.sync.set({ operator_blacklist: mergedBlacklist });

    const {
      operator_blacklist: newBlacklist,
    } = await browser.storage.sync.get('operator_blacklist');

    this.operatorBlacklist = newBlacklist;
  }
}

export const storage = new Storage();
