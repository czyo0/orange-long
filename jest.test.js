const exp = require("constants")

test('test common macher',()=>{
    expect( 2 + 2 ).toBe(4)
    expect( 2+2 ).not.toBe(5)
})

test('test to be true or false', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();

})

test('test number', () => {
    expect(4).toBeGreaterThan(3);
    expect(0).toBeLessThan(3);

})

test('test object', () => {
    expect({name:'orange'}).toEqual({name:'orange'});

})