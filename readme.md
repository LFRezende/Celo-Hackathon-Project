# Proxy Pay (Working Title)

ProxyPay is a decentralized and transparent financial system to trustless payment delegation.

The correct, efficient and transparent use of money is indispensable in many sectors of the financial world.
In a lot of different situations we are required to delegate payments to other people or institutions in order to facilitate logistics. Whether it is the CEO of company who delegates to the managers the deposit of paychecks, or the president who dispatches to the ministeries the disbursement of government funds to their
respective ministerial tasks, in many cases we must ensure that the money which has been deposited is indeed being used for the intended purposes.

The solution proposed here - Proxy Pay - is a decentralized solution which ensures that payments, loans, transactions and other financial procedures are trustlessly done in the way intended by the delegator, while giving the delegated control over the funds passed by the delegator.

## Next Development Steps

### Smart Contract Development

1.  Withdraw funds for deployer;
2.  Delete Delegates and Receivers;
3.  Change the amounts required;

## Web3 Integration

1. (High Priority) How to integrate it with Minipay

## Front End Development

1. Design general layout in React Native
2. Make it responsible and decent in design, color palette and UX.

## Known Bugs (so Far):

1. Needs to check if it is owners (Fixed)

2. The proxy contract interprets the msg.sender as the contract who deployed it, not the owner who calls the
   function at the main contract. (Fixed)

3. The proxy contract, at the function transferToPermitted, is subtracting cash from the account of the caller, not
   the from the contract.(Fixed)

4. The main contract has no money being sent from the delegator, hence there is no available cash for the contract to pull money from. (Fixed)

5. Main contract doesn't recognize new receivers or delegates appended, although proxy does. (Fixed)

6. Needs to pass the amount for each new receiver. (Fixed)

7. Receivers and Delegates can be doubly appended.(Fixed)

# Last PipeLine

## Make Minimal Delegate Functions Works

- Retrieve Data
- Fund Receivers
- Check that the amount you can finance is limited.

# Integrate with minipay and Android Studio

