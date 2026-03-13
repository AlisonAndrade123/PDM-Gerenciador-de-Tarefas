import { Text, TouchableOpacity, StyleSheet } from "react-native";

type BotaoProps = {
  title: string;
  color?: string;
  titleColor: string;
  onPress: () => void;
};

export default function Botao(props: BotaoProps) {

  const title = props.title || "Botão";
  const color = props.color || "#00ff0dff";
  const titleColor = props.titleColor || "#fff";

  return (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: color }]}
      onPress={props.onPress}
    >
      <Text style={{ color: titleColor, fontSize: 20 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  botao: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  }

});