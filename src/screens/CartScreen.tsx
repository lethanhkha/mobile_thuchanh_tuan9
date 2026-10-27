import React, { useMemo, useCallback } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store';
import { selectCartItems, removeFromCart } from '../store/cartSlice';
import { useDebouncedQuantities } from '../hooks/useDebouncedQuantities';
import CartItemRow from '../components/CartItemRow';
import { formatVND } from '../utils/format';
import type { CartItem } from '../types';

export default function CartScreen() {
  const items = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const { drafts, changeQuantity, discard } = useDebouncedQuantities(300);

  const qtyOf = useCallback((i: CartItem) => drafts[i.book.id] ?? i.quantity, [drafts]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.book.price * qtyOf(i), 0),
    [items, qtyOf]
  );

//   const confirmRemove = useCallback((item: CartItem) => {
//     Alert.alert('Xoá sản phẩm', `Bỏ "${item.book.title}" khỏi giỏ hàng?`, [
//       { text: 'Huỷ', style: 'cancel' },
//       {
//         text: 'Xoá',
//         style: 'destructive',
//         onPress: () => {
//           discard(item.book.id); 
//           dispatch(removeFromCart(item.book.id));
//         },
//       },
//     ]);
//   }, [dispatch, discard]);

const removeDirectly = useCallback((item: CartItem) => {
    discard(item.book.id); // Hủy bộ đếm giờ (debounce) nếu người dùng vừa bấm đổi số lượng xong
    dispatch(removeFromCart(item.book.id)); // Thực hiện xóa khỏi Redux Store
  }, [dispatch, discard]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={i => i.book.id}
        renderItem={({ item }) => (
          <CartItemRow item={item} quantity={qtyOf(item)}
                       onChangeQuantity={changeQuantity} onRemove={removeDirectly} />
        )}
      />
      <View style={{ padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ccc' }}>
         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tổng cộng: {formatVND(subtotal)}</Text>
      </View>
    </View>
  );
}