import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"
import { View, Text, Input, Button } from "native-base"
import { useStores } from "app/models"

interface SignInScreenProps extends AppStackScreenProps<"SignIn"> {}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen() {
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  })
  const {
    authenticationStore: { login, loginFetch },
  } = useStores()
  useEffect(() => {
    setDataLogin({
      username: "kminchelle",
      password: "0lelplR",
    })
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 15 }}>
      <Text fontSize={"xl"}>Login</Text>
      <Input
        value={dataLogin.username}
        onChangeText={(val) => setDataLogin({ ...dataLogin, username: val })}
        placeholder="Username"
        mt={5}
        mb={4}
      />
      <Input
        value={dataLogin.password}
        onChangeText={(val) => setDataLogin({ ...dataLogin, password: val })}
        mb={4}
        placeholder="Password"
      />
      <Button
        isLoading={loginFetch}
        onPress={() => {
          login(dataLogin)
        }}
      >
        <Text>Submit</Text>
      </Button>
    </View>
  )
})
