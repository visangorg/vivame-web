export function createKeyValueClubEventRepository({ getJson, setJson }) {
  if (typeof getJson !== "function" || typeof setJson !== "function") {
    throw new Error("getJson and setJson are required");
  }

  return {
    async list() {
      const data = await getJson();
      return Array.isArray(data) ? data : [];
    },
    async saveAll(next) {
      await setJson(Array.isArray(next) ? next : []);
    },
  };
}
