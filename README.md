# React Native Discovery Friendly Chat App with Supabase
You can meet new people and start chatting instantly.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Figma
https://www.figma.com/community/file/1215569792653924125

## Kullanılan Teknolojiler

* Expo CLI
* React Native
* Supabase Auth, Databases & Real Time Dataase
* Expo-Router
* Redux Toolkit
* Yup & Formik Form Validation
* i18n Localization (Turkish, English, German, Portuguese, Chinese supports)
* React Native Lucide ( Icons Library )
* Custom Font
* Secure Store
* Gifted-Chat UI

## Proje Özellikleri

* SignIn/SignUp Kimlik Doğrulama
* Şifre yenileme
* Herhangi bir kullanıcı üzerinden mesaj başlatma
* Gönderilen/Gelen mesajları takip etme
* Gönderilen mesajları (Silme & Kopyalama )
* Mesaj baloncuklarının tema renklerini belirleme
* 5 global dil desteği

## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone https://github.com/burakgokcinarr/rn-discovery-chat-app
```

Proje dizinine gidin

```bash
  cd app-project
```

Gerekli paketleri yükleyin

```bash
  npm install or yarn install or bun install
```
Proje Yapılandırılması ( ÖNEMLİ )

```bash
 Adım 1) https://supabase.com/ adresinden hesap oluşturun.
 Adım 2) proje ana dizinine ".env" isimli bir dosya oluşturun ve aşağıdaki uygun yerleri supabase hesabınızın API KEY'lerini değiştirin.
    EXPO_PUBLIC_API_URL=https://xxxxxxxxxxxx.supabase.co
    EXPO_PUBLIC_API_KEY=xxxxxxxxxx....xxxxxx
```

Cihazlarda çalıştırın ( iOS Simulator & Android Emulator or Real Devices )

```bash
  npx expo start
```
```bash
  for iOS           => Press Keyboard (i)
  for Android       => Press Keyboard (a)
  or
  Your Real Device  => Expo App Scan QRCode
```

NOT: Ayarları doğru bir şekilde uyguladıysanız artık https://supabase.com/dashboard/projects adresi üzerinden User Authorization & Database/Real Time Feature verilerinizi takip edebilirsiniz.

<p align="center">
  <img src="https://github.com/burakgokcinarr/rn-discovery-chat-app/blob/main/assets/projects/preview.gif" alt="img" width="800" height="800">
</p>
<p align="center">
  <img src="https://github.com/burakgokcinarr/rn-discovery-chat-app/blob/main/assets/projects/1.png" alt="img" width="400" height="600">
  <img src="https://github.com/burakgokcinarr/rn-discovery-chat-app/blob/main/assets/projects/2.png" alt="img" width="400" height="600">
</p>
<p align="center">
  <img src="https://github.com/burakgokcinarr/rn-discovery-chat-app/blob/main/assets/projects/3.png" alt="img" width="400" height="600">
  <img src="https://github.com/burakgokcinarr/rn-discovery-chat-app/blob/main/assets/projects/4.png" alt="img" width="400" height="600">
</p>
<p align="center">
  <img src="https://github.com/burakgokcinarr/rn-discovery-chat-app/blob/main/assets/projects/5.png" alt="img" width="400" height="600">
  <img src="https://github.com/burakgokcinarr/rn-discovery-chat-app/blob/main/assets/projects/6.png" alt="img" width="400" height="600">
</p>
<p align="center">
  <img src="https://github.com/burakgokcinarr/rn-discovery-chat-app/blob/main/assets/projects/7.png" alt="img" width="400" height="600">
</p>
