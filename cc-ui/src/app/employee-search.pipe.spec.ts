import { EmployeeSearchPipe } from './employee-search.pipe';

describe('EmployeeSearchPipe', () => {
  it('create an instance', () => {
    const pipe = new EmployeeSearchPipe();
    expect(pipe).toBeTruthy();
  });
});
