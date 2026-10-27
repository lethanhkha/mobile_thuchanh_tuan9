import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { useAppSelector } from "../store";
import { selectWishlist } from "../store/wishlistSlice";
import BookGrid from "../components/BookGrid";

type Props = NativeStackScreenProps<RootStackParamList, "Wishlist">;

export default function WishlistScreen({ navigation }: Props) {
  const wishlist = useAppSelector(selectWishlist);

  const empty = (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>♡</Text>
      <Text style={styles.emptyTitle}>Chưa có sách yêu thích</Text>
      <Text style={styles.emptyHint}>
        Bấm vào biểu tượng trái tim trên sách để lưu lại.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
      >
        <Text style={styles.buttonText}>Khám phá sách</Text>
      </Pressable>
    </View>
  );

  return (
    <BookGrid
      books={wishlist}
      onPressBook={(id) => navigation.navigate("BookDetail", { bookId: id })}
      ListEmptyComponent={empty}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyIcon: { fontSize: 60, color: "#ccc", marginBottom: 10 },
  emptyTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  emptyHint: { textAlign: "center", color: "#666", marginBottom: 20 },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
