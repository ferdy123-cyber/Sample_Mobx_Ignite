import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"
import { View, Text, Input, Button } from "native-base"

interface SignInScreenProps extends AppStackScreenProps<"SignIn"> {}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 15 }}>
      <Text fontSize={"xl"}>Login</Text>
      <Input placeholder="Username" mt={5} mb={4} />
      <Input mb={4} placeholder="Password" />
      <Button onPress={() => {}}>
        <Text>Submit</Text>
      </Button>
    </View>
  )
})
