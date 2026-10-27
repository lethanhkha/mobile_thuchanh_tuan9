import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "../store";
import { selectWishlist } from "../store/wishlistSlice";
import type { RootStackParamList } from "../navigation/types";

export default function AccountScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const count = useAppSelector(selectWishlist).length;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("Wishlist")}
      >
        <Text style={styles.text}>♥ Danh sách yêu thích</Text>
        <Text style={styles.count}>{count} ›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: { fontSize: 16 },
  count: { fontSize: 16, color: "#888" },
});
