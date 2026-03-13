import { useState } from "react";
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet
} from "react-native";

import Botao from "../components/Botao";

export default function Index() {

  const [nome, setNome] = useState("");
  const [lista, setLista] = useState<any[]>([]);

  function adicionar() {

    if (nome.trim() === "") return;

    const novo = {
      id: Date.now().toString(),
      nome: nome
    };

    setLista([...lista, novo]);
    setNome("");
  }

  function remover(id: string) {
    const novaLista = lista.filter(item => item.id !== id);
    setLista(novaLista);
  }

  return (
    <View style={styles.container}>

      <View style={styles.linha}>

        <TextInput
          style={styles.input}
          placeholder="Digite um nome"
          value={nome}
          onChangeText={setNome}
        />

        <Botao
          title="+"
          titleColor="#fff"
          onPress={adicionar}
        />

      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.item}>

            <Text style={styles.nome}>{item.nome}</Text>

            <TouchableOpacity onPress={() => remover(item.id)}>
              <Text style={styles.lixeira}>🗑</Text>
            </TouchableOpacity>

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    marginTop: 50
  },

  linha: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  nome: {
    fontSize: 16
  },

  lixeira: {
    fontSize: 18
  }

});