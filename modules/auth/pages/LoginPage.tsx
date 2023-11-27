import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback } from "react";
import {
  Button,
  Colors,
  Form,
  IMAGES,
  UILabel,
  UISpace,
  fontSize,
  horizontalScale,
  verticalScale,
} from "@modules/core";
import { LocaleNamespace, useTranslation } from "@modules/common";
import { FormProvider, useForm } from "react-hook-form";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { yupResolver as FormResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas";
import { useAppDispatch } from "@modules/app";
import { actionSignIn } from "../actions";

interface FormValues {
  email: string;

  password: string;
}
const HEIGHT_SNAP = horizontalScale(100);

const LoginPage = () => {
  const t = useTranslation(LocaleNamespace.DEFAULT);
  const offset = useSharedValue(horizontalScale(305));
  const dispatch = useAppDispatch();
  const form = useForm<FormValues>({
    defaultValues: {},
    mode: "onChange",
    resolver: FormResolver(loginSchema()),
  });

  const { handleSubmit, formState } = form;
  
  React.useEffect(() => {
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        offset.value = withTiming(horizontalScale(305));
      }
    );
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        offset.value = withTiming(HEIGHT_SNAP);
      }
    );
    return () => {
      hideSubscription.remove();
      showSubscription.remove();
    };
  }, []);

  const top = useAnimatedStyle(() => {
    return {
      marginTop: offset.value,
    };
  });

  const onPressLogin = useCallback(async (value: FormValues) => {
    const { email, password } = value;
    dispatch(actionSignIn({email,password}))
  }, []);

  const onPressForgotPassword = () => {};

  const onPressGotoRegister = () => {};
  
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image source={IMAGES.IMG_LOGIN} style={styles.background} />
      </View>
      <Animated.View style={[styles.body, top]}>
        <ScrollView              contentContainerStyle={styles.container}>
          <UISpace height={verticalScale(24)} />
          <UILabel
            fontSize={fontSize(20)}
            fontWeight="700"
            color={Colors.pink}
            style={styles.title}
            value={t("welcome_back")}
          />
          <UISpace height={verticalScale(24)} />
          <FormProvider {...form}>
            <Form.TextInput
              name="email"
              label={t("email")}
              placeholder={t("email")}
              returnKeyType="next"
            />
            <Form.TextInput
              name="password"
              label={t("password")}
              placeholder={t("password")}
              isPasswordFeild={true}
            />
          </FormProvider>
          <Pressable onPress={onPressForgotPassword}>
            <UILabel
              value={t("forgot_your_password")}
              fontSize={fontSize(13)}
              fontWeight="400"
              color={Colors.gray600}
              style={styles.underLine}
            />
          </Pressable>
          <UISpace height={verticalScale(32)} />
          <Button.Primary
            primary={true}
            label={t("login")}
            style={styles.button}
            disabled={!formState.isValid}
            uppercase={false}
            onPress={handleSubmit(onPressLogin)}
          />
          <UISpace height={verticalScale(24)} />
          <Pressable onPress={onPressGotoRegister} hitSlop={styles.hitSlop}>
            <UILabel
              value={t("i_dont_have_an_account_yet")}
              fontSize={fontSize(16)}
              color={Colors.gray600}
              style={{ alignSelf: "center" }}
              fontWeight="500"
            />
          </Pressable>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  background: {
    width: "100%",
    height: horizontalScale(481),
  },
  body: {
    marginTop: horizontalScale(305),
    backgroundColor: Colors.white,
    borderTopLeftRadius: horizontalScale(20),
    borderTopRightRadius: horizontalScale(20),
    flex: 1,
    paddingHorizontal: horizontalScale(14),
  },
  button: {},
  title: {
    alignSelf: "center",
  },
  underLine: {
    textDecorationLine: "underline",
    alignSelf: "flex-start",
  },
  hitSlop: {
    top: 10,
    right: 10,
    left: 10,
    bottom: 10,
  },
});
