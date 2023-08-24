# `@hansolbangul/history-state`

A React hook for managing state within the browser's history.

## 📦 Installation

**Using npm:**

```bash
npm install @hansolbangul/history-state
```

**Using yarn:**

```bash
yarn add @hansolbangul/history-state
```

## 🔍 Usage

To use the `useHistoryState` hook:

1. Import it:
   ```javascript
   import useHistoryState from '@hansolbangul/history-state';
   ```

2. Use it within your component:
   ```javascript
   function YourComponent() {
   const [historyState, setHistoryState] = useHistoryState({ initialState: 'Your Initial State', key: 'yourKey' });

   // ... your component logic ...
   }
   ```

## ⚠️ Common Issues

### Scope Naming Issue

If you encounter the following error:

```
npm ERR! Invalid name: "hansolbangul/history-state"
```

Make sure to check the name field in your `package.json`. It should look like this:

```json
"name": "@hansolbangul/history-state"
```

Then, use the appropriate scoped name when installing or referencing the package.

## 🙌 Contributing

Contributions are welcomed! If you discover issues or have features to suggest, please open an issue or submit a pull request.
