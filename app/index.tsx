import { useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Tarefa } from "../types";
import TarefaItem from "../components/TarefaItem";
import TarefaModal from "../components/TarefaModal";

export default function Index() {
  const [lista, setLista] = useState<Tarefa[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState<Tarefa | null>(null);

  const salvarTarefa = (dados: Partial<Tarefa>) => {
    if (editando) {
      setLista(lista.map(t => t.id === editando.id ? { ...t, ...dados } as Tarefa : t));
    } else {
      const nova: Tarefa = {
        id: Date.now().toString(),
        descricao: dados.descricao!,
        prazo: dados.prazo!,
        prioridade: dados.prioridade!
      };
      setLista([...lista, nova]);
    }
    setEditando(null);
  };

  const removerTarefa = (id: string) => {
    setLista(lista.filter(t => t.id !== id));
  };

  const iniciarEdicao = (t: Tarefa) => {
    setEditando(t);
    setModalVisible(true);
  };

  const listaOrdenada = [...lista].sort((a, b) => {
    if (a.prazo !== b.prazo) return a.prazo.localeCompare(b.prazo);
    return a.prioridade - b.prioridade;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Tarefas</Text>
      
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => { setEditando(null); setModalVisible(true); }}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <FlatList
        data={listaOrdenada}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TarefaItem 
            tarefa={item} 
            onEdit={iniciarEdicao} 
            onDelete={removerTarefa} 
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TarefaModal 
        visible={modalVisible}
        onClose={() => { setModalVisible(false); setEditando(null); }}
        onSave={salvarTarefa}
        tarefaParaEditar={editando}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5", paddingHorizontal: 20, paddingTop: 60 },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#1a1a1a" },
  fab: { 
    position: "absolute", bottom: 30, right: 30, width: 60, height: 60, 
    backgroundColor: "#007bff", borderRadius: 30, justifyContent: "center", 
    alignItems: "center", elevation: 5, zIndex: 1 
  },
  fabText: { color: "#fff", fontSize: 30, fontWeight: "300" }
});