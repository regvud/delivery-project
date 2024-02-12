import { Item } from './itemTypes';

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  email: string;
  phone: string;
  password: string;
};

export type Avatar = {
  id: number;
  avatar: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  email: string;
  phone: string;
  avatar: Avatar[];
  last_login: string;
};

export type User = {
  id: number;
  email: string;
  phone: string;
  avatar: Avatar[];
  is_staff: boolean;
  is_superuser: boolean;
  sending: Item[];
  receiving: Item[];
  last_login: string;
  created_at: string;
  updated_at: string;
};

// {
//   "id": 52,
//   "email": "aloha@gmail.com",
//   "phone": "0931234467",
//   "avatar": [
//       {
//           "id": 13,
//           "avatar": "http://127.0.0.1:8080/media/avatars/Screenshot_from_2024-02-09_16-36-42.png",
//           "user_id": 52,
//           "created_at": "2024-02-10T11:25:49.316490Z",
//           "updated_at": "2024-02-05T14:31:14.160770Z"
//       }
//   ],
//   "is_staff": true,
//   "is_superuser": true,
//   "sending": [
//       {
//           "id": 18,
//           "item": {
//               "id": 35,
//               "label": "table",
//               "price": "999999.00",
//               "size": "small",
//               "image": [
//                   {
//                       "image": "http://127.0.0.1:8080/media/images/Screenshot_from_2024-02-09_16-36-42.png"
//                   }
//               ]
//           },
//           "sender": 52,
//           "receiver": 64,
//           "department": 7,
//           "status": "in progress"
//       }
//   ],
//   "receiving": [],
//   "last_login": "2024-02-12T20:27:45.630169Z",
//   "created_at": "2024-02-05T13:29:15.349383Z",
//   "updated_at": "2024-02-05T13:22:25.193074Z"
// }
