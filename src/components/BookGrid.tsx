import React from "react";
import {
  FlatList,
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import type { Book } from "../types";
import { useAppDispatch } from "../store";
import { addToCart } from "../store/cartSlice";
import FavoriteButton from "./FavoriteButton";

type Props = {
  books: Book[];
  onPressBook: (id: string) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  ListEmptyComponent?: React.ReactElement;
};

export default function BookGrid({
  books,
  onPressBook,
  refreshing,
  onRefresh,
  ListEmptyComponent,
}: Props) {
  const dispatch = useAppDispatch();

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      numColumns={2}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={[
        { padding: 8 },
        books.length === 0 && { flexGrow: 1 },
      ]}
      ListEmptyComponent={
        ListEmptyComponent || (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Không có sách
          </Text>
        )
      }
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => onPressBook(item.id)}>
          <View>
            <Image
              source={{ uri: item.cover }}
              style={{ width: "100%", aspectRatio: 2 / 3 }}
            />
            <FavoriteButton book={item} />
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.price}>
              {item.price.toLocaleString("vi-VN")} đ
            </Text>

            {/* Nút thêm vào giỏ hàng */}
            <Pressable
              style={[styles.addBtn, item.stock === 0 && styles.addBtnDisabled]}
              disabled={item.stock === 0}
              onPress={() => dispatch(addToCart(item))}
            >
              <Text style={styles.addBtnText}>
                {item.stock === 0 ? "Hết hàng" : "Thêm vào giỏ"}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    paddingBottom: 8,
  },
  title: { fontWeight: "bold", padding: 8, paddingBottom: 0, fontSize: 14 },
  price: { padding: 8, color: "red", fontWeight: "500" },
  addBtn: {
    backgroundColor: "#007bff",
    marginHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  addBtnDisabled: { backgroundColor: "#ccc" },
  addBtnText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});
