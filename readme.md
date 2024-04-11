# Proxy Pay (Working Title)

ProxyPay is a decentralized and transparent financial system to trustless payment delegation.

The correct, efficient and transparent use of money is indispensable in many sectors of the financial world.
In a lot of different situations we are required to delegate payments to other people or institutions in order to facilitate logistics. Whether it is the CEO of company who delegates to the managers the deposit of paychecks, or the president who dispatches to the ministeries the disbursement of government funds to their
respective ministerial tasks, in many cases we must ensure that the money which has been deposited is indeed being used for the intended purposes.

The solution proposed here - Proxy Pay - is a decentralized solution which ensures that payments, loans, transactions and other financial procedures are trustlessly done in the way intended by the delegator, while giving the delegated control over the funds passed by the delegator.

## Known Bugs (so Far):

1. The proxy contract interprets the msg.sender as the contract who deployed it, not the owner who calls the
   function at the main contract.

2. The proxy contract, at the function transferToPermitted, is subtracting cash from the account of the caller, not
   the from the contract.

3. (Relates to 1.) The main contract has no money being sent from the delegator, hence there is no available cash for the contract to pull money from.
