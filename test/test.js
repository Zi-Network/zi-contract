const ZiNetwork = artifacts.require("ZiNetwork");
const { assert } = require("chai");

contract("ZiNetwork", function (accounts) {
    const [owner, marketingWallet, devWallet, user1, user2, user3] = accounts;
  
    beforeEach(async function () {
      this.token = await ZiNetwork.new({ from: owner });
    });
  
    describe("Constructor and initial state", function () {
      it("should correctly initialize token properties", async function () {
        const totalSupply = await this.token.totalSupply();
        const ownerBalance = await this.token.balanceOf(owner);
  
        expect(totalSupply).to.be.bignumber.equal(ownerBalance);
      });
    });
  
    describe("Enabling and disabling trading", function () {
      it("should enable trading", async function () {
        await this.token.enableTrading({ from: owner });
        const tradingActive = await this.token.tradingActive();
        const swapEnabled = await this.token.swapEnabled();
  
        expect(tradingActive).to.be.true;
        expect(swapEnabled).to.be.true;
      });
    });
  
    describe("Removing limits", function () {
      it("should remove limits", async function () {
        const result = await this.token.removeLimits({ from: owner });
        const limitsInEffect = await this.token.limitsInEffect();
  
        expect(limitsInEffect).to.be.false;
      });
    });
  
    describe("Disabling transfer delay", function () {
      it("should disable transfer delay", async function () {
        const result = await this.token.disableTransferDelay({ from: owner });
        const transferDelayEnabled = await this.token.transferDelayEnabled();
  
        expect(transferDelayEnabled).to.be.false;
      });
    });
  
    describe("Update marketing wallet", function () {
      it("should update marketing wallet", async function () {
        await this.token.updateMarketingWallet(marketingWallet, { from: owner });
        const updatedMarketingWallet = await this.token.marketingWallet();
  
        expect(updatedMarketingWallet).to.equal(marketingWallet);
      });
    });
  
    describe("Update dev wallet", function () {
      it("should update dev wallet", async function () {
        await this.token.updateDevWallet(devWallet, { from: owner });
        const updatedDevWallet = await this.token.devWallet();
  
        expect(updatedDevWallet).to.equal(devWallet);
      });
    });
  
    describe("Exclude and include address from fees", function () {
      it("should exclude address from fees", async function () {
        await this.token.excludeFromFees(user1, true, { from: owner });
        const isExcluded = await this.token.isExcludedFromFees(user1);
  
        expect(isExcluded).to.be.true;
      });
  
      it("should include address in fees", async function () {
        await this.token.excludeFromFees(user1, false, { from: owner });
        const isExcluded = await this.token.isExcludedFromFees(user1);
  
        expect(isExcluded).to.be.false;
      });
    });

  // Add more tests for other functions
});
