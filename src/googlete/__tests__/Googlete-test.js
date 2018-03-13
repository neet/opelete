import Googlete from '../Googlete';

describe('Googlete', () => {
  let googlete;

  beforeAll(() => {
    googlete = new Googlete();
  });

  describe('handleInput', () => {
    it('searches operators if valid string', () => {
      googlete.inputNode.value = 'Javascript site';
      expect(googlete.results).toBeTruthy();
    });
  });

  describe('updateSuggestion', () => {
    it('updates suggestion', () => {
      googlete.selectedResultIndex = 0;
      googlete.results = [{ operator: 'site:', description: 'Search for a specific site' }];
      googlete.updateSuggestion();
      expect(googlete.googleteNode.innerHTML).toBeTruthy();
    });
  });

  describe('clearSuggestion', () => {
    it('clears suggestion', () => {
      googlete.selectedResultIndex = 0;
      googlete.results = [{ operator: 'site:', description: 'Search for a specific site' }];
      googlete.clearSuggestion();
      expect(googlete.selectedResultIndex).toBe(0);
      expect(googlete.results).toEqual([]);
    });
  });

  describe('enableForceShowSuggestio', () => {
    it('gives .force-show class to suggestion', () => {
      googlete.enableForceShowSuggestion();
      expect(googlete.suggestionNode.classList.contains('googlete-force-show')).toBe(true);
    });
  });

  describe('disableForceShowSuggestion', () => {
    it('removes .force-show class to suggestion', () => {
      googlete.disableForceShowSuggestion();
      expect(googlete.suggestionNode.classList.contains('googlete-force-show')).toBe(false);
    });
  });
});
