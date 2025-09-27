// components/screens/ProductDetailScreen.js
import React, { useState } from 'react';
import { 
  View, Text, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet, Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params || {};

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'US 7');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.value || '#8A2BE2');
  const [expandedDetails, setExpandedDetails] = useState({});

  const toggleDetail = (index) => {
    setExpandedDetails(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(<Text key={i}>★</Text>);
    if (hasHalfStar) stars.push(<Text key="half">☆</Text>);
    return stars;
  };

  const renderSizeOption = ({ item }) => (
    <TouchableOpacity 
      style={[styles.sizeButton, selectedSize === item && styles.selectedSizeButton]}
      onPress={() => setSelectedSize(item)}
    >
      <Text style={[styles.sizeText, selectedSize === item && styles.selectedSizeText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderColorOption = ({ item }) => (
    <TouchableOpacity 
      style={[styles.colorButton, { backgroundColor: item.value }, selectedColor === item.value && styles.selectedColorButton]}
      onPress={() => setSelectedColor(item.value)}
    />
  );

  const renderDetailItem = ({ item, index }) => (
    <View style={styles.detailItem}>
      <TouchableOpacity style={styles.detailHeader} onPress={() => toggleDetail(index)}>
        <Text style={styles.detailTitle}>{item.title}</Text>
        <Text style={styles.detailArrow}>{expandedDetails[index] ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expandedDetails[index] && <Text style={styles.detailContent}>{item.content}</Text>}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product?.image }} style={styles.productImage} resizeMode="cover" />
      </View>

      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>{product?.name}</Text>
        <Text style={styles.productPrice}>₹{product?.price}</Text>
      </View>

      {/* Size Selection */}
      {product?.sizes && (
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionTitle}>Select Size</Text>
          <FlatList
            data={product.sizes}
            horizontal
            renderItem={renderSizeOption}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      {/* Color Selection */}
      {product?.colors && (
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionTitle}>Select Color</Text>
          <FlatList
            data={product.colors}
            horizontal
            renderItem={renderColorOption}
            keyExtractor={(item) => item.name}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Details & Specifications */}
      {product?.details && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Details & Specifications</Text>
          <FlatList
            data={product.details}
            renderItem={renderDetailItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { height: 250, backgroundColor: '#f5f5f5' },
  productImage: { width: '100%', height: '100%' },
  productInfoContainer: { padding: 20, paddingBottom: 10 },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  productPrice: { fontSize: 28, fontWeight: 'bold', color: '#8A2BE2' },
  selectionContainer: { paddingHorizontal: 20, marginBottom: 20 },
  selectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },
  sizeButton: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#f0f0f0', borderRadius: 20, marginRight: 10, minWidth: 50, alignItems: 'center' },
  selectedSizeButton: { backgroundColor: '#8A2BE2' },
  sizeText: { fontSize: 14, fontWeight: '500', color: '#333' },
  selectedSizeText: { color: '#fff' },
  colorButton: { width: 40, height: 40, borderRadius: 20, marginRight: 12, borderWidth: 3, borderColor: 'transparent' },
  selectedColorButton: { borderColor: '#333' },
  buttonsContainer: { paddingHorizontal: 20, gap: 12, marginBottom: 30 },
  addToCartButton: { backgroundColor: '#8A2BE2', paddingVertical: 15, borderRadius: 25, alignItems: 'center' },
  addToCartText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  buyNowButton: { backgroundColor: '#8A2BE2', paddingVertical: 15, borderRadius: 25, alignItems: 'center' },
  buyNowText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sectionContainer: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  detailItem: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 12 },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailTitle: { fontSize: 16, fontWeight: '500', color: '#333' },
  detailArrow: { fontSize: 12, color: '#666' },
  detailContent: { fontSize: 14, color: '#666', marginTop: 8, lineHeight: 20 },
});

export default ProductDetailScreen;
