# React Native Shopping List App

## Project Overview

This is a React Native mobile application that allows users to manage a shopping list.  
The app uses Redux for state management and AsyncStorage for data persistence.

Users can:
- Add shopping items
- Edit existing items
- Delete items
- Mark items as purchased
- Automatically restore saved data when reopening the app

---

## Setup Instructions

1. Install dependencies:

npm install

2. Start the application:

npx expo start

3. Run on an emulator or physical device using Expo Go.

---

## Technologies Used

- React Native (Expo)
- Redux Toolkit
- React Redux
- AsyncStorage
- TypeScript

---

## App Features

- Add new shopping items with name and quantity
- Edit item details
- Delete items from the list
- Mark items as purchased with a checkbox
- Persistent storage between sessions
- Error messages for empty inputs

---

## Screenshots

> Insert screenshots of your running application below.

### Home Screen
![Home Screen]()

### Adding an Item
![Add Item]()

### Editing an Item
![Edit Item]()

### Marking Item as Purchased
![Purchased Item]()

---

## Accessibility

- Labeled input fields
- Touchable buttons with visible text
- Checkboxes for purchased items

---

## Testing

All features were tested manually:
- Add item
- Edit item
- Delete item
- Persist data after app restart

Redux reducers update state correctly on each action.

---

## Author

Ashley Matsekoleng
