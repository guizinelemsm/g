import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

export default function App() {
  const [dados, setDados] = useState([]);

  async function carregaProdutos() {
    try {
      let resposta = await fetch("https://fakestoreapi.com/products/");
      if (resposta.status == 200) {
        let novosDados = await resposta.json();
        setDados(novosDados);
      } else {
        throw new Error("Falha no carregamento de dados");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    carregaProdutos();
  }, []);
  
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Lista de Produtos</Text>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.productTitle}>{item.title}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },

  
});