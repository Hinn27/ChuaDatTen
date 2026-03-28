# MOBILE APP CONTEXT (EXPO + REACT NATIVE)

# TECH STACK
- Framework: Expo (React Native)
- Ngôn ngữ: JavaScript (.jsx)
- State Management: Zustand
- Navigation: Expo Router (hoặc React Navigation)

# QUY TẮC CODE MOBILE
1. UI Components:
   - Luôn sử dụng các thẻ của React Native (`View`, `Text`, `TouchableOpacity`, `FlatList`), tuyệt đối KHÔNG lọt các thẻ HTML (`div`, `span`, `p`) vào code.
   - Xử lý danh sách dài luôn dùng `FlatList` để tối ưu hiệu năng.
   - Sử dụng `SafeAreaView` cho các màn hình chính.
2. Tích hợp 2 SDK:
   - Dùng `@supabase/supabase-js` để thực hiện Auth (đăng nhập) và lấy dữ liệu cá nhân.
   - Dùng `expo-notifications` kết hợp với cấu hình Firebase (google-services.json / GoogleService-Info.plist) để xử lý Push Notification.
3. State Management (Zustand):
   - Áp dụng pattern tương tự Web Admin. 
   - Nếu cần lưu state offline (ví dụ: token đăng nhập, giỏ hàng local), sử dụng middleware `persist` của Zustand kết hợp với `AsyncStorage`.
