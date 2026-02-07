import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import "./index.css";

export default function App() {
  const Logo = require("./src/image/LogoG.png");

  return (
    <SafeAreaView className="flex flex-1 bg-gray-300">
      <StatusBar style="auto" />

      <View className="flex items-center justify-center mt-10">
        <View className="flex-row items-center mb-3 p-3">
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row flex-none items-center bg-gray-600 px-6 py-4 rounded-2xl mt-8 shadow-lg shadow-blue-500/50"
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
            className="flex-row flex-none items-center bg-gray-600 px-6 py-4 rounded-2xl mt-8 shadow-lg shadow-blue-500/50"
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View className="flex-col items-center mb-10 p-3">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-700 w-full max-w-[380px] p-5 rounded-3xl mb-4 border border-gray-600 shadow-xl"
            >
              {/* Header: Nome e Status */}
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="content-cut"
                      size={15}
                      color="#9ca3af"
                    />
                    <Text className="text-white text-xl font-bold ml-2">
                      Low Fade + Barba
                    </Text>
                  </View>
                  <Text className="text-gray-400 text-sm">
                    Cliente: Roney Almeida
                  </Text>
                </View>
                <View className="bg-green-500/20 px-3 py-1 rounded-full">
                  <Text className="text-green-400 text-xs font-bold uppercase">
                    Confirmado
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View className="h-[1px] bg-gray-600 w-full mb-4" />

              {/* Info Grid */}
              <View className="flex-row flex-wrap justify-between">
                {/* Data e Hora */}
                <View className="flex-row items-center w-[48%] mb-3">
                  <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
                  <Text className="text-gray-200 ml-2">11 Fev - 14:30</Text>
                </View>

                {/* Valor */}
                <View className="flex-row items-center w-[48%] mb-3">
                  <MaterialCommunityIcons
                    name="cash"
                    size={18}
                    color="#9ca3af"
                  />
                  <Text className="text-green-400 ml-2 font-semibold">
                    R$ 15,00
                  </Text>
                </View>

                {/* Localização */}
                <View className="flex-row items-center w-full">
                  <Ionicons name="location-outline" size={18} color="#9ca3af" />
                  <Text className="text-gray-200 ml-2" numberOfLines={1}>
                    Rua Clodomir Lucas dos Reis 38A - Colonia
                  </Text>
                </View>
              </View>

              {/* Badge de Dica (O que eu achei melhor adicionar) */}
              <View className="mt-4 bg-gray-800/50 p-2 rounded-lg flex-row items-center">
                <Ionicons
                  name="notifications-outline"
                  size={14}
                  color="#60a5fa"
                />
                <Text className="text-blue-400 text-[10px] ml-2 font-medium">
                  Lembrete será enviado 30min antes.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-700 w-full max-w-[380px] p-5 rounded-3xl mb-4 border border-gray-600 shadow-xl"
            >
              {/* Header: Nome e Status */}
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="content-cut"
                      size={15}
                      color="#9ca3af"
                    />
                    <Text className="text-white text-xl font-bold ml-2">
                      Americano + Barba
                    </Text>
                  </View>
                  <Text className="text-gray-400 text-sm">
                    Cliente: Guilherme Rodrigues
                  </Text>
                </View>
                <View className="bg-green-500/20 px-3 py-1 rounded-full">
                  <Text className="text-green-400 text-xs font-bold uppercase">
                    Confirmado
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View className="h-[1px] bg-gray-600 w-full mb-4" />

              {/* Info Grid */}
              <View className="flex-row flex-wrap justify-between">
                {/* Data e Hora */}
                <View className="flex-row items-center w-[48%] mb-3">
                  <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
                  <Text className="text-gray-200 ml-2">25 Fev - 12:30</Text>
                </View>

                {/* Valor */}
                <View className="flex-row items-center w-[48%] mb-3">
                  <MaterialCommunityIcons
                    name="cash"
                    size={18}
                    color="#9ca3af"
                  />
                  <Text className="text-green-400 ml-2 font-semibold">
                    R$ 35,00
                  </Text>
                </View>

                {/* Localização */}
                <View className="flex-row items-center w-full">
                  <Ionicons name="location-outline" size={18} color="#9ca3af" />
                  <Text className="text-gray-200 ml-2" numberOfLines={1}>
                    Rua Patricia Pagu Galvão 45 - Colonia
                  </Text>
                </View>
              </View>

              {/* Badge de Dica (O que eu achei melhor adicionar) */}
              <View className="mt-4 bg-gray-800/50 p-2 rounded-lg flex-row items-center">
                <Ionicons
                  name="notifications-outline"
                  size={14}
                  color="#60a5fa"
                />
                <Text className="text-blue-400 text-[10px] ml-2 font-medium">
                  Lembrete será enviado 30min antes.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-700 w-full max-w-[380px] p-5 rounded-3xl mb-4 border border-gray-600 shadow-xl"
            >
              {/* Header: Nome e Status */}
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="content-cut"
                      size={15}
                      color="#9ca3af"
                    />
                    <Text className="text-white text-xl font-bold ml-2">
                      Jaca
                    </Text>
                  </View>
                  <Text className="text-gray-400 text-sm">
                    Cliente: Lucas Rodrigues
                  </Text>
                </View>
                <View className="bg-red-500/20 px-3 py-1 rounded-full">
                  <Text className="text-red-400 text-xs font-bold uppercase">
                    Cancelado
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View className="h-[1px] bg-gray-600 w-full mb-4" />

              {/* Info Grid */}
              <View className="flex-row flex-wrap justify-between">
                {/* Data e Hora */}
                <View className="flex-row items-center w-[48%] mb-3">
                  <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
                  <Text className="text-gray-200 ml-2">28 Fev - 10:30</Text>
                </View>

                {/* Valor */}
                <View className="flex-row items-center w-[48%] mb-3">
                  <MaterialCommunityIcons
                    name="cash"
                    size={18}
                    color="#9ca3af"
                  />
                  <Text className="text-red-400 ml-2 font-semibold">
                    R$ 30,00
                  </Text>
                </View>

                {/* Localização */}
                <View className="flex-row items-center w-full">
                  <Ionicons name="location-outline" size={18} color="#9ca3af" />
                  <Text className="text-gray-200 ml-2" numberOfLines={1}>
                    Rua Andre Rocha, 4832 - Curicica
                  </Text>
                </View>
              </View>

              {/* Badge de Dica (O que eu achei melhor adicionar) */}
              <View className="mt-4 bg-gray-800/50 p-2 rounded-lg flex-row items-center">
                <Ionicons
                  name="notifications-outline"
                  size={14}
                  color="#60a5fa"
                />
                <Text className="text-blue-400 text-[10px] ml-2 font-medium">
                  Lembrete será enviado 30min antes.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-700 w-full max-w-[380px] p-5 rounded-3xl mb-4 border border-gray-600 shadow-xl"
            >
              {/* Header: Nome e Status */}
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="content-cut"
                      size={15}
                      color="#9ca3af"
                    />
                    <Text className="text-white text-xl font-bold ml-2">
                      Tesoura
                    </Text>
                  </View>
                  <Text className="text-gray-400 text-sm">
                    Cliente: Marilena Gomes
                  </Text>
                </View>
                <View className="bg-yellow-500/20 px-3 py-1 rounded-full">
                  <Text className="text-yellow-400 text-xs font-bold uppercase">
                    Aguardando Confirmação
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View className="h-[1px] bg-gray-600 w-full mb-4" />

              {/* Info Grid */}
              <View className="flex-row flex-wrap justify-between">
                {/* Data e Hora */}
                <View className="flex-row items-center w-[48%] mb-3">
                  <Ionicons name="calendar-outline" size={18} color="#9ca3af" />
                  <Text className="text-gray-200 ml-2">2 Mar - 14:30</Text>
                </View>

                {/* Valor */}
                <View className="flex-row items-center w-[48%] mb-3">
                  <MaterialCommunityIcons
                    name="cash"
                    size={18}
                    color="#9ca3af"
                  />
                  <Text className="text-yellow-400 ml-2 font-semibold">
                    R$ 100,00
                  </Text>
                </View>

                {/* Localização */}
                <View className="flex-row items-center w-full">
                  <Ionicons name="location-outline" size={18} color="#9ca3af" />
                  <Text className="text-gray-200 ml-2" numberOfLines={1}>
                    Alguma rua, 1234 - Bairro
                  </Text>
                </View>
              </View>

              {/* Badge de Dica (O que eu achei melhor adicionar) */}
              <View className="mt-4 bg-gray-800/50 p-2 rounded-lg flex-row items-center">
                <Ionicons
                  name="notifications-outline"
                  size={14}
                  color="#60a5fa"
                />
                <Text className="text-blue-400 text-[10px] ml-2 font-medium">
                  Lembrete será enviado 30min antes.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
