import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AddModal from "./src/modal/AddModal";
import "./index.css";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [itemParaEditar, setItemParaEditar] = useState<any>(null);
  const Logo = require("./src/image/LogoG.png");

  // Função que recebe o novo item do Modal e adiciona na lista
  const adicionarAgendamento = (novoItem: any) => {
    setAgendamentos([novoItem, ...agendamentos]);
  };

  const salvarAgendamento = (itemRecebido: any) => {
    const existe = agendamentos.find((a) => a.id === itemRecebido.id);

    if (existe) {
      // Atualiza o existente
      const listaAtualizada = agendamentos.map((a) =>
        a.id === itemRecebido.id ? itemRecebido : a,
      );
      setAgendamentos(listaAtualizada);
    } else {
      // Adiciona novo
      setAgendamentos([itemRecebido, ...agendamentos]);
    }
    setItemParaEditar(null);
  };

  const abrirEdicao = (item: any) => {
    setItemParaEditar(item);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setItemParaEditar(null);
  };

  const deletarAgendamento = (id: string) => {
    Alert.alert(
      "Excluir Agendamento",
      "Tem certeza que deseja remover este agendamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            const novaLista = agendamentos.filter((item) => item.id !== id);
            setAgendamentos(novaLista);
          },
        },
      ],
    );
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem("@meus_agendamentos");
        if (dadosSalvos !== null) {
          setAgendamentos(JSON.parse(dadosSalvos));
        }
      } catch (e) {
        console.error("Erro ao carregar dados", e);
      }
    };
    carregarDados();
  }, []);

  useEffect(() => {
    const salvarDados = async () => {
      try {
        const valorJson = JSON.stringify(agendamentos);
        await AsyncStorage.setItem("@meus_agendamentos", valorJson);
      } catch (e) {
        console.error("Erro ao salvar dados", e);
      }
    };
    salvarDados();
  }, [agendamentos]);

  return (
    <LinearGradient
      colors={["#0f172a", "#1e293b", "#334155"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" />

      <AddModal
        visible={modalVisible}
        onClose={fecharModal}
        onAdd={salvarAgendamento}
        editingItem={itemParaEditar}
      />

      <View className="flex items-center justify-center mt-10">
        <View className="flex-row items-center mb-3 p-3">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
            className="flex-row flex-none items-center bg-slate-900 px-6 py-4 rounded-2xl mt-8 shadow-lg shadow-blue-500/50"
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={Logo}
            className="grow w-24 h-24"
            resizeMode="contain"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row flex-none items-center bg-slate-900 px-6 py-4 rounded-2xl mt-8 shadow-lg shadow-blue-500/50"
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Menu de Filtros (Estático) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-2 h-20"
        >
          <View className="flex-row items-center px-4">
            <TouchableOpacity className="mr-1 bg-slate-900 h-[40px] px-6 rounded-full border border-gray-600 justify-center">
              <Text className="text-white text-sm font-bold">TODOS</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mr-1 bg-slate-900 h-[40px] px-6 rounded-full border border-gray-600 justify-center">
              <Text className="text-green-400 text-sm font-bold">
                CONFIRMADO
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Lista Dinâmica de Cards */}
        <ScrollView
          className="w-full"
          contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}
        >
          {agendamentos.length === 0 ? (
            <Text className="text-gray-500 mt-10">
              Nenhum agendamento hoje.
            </Text>
          ) : (
            agendamentos.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => abrirEdicao(item)}
                className="bg-slate-900 w-[92%] p-5 rounded-3xl mb-4 border border-gray-600 shadow-xl"
              >
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <MaterialCommunityIcons
                        name="content-cut"
                        size={15}
                        color="#9ca3af"
                      />
                      <Text className="text-white text-xl font-bold ml-2">
                        {item.servico}
                      </Text>
                    </View>
                    <Text className="text-gray-400 text-sm">
                      Cliente: {item.cliente}
                    </Text>
                  </View>

                  {/* Lado Direito: Status e Botão Deletar */}
                  <View className="items-end">
                    <View className="flex-row items-center mb-2">
                      <View
                        className={
                          item.status === "Confirmado"
                            ? "bg-green-500/20 px-3 py-1 rounded-full"
                            : "bg-yellow-500/20 px-3 py-1 rounded-full"
                        }
                      >
                        <Text
                          className={
                            item.status === "Confirmado"
                              ? "text-green-400 text-[10px] font-bold uppercase"
                              : "text-yellow-400 text-[10px] font-bold uppercase"
                          }
                        >
                          {item.status}
                        </Text>
                      </View>

                      {/* Ícone de Deletar */}
                      <TouchableOpacity
                        onPress={() => deletarAgendamento(item.id)}
                        className="ml-3 p-1"
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color="#ef4444"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View className="h-[1px] bg-gray-600 w-full mb-4" />

                <View className="flex-row flex-wrap justify-between">
                  <View className="flex-row items-center w-[48%] mb-3">
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#9ca3af"
                    />
                    <Text className="text-gray-200 ml-2">
                      {item.data} - {item.hora}
                    </Text>
                  </View>
                  <View className="flex-row items-center w-[48%] mb-3">
                    <MaterialCommunityIcons
                      name="cash"
                      size={18}
                      color="#9ca3af"
                    />
                    <Text className="text-green-400 ml-2 font-semibold">
                      R$ {item.valor}
                    </Text>
                    <Text className="text-blue-800 ml-2 font-semibold">
                      ({item.metodoPagamento})
                    </Text>
                  </View>
                  <View className="flex-row items-center w-full">
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color="#9ca3af"
                    />
                    <Text className="text-gray-200 ml-2" numberOfLines={1}>
                      {item.endereco}
                    </Text>
                  </View>

                  <View className="mt-4 bg-gray-800/50 p-2 rounded-lg flex-row items-center">
                    <Ionicons
                      name="notifications-outline"
                      size={14}
                      color="#60a5fa"
                    />
                    <Text className="text-blue-400 text-[10px] ml-2 font-medium">
                      {item.lembrete}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
