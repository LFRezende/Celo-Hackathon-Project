# Proxy Pay

ProxyPay is a decentralized and transparent financial system to trustless payment delegation.

The correct, efficient and transparent use of money is indispensable in many sectors of the financial world.
In a lot of different situations we are required to delegate payments to other people or institutions in order to facilitate logistics. Whether it is the CEO of company who delegates to the managers the deposit of paychecks, the president who dispatches to the ministeries the disbursement of government funds to their
respective ministerial tasks or even a client of an investment firm who wants to delegate to investors proper application of funds to certain assets whilst mainting full possession of the funds, in many cases we must ensure that the money which has been deposited is indeed being used for the intended purposes.

The solution proposed here - Proxy Pay - is a decentralized solution which ensures that payments, loans, transactions and other financial procedures are trustlessly done in the way intended by the delegator, while giving the delegated control over the funds passed by the delegator.

# Introduction

Regardless of the user, the financial world has many cases and operations in which funds or assets need to be trusted to third parties - lending assets, trusting funds to financial institutions, automating debit, or even a simple donation to some cause or person.

However, even in the current world of Web3, once your funds are not in your own wallet, you do NOT have any sort of guarantee that your assets will be used in the intended way.

Let's say you deposit your funds into a wallet of some investment firm, which alleges to solely invest your money in the allowed crypto exchanges and assets you are comfortable with - how can you trust they will only use your money for the intended transactions? One could say that a Multi-Signature Wallet would be a fair compromise, but imagine having to approve every single transaction at hand, not to mention you will need the approval of other people to allow YOU to use YOUR money, and they can... well... deny it. A bit cumbersome, right?

So, let's sum up the problems with delegating payments via traditional methods, even in the crypto space:

1. You can't assure that trusted funds will be paid to the respective recipients;
2. You can't assure that third parties will not get your funds for them (let it be straight stealing, fund mixing or some bank shenanigans);
3. You can't assure ownership of your own funds, as even if 2 and 1 are corrected, the third parties may just NOT use the locked funds, so you will lose your money.

So here, we should ask a better question: WHY trust, if we can be certain?

Proxy Pay is a trustless protocol where the user (called Owner or Delegator) keeps complete control over funds, whilst allowing third parties appointed by him/her (called Delegated) to use the assets, but with the constraint of just allowing the delegated parties to move funds to allowed accounts (called the Receivers).

Here is the methodology of the process:

1. A main Smart Contract (called Main), which operates as the hub of the application. The mainstream function of the contract, the function "delegate" receives:

- A first array of addresses, these being the wallets allowed by the owner to transact funds - the Delegates.
- A second array of addresses, these being the wallets allowed by the owner to receive funds from the delegates - the Receivers
- A third and final array of unsigned integers, which designate the allowed amounts each receiver address is allowed to receive, respectively to the second array.

When called and filled, this function returns the address of a new contract - the Proxy contract.

2. The Proxy contract, amongst other features, is the contract in which the owner is able to lock funds via the "fundContract" function or directly via transfer to the proxy contract address. The delegates, previously appointed, are allowed to use only the locked funds of the contract and not a penny more or less - and they may only transact funds to the receivers allowed by the owner, and the quotas the owner permitted.

3. Finally, there is a withdrawal function that only the owner has access to and can take the funds out of at any moment, without requiring the consent of the delegates as a Multi-Sig would.

There 3 bullet points tackle the problems we pointed out before! Because now:

- We can delegate payments to third parties, as we could previously;
- We ensure that only payments to allowed receiver wallets can be made, so no embezzlement of any funds;
- We ensure that only an amount we decide on MAY be spent on certain receivers or assets;
- We lock the funds into a smart contract, so the delegated not only don't need to use their own funds, but also we ensure they don't need to have access to our personal wallets in order to move money, nor need we to transfer to their wallets for it;
- If we are not content with their performance, see no transactions on their part or simply do not feel like it anymore - again, because the money is OURS, hence, we own no justification - we may simply withdraw the remaining funds of the contract at will, and since the only allowed payments were to people or assets we previously allowed to be paid, no actual lost happened.

Essentially, Proxy Pay is a proposal for personal finance (but also corporate and government finance) which removes trustworthiness of the equation of delegated payments, and replaces it with trustlessness.

It can be used for simple tasks such as just ensuring your kid pays for bread and not candy when he goes to the bakery ( as I did a lot as a child), to serious matters such as deposits to investment firms, personal lending to people or institutions, and even government titles and public money disbursement to ministries.

This is the vision we hope to share with the concept of Proxy Pay - a simple idea, but yet with powerful possibilities to secure efficiency and minimize mishandling of funds. To put simply, propagate the ownership of your funds beyond your wallet control.

Additional/Complementary Commentary:

One final application (not contemplated in this project, due to limitations of integration) is the automation of debit payments to a limit amount, integrating Chainlink Keepers into the mix - we could create crypto subscriptions with it, delegating Chainlink Keepers to pay for all the subscriptions we wish to sign it - just to show the power of delegating payments, and how we cannot let them outside of the crypto world.

## Submission Criteria Check-Ups

Here is a bullet-list of the assets required for project submission:

1. Verified contract on Celo Mainnet/Alfajores - Via sourcify, here is the contract address verified.

Contract Address (Delegator Contract): 0x583456cd3142f10e0644A759749B696Cb0D204ff
Verified Contract on the Chain: https://repo.sourcify.dev/contracts/full_match/44787/0x583456cd3142f10e0644A759749B696Cb0D204ff/
Verified Contract on the Block Explorer: https://explorer.celo.org/alfajores/address/0x583456cd3142f10e0644A759749B696Cb0D204ff/contracts#address-tabs

2. Mobile-First: The UI development of the App was made with inner centrality of its components, in order to facilitate usage for people with smartphones using it.

3. Personal Finance Focused: Proxy Pay was tailor-made to ensure ownership of one's funds with delegated payments - how the funds of the user can and will be used by delegated parties. While the project does have possibilities beyond the personal scope, it was made with personal finance as its focus.

4. Working Prototype: Here is the link of the demo: https://www.youtube.com/watch?v=VkYyNEpSWxw

5. Public GitHub repository: :D

6. Must be build for MiniPay: The whole project is focused for MiniPay and, as the video of item 4. shows, it connects to MiniPay and can be used by it.
