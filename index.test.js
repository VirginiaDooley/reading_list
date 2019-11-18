
global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
  };

describe('Tests my console.log', () => {
    it('should console a message', () => {
      console.log('My test is working with console.log');
  
      expect(global.console.log).toHaveBeenCalledWith(
        'My test is working with console.log'
      );
    });
  });

  const results = require('./index.js');
  test('book search yields at least 3 results', () => {
    expect(results.length).toBe(3);
  });