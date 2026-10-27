import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import type { Book } from "../types";
import { fetchBookById } from "../api/books";
import FavoriteButton from "../components/FavoriteButton";
import { formatVND } from "../utils/format";

type Props = NativeStackScreenProps<RootStackParamList, "BookDetail">;

export default function BookDetailScreen({ route }: Props) {
  const { bookId } = route.params;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookById(bookId)
      .then(setBook)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (!book) return <Text style={styles.error}>Không tìm thấy sách</Text>;

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: book.cover }} style={styles.cover} />
        <FavoriteButton book={book} size={24} style={{ top: 12, right: 12 }} />
      </View>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.price}>{formatVND(book.price)}</Text>
      <Text style={styles.desc}>{book.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  cover: { width: "100%", aspectRatio: 2 / 3, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 16 },
  author: { fontSize: 16, color: "#666", marginTop: 4 },
  price: { fontSize: 20, color: "red", fontWeight: "bold", marginTop: 8 },
  desc: { fontSize: 16, marginTop: 16, lineHeight: 24 },
  error: { textAlign: "center", marginTop: 20, fontSize: 16 },
});
