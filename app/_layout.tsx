import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "" }} />
          <Stack.Screen name="list" options={{ title: "Shopping List" }} />
        </Stack>
      </ToastProvider>
    </Provider>
  );
}
