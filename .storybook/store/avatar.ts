import axios from "axios";
import {defineStore} from "pinia";

export const USER_AVATAR_ENDPOINT = `/api/v1/profile/avatar`;

const AVATAR_BUFOR_SIZE = 100;

export const avatar = defineStore({
  id: "avatar",
  state: () => ({
    userAvatar: null,
    ownAvatar: false,
    userAvatarStorage: [],
    groupAvatarStorage: [],
  }),
  getters: {
    getUserAvatar(state): string {
      return state.userAvatar;
    },
    isOwnAvatar(state): boolean {
      return state.ownAvatar;
    },
  },
  actions: {
    async fetchAvatar(size?: number) {
      const response = await axios.get(USER_AVATAR_ENDPOINT, {
        params: {
          size: size,
        },
        responseType: "blob",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      this.ownAvatar = response.headers.ownavatar === "true";
      this.userAvatar = await toBase64(response.data);
    },

    async updateAvatar(formData: any) {
      await axios.post(USER_AVATAR_ENDPOINT, formData, {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await this.fetchAvatar();
    },

    async deleteAvatar() {
      await axios.delete(USER_AVATAR_ENDPOINT, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      await this.fetchAvatar();
    },
    async fetchUserAvatarById(id: string, size: number) {
      const avatar = this.userAvatarStorage.find((val) => val.id == id && val.size == size);
      if (avatar) return avatar;
      const response = await axios.get(`/api/v1/users/${id}/avatar`, {
        params: {
          size: size,
        },
        responseType: "blob",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      const newAvatar = {
        id: id,
        size: size,
        imageUrl: await toBase64(response.data),
      };
      this.userAvatarStorage.unshift(newAvatar);
      if (this.userAvatarStorage.length > AVATAR_BUFOR_SIZE) {
        this.userAvatarStorage.pop();
      }
      return newAvatar;
    },
    async fetchGroupAvatarById(id: string, size: number) {
      const avatar = this.groupAvatarStorage.find((val) => val.id == id && val.size == size);
      if (avatar) return avatar;
      const response = await axios.get(`/api/v1/groups/${id}/avatar`, {
        params: {
          size: size,
        },
        responseType: "blob",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      const newAvatar = {
        id: id,
        size: size,
        imageUrl: await toBase64(response.data),
      };
      this.groupAvatarStorage.unshift(newAvatar);
      if (this.groupAvatarStorage.length > AVATAR_BUFOR_SIZE) {
        this.groupAvatarStorage.pop();
      }
      return newAvatar;
    },
  },
});

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
