import Opelete from '../Opelete';

describe('Opelete', () => {
  let opelete;

  beforeAll(() => {
    opelete = new Opelete();
  });

  describe('handleInput', () => {
    it('searches operators if valid string', () => {
      opelete.inputNode.value = 'Javascript site';
      expect(opelete.results).toBeTruthy();
    });
  });

  describe('updateSuggestion', () => {
    it('updates suggestion', () => {
      opelete.selectedResultIndex = 0;
      opelete.results = [{ operator: 'site:', description: 'Search for a specific site' }];
      opelete.updateSuggestion();
      expect(opelete.opeleteNode.innerHTML).toBeTruthy();
    });
  });

  describe('clearSuggestion', () => {
    it('clears suggestion', () => {
      opelete.selectedResultIndex = 0;
      opelete.results = [{ operator: 'site:', description: 'Search for a specific site' }];
      opelete.clearSuggestion();
      expect(opelete.selectedResultIndex).toBe(0);
      expect(opelete.results).toEqual([]);
    });
  });

  describe('enableForceShowSuggestio', () => {
    it('gives .force-show class to suggestion', () => {
      opelete.enableForceShowSuggestion();
      expect(opelete.suggestionNode.classList.contains('opelete-force-show')).toBe(true);
    });
  });

  describe('disableForceShowSuggestion', () => {
    it('removes .force-show class to suggestion', () => {
      opelete.disableForceShowSuggestion();
      expect(opelete.suggestionNode.classList.contains('opelete-force-show')).toBe(false);
    });
  });
});
