import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "" }}/>
      <Stack.Screen name="list" options={{ title: "Shopping List" }} />
    </Stack>
  );
}
