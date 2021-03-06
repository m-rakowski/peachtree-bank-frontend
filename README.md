# Peachtree Bank: Make a Transaction

### How to run?
Open up three terminals. In the first one,
**run the app** by entering the following commands:
```
npm install
npm start
```
In order to provide a safety net during development,
keep **Karma unit tests** going by executing the following
in the second terminal
```
npm test
```
The project comes with an **end-to-end test in Cypress**. In order to execute it enter the following in the third terminal:
```
npm run cypress:open
```

### Demo
https://user-images.githubusercontent.com/15091521/143335976-831d33a3-8ea2-46e3-899f-33282f5cee36.mp4


### User story #1

_As a product owner, I should see a consistent layout where I can view the header with my bank's logo and the footer._

__Acceptance criteria:__

1. Final layout should match with the designs provided
2. Header and footer should be visible with the Peachtree Bank logo
3. Use UI components (logo and footer)

### User story #2

_As a user, I should be able to transfer money from my account using a Transfer Money Form._

__Acceptance criteria:__

1. Final layout should match with the designs provided
2. "From account" field should be prefilled with my account details and disabled.
3. There should not be any validations on "To account" input field except it is a mandatory field.
4. Following field validations should exist on "Amount" input field

   a. It is a mandatory field

   b. Negative numbers are not allowed

   c. Decimals are permitted

   b. It should not allow amount below the total balance of -€500

5. Submitting form should open a modal to review transfer(check User Story #3).
6. Use UI Component (submit button)

### User story #3

_As a user, I should be able to review my transfer before submitting it._

__Acceptance criteria:__

1. Final layout should match with the designs provided
2. Modal should close when a user submits the transfer or cancels it.
3. Submitting transfer should successfully make a transfer and update the transactions list
4. Input fields should be reset to their original state after successfully submitting the transfer.
5. Cancelling a transfer should not reset the transfer form.

### User story #4

_As a user, I should be able to view a list of historical transactions in an ordered list._

__Acceptance criteria:__

1. Final layout should match with the designs provided
2. You should fetch the initial list of transactions from [this location](https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions)
3. Use the attached mock JSON data as an alternative if the above location is unavailable
4. Transactions list should be sorted by date in descending order
5. Use UI Component (transaction-item)

### User story #5

_As a user, I should be able to filter my transactions based on merchant name._

__Acceptance criteria:__

1. Final layout should match with the designs provided
2. Filtering should be done only by merchant name
3. Creating a new transfer should not alter the state of filter i.e if I make a transfer, it should automatically reflect in the filtered list(if applicable)
4. Use UI Component (filter)
