import { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Tarefa } from "../types";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (tarefa: Partial<Tarefa>) => void;
  tarefaParaEditar?: Tarefa | null;
};

export default function TarefaModal({ visible, onClose, onSave, tarefaParaEditar }: Props) {
  const [descricao, setDescricao] = useState("");
  const [prazo, setPrazo] = useState("");
  const [prioridade, setPrioridade] = useState(3);

  useEffect(() => {
    if (tarefaParaEditar) {
      setDescricao(tarefaParaEditar.descricao);
      setPrazo(tarefaParaEditar.prazo);
      setPrioridade(tarefaParaEditar.prioridade);
    } else {
      setDescricao("");
      setPrazo("");
      setPrioridade(3);
    }
  }, [tarefaParaEditar, visible]);

  const handleSalvar = () => {
    if (!descricao || !prazo) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    onSave({ descricao, prazo, prioridade });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{tarefaParaEditar ? "Editar" : "Nova Tarefa"}</Text>
          
          <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
          <TextInput style={styles.input} placeholder="Prazo (Ex: 2024-05-20)" value={prazo} onChangeText={setPrazo} />
          
          <Text style={styles.label}>Prioridade (1 - Alta a 5 - Baixa): {prioridade}</Text>
          <View style={styles.prioridadeContainer}>
            {[1, 2, 3, 4, 5].map(n => (
              <TouchableOpacity 
                key={n} 
                style={[styles.btnPrio, prioridade === n && styles.btnPrioActive]}
                onPress={() => setPrioridade(n)}
              >
                <Text style={prioridade === n ? {color: '#fff'} : {}}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>SALVAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancela} onPress={onClose}>
              <Text>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 20 },
  content: { backgroundColor: "#fff", padding: 25, borderRadius: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8, marginBottom: 15 },
  label: { marginBottom: 10, color: "#666" },
  prioridadeContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  btnPrio: { width: 40, height: 40, borderWidth: 1, borderColor: "#ddd", borderRadius: 20, justifyContent: "center", alignItems: "center" },
  btnPrioActive: { backgroundColor: "#007bff", borderColor: "#007bff" },
  footer: { flexDirection: "row", gap: 10 },
  btnSalvar: { flex: 1, backgroundColor: "#28a745", padding: 15, borderRadius: 10, alignItems: "center" },
  btnCancela: { flex: 1, backgroundColor: "#f8f9fa", padding: 15, borderRadius: 10, alignItems: "center", borderWidth: 1, borderColor: "#ddd" },
});