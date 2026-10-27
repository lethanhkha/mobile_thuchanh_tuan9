import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { fetchBooks } from '../api/books';
import type { Book } from '../types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import BookGrid from '../components/BookGrid';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
};

export default function HomeScreen({ navigation }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try { 
      setError(null); 
      setBooks(await fetchBooks()); 
    } catch (e) { 
      setError((e as Error).message); 
    }
  }, []);

  useEffect(() => { 
    load().finally(() => setLoading(false)); 
  }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error) return <Text>Không tải được sách: {error}</Text>;

  return (
    <BookGrid 
      books={books} 
      onPressBook={(id) => navigation.navigate('BookDetail', { bookId: id })}
      refreshing={refreshing} 
      onRefresh={onRefresh} 
    />
  );
}