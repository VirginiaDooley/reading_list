import each from 'jest-each'

 describe('search', () = {
   each`
     input     | expectedResult
     ${search}   | ${'search'}
   `.test('converts $input to $expectedResult', ({ input, expectedResult }) => {
    expect(search(input)).toBe(expectedResult)
  })
})