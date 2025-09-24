import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Index() {
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const loadData = async () => {
      const savedCount = await AsyncStorage.getItem("count");
      const savedLimit = await AsyncStorage.getItem("limit");
      if (savedCount) setCount(Number(savedCount));
      if (savedLimit) setLimit(Number(savedLimit));
    };
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("count", count.toString());
    AsyncStorage.setItem("limit", limit.toString());
  }, [count, limit]);

  const increment = () => {
    if (count + 1 > limit) {
      Alert.alert("Atenção!", "Você atingiu o limite de pessoas!");
    } else {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Contador de Pessoas</Text>
        
        <Text
          style={[
            styles.counter,
            count >= limit && { color: "red" }, // muda pra vermelho
          ]}
        >
          {count}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={increment}>
            <Text style={styles.buttonText}>+ Adicionar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={decrement}>
            <Text style={styles.buttonText}>- Remover</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de reset */}
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={reset}>
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Defina o limite"
          placeholderTextColor="#aaa"
          value={limit.toString()}
          onChangeText={(text) => setLimit(Number(text))}
        />
        <Text style={styles.limitText}> Limite atual: {limit}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#BB86FC",
  },
  counter: {
    fontSize: 70,
    margin: 20,
    color: "#E0E0E0",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  resetButton: {
    backgroundColor: "#BB86FC", // cor diferente pro reset
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BB86FC",
    padding: 10,
    marginTop: 20,
    width: 120,
    textAlign: "center",
    color: "#FFF",
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
  },
  limitText: {
    color: "#AAA",
    marginTop: 10,
    fontSize: 16,
  },
});

