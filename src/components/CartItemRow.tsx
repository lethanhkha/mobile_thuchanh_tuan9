import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { CartItem } from '../types';
import { formatVND } from '../utils/format';

type Props = {
  item: CartItem;
  quantity: number;
  onChangeQuantity: (id: string, qty: number) => void;
  onRemove: (item: CartItem) => void;
};

function CartItemRow({ item, quantity, onChangeQuantity, onRemove }: Props) {
  const { book } = item;
  const canDecrease = quantity > 1;
  const canIncrease = quantity < book.stock;
  return (
    <View style={styles.row}>
      <Image source={{ uri: book.cover }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text>{formatVND(book.price)}</Text>
        <View style={styles.qtyRow}>
          <Pressable disabled={!canDecrease} style={[styles.qtyBtn, !canDecrease && styles.qtyBtnDisabled]}
                     onPress={() => onChangeQuantity(book.id, quantity - 1)}>
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{quantity}</Text>
          <Pressable disabled={!canIncrease} style={[styles.qtyBtn, !canIncrease && styles.qtyBtnDisabled]}
                     onPress={() => onChangeQuantity(book.id, quantity + 1)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
          <Text style={styles.stock}>Còn {book.stock}</Text>
        </View>
        <Text style={styles.subtotal}>Thành tiền: {formatVND(book.price * quantity)}</Text>
      </View>
      <Pressable onPress={() => onRemove(item)} hitSlop={8}><Text>✕</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  cover: { width: 60, height: 90, marginRight: 12 },
  info: { flex: 1, justifyContent: 'space-between' },
  title: { fontWeight: 'bold' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  qtyBtn: { borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  qtyBtnDisabled: { opacity: 0.3 },
  qtyBtnText: { fontSize: 16 },
  qty: { marginHorizontal: 12 },
  stock: { marginLeft: 12, color: 'gray', fontSize: 12 },
  subtotal: { color: 'red', fontWeight: 'bold' }
});

export default React.memo(CartItemRow);