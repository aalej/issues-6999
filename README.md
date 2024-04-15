# Repro for issue 6999

## Versions

firebase-tools: v13.7.2<br>
node: vv18.16.1 <br>
platform: macOS Sonoma 14.4.1<br>
Google Cloud SDK 470.0.0<br>
cloud-firestore-emulator 1.19.4<br>

## Steps to repro

1. Run `npm i`
1. Run `npm run start:emulator:new`
1. Open a new terminal, run `npm run build && npm run start`
   - Returns an empty array

```
[]
```

## Notes

### Not using a nested query

A non-nested query works, so the issue only affects nested queries. Tried it out by changing

```js
const query = datastore
  .createQuery(KIND_USER)
  .filter(new PropertyFilter("profile.name", "=", name));
```

To something like

```js
const query = datastore
  .createQuery(KIND_USER)
  .filter(new PropertyFilter("email", "=", "foo@example.com"));
```

### Connecting to an actual project

The nested query works, so it seems like the issue only occurs on the Firstore emulator on datastore mode

```js
const query = datastore
  .createQuery(KIND_USER)
  .filter(new PropertyFilter("profile.name", "=", name));
```
