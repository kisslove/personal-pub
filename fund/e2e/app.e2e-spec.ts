import { FundPage } from './app.po';

describe('fund App', () => {
  let page: FundPage;

  beforeEach(() => {
    page = new FundPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
