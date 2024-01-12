import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"
import { Button, FlatList, ScrollView, Text, View } from "native-base"
import { useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface DaftarUserScreenProps extends AppStackScreenProps<"DaftarUser"> {}

export const DaftarUserScreen: FC<DaftarUserScreenProps> = observer(function DaftarUserScreen() {
  const {
    userStores: { listUser, loading, getListUser },
    authenticationStore: { logout },
  } = useStores()
  useEffect(() => {
    getListUser()
  }, [])
  console.log(listUser)
  return (
    <View style={{ flex: 1 }}>
      <Button
        onPress={() => {
          logout()
        }}
      >
        <Text>Logout</Text>
      </Button>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <>
          <Text>Ini Daftar User</Text>
          {/* <ScrollView style={{ flex: 1 }}> */}
          <FlatList data={listUser} renderItem={({ item }) => <Text>{item.email}</Text>} />
          {/* </ScrollView> */}
        </>
      )}
    </View>
  )
})
