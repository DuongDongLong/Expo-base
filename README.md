# Expo_base App

A project Expo_base App 2023.\
**@auth #longdd**

### Version Environment

-   React Native version `0.71.3`
-   React version `18.2.0`
-   Expo version `~49.0.15`
-   Android SDK version `33.0.0`
-   CocoaPods version `1.10.0`
-   Node version `19.7.0`
-   Visual Studio version `1.58.2`
-   Yarn version `1.22.10`

### Version App

-   Android version : `1.0.0`
-   IOS version : `1.0.0`

### Getting Started

-   Clone project\
    `git clone ...`\
    `cd expo_base`
-   Checkout branch dev\
    `git checkout dev`
-   Termial run \
     `yarn install`\
-   Run app Android/IOS\
     `yarn start`\
-   Build app Android/IOS

# Convention

### Git

Branch name\
 `{username}_{date}_{type}_{branch_name}`

    - username    : Employee name - Ex : Duong Dong Long => longdd
    - date        : Date create task
    - type        : Type of task, see below
    - branch_name : Name branch

> Example : `longdd_010123_feature_add_screen_login`

    | Type      |               Description                  |
    | ----------| ------------------------------------------ |
    | feature   | Tasks new (UI, function)                   |
    | update    | Task update (API, UI, function)            |


### Component

-   [x] Element UI (UIImage, UILable)

_UILable : Text with string_

```
<UILabel
    value={'Example'}
    style={styles.btnExample}
/>
```

_UIImage : Image with file png/jpg_

```
<UIImage
    source={'Example'}
    style={styles.btnExample}
/>
```

-   [x] Button (Primary/Text/Back)

_Primary : Button with background_

```
<Button.Primary
    label={'Example'}
    style={styles.btnExample}
    labelStyle={styles.txtExample}
    onPress={() =>{}}
/>
```

_Text : Button not background_

```
<Button.Text
    label={'Example'}
    style={styles.btnExample}
    labelStyle={styles.txtExample}
    onPress={() =>{}}
/>
```

_Back : Button back_

```
<Button.Back
    style={styles.btnExample}
    icon={}
    onPress={() =>{}}
/>
```

-   [x] Form (HFTextInput/HFPasswordInput)

_HFTextInput : Form TextInput basic_

```
<Form.TextInput
    name='Example'
    label={'Example'}
/>
```

PasswordInput : Form TextInput secureTextEntry\_

```
<Form.PasswordInput
    name='Example'
    label={'Example'}
    containerStyle={styles.example}
/>
```

### Style
