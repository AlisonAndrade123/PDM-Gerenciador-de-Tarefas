import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tarefa } from "../types";
// Usaremos MaterialCommunityIcons para tudo para manter o mesmo estilo de traço
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

type Props = {
  tarefa: Tarefa;
  onEdit: (t: Tarefa) => void;
  onDelete: (id: string) => void;
};

export default function TarefaItem({ tarefa, onEdit, onDelete }: Props) {
  
  // Função para definir a cor da prioridade de forma profissional
  const getPriorityColor = (prio: number) => {
    switch(prio) {
      case 1: return "#d9534f"; // Urgente (Vermelho)
      case 2: return "#f0ad4e"; // Alta (Laranja)
      case 3: return "#5bc0de"; // Média (Azul claro)
      default: return "#5cb85c"; // Baixa (Verde)
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.descricao} numberOfLines={1}>{tarefa.descricao}</Text>
        
        <View style={styles.metaData}>
          {/* Ícone de Calendário Vetorial */}
          <View style={styles.badge}>
            <MaterialCommunityIcons name="calendar-clock" size={14} color="#636e72" />
            <Text style={styles.badgeText}>{tarefa.prazo}</Text>
          </View>

          {/* Indicador de Prioridade */}
          <View style={[styles.badge, { backgroundColor: getPriorityColor(tarefa.prioridade) + '15' }]}>
            <MaterialCommunityIcons 
                name="alert-circle-outline" 
                size={14} 
                color={getPriorityColor(tarefa.prioridade)} 
            />
            <Text style={[styles.badgeText, { color: getPriorityColor(tarefa.prioridade), fontWeight: 'bold' }]}>
              P{tarefa.prioridade}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.acoes}>
        <TouchableOpacity onPress={() => onEdit(tarefa)} style={styles.btnAcao}>
          <MaterialCommunityIcons name="pencil" size={20} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(tarefa.id)} style={[styles.btnAcao, { backgroundColor: '#fff5f5' }]}>
          <MaterialCommunityIcons name="trash-can" size={20} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  info: { flex: 1 },
  descricao: { 
    fontSize: 16, 
    fontWeight: "700", 
    color: "#2d3436", 
    marginBottom: 8 
  },
  metaData: { 
    flexDirection: "row", 
    gap: 10, 
    alignItems: "center" 
  },
  badge: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#f1f2f6", 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6,
    gap: 4
  },
  badgeText: { 
    fontSize: 12, 
    color: "#636e72" 
  },
  acoes: { 
    flexDirection: "row", 
    gap: 8,
    marginLeft: 10
  },
  btnAcao: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f7ff",
    justifyContent: "center",
    alignItems: "center",
  },
});